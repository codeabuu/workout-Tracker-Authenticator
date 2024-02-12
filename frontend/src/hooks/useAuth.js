import { authContext } from "../context/authContext"
import {useContext} from 'react'

export const useAuthCon = () => {
  const context = useContext(authContext)
  if (!context) {
    throw Error('use auth ctx must be used inside workoutcxt provider')
  }
  return context
}
~                          
