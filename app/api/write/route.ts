import { NextRequest, NextResponse } from "next/server";
import db from '@/db'
import { RowDataPacket } from "mysql2";


interface PostData{
  userid:string;
  username: string;
  title: string;
  content: string;
}

export const POST = async (req:NextRequest) : Promise<NextResponse> =>{

  if(req.method === 'POST'){
    try {
      
      const {userid, username, title, content}:PostData = JSON.parse(await req.text());
      console.log(userid, username, title,content);
      if(!userid || !username || !title || !content){
        return NextResponse.json({message:"데이터가 없습니다."})

      }else{
        //select -선택
        //insert - 입력
        //delete - 삭제
        //update - 수정
        const [results] = await db.query<RowDataPacket[]>(
          'insert into dduridduri.board (userid, username, title, content) values (?, ?, ?, ?)',[userid, username, title, content]
        )
        return NextResponse.json({message:"성공", result:results})
      }      
    } catch (error) {
      return NextResponse.json({error:"error"})
    }
  }else {
    return NextResponse.json({error:"정상적인 데이터가 아닙니다."})
  }  
 
}