'use client';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {useEffect, useState} from 'react'
import Search from './serch';

interface PostList {
  id : number;
  title :string;
  content : string;
  author: string;
  date: string;
  count: number
}

export default function Post() {
  const [posts, setPosts] = useState<PostList[]>([]);
  const [totalCnt, setTotalCnt] = useState<number>(0); 
  const [page, setPage] = useState<number>(1);



  useEffect(()=>{
    const fetchData = async () =>{
      if(!page) return;
      const res = await fetch(`/api/post?page=${page}`);
      const data = await res.json();
      setPosts(data.results)
      console.log(data)
      setTotalCnt(data.totalCnt)
    }
    fetchData()
  },[page])

  const lastPage = Math.ceil(totalCnt / 15);
  const totalPageCnt = 5;
  const startPage = Math.floor((page-1)/totalPageCnt)*totalPageCnt + 1;
  const endPage = Math.min(lastPage, startPage + totalPageCnt - 1);
  const nextPage = () =>{
    const nextStart = Math.ceil((page)/5)*5+1;
    setPage(nextStart)
  }
  const prevPage = () => {
    let prevStart = Math.floor((page-1)/5)*5 - 4;
    prevStart = prevStart <= 1 ? 1 : prevStart; // prevStart가 1 이하이면 1로 설정
    setPage(prevStart);
  }

  return(
    <>
    <div className="mx-auto max-w-7xl p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className='text-2xl font-semibold'>게시판</h1>
        <Link href="/write" className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-white'>글쓰기</Link>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="min-w-full">
          <ul className='bg-gray-100 flex justify-between'>
            <li className="px-6 basis-2/12 py-3 text-center">번호</li>
            <li className="px-6 basis-6/12 py-3 text-center">제목</li>
            <li className="px-6 basis-2/12 py-3 text-center">작성자</li>
            <li className="px-6 basis-2/12 py-3 text-center">작성일</li>            
          </ul>
          {     
      posts && posts.map((e,i)=>{
          const date = new Date(e.date);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2,'0');
          const day = date.getDate().toString().padStart(2,'0');
          const formatDate = `${year}-${month}-${day}`
        return(
          <ul className='flex justify-between' key={i}>
          <li className='px-6 basis-2/12 py-3 text-center'>{posts.length - i}</li>
          <li className='px-6 basis-6/12 py-3 text-center'><Link href={`/post/${e.id}`} >{e.title}</Link></li>
          <li className='px-6 basis-2/12 py-3 text-center'>{e.author}</li>
          <li className='px-6 basis-2/12 py-3 text-center'>{formatDate}</li>
          </ul>
        )
      })
    }
        </div>
      </div>
    </div>


    <div className='flex justify-center gap-x-5'>
    {page >= 1 && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>{prevPage()}}>이전</button>}
    {
      Array(endPage - startPage + 1).fill(null).map((_,i)=>{
        const pageNumber = i + startPage;
        return(
            <>
            <button key={i} className={`${page === pageNumber ? 'bg-pink-300 text-white' : 'bg-white'} border px-1.5 py-1 rounded text-sm basis-8`} onClick={()=>{setPage(pageNumber);}}>{pageNumber}</button>
            </>
          )

      })
    }
    {page <= lastPage && <button className='bg-white border px-1.5 py-1 rounded text-sm' onClick={()=>{nextPage()}}>다음</button>}
    <Search/>
    </div>
    
    </>
    
  )
}