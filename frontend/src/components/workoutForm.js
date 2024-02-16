import { useState } from 'react'
import { useWorkoutCon } from "../hooks/userWorkoutCon";
import {useAuthCon} from '../hooks/useAuth'

const WorkoutForm = () => {
  const {dispatch} = useWorkoutCon()
  const {user} = useAuthCon()
  const [title, setTitle] = useState('')
  const [load, setLoad] = useState('')
  const [reps, setReps] = useState('')
  const [error, setError] = useState(null)
  const [emptyfield, setEmptyfield] = useState([])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!user) {
      setError('you must be logged in')
      return
    }

    const workout = {title, load, reps}
    
    const response = await fetch('/api/workouts', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json',
	'Authorization': `Bearer ${user.token}`
      }
    })
    const json = await response.json()

    if (!response.ok) {
      setError(json.error)
      setEmptyfield(json.emptyfield)
    }
    if (response.ok) {
      setError(null)
      setTitle('')
      setLoad('')
      setReps('')
      setEmptyfield([])
      console.log('new workout added:', json)
      dispatch({type: 'CREATE_WORKOUT', payload: json})
    }

  }

  return (
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add a New Workout</h3>

      <label>Excersize Title:</label>
      <input 
        type="text" 
        onChange={(e) => setTitle(e.target.value)} 
        value={title}
	className={emptyfield.includes('title') ? 'error': ''}
      />

      <label>Load (in kg):</label>
      <input 
        type="number" 
        onChange={(e) => setLoad(e.target.value)} 
        value={load}
	className={emptyfield.includes('load') ? 'error': ''}
      />

      <label>Number of Reps:</label>
      <input 
        type="number" 
        onChange={(e) => setReps(e.target.value)} 
        value={reps}
	className={emptyfield.includes('reps') ? 'error': ''}
      />

      <button>Add Workout</button>
      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default WorkoutForm
