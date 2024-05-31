'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'

const StartInterview = () => {
  const router = useRouter();
  const [jobDescription, setJobDescription] = useState('');
  const [status, setStatus] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setStatus(true);

      const token = localStorage.getItem('token');
      const postData = { jobDescription };
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API}/setUpInterview`,
        postData,
        {
          headers: {
            authorization: token
          }
        }
      );
      localStorage.setItem('interviewid',res.data._id)
      if (res.data) {
        router.push('/interview');
      }
    } catch (error) {
      setStatus(false);

      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex justify-center flex-col md:w-1/2 items-center w-full mx-2'>
      <textarea
        required
        placeholder='Enter your job description'
        className='w-full md:w-10/12 h-28 my-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1 resize-none'
        value={jobDescription}
        onChange={e => setJobDescription(e.target.value)}
      />
      {status ? 
       <button type='submit' className='bg-gray-400 py-3 rounded-md m-2 font-bold text-white md:w-1/3 px-2'>Pleace wait ..</button>
      :
      <button type='submit' className='bg-blue-400 py-3 rounded-md m-2 font-bold text-white md:w-1/3 px-2'>Start Interview</button>

    }
    </form>
  );
}

export default StartInterview;
