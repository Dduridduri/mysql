/*
const {data:session} =useCustomSession();
const data = {
  id:5,
  name: "홍길동",
  email: "abcd@naver.com "
}
변수 내에 중괄호 {}가 들어가면 구조 분해 할당 (destructuring assignment) > 해당 객체에서 그 속성을 추출해서 새로운 변수로 할당 할때 사용
예)
data.id 를 변수로 따로 저장하고 싶다면
const {id} = data > const id = 5 값이 저장됨
data.id로 사용가능..
*/
'use client';
import { useEffect, useState } from "react";
import { useCustomSession } from "../sessions";
import { useParams } from "next/navigation";

interface CommentProps {
  id:number
}

interface formType {
  parentid : number;
  userid: string;
  username: string;
  content: string;
}
interface CommentType{
  id:number;
  parentid : number;
  userid: string;
  username: string;
  content: string;
  date:string;
}

export default function Comment(props: CommentProps){
  const {id} = props;
 
  const {data:session} = useCustomSession();
  const [formData, setFormData] = useState<formType>({
    parentid : id,
    userid: session?.user?.email ?? '',
    username: session?.user?.name ?? '',
    content:''
  })  
  const [totalComment, SetTotalComment] = useState<CommentType[]>();
  const commentValue = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setFormData({...formData, [e.target.name]:e.target.value});
  }
  // console.log(formData)
  const params = useParams();
  console.log(params)
  useEffect(()=>{
    setFormData({
      parentid : id,
      userid : session?.user?.email ?? '',
      username: session?.user?.name ?? '',
      content:''
    })
  },[session?.user.name, session?.user.email, id])
  useEffect(()=>{
    const fetchData = async ()=>{
      const res = await fetch(`/api/comment?id=${params.id}`)
      const data = await res.json(); 
      console.log(data)
      SetTotalComment(data.result)
    }
    fetchData()
  },[params.id])

  const cmtSubmit = async()=>{
    try {
      const res = await fetch("/api/comment",{
        method: 'POST',
        headers:{
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify(formData)
      })
      if(res.ok){
        const data = await res.json();
        console.log(data)
        SetTotalComment(data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  return(
    <>
    {
      session && session.user &&
      <>
      <p className="text-4xl font-bold py-5">댓글</p>
      {
        totalComment && totalComment.map((e,i)=>{         
            const date = new Date(e.date);            
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2,'0');
            const day = date.getDate().toString().padStart(2,'0');
            const hours = (date.getHours()+9).toString().padStart(2,'0');
            const minutes = date.getMinutes().toString().padStart(2,'0');
            const seconds = date.getSeconds().toString().padStart(2,'0');
            const formatDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
            
          return(
            <>
            <div className="border-b-2 mt-4">
              <div className="flex">
                <img src="https://via.placeholder.com/70" alt="1" className="rounded-full"/>
                <p key={i} className="font-semibold m-5 mt-5">작성자 : {e.username}</p>
              </div>
              <div className="ml-[90px]">
                <p key={i}>{e.content}</p>
                <p className="text-xs">{formatDate}</p>
              </div>
            </div>
            </>
          )
        })
      }
      <div className="flex h-28">        
        <input name='content' type="text" className="border p-2 border-black w-full" onChange={commentValue} />
        <button onClick={cmtSubmit} className="bg-slate-500 basis-1/5">댓글등록</button>
      </div>
      </>
    }
    </>
  )
}