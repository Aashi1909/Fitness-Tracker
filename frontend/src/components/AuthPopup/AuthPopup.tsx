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
    const [loginformData, setLoginFormData] = React.useState({
        email: ' ',
        password: ' '
    })
    const [date, setDate] = React.useState<Date | null>(null);

    const handleLogin = () => {
        console.log(loginformData);

        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(loginformData),
            credentials: 'include'
        })
        .then(res => res.json())
            .then(data => {
                console.log(data)

                if (data.ok) {
                    toast.success(data.message)
                    setShowPopup(false)
                }
                else {
                    toast.error(data.message)
                }
            }).catch(err => {
                console.log(err)
            })
    }
    
    const handleSignUp =() =>{
        fetch(process.env.NEXT_PUBLIC_BACKEND_API + '/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(signupformData)

        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            if(data.ok){
                toast.success(data.message)
                setShowSignup(false)
            }
            else{
                toast.error(data.message)
            }
        }).catch(err => console.log(err))  


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
                        <Input color="warning" placeholder="Name" size="lg" variant="outlined" onChange={(e) => {setSignUpFormData({...signupformData, name: e.target.value})}}/>
                        <Input color="warning" placeholder="Email" size="lg" variant="outlined" onChange={(e) => {setSignUpFormData({...signupformData, email: e.target.value})}}/>
                        <Input color="warning" placeholder="Password" size="lg" variant="outlined" type='password' onChange={(e) => {setSignUpFormData({...signupformData, password: e.target.value})}}/>
                        <div className='form_input_leftright'>
                            <Input color="warning" placeholder="Weight" size="lg" variant="outlined" type='number' onChange={(e) => {setSignUpFormData({...signupformData, weightInKg: parseFloat(e.target.value)})}}/>
                        </div>
                        <Select color="warning" placeholder="Activity Level" size="lg" variant="outlined" onChange={(
                            event: React.SyntheticEvent | null,
                            newValue: string | null,) => {setSignUpFormData({...signupformData, activityLevel: newValue?.toString() || ''})}}>
                            <Option value="sedentary">Sedentary</Option>
                            <Option value="light">Light</Option>
                            <Option value="moderate">Moderate</Option>
                            <Option value="active">Active</Option>
                            <Option value="veryActive">Very Active</Option>
                        </Select>

                        <Select color="warning" placeholder="Goal" size="lg" variant="outlined" onChange={(
                            event: React.SyntheticEvent | null,
                            newValue: string | null,) => {setSignUpFormData({...signupformData, goal: newValue?.toString() || ''})}}>
                            <Option value="weightloss">Lose</Option>
                            <Option value="weightMaintain">Maintain</Option>
                            <Option value="weightGain">Gain</Option>
                        </Select>
                        <Select color="warning" placeholder="Gender" size="lg" variant="outlined" onChange={(
                            event: React.SyntheticEvent | null,
                            newValue: string | null,) => {setSignUpFormData({...signupformData, gender: newValue?.toString() || ''})}}>
                            <Option value="male">Male</Option>
                            <Option value="female">Female</Option>
                            <Option value="other">Others</Option>
                        </Select>
                        <div className='form-input-leftright'>
                            <Input color="warning" placeholder="Height" size="lg" variant="outlined" type='number'  onChange={(e) => {setSignUpFormData({...signupformData, heightInCm: parseFloat(e.target.value)})}}/>
                            <div className="input-wrapper">
                            <label htmlFor=''>Date of Birth</label>
                            <div className="datepicker-wrapper">
                                <LocalizationProvider dateAdapter={AdapterDayjs}

                                >
                                    <DesktopDatePicker defaultValue={dayjs(new Date())}
                                        sx={{
                                            backgroundColor: 'white',
                                        }}

                                        onChange={(newValue) => {
                                            setSignUpFormData({
                                                ...signupformData,
                                                dob: new Date(newValue as any)
                                            })
                                        }}
                                    />
                                </LocalizationProvider>
                            </div>
                            </div>
                        </div>
                        <button onClick={(e) => { 
                            e.preventDefault();
                            handleSignUp(); 
                            }}>SignUp</button>
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
                        <Input color="warning" placeholder="Email" size="lg" variant="outlined"  onChange={(e) => {setLoginFormData({...loginformData, email: e.target.value})}}/>
                        <Input color="warning" placeholder="Password" size="lg" variant="outlined" type='password' onChange={(e) => {setLoginFormData({...loginformData, password: e.target.value})}}/>
                        <button onClick={(e) =>{
                            e.preventDefault();
                            handleLogin()}}>Login</button>
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
