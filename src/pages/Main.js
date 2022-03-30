import React, { useEffect } from "react";

import { useParams } from "react-router-dom";
import CardSnippet from "../Components/CardSnippet";

import { useSnippet } from "../context/snippetContext/SnippetProvider";

import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined

export default function Main() {
  const { project, getSnippetProjectByIdfn, projects, newSnippetfn, isReady:isActive } =
    useSnippet();
  const { id } = useParams();

  //the dependenci id run when the component is found and look for the snippets of the project
  //the dependenci projects run when you add or delete a snippet so the componnet is updated with current data
  useEffect(() => {
    getSnippetProjectByIdfn(id);
  }, [id, projects]);

 
  return (
    <LoadingOverlay  
    className="w-100"
    active={isActive} 
    spinner
    text="Loading your content...">

      <div className="main border border-4 border-info h-100 bg-dark">
        <h3 className="text-white">
          Project Name:{" "}
          <span className="text-success">{project.projectName}</span>
        </h3>

        <button
          className="btn btn-outline-primary mb-3"
          onClick={() => newSnippetfn(id)}
        >
          Add New Snippet Card
        </button>

        <div className="row  g-3">
          {project.snippetsId?.map((item) => (
            <CardSnippet key={item._id} item={item} />
          ))}
        </div>
      </div>
      
    </LoadingOverlay>
  );
}
