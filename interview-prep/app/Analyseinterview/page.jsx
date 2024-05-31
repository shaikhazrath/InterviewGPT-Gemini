'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
const page = () => {
  const [data,setData]= useState(null)
  const [loading,setLoading] = useState(false)

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

  
  const getAnalysis=async()=>{
    try {
      setLoading(true)
      const token = localStorage.getItem('token');
      const interviewid = localStorage.getItem('interviewid');
      const res =await  axios.get(`${process.env.NEXT_PUBLIC_API}/getAnalysis?id=${interviewid}`, {
        headers: {
          Authorization: token
        }
      })
      setData(res.data.data)
      console.log(res.data.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  useEffect(()=>{
    getAnalysis()
  },[])
  if(loading){
    return <h1>loading....</h1>
  }
    
  return (
    <div>
      {data &&  
        data.map((i, index) => (
          <div key={index}>
          <h1>{i.rating}</h1>
          <h1>{i.feedback}</h1>
          </div>  
        ))
      } 
    </div>
  );
}

export default page