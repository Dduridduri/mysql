'use client';

import { useCustomSession } from "@/app/sessions";
import Link from "next/link";
import React from "react";

interface propsType{
  results:{
    id:number;
    userid:string;
    title?:string;
    content?:string;
    username?:string;
    count?:number;
    date?:string;
  }
}
const deletePost = async (e:number) =>{
  try {
    const res = await fetch(`/api/delete/`,{
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({id:e})
    })
    if(res.ok){
      const data = await res.json();
      console.log(data.message);
      alert('삭제되었습니다.');
      window.location.href = '/';
    }else{
      const errorData = await res.json();
      alert("삭제 실패");
      console.log(errorData.error);
    }
    
  } catch (error) {
    console.log(error)
  }
}

export default function EditDelete({results}: propsType){
  const {data:session} = useCustomSession();
  return(
    <React.Fragment>
      {
      session && session.user && (
        (results && results && session.user.email === results.userid) || session.user.level === 10
      ) && <>
          <Link href={`/`} className="bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-red-400'">수정</Link>
          <button className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-red-400' onClick={()=>{deletePost(results.id)}}>삭제</button> 
          {/* <Link href={`/api/delete/${results.id}`} className="bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-red-400'">삭제</Link> */}


          {/* <button className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-red-400'><Link href={`/edit/${params.id}`} >수정</Link></button>  */}
          {/* <button className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-red-400' onClick={()=>{deletePost(results.id)}}>삭제</button>  */}
          </> 
       }   
    </React.Fragment>
  )
}