import { NextRequest, NextResponse } from "next/server";
import db from '@/db'
import { RowDataPacket } from "mysql2";

interface PostNumber{
  id:number
  pathUrl?:string;
}

export const POST = async (req:NextRequest) : Promise<NextResponse> =>{

  if(req.method === 'POST'){
    const {id,pathUrl}:PostNumber = JSON.parse(await req.text());
    try {      

      if(!id){
        return NextResponse.json({message:"데이터가 없습니다."})
      }
      if(pathUrl === 'member'){
        const [chkMember] = await db.query<RowDataPacket[]>('select level from dduridduri.member where id =?', [id]);
        console.log(chkMember[0])
        if(chkMember[0].level === 10){
          return NextResponse.json({message:"관리자는 삭제할 수 없습니다."})
        }else{
          await db.query<RowDataPacket[]>('delete from dduridduri.member where id =?', [id]);
          return NextResponse.json({message:"정상적으로 삭제되었습니다."})
        }
      } else{
        await db.query('DELETE FROM board where id = ?', [id])
        return NextResponse.json({message:id})
      }
      
    } catch (error) {
      return NextResponse.json({error:"error"})
    }
  }else{
    return NextResponse.json({error:"정상적인 데이터가 아닙니다."})
  }

}