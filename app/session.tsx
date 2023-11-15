'use client';

import { SessionProvider } from "next-auth/react";

interface props {
  children: React.ReactNode
}

export default function AuthSession({children} : props){
  return <SessionProvider>{children}</SessionProvider>
}