import React from 'react'
import fitpulselogo from '@/assets/logo.png'
import {IoIosBody} from 'react-icons/io'
import './Navbar.css'
import Image from 'next/image'
import Link from 'next/link'


const Navbar = () => {
  return (
    <nav>
      <Image src={fitpulselogo} alt="logo" />
      <Link href={'/'}>Home</Link>
      <Link href={'/about'}>About</Link>
      <Link href={'/profile'}><IoIosBody/></Link>
      <button>Logout</button>
    </nav>
  )
}

export default Navbar
