import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import { useSnippet } from "../context/snippetContext/SnippetProvider";

export default function Main() {

  const {id} = useParams()
  const {project,getSnippetProjectByIdfn} = useSnippet()


  useEffect(()=>{
    console.log('se eejecuta el effect')
    getSnippetProjectByIdfn(id)
  },[id])

console.log(id)
  console.log(project)
 

  return (
    <div className="main">
      <h3>Project Name: {project.projectName}</h3>
      <h1>Sidebar Example</h1>
      <p>hola dsaaaaaaaaaddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddd</p>
    </div>
  );
}
