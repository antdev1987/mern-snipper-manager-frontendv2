import axios from "axios";
import { createContext,useContext,useEffect,useReducer } from "react";
import { useUser } from "../userContext/UserProvider";
import { InitialState, SnippetReducer } from "./SnippetReducer";

import Swal from "sweetalert2";


export const SnippetContext = createContext()
export const SnippetProvider = props =>{

    const {user} = useUser()
    const [state, dispatch] = useReducer(SnippetReducer, InitialState)


    //saving project fetched from server in a local state
    const setProject = (inputs)=>{
        dispatch({type:'ADD - PROJECT', payload:inputs})
    }

    const setSnippet = (id)=>{
        // const init = {idProject:id, snippet:{name:'unkonw',snippet:'text here'}}
        // dispatch({type:'ADD - SNIPPET', payload:init})
        console.log(id)
    }

    const setOneProject = (data)=>{
        dispatch({type:'ADDGET - PROJECT',payload:data})
    }


    useEffect(()=>{

        if(user.token){
            getAllSnippetProjects()
        }

    },[user.token])


    //getting all user's projects
    const getAllSnippetProjects = async()=>{
        try {
            
            const url = 'http://192.168.100.7:4000/api/snippetsProjects'
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }

            const {data} = await axios(url,config)
            console.log(data)
            setProject(data)
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }


    //get snippet by id

    const getSnippetProjectByIdfn = async(id)=>{
        
        
        try {


            const url = `http://192.168.100.7:4000/api/snippetsProjects/${id}`
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios(url,config)
            setOneProject(data)
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }

    //create a new project function
    const newSnippetProjectfn = async(inputs)=>{
        try {
            const url = 'http://192.168.100.7:4000/api/snippetsProjects'
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            const {data} = await axios.post(url,inputs,config)
            Swal.fire({
                icon: 'success',
                title: 'New Snippet Folder created',
                showConfirmButton: false,
                timer: 1500
            })
             getAllSnippetProjects()
        } catch (error) {
            console.log(error.response)
        }
    }

    return(
        <SnippetContext.Provider
            value={{
                projects:state.projects,
                project:state.project,

                setProject,
                setSnippet,
                newSnippetProjectfn,
                getSnippetProjectByIdfn
            }}
        >
            {props.children}
        </SnippetContext.Provider>
    )
}

//the custom to provide what it has inside value
export const useSnippet = ()=>{
    return useContext(SnippetContext)
}