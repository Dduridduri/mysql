'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';


interface editProps{
  params : {
    id: string;
  }
}

interface PostList {
  id : number;
  title :string;
  content : string;
  author: string;
  date: string;
  count: number
}

export default function Edit(props:editProps){
  const [postData, setPostData] = useState({ title: '', content: '' });
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [userName, setUserName] = useState('');
  // const [error, setError] =useState(null)
  const params = useParams();

    useEffect(()=>{
      const fetchData = async () => {

          const res = await fetch(`/api/post/${params.id}`);
          const data = await res.json();
 
            setPostTitle(data.data[0].title);
            setPostContent(data.data[0].content);

      }
      fetchData();
    },[params.id])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement;
      if (target.name === "title") {
        setPostTitle(target.value);
      } else if (target.name === "content") {
        setPostContent(target.value);
      } 
    };

    const submitEvent = async (e: React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      try {
        const res = await fetch(`/api/edit/${params.id}`,{
          method: 'POST',
          headers:{
            'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            title: postTitle,
            content: postContent,
          }),
        })
        if(res.ok){
          const result = await res.json();
          console.log(result);
          alert('수정이 완료되었습니다.');
          window.location.href = '/';
        }else{
          const errorData = await res.json();
          console.log(errorData.error);
        }
        
      } catch (error) {
        console.log(error)
      }
    }

  // console.log(props.params.id)

  // const [results] = await db.query<RowDataPacket[]>('select * from dduridduri.board where id = ?',[props.params.id])
  // console.log(results[0].content)

  // 'update 테이블명 set 필드=변경값, 필드=변경값, where id = 변경할아이디'
  // ('update test.board set title=? , content=? where id = ?',[title, content, id])


  return(
    <>
  
        <div className="w-4/5 mx-auto">
          <h3 className='text-4xl font-bold'>게시글 수정</h3>
          <form method="POST" onSubmit={submitEvent}>
            <div className="flex justify-end">
              <input type="text" name="name" defaultValue={userName} className="shadow text-gray-700 text-sm mb-2 border"/>
            </div>
            <div className="flex justify-between flex-wrap">
              <p>제목</p><input type="text" name="title" value={postTitle} onChange={handleChange} className="shadow text-gray-700 text-sm mb-2 border basis-full h-10"/>
            </div>
            <p>내용</p><textarea name="content" value={postContent} onChange={handleChange} className="shadow text-gray-700 text-sm mb-2 border w-full h-40"></textarea>
            <div className="flex justify-end">
              <Link href="/" className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none inline-block'>취소</Link>
              <button className='bg-pink-400 text-white px-4 py-2 rounded shadow-md hover:bg-pink-600 focus:outline-none ml-4' >수정</button>
            </div>
          </form>
       </div>

      
  
    </>
  )
}


function NotData(){
  return(
    <>
      <p>데이터없음</p>
      <Link href='/'>목록으로</Link>
    </>
  )
}











