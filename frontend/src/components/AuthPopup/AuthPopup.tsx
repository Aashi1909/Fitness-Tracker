import React from 'react'
import './AuthPopup.css'
import Image from 'next/image'
import logo from '@/assets/logo.png'
import Input from '@mui/joy/Input'
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import { AiOutlineCloseCircle } from "react-icons/ai";
import dayjs from 'dayjs';

import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DesktopDatePicker} from '@mui/x-date-pickers';
import {StaticDatePicker} from '@mui/x-date-pickers/StaticDatePicker';
import { ToastContainer, toast } from 'react-toastify'


interface AuthPopupProps {
    setShowPopup: React.Dispatch<React.SetStateAction<boolean>>
}

interface SignUpFormData{
    name: String | null,
    email: String | null,
    password: String | null,
    weightInKg: Number | null, 
    heightInCm: Number | null,
    goal: String | null,
    gender: String | null,
    dob: Date | null,
    activityLevel: String | null
}
const AuthPopup  : React.FC<AuthPopupProps> = ({setShowPopup}) => {
    const[showSignup, setShowSignup] = React.useState<boolean>(false)
    const[signupformData, setSignUpFormData] = React.useState<SignUpFormData>({
        name: ' ',
        email: ' ',
        password: ' ',
        weightInKg: 0.0, 
        heightInCm: 0.0,
        goal: ' ',
        gender: ' ',
        dob: new Date(),    
        activityLevel: ' '
    })
    const [date, setDate] = React.useState<Date | null>(null);

    const handleLogin =() =>{

    }
    const handleSignUp =() =>{

    }

  return (
    <div className='popup'>
    <div className='authform'>
        <button 
            className='closebtn' 
            onClick={() => { setShowPopup(false); }}
        >
            <AiOutlineCloseCircle />
        </button>

        {showSignup ? (
            <>
                <div className='left'>
                    <div className='left_content'>
                        <Image src={logo} alt="logo" />
                        <p style={{ color: '#ffc20e' }}>
                            <strong style={{ color: 'white' }}>Join the movement!</strong><br /><br />
                            Sign up today to unlock access to personalized workout plans that inspire you to achieve your fitness goals.
                        </p>
                    </div>
                </div>
                <div className='right'>
                    <h1>SignUp to become a Freak!</h1>
                    <form action="">
                        <Input color="warning" placeholder="Email" size="lg" variant="outlined" />
                        <Input color="warning" placeholder="Password" size="lg" variant="outlined" type='password' />
                        <div className='form_input_leftright'>
                            <Input color="warning" placeholder="Age" size="lg" variant="outlined" type='number' />
                            <Input color="warning" placeholder="Weight" size="lg" variant="outlined" type='number' />
                        </div>
                        <Select color="warning" placeholder="Gender" size="lg" variant="outlined">
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Other</Option>
                        </Select>
                        <br />
                        <label htmlFor=''>Height</label>
                        <div className='form-input-leftright'>
                            <Input color="warning" placeholder="ft" size="lg" variant="outlined" type='number' />
                            <Input color="warning" placeholder="in" size="lg" variant="outlined" type='number' />
                        </div>
                        <button onClick={() => { handleSignUp(); }}>SignUp</button>
                    </form>
                    <p>Already have an account? <button onClick={() => setShowSignup(false)}>Login</button></p>
                </div>
            </>
        ) : (
            <>
                <div className='left'>
                    <div className='left_content'>
                        <Image src={logo} alt="logo" />
                        <p style={{ color: '#ffc20e' }}>
                            <strong style={{ color: 'white' }}>Welcome Back!</strong><br /><br />
                            Log in to access personalized training plans and track your progress.
                        </p>
                    </div>
                </div>
                <div className='right'>
                    <h1>Login to become a Freak!</h1>
                    <form action="">
                        <Input color="warning" placeholder="Email" size="lg" variant="outlined" />
                        <Input color="warning" placeholder="Password" size="lg" variant="outlined" type='password' />
                        <button onClick={handleLogin}>Login</button>
                    </form>
                    <p>Don't have an account? <button onClick={() => setShowSignup(true)}>Signup</button></p>
                </div>
            </>
        )}
    </div>
</div>
        
  )
}

export default AuthPopup
