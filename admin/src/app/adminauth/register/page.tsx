
'use client'
import React, {useState} from 'react';
import './auth.css'
import { ToastContainer, toast } from 'react-toastify';

const SignupPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async()=>
      {
      const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/register', {
        method : 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password}),
        credentials:'include'
      })
      if(response.ok){
        const data = await response.json()
        console.log(data, "datatta")
        toast.success("Admin Registered Succeesful", {
          position: toast.POSITION.TOP_CENTER,
        })
      }
      else{
        toast.error('Admin Registered Failed',{
          position: toast.POSITION.TOP_CENTER

        })
      }

    }

  return (
  <div className='formpage'>
    <input type='text' placeholder='Name' value={name} onChange={(e) => setName(e.target.value)} />
    <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
    <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
    <button onClick={handleSignUp}>SignUp</button>

  </div>
)};

export default SignupPage;