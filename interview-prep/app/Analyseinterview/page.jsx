'use client';

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

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
          Authorization: token
        }
      });
      setData(res.data.data);
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
    return <h1>Loading...</h1>;
  }

  return (
    <div className='bg-black text-white min-h-screen q'>
      {data && data.map((item, index) => (
        <div key={index} className='flex justify-start items-center'>
          <div className=' '>
            <svg className=' -rotate-90'>
              <circle className='text-slate-400' stroke='currentColor' strokeWidth='4' cx='50%' cy='50%' r='48' fill='transparent' />
              <circle cx='50%' cy='50%' r='48' stroke='currentColor' strokeLinecap='round' strokeWidth='4' fill='transparent'
                className='text-orange-500 transition-all duration-500'
                style={{ strokeDasharray: 302, strokeDashoffset: 302 - (item.rating  / 10) * 302 }}
              />
            </svg>
          </div>
          <p>
          {
  item.feedback.split('-').slice(1).map((part, index) => (
    <span key={index + 1}>{index + 1} {part}<br/></span>
  ))
}

</p>     </div>
      ))}
    </div>
  );
};

export default Page;
