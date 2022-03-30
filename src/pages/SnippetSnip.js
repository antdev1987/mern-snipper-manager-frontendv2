import React, { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { useSnippet } from "../context/snippetContext/SnippetProvider";

import CodeMirror from "@uiw/react-codemirror";
import { oneDark } from '@codemirror/theme-one-dark';
//import { javascript } from '@codemirror/lang-javascript';
// import {python} from "@codemirror/lang-python"

const SnippetSnip = () => {
  const { getSnippetfn, snippet, updateSaveSnippetfn } = useSnippet();
  const [inputs, setInputs] = useState(
    {
     title: snippet.title ?? '',
     description:snippet.description ?? '',
     snippet: snippet.snippet ?? ''
    });
  const [snipInput,setSnipInput] = useState('')
  const { id } = useParams();

  useEffect(() => {
    getSnippetfn(id);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  useEffect(() => {
    if (snippet.title) {
      setInputs({ 
        title: snippet.title,
        description: snippet.description,
        snippet:snippet.snippet
      });
    }
  }, [snippet]);

  const handleInputs = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataSaved = {
      _id: snippet._id,
      title: inputs.title,
      description:inputs.description,
      snippet:snipInput
    };

    updateSaveSnippetfn(dataSaved);
  };

  console.log(snippet)

  return (
    <div className="w-100 bg-dark h-100 bg-light  ">
      <form className='w-100 px-4 ' onSubmit={handleSubmit}>
        <h2>{snippet.title}</h2>

        <div  className="mb-3">
        <input 
        className=" text-dark form-control w-100  bg-dark text-white " 
        name="title" 
        onChange={handleInputs} 
        value={inputs.title} />
        </div>



        <div className="mb-3">
          <textarea
          className=" bg-dark form-control  w-100 text-white"
          rows={3}
            name='description' 
            onChange={handleInputs} 
            value={inputs.description}
          />
        </div>

        <CodeMirror
        
        value={inputs.snippet}
        onChange={(snippet)=>{
          setSnipInput(snippet)
        }}
        
        theme={oneDark}
        
        options={{
          readOnly: "true",
          keyMap: "sublime",
          mode: "jsx",
        }}
      />

        <br />
        <button className="btn btn-outline-primary" type="subtmit">Save</button>
      </form>
    </div>
  );
};

export default SnippetSnip;
