"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import GoogleAuthComponent from '../components/GoogleAuthComponent'
import axios from "axios";
import StartInterview from '../components/StartInterview'
import { FaLinkedin ,FaSquareXTwitter} from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";
import { BackgroundGradientAnimation } from "../components/ui/background-gradient-animation";


export default function Home() {
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {

    const chechAuth = async () => {
      const token = localStorage.getItem('token')
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API}/user/checkauth`, {
          headers: {
            authorization: token
          }

        })
        setAuthenticated(true)
      } catch (error) {
        console.log(error)
        setAuthenticated(false)
      }
    }

    chechAuth()

  }, [])


  return (
<div className="min-h-screen bg-black">
  <nav className="flex justify-between items-center bg-black p-5 shadow-md">
    <Link href="/" className="text-xl font-bold text-white">
      Interview-Prep  <span className=" text-sm font-thin border-2 p-1 rounded-2xl border-slate-800"> beta v1</span>
    </Link>
    <div className="md:gap-10 gap-2 text-sm font-normal hidden md:flex">
      <Link href="#how-it-works" className="">
        <h1 className="text-white">
        How it works
        </h1>
      </Link>
      <Link href="#contact" className="">
      <h1 className="text-white">
      Contact
              </h1>
      </Link>
    </div>
  </nav>

  <header className="flex flex-col items-center text-center py-16 bg-black text-white ">
    <h1 className="md:text-5xl text-3xl font-extrabold leading-tight">
      Ace Your Job Interview with 
      <br />
     <span className=" text-purple-500">
      AI Assistance
      </span> 
    </h1>
    <p className="md:text-xl text-base mt-4 max-w-2xl">
      Get personalized interview questions and detailed feedback to boost your confidence and performance.
    </p> 
    <p className="w-max py-1 text-center border-b-4 rounded- border-purple-500 ">Made with Gemini Ai</p>
    <div className="mt-8 w-full flex justify-center">
      {authenticated ? (
        <div className="w-full md:w-screen">
          <StartInterview />
        </div>
      ) : (
        <GoogleAuthComponent />
      )}
    </div>
  </header>
  <section id="how-it-works" className="py-16  bg-black text-white ">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-3xl font-bold text-center mb-8">How It Works</h2>
      <div className="space-y-12">
      <div className="flex flex-col md:flex-row items-center">
  <div className="md:w-1/2 md:order-2 md:pl-8 mb-6 md:mb-0">
    <h3 className="text-2xl font-semibold mb-2">Step 1: Share Your Job Description</h3>
    <p className="text-lg">
      Provide your job description from online platforms like LinkedIn or other sources.
    </p>
  </div>
  <div className="md:w-1/2 md:order-1 flex justify-center">
    <img src="/images/step0.png" alt="Record Audio Responses" className="w-auto h-64 rounded-md"/>
  </div>
</div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Step 2: Generate Interview Questions</h3>
            <p className="text-lg text-gray-300 ">
              Based on the given job description, our AI generates a list of potential interview questions to help you prepare effectively.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/images/step1.png" alt="Generate Interview Questions" className="w-auto h-64 rounded-md"/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:order-2 md:pl-8 mb-6 md:mb-0">
            <h3 className="text-2xl font-semibold mb-2">Step 3: Record Audio Responses</h3>
            <p className="text-lg   ">
              Use your microphone to record your responses to the interview questions. Our AI transcribes your audio responses to text.
            </p>
          </div>
          <div className="md:w-1/2 md:order-1 flex justify-center">
            <img src="/images/step2.jpeg" alt="Record Audio Responses" className="w-auto h-64 rounded-md"/>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-8 mb-6 md:mb-0 ">
            <h3 className="text-2xl font-semibold mb-2">Step 4: Analyze Responses</h3>
            <p className="text-lg text-gray-300 ">
              Our AI analyzes the transcribed responses and provides detailed feedback to help you improve your answers and boost your confidence.
            </p>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <img src="/images/step3.jpg" alt="Analyze Responses" className="w-auto h-64 rounded-md"/>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section id="contact" className="bg-black" >
    <div className="flex justify-center items-center h-full gap-3">
      <h1 className=" text-white ">@shaikhazrathali</h1>
      <Link href='/'>
    <FaLinkedin size={30} color="white" />
      </Link>
      <Link href='/'>
      <FaSquareXTwitter size={30} color="white"/>
      </Link>
      <Link href='/'>
      <AiFillInstagram size={33} color="white" />
      </Link>
    </div>
  </section>

</div>

  );
}
