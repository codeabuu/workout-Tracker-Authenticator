import { useEffect } from 'react'
import {useAuthCon} from '../hooks/useAuth'
import {useWorkoutCon} from "../hooks/userWorkoutCon"

//components
import WorkoutDetails from '../components/workoutDetails'
import WorkoutForm from '../components/workoutForm'

const Home=() => {
  const {workouts, dispatch} = useWorkoutCon()
  const {user} = useAuthCon()

  useEffect(() => {
    const fetchWorkouts = async() => {
      const response = await fetch('/api/workouts', {
	headers: {
	  'Authorization': `Bearer ${user.token}`
	}
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'SET_WORKOUTS', payload: json})
      }
    }
    if (user) {
      fetchWorkouts()
    }
    fetchWorkouts()
  }, [dispatch, user])

  return (
    <div className="home">
	  <div className="workouts">
	  {workouts && workouts.map((workout) => (
		  <WorkoutDetails key={workout._id} workout={workout} />
	  ))}
	  </div>
	  <WorkoutForm />
    </div>
  )
}

export default Home
