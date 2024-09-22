"use client"
import React from 'react'
import fitpulselogo from '@/assets/logo.png'
import {IoIosBody} from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'
import AuthPopup from '../AuthPopup/AuthPopup'


const Navbar = () => {
  const [isLoggedIn, setIsLogegdIn]  = React.useState<boolean>(false)

  const [showpopup, setShowPopup] = React.useState<boolean>(false)
  return (
    <nav>
      <Image src={fitpulselogo} alt="logo" />
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/profile'}><IoIosBody/></Link>
      {
        isLoggedIn?
        <button>Logout</button>
        :
        <button onClick={() =>{
          setShowPopup(true)
        }}>Login</button>
      }
      {showpopup && <AuthPopup />
      }
    </nav>
  )
}

export default Navbar
