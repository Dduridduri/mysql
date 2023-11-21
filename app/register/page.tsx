"use client";

import { signIn } from "next-auth/react";
import React, { useState } from "react";

interface formType{
  email :string;
  password: string;
  name: string;
  nickname: string;
}

// const session =  getServerSession(authOptions)


export default function Register(){
  const [formData, setFormData] = useState<formType>({
    email :'',
    password: '',
    name: '',
    nickname:''
    })
  const [message, setMessage] = useState<string>("")
  const changeEvent = (e: React.ChangeEvent<HTMLInputElement>) =>{
    setFormData({
      ...formData, [e.target.name] : e.target.value
    })
    console.log(formData)
  }
  const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    try {
      const res = await fetch('/api/auth/signup',{
        method: 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok){
        const data = await res.json();
        const result = data.data;
          if (data.message === '성공'){
            alert('회원가입이 완료되었습니다.');
            // window.location.href='/';
            signIn('credentials',{
              email : result.email,
              password: result.password,
              callbackUrl:"/"
            })
          }
        console.log(data)
        setMessage(data.message)
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  return(
    <>
    <div className="border w-1/2 mx-auto ">   
      <h3 className="text-2xl">회원가입 페이지</h3>
      <form onSubmit={submitEvent} method="POST" className=" w-1/2 mx-auto ">
        <p className="font-bold">이메일</p><input onChange={changeEvent} type="text" placeholder="이메일" name="email" className="mb-2 border" required /><br />
        <p className="font-bold">비밀번호</p><input onChange={changeEvent} type="password" placeholder="비밀번호" name="password" className="mb-2 border" required /><br />
        <p className="font-bold">이름</p><input onChange={changeEvent} type="text" placeholder="이름" name="name" className="mb-2 border" required /><br />
        <p className="font-bold">닉네임</p><input onChange={changeEvent} type="text" placeholder="닉네임" name="nickname" className="mb-2 border" required /><br />
        <button type="submit" className="bg-[#007bff] text-white w-1/2">가입</button>
      </form>
      <p>{message}</p>
    </div> 
    </>
  )
}