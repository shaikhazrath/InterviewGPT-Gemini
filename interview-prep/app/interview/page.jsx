'use client'
import React, { useEffect, useState } from 'react';
import AudioInputComponent from '../../components/AudioInputComponent'
import axios from 'axios';
import { useRouter } from 'next/navigation.js';
const Page = () => {
  const [question, setQuestion] = useState('');
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/user/checkauth`, {
          headers: {
            authorization: token
          }
        });
        
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    }

    checkAuth();
  }, []);
  
  const getQuestion = async () => {
    try {
      setQuestion('')
      const token = localStorage.getItem('token');
      const interviewid = localStorage.getItem('interviewid');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/getquestions?id=${interviewid}`, {
        headers: {
          Authorization: token
        }
      });
      if(res.data === 'interview completed'){
        router.push('/Analyseinterview')
      }else{
        setQuestion(res.data.question);

      }
    } catch (error) 
    {
      setQuestion('')

      console.log(error);
    }
  };

    const submitAnswer =async (Answer)=>{
      try {
        const token = localStorage.getItem('token');
        const interviewid = localStorage.getItem('interviewid');
        const res = await axios.post(`${process.env.NEXT_PUBLIC_API}/upload`,{ Answer, interviewid }, {
          headers: {
            Authorization: token
          }
        });
        getQuestion()
      } catch (error) {
        console.log(error) 
      }
    }

  useEffect(() => {
    getQuestion();
  }, []);


  return (
    
    <div>
      <h1>{question}</h1>
      <AudioInputComponent generatedContent={question} GetQuestion={getQuestion} submitAnswer={submitAnswer} />
    </div>
  );
};

export default Page;
