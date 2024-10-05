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
      
    </div>
  )
}

export default page
