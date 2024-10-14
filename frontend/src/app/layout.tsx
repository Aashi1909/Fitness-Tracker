import Navbar from '@/components/Navbar/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { UserProvider } from '@/components/context/UserContext';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Fitness Tracking',
  description: 'Track your fitness with our App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body className={inter.className}>
        <UserProvider>
          <Navbar />
          {children}
          <ToastContainer />
        </UserProvider>
      </body>
    </html>
  )
}