import { NextRequest, NextResponse } from "next/server";
import db from '@/db'

interface PostNumber{
  id:number
}

export const POST = async (req:NextRequest) : Promise<NextResponse> =>{

  if(req.method === 'POST'){
    try {      
      const {id}:PostNumber = JSON.parse(await req.text());
      console.log(id);
      if(!id){
        return NextResponse.json({message:"데이터가 없습니다."})
      }else{
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