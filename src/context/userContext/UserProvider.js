import { createContext,useContext,useEffect,useReducer } from "react";

import { initialState, userReducer } from './userReducer'


export const UserContext = createContext()
export const UserProvider = props =>{
    const [state,dispatch] = useReducer(userReducer,initialState)


    //to get user again on refresh
   useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('uid'))
    if(user?.token){
        setUser(user)
    }
   },[])

    //function to userdata to the user state
    const setUser = (user)=>{
        dispatch({type:'LOGIN - USER',payload:user})
    }

    //function to logged out user
    const exitUserfn = ()=>{
        // localStorage.removeItem('uid')
        localStorage.clear()
        dispatch({type:'EXIT - USER'})
    }

    return (
        <UserContext.Provider
        value={{
            user:state.user,
            
            setUser,
            exitUserfn
        }}
        >
            {props.children}
        </UserContext.Provider>
    )
}

//this is the custom call to the use context
export const useUser =()=>{

    return useContext(UserContext)

}