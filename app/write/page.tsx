'use client';
import Link from "next/link";
import { useEffect, useState } from "react";
import {useSession} from 'next-auth/react'
import { useCustomSession } from "../sessions";

interface formType {
  userid:string;
  username:string,
  title: string,
  content: string
}

export default function Write(){
  const {data:session} = useCustomSession();
  const [formData, setFormData] = useState<formType>({
    userid:session?.user?.email ?? '',
    username:session?.user?.name ?? '',
    title:'',
    content:'',
      });

  useEffect(()=>{
        setFormData({
          userid:session?.user.email ?? '',
          username: session?.user.name ?? '',
          title:'',
          content:'',
        })
    },[session?.user.name, session?.user.email])

  const changeEvent = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>{
    setFormData({...formData, [e.target.name] : e.target.value});
    console.log(formData)
  }
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    try {
      const res = await fetch('/api/write',{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok){
        const data = await res.json();
        console.log(data.message);
        alert('정상적으로 등록 하였습니다.');
        window.location.href = '/';
      }else{
        const errorData = await res.json();
        console.log(errorData.error);
      }
      
    } catch (error) {
      console.log(error)
    }
  }

  return(
    <>
      <div className="w-4/5 mx-auto">
        <form method="post" onSubmit={submitEvent}>
          <div className="flex justify-end">
            <input type="text" name="name" value={`작성자 : ${session && session.user.name}`} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border"/>
          </div>
          <div className="flex justify-between flex-wrap">
            <input placeholder="제목을 입력하세요." type="text" name="title" value={formData.title} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border basis-full h-10"/>
          </div>

          <div>
            <textarea placeholder="내용을 입력하세요" name="content" value={formData.content} onChange={changeEvent} className="shadow text-gray-700 text-sm mb-2 border w-full h-40"></textarea>
          </div>
          <div className="flex justify-end">
            <button className='bg-pink-400 text-white px-4 py-2 rounded shadow-md hover:bg-pink-600 focus:outline-none mr-4'>등록</button>
            <Link href="/" className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none inline-block'>취소</Link>
          </div>
        </form>
      </div>

    </>
  )
}