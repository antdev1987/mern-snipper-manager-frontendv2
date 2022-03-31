import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import CardSnippet from "../Components/CardSnippet";

import { useSnippet } from "../context/snippetContext/SnippetProvider";

import LoadingOverlay from "react-loading-overlay";
LoadingOverlay.propTypes = undefined;

export default function Main() {
  const {
    project,
    getSnippetProjectByIdfn,
    projects,
    newSnippetfn,
    isReady: isActive,
  } = useSnippet();

  const [pageNumber, setPageNumber] = useState(0);
  const [numberOfPages, setNumberOfPages] = useState([]);
  const { id } = useParams();

  const pages = new Array(numberOfPages)?.fill(null).map((v, i) => i);

  console.log(pages);

  console.log(pages, "viendo que pasa");

  //the dependenci id run when the component is found and look for the snippets of the project
  //the dependenci projects run when you add or delete a snippet so the componnet is updated with current data
  useEffect(() => {
    getSnippetProjectByIdfn(id, pageNumber);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, projects, pageNumber]);

  useEffect(() => {
    setNumberOfPages(project.totalPages);
  }, [project]);

  console.log(numberOfPages, "number of pages");

  const gotToPrevios = () => {
    setPageNumber(Math.max(0, pageNumber - 1));
  };
  const goToNext = () => {
    setPageNumber(Math.min(numberOfPages - 1, pageNumber + 1));
  };
  return (
    <LoadingOverlay
      className="w-100"
      active={isActive}
      spinner
      text="Loading your content..."
    >
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
          {project.data?.snippetsId?.map((item) => (
            <CardSnippet key={item._id} item={item} />
          ))}
        </div>

        <ul className="pagination  mt-3 justify-content-end">
          <li className="page-item">
          <button className="page-link" onClick={gotToPrevios}>previos</button>

          </li>
          {pages.map((data, pageIndex) => {
            return (
              <li className={`page-item ${pageIndex === pageNumber ? 'active' : null}`}  key={pageIndex}>
              <button 
              className='page-link'
              onClick={() => setPageNumber(pageIndex)}>
                {pageIndex + 1}
              </button>
              </li>
            );
          })}
          <li className="page-item">
          <button className="page-link" onClick={goToNext}>next</button>
          </li>
        </ul>
      </div>
    </LoadingOverlay>
  );
}
