import {useAuthCon} from './useAuth'


export const useLogout = () => {
  const{dispatch} = useAuthCon() 

  const logout = () => {
    //remove user from storage
    localStorage.removeItem('user')
    //dispatch logout action
    dispatch({type: 'LOGOUT'})
  }
  return {logout}

}
