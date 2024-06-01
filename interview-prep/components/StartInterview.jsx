'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState, useEffect } from 'react'
import { BsStars } from "react-icons/bs";

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
      localStorage.setItem('interviewid', res.data._id);
      if (res.data) {
        router.push('/interview');
      }
    } catch (error) {
      setStatus(false);
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center w-full md:w-3/4 lg:w-1/2 mx-auto px-2">
    <textarea
      required
      placeholder="Enter your job description"
      className="w-full h-28 my-2 p-2 rounded-md border-2 bg-gray-950 shadow-sm shadow-purple-900 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none text-white border-purple-900"
      value={jobDescription}
      onChange={e => setJobDescription(e.target.value)}
    />

    <button 
  type="submit" 
  className={`py-3 rounded-3xl m-2 p-5 font-semibold text-white w-full md:w-1/4
              ${status ? 'bg-gray-400 hover:bg-gray-500 ' : ' border-purple-900 border-2 bg-gradient-to-r from-purple-400 to-purple-600 hover:bg-gradient-to-r hover:from-purple-500 hover:to-purple-400'}
              shadow-md transition duration-300 flex gap-1 justify-center items-center
             
             `}
  disabled={status}
>
  {status ? 
  <h1>
  Please wait ...

  </h1>
  
  
  : 
  <div className=' flex justify-between gap-2 items-center'>
    <h1>Start Interview</h1>
  <BsStars className=' bg-transparent' />

  </div>
  }

</button>
  </form>
  
  );
}

export default StartInterview;
