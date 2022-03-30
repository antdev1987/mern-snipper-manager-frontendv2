import axios from "axios";
import { createContext,useContext,useEffect,useReducer,useState } from "react";
import { useUser } from "../userContext/UserProvider";
import { InitialState, SnippetReducer } from "./SnippetReducer";

import Swal from "sweetalert2";



export const SnippetContext = createContext()
export const SnippetProvider = props =>{

    const {user} = useUser()
    const [state, dispatch] = useReducer(SnippetReducer, InitialState)
    const [isReady,setIsReady]= useState(false)


    //saving project fetched from server in a local state
    const setProject = (inputs)=>{
        dispatch({type:'ADD - PROJECT', payload:inputs})
    }

    const setSnippet = (snippet)=>{
        dispatch({type:'ADD - SNIPPET', payload:snippet})
        
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
            
            const url = `${process.env.REACT_APP_API_URL}/api/snippetsProjects`
            const config = {
                headers:{
                    Authorization: `Bearer ${user.token}`
                }
            }

            const {data} = await axios(url,config)
            setProject(data)
        } catch (error) {
            console.log(error)
            console.log(error.response)
        }
    }


    //get snippet project by ids
    const getSnippetProjectByIdfn = async(id)=>{
        
        setIsReady(true)
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/snippetsProjects/${id}`
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

       
        setIsReady(false)
    }

    //create a new project function
    const newSnippetProjectfn = async(inputs)=>{
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/snippetsProjects`
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


    //create a new snippet function
    const newSnippetfn = async(snippetProjectId)=>{
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/snippets`
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }
            await axios.post(url,{snippetProjectId},config)
            getAllSnippetProjects()
        
        } catch (error) {
            console.log(error.response)
        }
    }

    //delete a new snippet function
    const deleteSnippetfn =async(id)=>{
        try {
            const url =`${process.env.REACT_APP_API_URL}/api/snippets/${id}`
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.delete(url,config)
            getAllSnippetProjects()
        } catch (error) {
            console.log(error.response)
        }
    }


    //geting one snippet by id function
    const getSnippetfn = async(id)=>{
        try {
            const url = `${process.env.REACT_APP_API_URL}/api/snippets/${id}`
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios(url,config)
            setSnippet(data)
            
        } catch (error) {
            console.log(error.response)
        }
    }


    //updating and saving snippet by id function
    const updateSaveSnippetfn = async(inputs)=>{
       
        try {
            const url =`${process.env.REACT_APP_API_URL}/api/snippets/${inputs._id}`
            console.log(url)
            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`
                }
            }

            const {data} = await axios.put(url,inputs,config)
            setSnippet(data)
        } catch (error) {
            console.log(error.response)
        }

    }

    return(
        <SnippetContext.Provider
            value={{
                projects:state.projects,
                project:state.project,
                snippet:state.snippet,
                isReady,

                setProject,
                setSnippet,
                newSnippetProjectfn,
                getSnippetProjectByIdfn,
                newSnippetfn,
                deleteSnippetfn,
                getSnippetfn,
                updateSaveSnippetfn
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