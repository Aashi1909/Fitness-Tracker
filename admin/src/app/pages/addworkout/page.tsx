"use client"
import React from 'react'
import './addworkout.css';
import { toast } from 'react-toastify';

interface Workout{
    name: string
    description: string
    durationInMinutes: number
    exercises: Exercise[]
    imageURL: string
    imageFile: File | null
}

interface Exercise{
    name: string
    description: string
    sets: number
    reps: number
    imageURL: string
    imageFile: File | null
}

const page = () => {
    const[workout, setWorkout] = React.useState<Workout>({
        name: '',
        description: '',
        durationInMinutes: 0,
        exercises: [],
        imageURL: '',
        imageFile: null
    })
    const[exercise, setExercise] = React.useState<Exercise>({
        name: '',
        description: '',
        sets: 0,
        reps: 0,
        imageURL: '',
        imageFile: null
    })
    const handleWorkoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkout({...workout, [e.target.name]: e.target.value})
    }
    const handleExerciseChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExercise({...exercise, [e.target.name]: e.target.value})
    }
    const addExerciseToWorkout = () => {
        if(exercise.name === '' || exercise.description === '' || exercise.sets === 0 || exercise.reps === 0 || exercise.imageFile === null){
            toast.error('Please fill in all the fields', {
                position: 'top-center',
            })
            return;
            
        }
        setWorkout({...workout, exercises: [...workout.exercises, exercise]})
    }
    const deleteExerciseFromWorkout = (index: number) => {
        setWorkout({...workout, exercises: workout.exercises.filter((exercise, i) => i !== index)})
    }

    const uploadImage = async(image:File)=> {
        const formData = new FormData();
        formData.append('image', image);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/image-upload/uploadimage`, {
                method: 'POST',
                body: formData
            });
            if(response.ok) {
                const data = await response.json();
                console.log("Image uploaded successfully", data);
                return data.imageUrl;
            }
            else{
                return null;
            }
        } catch (err) {
            console.log(err);
        }
    }
    const checkLogin = async() => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_API}/admin/checklogin`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        if(response.ok) {   
            console.log("User logged in");
        }
        else{
            window.location.href = '/adminauth/login'
        }
        
    }
    const saveWorkout = async () => {
        await checkLogin();
        console.log(workout);
    
        if (exercise.name === '' || exercise.description === '' || exercise.sets === 0 || exercise.reps === 0 || exercise.imageFile === null) {
            toast.error('Please fill in all the fields', {
                position: 'top-center',
            });
            return;
        }
    
        if (workout.imageFile) {
            const imageURL = await uploadImage(workout.imageFile);
            if(imageURL){
                setWorkout({...workout, imageURL})
            }
        }
        for(let i=0; i<workout.exercises.length; i++){
            let tempImg = workout.exercises[i].imageFile // getting the specific execrcise image
            if(tempImg){
                let imageURL = await uploadImage(tempImg);
                workout.exercises[i].imageURL = imageURL; // creating the imageUrl for every exercise image
            }
        }
        const response = await fetch(`${process.env.NEXT_PUBLICBACKEND_API}/workoutplans/workout`, {
            method: 'POST', 
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(workout),
            credentials: 'include'
        })
        if(response.ok)
        {
            const data= await response.json()
            toast.success('Workout created successfully', {
                position: 'top-center'
            })
        }
        else{
           console.log("Something went wrong")
           toast.error("Workout creation failed", {
            position: 'top-center'
           })
        }
    };
  return (
    <div className='formpage'>
        <h1 className='title'>Add Workout</h1>
        <input type='text' name='name' placeholder='Workout Name' value={workout.name} onChange={handleWorkoutChange} />
        <input type='text' name='description' placeholder='Workout Description' value={workout.description} onChange={(e) =>{
            setWorkout({...workout, description: e.target.value})
        }}  />
        <input type='number' name='durationInMinutes' placeholder='Workout Duration In Minutes' value={workout.durationInMinutes} onChange={handleWorkoutChange} />
        <input type='file' placeholder='Workout Image' name='imageFile' onChange={(e) => setWorkout({...workout, imageFile: e.target.files![0]})} />
        <div style={{display: 'flex', flexDirection: 'row' , alignItems: 'center', justifyContent: 'center'}}>
            <h2 className='title'>Add Exercises to Workout</h2>
            <input type='text' name='name' placeholder='Exercise Name' value={exercise.name} onChange={handleExerciseChange}/>
            <textarea  name='description' placeholder='Exercise Description' value={exercise.description} onChange={(e) => setExercise({...exercise, description: e.target.value})}/>
            <label htmlFor='sets'>Sets</label>
            <input type='number' placeholder='sets' name='sets' value={exercise.sets} onChange={handleExerciseChange} />
            <label htmlFor='sets'>Reps</label>
            <input type='number' placeholder='reps' name='reps' value={exercise.reps} onChange={handleExerciseChange} />
            <input type='file' placeholder='Exercise Image' name='imageFile' onChange={(e) => setExercise({...exercise, imageFile: e.target.files![0]})} />
            <button onClick={(e) => {addExerciseToWorkout(e)}}>Add Exercise</button>

        </div>

        <div className='exercises'>
            {
                workout.exercises.map((exercise, index) => (
                    <div className='exercise' key={index}>
                        <h2>{exercise.name}</h2>
                        <p>{exercise.description}</p>
                        <p>{exercise.sets}</p>
                        <p>{exercise.reps}</p>
                       {/* Converting file into  a url */}
                       <img src={exercise.imageFile? URL.createObjectURL(exercise.imageFile) : exercise.imageURL} alt=" "/> 
                        <button onClick={() => deleteExerciseFromWorkout(index)}>Delete Exercise</button>
                        
                    </div>
                ))
            }

        </div>
        <button onClick={(e) =>{saveWorkout(e)}}>Save Workout</button>

    </div>
  )
}

export default page
