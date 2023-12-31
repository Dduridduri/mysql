import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Login from './components/login'
import AuthSession from './session';
import Nav from './components/nav';
import Visit from './components/etc/visit';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: "/favicon.ico"
  }
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthSession>
          <Visit/>
          <Nav/>
          {children}
        </AuthSession>
      </body>
    </html>
  )
}
//전체 파일을 읽는곳 
