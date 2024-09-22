import React from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Input from '@mui/joy/Input'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';

const AuthPopup = () => {
    const[showSignup, setShowSignup] = React.useState<boolean>(false)

    const handleLogin =() =>{

    }
    const handleSignUp =() =>{

    }

  return (
    <div className='popup'>
        {
            showSignup?(
                <div className='authform'>
                <div className='left'>
                    <div className='left_content'>
                    <Image src ={logo} alt="logo" />
                    <p style={{color: '#ffc20e'}}><strong style={{color: 'white'}}>Join the movement!</strong><br /><br/>Sign up today to unlock access to personalized workout plans that inspires you to achieve your fitness goals.</p>
                    </div>
                </div>
                <div className='right'>
                    <h1>SignUp to become a Freak!</h1>
                    <form action="">
                        <Input color="warning" placeholder = "Email" size ="lg" variant="outlined" />
                        <Input color="warning" placeholder = "Password" size ="lg" variant="outlined" type='password'/>
                        <div className='form_input_leftright'>
                        <Input color="warning" placeholder = "Age" size ="lg" variant="outlined" type='number'/>
                        <Input color="warning" placeholder = "Weight" size ="lg" variant="outlined" type='number'/>
                        </div>
                    <Select color ="warning" placeholder="Gender" size="lg" variant="outlined">
                    <Option value="male">Male</Option>
                    <Option value="female">Female</Option>
                    <Option value="other">Other</Option>
                    </Select>
                    <br />

                    <label htmlFor=''>Height</label>
                    <div className='form-input-leftright'>
                    <Input color="warning" placeholder = "ft" size ="lg" variant="outlined" type='number'/>
                    <Input color="warning" placeholder = "in" size ="lg" variant="outlined" type='number'/>
                    </div>
                        
                        <button onClick={() =>{
                            handleSignUp()}}>SignUp</button>
                    </form>
                    <p>Already have an account? <button onClick={() => setShowSignup(false)}>Login</button></p>


                </div>
                
            </div>
            ):(
                <div className='authform'>
                    <div className='left'>
                    <div className='left_content'>
                        <Image src ={logo} alt="logo" />
                        <p style={{color:'#ffc20e'}}><strong style={{color:'white'}}>Welcome Back!</strong><br/><br /> Log in to access personalized training plans and track your progres.</p>
                    </div>
                    </div>
                    <div className='right'>
                        <h1>Login to become a Freak!</h1>
                        <form action="">
                            <Input color="warning" placeholder = "Email" size ="lg" variant="outlined" />
                            <Input color="warning" placeholder = "Password" size ="lg" variant="outlined" type='password'/>
                            <button onClick={handleLogin}>Login</button>
                        </form>
                        <p>Don't have an account? <button onClick={() => setShowSignup(true)}>Signup</button></p>
                    </div>
                </div>
            )
        }
      
    </div>
  )
}

export default AuthPopup
