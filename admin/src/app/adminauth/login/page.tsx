
'use client'
import React, {useState} from 'react';
// import './auth.css'
import { ToastContainer, toast } from 'react-toastify';

const SigninPage = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const handleLogin = async()=>
      {
        try{
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/login', {
        method : 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({email, password}),
        credentials:'include'
      })

      if(response.ok){
        const data = await response.json()
        console.log(data, "datatta")
        toast.success("Admin Login Succeesful", {
          position: 'top-center',
        })
        window.location.href = '/pages/addworkout'
      }
      else{
        toast.error('Admin Login Failed',{
          position: 'top-center',


        })
      }
    }catch(error){
      toast.error('Error occured')
    }

    }

  return (
  <div className='formpage'>
    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
    <button onClick={handleLogin}>Login</button>

  </div>
)};

export default SigninPage;