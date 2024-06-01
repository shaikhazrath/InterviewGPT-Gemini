import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import verifyToken from '../middleware/authMiddleware.js';
import Interview from '../model/interviewModel.js';


const router = express.Router();




router.post('/setUpInterview', verifyToken, async (req, res) => {
    try {
        const api_key = process.env.GEMINI_API
const genAI = new GoogleGenerativeAI(api_key);
        const { jobDescription } = req.body;
        const user = req.user;

        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const result = await model.generateContent([
            `Assume the role of a job recruiter. I'd like to discuss a job opening with you. Please consider the following job description: ${jobDescription} Based on this job description, I'd like you to prepare 3 questions that a candidate might be asked during an interview. Please format the questions in a consistent style, making sure each question is clear and concise dont use and heading or styling`
        ]);


        let questions = result.response.text().split('\n').filter(question => question.trim() !== '');
        questions = questions.map(question => question.replace(/-/g, '').trim());

        const questionsWithNullAnswers = questions.map(question => ({ question: question, answer: null }));

        const interview = new Interview({
            user: user._id,
            jobDescription: jobDescription,
            answersWithQuestions: questionsWithNullAnswers 
        });

        const savedInterview = await interview.save();

        res.status(201).json(savedInterview);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


router.get('/getquestions', verifyToken, async (req, res) => {
    try {
        const user = req.user;
        const interviewid = req.query.id;
        const interview = await Interview.findOne({ _id: interviewid, user: user._id });
        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }
        const index = interview.counter;
        const answersWithQuestions = interview.answersWithQuestions;
        if (index === interview.answersWithQuestions.length) {
            return res.status(201).send('interview completed')
        }
        const question = answersWithQuestions[index].question;
        res.status(200).json({ question });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/upload', verifyToken, async (req, res) => {
    try {
        const user = req.user;
        let { Answer, interviewid } = req.body;
        if (!Answer) {
            Answer = 'no answer'
        }
        const interview = await Interview.findOne({ _id: interviewid, user: user._id });
        if (!interview) {
            return res.status(404).send('Interview not found.');
        }
        const index = interview.counter;
        if (index === interview.answersWithQuestions.length) {
            return res.json('All questions completed.');
        }
        interview.answersWithQuestions[index].answer = Answer;
        interview.counter = index + 1;
        await interview.save();
        res.json(interview);
    } catch (error) {
        console.log(error);
        res.status(500).send('Internal Server Error');
    }
});


router.get('/getAnalysis', verifyToken, async (req, res) => {
    try {
        const api_key = process.env.GEMINI_API
const genAI = new GoogleGenerativeAI(api_key);
        const user = req.user;
        const interviewid = req.query.id;
        const interview = await Interview.findOne({ _id: interviewid, user: user._id });
        if (!interview) {
            return res.status(404).json({ message: "Interview not found" });
        }
            if (interview.answersWithQuestions[0].rating !== null) {
                return res.status(200).json({ message: "Analysis data retrieved successfully", data: interview.answersWithQuestions });
            }
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        for (let i = 0; i < interview.answersWithQuestions.length; i++) {
            const rating = await model.generateContent([
                `this is the question ${interview.answersWithQuestions[i].question} and this is the answer for it ${interview.answersWithQuestions[i].answer} give rating of out of 10 for the answer to the question just give number dont give any thing other then number for example 1 , 2,3,4,5,6,7,8,9 if answer is no related give 0 `
            ]);
            const feedback = await model.generateContent([
                `this is the question ${interview.answersWithQuestions[i].question} and this is the answer for it ${interview.answersWithQuestions[i].answer} if the answer is no answer just give no answer probvided analyse the answer to question and give short feedback about how to improve it in 3 points dont give any decorations give in string format`
            ]);
            interview.answersWithQuestions[i].rating = parseInt(rating.response.text());
            interview.answersWithQuestions[i].feedback = feedback.response.text();
            await interview.save();
        }
        res.status(200).json({ message: "Analysis data retrieved successfully", data: interview.answersWithQuestions });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
});








export default router;