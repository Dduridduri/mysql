'use client'
export default function Login(){
  const redirecTo = () =>{
    sessionStorage.setItem('preUrl',window.location.href);
    window.location.href='/login';
  }
  return(
    <button onClick={redirecTo}>로그인</button>
  )
}