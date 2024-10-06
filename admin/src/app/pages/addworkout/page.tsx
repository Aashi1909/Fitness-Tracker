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
        setWorkout({...workout, exercises: [...workout.exercises, exercise]})
    }
    const deleteExerciseFromWorkout = (index: number) => {
        setWorkout({...workout, exercises: workout.exercises.filter((_, i) => i !== index)})
    }
    const uploadImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files){
            setWorkout({...workout, imageFile: e.target.files[0], imageURL: URL.createObjectURL(e.target.files[0])})
        }
    }
    const checkLogin = () => {
        
    }
    const saveWorkout = () => {
        
    }
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
            <button onClick={(e) => {addExerciseToWorkout}}>Add Exercise</button>

        </div>
    </div>
  )
}

export default page
