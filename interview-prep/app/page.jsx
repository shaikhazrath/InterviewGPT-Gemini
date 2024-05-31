"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import GoogleAuthComponent from '../components/GoogleAuthComponent'
import axios from "axios";
import StartInterview from '../components/StartInterview'
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

    <div className="">
      <div>
        <nav className="flex justify-around  text-base font-semibold uppercase m-2">
          <Link href='/'>
            <h1>Interview-prep</h1>
          </Link>
          <div className="flex gap-10">
            <h1>About us</h1>
            <h1>Contact</h1>
          </div>
        </nav>
        <h1 className=" md:text-[5rem] text-[2rem] font-extrabold text-center pt-16">
          The
          <br />
          Virtual Interview
        </h1>
        {authenticated ?
        <div className="flex justify-center">
      <StartInterview/>
        </div>
          : <GoogleAuthComponent />
        }
      </div>
    </div>
  );
}
