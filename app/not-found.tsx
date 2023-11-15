import {headers} from 'next/headers';


export default async function NotFound(){
  const headerList = headers()
  const domain = headerList.get('referer');

  // const date = new Date(commit)
  // date.setHours(date.getHours() +9)
  // const year = date.getFullYear();
  // const month = date.getMonth()+1;
  // const day = date.getDate()

  // const commitDay = day < 10 ? `0${day}`: day
  // const commitMonth = month < 10 ? `0${month} : month

  //const commitDate = `${year}`-`${month}`-`${day}`

  return(
    <>
      <div className="w-full min-h-screen bg-black">
        <h1 className="text-9xl text-red-500 text-center items-center">NOT FOUND</h1>
        <p className='text-5xl text-red-500 text-center'>입력하신 {domain} 없는 페이지 입니다.</p>
      </div>
    </>
  )
}