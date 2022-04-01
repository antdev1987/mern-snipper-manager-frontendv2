import React from 'react'

import "react-pro-sidebar/dist/css/styles.css";
import Aside from '../Components/Aside'

import { Outlet } from 'react-router-dom';

const SnippetPage = () => {
  return (
  
    <div className='Snippet min-vh-94 '>
      <Aside />
      
      <Outlet />
    </div>

  )
}

export default SnippetPage