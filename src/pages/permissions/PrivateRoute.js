import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../context/userContext/UserProvider'



const PrivateRoute = () => {

    const {user} = useUser()

    console.log(user)

  return (
  <>
  {user.token ?(
      <Outlet />
  ): <Navigate to='/login'/>}
  </>
  )
  
}

export default PrivateRoute