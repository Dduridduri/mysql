import db from '@/db';
import { NextRequest, NextResponse} from 'next/server';
import { RowDataPacket } from 'mysql2/promise';

export const GET = async (req:NextRequest) : Promise<NextResponse> =>{
  const pathname = req.nextUrl.pathname;
  //내가 접속한 페이지
  const postId = pathname.split('/').pop();
  const [results] = await db.query<RowDataPacket[]>('SELECT * FROM dduridduri.board where id = ?', [postId]);

  return NextResponse.json({data:results})
}

export const POST = async (req:NextRequest) : Promise<NextResponse> =>{

  if(req.method === 'POST'){
    return NextResponse.json({message:"메세지"})
  }else{
    return NextResponse.json({message:"에러"})
  }

}