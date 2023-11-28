import db from '@/db'
import { NextRequest, NextResponse } from 'next/server'
import { RowDataPacket } from 'mysql2/promise'

interface PostType{
  pathUrl ?: string;
  id ?: number;
}

interface MainType{
  totalCnt: number;
  todayCnt: number;
  writeCnt: number;
  commentCnt: number;
  visitCnt: number;
  visitTotalCnt: number;
}

export const POST = async(req:NextRequest) : 
Promise<NextResponse>=>{

  const {pathUrl,id} : PostType = JSON.parse(await req.text());
 
  if(req.method === 'POST'){
    switch(pathUrl){
      case 'member' : 
        const [memberResult] = await db.query<RowDataPacket[]>('select *from dduridduri.member order by date DESC');
        return NextResponse.json({message: "성공" , data:memberResult})
      case 'edit' : 
      const [editResult] = await db.query<RowDataPacket[]>('select *from dduridduri.member where id = ?' , [id]);
      return NextResponse.json({message: "성공" , data:editResult})
      case 'mainCnt' :
        const [totalCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from dduridduri.member ');
        const [todayCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from dduridduri.member where date >= now() - interval 1 day')
        const [writeCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from dduridduri.board where date >= now() - interval 1 day')
        const [commentCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from dduridduri.comment where date >= now() - interval 1 day')
        const [visitCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from dduridduri.visits where visit_time >= now() - interval 1 day')
        const [visitTotalCnt] = await db.query<RowDataPacket[]>('select count(*) as cnt from dduridduri.visits')
        const totalData: MainType = {
          totalCnt:totalCnt[0].cnt ?? 0,
          todayCnt:todayCnt[0].cnt ?? 0,
          writeCnt:writeCnt[0].cnt ?? 0,
          commentCnt:commentCnt[0].cnt ?? 0,
          visitCnt:visitCnt[0].cnt ?? 0,
          visitTotalCnt:visitTotalCnt[0].cnt ?? 0,
        }
        return NextResponse.json({message: "성공" , data:totalData})
      default: 
        return NextResponse.json({message: "에러"})
    }

// switch에선 같은변수 못씀
  }else{
    return NextResponse.json({message: "에러"})
  }
}