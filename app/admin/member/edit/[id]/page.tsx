'use client';

import Link from "next/link";
import React, { useEffect, useState } from "react";

interface userType{
  email: string;
  password? : string;
  name: string;
  nickname: string;
  level: number;
  type: string;
  id: number;
}

export default function MemberEdit({params}:{params : {id:number}}){
  const [userData, setUserData] = useState<userType>();

  useEffect(()=>{
    const fetchData = async () =>{
      try {
        const res = await fetch('/api/admin', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ 
        pathUrl: 'edit',
        id: params.id 
      })
    })
    if(res.ok){
      const result = await res.json();
      const data = result.data;
      if(data.length < 1){
        alert("데이터가 없습니다.");
        window.location.href = "/admin/member"
      }
      console.log(data[0])
      setUserData(data[0])      
    }
      } catch (error) {
        alert(error);
      }
    }
    fetchData()
  },[params.id])
    
    const [formData, setFormData] = useState<userType>({
      email : userData? userData.email : "",
      password : userData? userData.password : "",
      name : userData? userData.name : "",
      nickname : userData? userData.nickname : "",
      level : userData? userData.level : 2,
      type: 'edit',
      id: params.id
    })
    useEffect(()=>{
      setFormData({
        email : userData? userData.email : "",
        password : userData? userData.password : "",
        name : userData? userData.name : "",
        nickname : userData? userData.nickname : "",
        level : userData? userData.level : 2,
        type: 'edit',
        id: params.id
      })
    },[userData, params.id])

    const changeEvent = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>{
      setFormData({
        ...formData, [e.target.name] : e.target.value
      })
    }
    const submitEvent = async() =>{
     try {
      const res = await fetch('/api/auth/signup', {
      cache: 'no-cache',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    if(res.ok){
      const result = await res.json();
      const data = result.data;
      if(result.message === '성공'){
        alert(data + "님의 정보를 수정 하였습니다.");
        window.location.href = "/admin/member"
      }
     }      
     } catch (error) {
      alert(error)
     } 
    }


  return(
    <>
      <div className="widget w-full overflow-hidden mb-5 py-4">
        <h3>회원 수정</h3>
      </div>
      <div className="widget w-full overflow-hidden mb-5 py-4">
        <div className="flex mb-4 items-center">
          <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이메일 : </label>
          <input type="text" name="email" defaultValue={userData && userData?.email} className="border text-sm p-2 rounded-md"/>
        </div>
        <div className="flex mb-4 items-center">
          <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">비밀번호 : </label>
          <input type="password" name="password" onChange={changeEvent} className="border text-sm p-2 rounded-md"/>
        </div>
        <div className="flex mb-4 items-center">
          <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">이름 : </label>
          <input type="text" name="name" defaultValue={userData && userData?.name} onChange={changeEvent} className="border text-sm p-2 rounded-md"/>
        </div>
        <div className="flex mb-4 items-center">
          <label htmlFor="email" className="basis-3/12 text-xs sm:text-sm">닉네임 : </label>
          <input type="text" name="nickname" defaultValue={userData && userData?.nickname} onChange={changeEvent} className="border text-sm p-2 rounded-md"/>
        </div>
        <div className="flex mb-4 items-center">
          <label htmlFor="level" className="basis-3/12 text-xs sm:text-sm">레벨 : </label>
          <select name="level" value={`${userData?.level}`} onChange={changeEvent} className="border text-sm px-5 py-2 rounded-md">
            {
              Array(8).fill(null).map((_,i)=>{
                return(                  
                  <option value={i+2} key={i}>{i+2}</option>
                )
              })
            }  
          </select>          
        </div>
      </div>
      <div className="flex justify-end gap-x-5">
        <Link href='/admin/member' className=" bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600">취소</Link>
        <button onClick={submitEvent} className="bg-orange-500 text-white px-4 py-2 rounded shadow-md hover:bg-orange-600">수정</button>
      </div>
      <div className="flex justify-end mt-5">
        <Link href='/admin/member/add' className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:to-blue-600">
          회원추가
        </Link>
      </div>
    </>
  )
}