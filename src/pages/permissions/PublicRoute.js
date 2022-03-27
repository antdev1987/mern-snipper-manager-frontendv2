import React from 'react'

import { Navigate, Outlet } from 'react-router-dom'
import { useUser } from '../../context/userContext/UserProvider'

const PublicRoute = () => {

    const {user} = useUser()

   


    return (
        <>
        {!user.token ?(
            <Outlet />
        ): <Navigate to='/snippet'/>}
        </>
        )
}

export default PublicRoute