import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../context/userContext/UserProvider'



const PrivateRoute = () => {

    const {user} = useUser()

   

  return (
  <>
  {user.token ?(
      <Outlet />
  ): <Navigate to='/login'/>}
  </>
  )
  
}

export default PrivateRoute