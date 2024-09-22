"use client"
import React from 'react'
import './workoutPage.css'

const page = () => {
    const [workout, setWorkout] = React.useState<any>(null)
    const getWorkout = async () => {
        let data : any ={
            type: 'Chest',
            content: 'It’s Chest Day. Time to push your limits and build strength. Focus on form, hit those presses, fly through those reps, and feel the burn. Let’s sculpt that powerful chest and level up your game!',
            imageUrl: 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80',
            durationInMin: 30,
            exercises: [
                {
                    exercise: 'Flat Bench Press',
                    videoUrl: 'https://gymvisual.com/img/p/1/7/5/5/2/17552.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'
                },
                {
                    exercise: 'Incline Bench Press',
                    videoUrl: 'https://gymvisual.com/img/p/1/0/3/9/8/10398.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

                },
                {
                    exercise: 'Decline Bench Press',
                    videoUrl: 'https://gymvisual.com/img/p/6/5/2/3/6523.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

                },
                {
                    exercise: 'Barbell Decline PullOver',
                    videoUrl: 'https://gymvisual.com/img/p/6/5/2/2/6522.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

                },
                {
                    exercise: 'Cable Press',
                    videoUrl: 'https://gymvisual.com/img/p/2/5/6/3/0/25630.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

                },
                {
                    exercise: 'Decline Pushup',
                    videoUrl: 'https://gymvisual.com/img/p/5/0/1/2/5012.gif',
                    sets: 3,
                    reps: 10,
                    rest: 60,
                    description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, voluptatum.'

                }
            ]
        }

        setWorkout(data)
    }

    React.useEffect(() => {
        getWorkout()
    }, [])
  return (
    <div className='workout'>
      <h1 className='mainhead'>{workout?.type} Day</h1>
      <span style={{color: 'black', fontSize: '1.2rem', fontWeight: '600'}}>{workout?.content}</span>
      <div className='workout__exercises'>
                {
                    workout?.exercises.map((item: any, index: number)=>{
                        return (
                            <div className={
                                index % 2 === 0 ? 'workout__exercise' : 'workout__exercise workout__exercise--reverse'
                            }>
                                <h3>{index+1}</h3>
                                <div className='workout__exercise__image'>
                                    <img src={item.videoUrl} alt="" />
                                </div>
                                <div className='workout__exercise__content'>
                                    <h2>{item.exercise}</h2>
                                    <span>{item.sets} sets X {item.reps} reps</span>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
  )
}

export default page
