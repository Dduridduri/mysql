import { getServerSession } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { authOptions } from "../api/auth/[...nextauth]/route";
import Logout from "./logout";

interface userInfo {
  user:{
    name:string;
    email?:string;
    image?:string;
    level?:number;

  }
}



export default async function Nav(){
  const session = await getServerSession(authOptions) as userInfo
  // const {data:session, status} =useCustomSession();
  const redirectTo =()=>{
    sessionStorage.setItem('preUrl', window.location.href);
    window.location.href ="/login"
  }
  return(
    <>
    { session && session.user?.level === 10 ?
      '관리자'
       : 
      session && session.user?.level !== null && '일반회원' }
      {/* {console.log(session && session.user)} */}
      {'loading' && session && session.user ? 
      <>
      <p>{session && session.user?.name}님 반갑습니다.</p>
      <Logout/>
      </>
      :
      <>   
       <Link href='/register'>회원가입</Link>
       <Link href='/login' >로그인</Link>
       {/* <button onClick={()=>{signIn('kakao')}}>카카오로그인</button>
       <button onClick={()=>{signIn('naver')}}>네이버로그인</button>
       <button onClick={()=>{signIn('github')}}>깃허브로그인</button>
       <button onClick={()=>{signIn('google')}}>구글로그인</button>
       <button onClick={()=>{signIn('credential')}}>메일로그인</button> */}
      </>
       }
    </>
    
   
    
  )
}