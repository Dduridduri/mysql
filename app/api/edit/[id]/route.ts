import { NextRequest, NextResponse } from "next/server";
import db from '@/db'
import { RowDataPacket } from "mysql2";

interface PostNumber{
  id:number
}

export const POST = async (req:NextRequest) : Promise<NextResponse> =>{

  if (req.method === 'POST') {
    try {     
      const pathname = req.nextUrl.pathname;
      const postId = pathname.split('/').pop();
      console.log(postId)
      
      const { title, content }: { title: string; content: string; } = JSON.parse(await req.text());

      if (!postId || !title || !content) {
        return NextResponse.json({ message: "데이터가 없습니다." });
      } else {        
        const [results] = await db.query<RowDataPacket[]>(
          'UPDATE dduridduri.board SET title = ?, content = ? WHERE id = ?', [title, content, postId]
        );
        console.log(results)
        return NextResponse.json({ message: "수정 성공", result: results });
      }
    } catch (error) {
      return NextResponse.json({ error: "error" });
    }
  }else{
    return NextResponse.json({error:"정상적인 데이터가 아닙니다."})
  }
}