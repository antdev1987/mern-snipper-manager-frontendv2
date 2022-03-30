import React from 'react'

import "react-pro-sidebar/dist/css/styles.css";
import Aside from '../Components/Aside'

import { Outlet } from 'react-router-dom';

const SnippetPage = () => {
  return (
  
    <div className='Snippet border border-4 border-warning'>
      <Aside />
      
      <Outlet />
    </div>

  )
}

export default SnippetPage