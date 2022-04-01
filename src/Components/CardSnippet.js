import React from "react";

import { Link } from "react-router-dom";
import { useSnippet } from "../context/snippetContext/SnippetProvider";

import Swal from "sweetalert2";

const CardSnippet = ({ item }) => {
  const { deleteSnippetfn } = useSnippet();

  //this candel the deletion of a snippet
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteSnippetfn(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  return (
    <div className="col-lg-4">
      <div
        className="card bg-dark m-auto border-3 border-success text-white"
        style={{ maxWidth: "30rem"}}
      >
        <div className="card-body">
          <h5 className="card-title mb-1 ">{item.title}</h5>

          <p className="card-text text mb-1">{item.description}</p>

          <Link
            className="card-link   btn  btn-outline-info"
            to={`/snippet/snip/${item._id}`}
          >
            View
          </Link>
          <button
            className="card-link btn btn-danger"
            onClick={() => handleDelete(item._id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default CardSnippet;
