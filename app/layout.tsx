import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Poppins } from 'next/font/google'
const poppins = Poppins({ subsets: ['latin'] ,weight :['400', '700']})
import NavBar from './ components/nav/NavBar'
import Footer from './ components/footer/Footer'

import { ToastBar, Toaster } from 'react-hot-toast'
import { getCurrentUser } from '@/actions/getCurrentUser'

export const metadata: Metadata = {
  title: 'Quảnt lý đề thi',
  description: 'Quản lý đề thi',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();
  console.log("user<<<",currentUser);

  return (
    <html lang="vi">
      <body className={`${poppins.className} 
      text-slate-700`}>
        <Toaster toastOptions={
          {
            style:{background:'rgb(51 65 85)',
          color: '#fff',
        },}}
          />
      
        <div className="flex flex-col min-h-screen">
          <NavBar/>
        <main className="flex-grow ">{children}</main>
        <Footer/>
        </div>
       
      </body>
    </html>
  )
}
