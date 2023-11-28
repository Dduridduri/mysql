import db from '@/db'
import { RowDataPacket } from 'mysql2';
import Link from 'next/dist/client/link';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import Comment from '@/app/components/comment';
import EditDelete from './editDelete';

interface userInfo{
  use:{
    name:string;
    email?:string;
    image?:string;
    level?:number;
  }
}
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

async function Getip(){
  const res = await fetch('http://localhost:3000/api/get-ip');
  const data = res.json();
  if(!res.ok){
    alert("에러가 발생하였습니다.");
    return;
  }
  return data;
}

export default async function Detail({
  params
}:{
  params?: {id?:number}
}){
  const getIp = await Getip();
  const userIp = getIp.data.ip;
  console.log(userIp)
  const postId = params?.id !== undefined ? params.id : 1;
  const [results] = await db.query<RowDataPacket[]>('select * from dduridduri.board where id = ?', [postId])
  const post = results && results[0]
  let session = await getServerSession(authOptions) as userInfo;
  const [countResult] = await db.query<RowDataPacket[]>('select count(*) as cnt from dduridduri.view_log where postid=? and ip_address = ?', [postId,userIp]);
  const totalCnt = countResult[0].cnt;
  console.log(totalCnt)
  if(results.length > 0){
    if(totalCnt === 0){
      await db.query<RowDataPacket[]>('update dduridduri.board set count = count + 1 where id = ?' , [postId]) 
    }
    await db.query<RowDataPacket[]>('insert into dduridduri.view_log (postid, ip_address, view_date) select ?, ?, NOW() where not exists (select 1 from dduridduri.view_log where postid = ? and ip_address = ? and view_date > now() - interval 24 hour)',[postId, userIp, postId, userIp])

    //select 1 존재여부를 확인하기 위해 사용 > 1이라는건 상수값으로 실제데이터는 중요x , 존재여부를 확인하기 위함
    //내가 원하는 테이블에서 어떠한 조건 즉 and 까지 포함한 3가지 조건이 모두 충족하는 조건을 찾는다.
    //어떠한 행도 반환하지 않을때만 참이 된다. 즉 3가지 조건이 모두 참일때 혹은 데이터가 없을때 쿼리가 실행
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
        console.log(errorData.error);
      }
      
    } catch (error) {
      console.log(error)
    }
  }


  return(
    <>  
    {
      results.length > 0 && (
        <>
          <div className="w-4/5 mx-auto ">
            <h3 className="text-5xl font-bold">게시글</h3>
            <div className="flex justify-center border-b-2 mt-10 font-semibold text-2xl">
              <p>{post?.title}</p>
            </div>
              <p className="text-right">닉네임:{post && post[0]?.username}</p>
          <div className="border-2 mt-10 h-80">
            <p> {post?.content} </p>          
          </div>
          <div className="flex justify-between mt-8">
            {/* <div>
              <button className='bg-pink-400 text-white px-4 py-2 rounded shadow-md hover:bg-pink-600 focus:outline-none mr-4'>
                <Link href={`/edit/${params.id}`} >수정</Link></button>
              <button onClick={()=>{deletePost(post[0].id)}} className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none inline-block'> 삭제</button>     
            </div>             */}
            <Link href="/" className='bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-600 focus:outline-none inline-block'>목록</Link>
          </div> 
            <p>제목 : {post?.title}</p>
            <p>내용 : {post?.content}</p>
            <p>조회수 : {post?.count}</p>      
            {
              session ? <Comment id={post?.id}/> : <p className="block border p-4 text-center my-5 rounded-md"><Link href="/login">로그인 이후 댓글 작성할 수 있습니다.</Link></p>
            }
          </div>
          <EditDelete results={post as propsType['results']}/>       
        </>
      )
    }
    {/* {
      session && session.user && (
        (post && post[0] && session.user.email === post[0].userid) || session.user.level === 10
      ) && <>
          <button className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-red-400'><Link href={`/edit/${params.id}`} >수정</Link></button> 
          <button className='bg-pink-300 text-white px-4 py-2 rounded shadow-md hover:bg-red-400' onClick={()=>{deletePost(post[0].id)}}>삭제</button> 
          </> 
    } */}

    </>
  )
}
