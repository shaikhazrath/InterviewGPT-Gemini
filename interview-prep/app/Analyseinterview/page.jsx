'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../../components/Loading';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAnswers, setShowAnswers] = useState([]); // Initialize with an empty array

  const toggleAnswer = (index) => {
    setShowAnswers((prevShowAnswers) => {
      const newShowAnswers = [...prevShowAnswers];
      newShowAnswers[index] = !newShowAnswers[index];
      return newShowAnswers;
    });
  };

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/user/checkauth`, {
          headers: {
            authorization: token,
          },
        });
      } catch (error) {
        console.log(error);
        router.push('/');
      }
    };

    checkAuth();
  }, []);

  const getAnalysis = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const interviewId = localStorage.getItem('interviewid');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/getAnalysis?id=${interviewId}`, {
        headers: {
          Authorization: token,
        },
      });
      console.log(res.data.interview);
      setData(res.data.interview);
      setShowAnswers(Array(res.data.interview.answersWithQuestions.length).fill(false)); // Update showAnswers here
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAnalysis();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
  <div className='bg-black flex justify-center'>
<div className="bg-black text-white min-h-screen p-8 md:w-1/2">
  <div className="mb-8">
    <h1 className="text-4xl font-bold mb-4  text-center">
      Total Score: <span className="text-purple-500">{data.totalScore}</span>
    </h1>
  </div>
  {data && data.answersWithQuestions.map((item, index) => (
    <div key={index} className="mb-8 border-b pb-8 last:border-none last:pb-0">
      <div className="flex items-center justify-between mb-2">
        <p className="text-lg font-bold">Question {index + 1}</p>
        <div className="flex items-center">
          <div className="flex items-center mr-2">
            {Array.from({ length: 5 }, (_, i) => (
              <svg
                key={i}
                className={`h-5 w-5 ${i < item.rating ? 'text-purple-500' : 'text-gray-400'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
        </div>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <p>{item.question}</p>
          <button
            className="text-gray-400 hover:text-white focus:outline-none"
            onClick={() => toggleAnswer(index)}
          >
            <svg
              className={`h-6 w-6 transition-transform ${
                showAnswers[index] ? 'rotate-180' : ''
              }`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
        </div>
        {showAnswers[index] && (
          <div>
            <p className="mb-4">Answer: {item.answer}</p>
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex items-center mb-2">
                <p className="mr-2">Feedback:</p>
              </div>
              <p>{item.feedback}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  ))}
</div>
</div>

  );
};

export default Page;