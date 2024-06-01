'use client'
import React, { useEffect, useState } from 'react';
import AudioInputComponent from '../../components/AudioInputComponent';
import Webcam from 'react-webcam';
import axios from 'axios';
import { useRouter } from 'next/navigation.js';
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";

const Page = () => {
  const [question, setQuestion] = useState('');
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [processing ,setProcessing] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      try {
        await axios.get(`${process.env.NEXT_PUBLIC_API}/user/checkauth`, {
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
      setQuestion('');
      setProcessing(true)
      const token = localStorage.getItem('token');
      const interviewid = localStorage.getItem('interviewid');
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/getquestions?id=${interviewid}`, {
        headers: {
          Authorization: token
        }
      });
      if (res.data === 'interview completed') {
        router.push('/Analyseinterview');
      } else {
        setQuestion(res.data.question);
        setProcessing(false)
      }
    } catch (error) {
      setQuestion('');
      setProcessing(false)
      console.log(error);
    }
  };

  const submitAnswer = async (Answer) => {
    try {
      const token = localStorage.getItem('token');
      const interviewid = localStorage.getItem('interviewid');
      await axios.post(`${process.env.NEXT_PUBLIC_API}/upload`, { Answer, interviewid }, {
        headers: {
          Authorization: token
        }
      });
      getQuestion();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getQuestion();
  }, []);

  const toggleWebcam = () => {
    setIsWebcamOn(!isWebcamOn);
  };

  return (
    <div className='h-screen bg-black flex justify-around flex-col items-center'>
      <div className='md:px-64 px-10'>
        <h1 className='font-semibold md:font-bold text-xl text-white text-center'>{question}</h1>
      </div>
      <div className='flex flex-col items-center'>
        <AudioInputComponent generatedContent={question} GetQuestion={getQuestion} submitAnswer={submitAnswer}  processing={processing}/>
      </div>
    </div>
  );
};

export default Page;


{/* <div className=' flex justify-center relative'>
<div className='  '>
  {isWebcamOn && (
    <Webcam
      audio={false}
      screenshotFormat="image/jpeg"
      className='rounded-2xl '
    />
  )}
</div>
<div className='right-1 m-2 top-0 absolute'>
  <button onClick={toggleWebcam} className='mb-4 px-2 bg-black text-white rounded'>
    {isWebcamOn ? < FiCameraOff size={30} color='white' />
      : <FiCamera size={30} color='white' />}
  </button>
</div>
</div> */}