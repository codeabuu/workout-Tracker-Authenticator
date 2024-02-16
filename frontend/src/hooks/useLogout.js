import {useAuthCon} from './useAuth'
import {useWorkoutCon} from './useWorkoutCon'


export const useLogout = () => {
  const{dispatch} = useAuthCon() 
  const{dispatch: workoutsDispatch} = useWorkoutCon()

  const logout = () => {
    //remove user from storage
    localStorage.removeItem('user')
    //dispatch logout action
    dispatch({type: 'LOGOUT'})
    workoutsDispatch({type: 'SET_WORKOUTS', payload: null })
  }
  return {logout}

}
