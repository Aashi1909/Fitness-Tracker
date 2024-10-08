
'use client'
import React, {useState} from 'react';
// import './auth.css'
import { ToastContainer, toast } from 'react-toastify';

const SignupPage = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSignUp = async()=>
      {
        try{
        const response = await fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/admin/register', {
        method : 'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password}),
        credentials:'include'
      })
      const data = await response.json()
      if(data.ok){
        toast.success("Admin Registered Succeesful", {
          position: 'top-center',
        })
      }
      else{
        toast.error('Admin Registered Failed',{
          position: 'top-center',


        })
      }
    }catch(error){
      toast.error('Error occured')
    }

    }

  return (
    <div className="formpage">
    <div className="form-card">
      <h2>Sign Up</h2>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleSignUp}>Sign Up</button>
    </div>
  </div>  
)};

export default SignupPage;