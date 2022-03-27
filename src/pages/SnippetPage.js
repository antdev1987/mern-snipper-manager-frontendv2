import React from 'react'

import Sidebar from '../Components/Sidebar'

import "react-pro-sidebar/dist/css/styles.css";

import Aside from '../Components/Aside'
import Main from './Main'
import { Outlet } from 'react-router-dom';

const SnippetPage = () => {
  return (
  
    <div className='Snippet'>
      <Aside />
      
      <Outlet />
    </div>

  )
}

export default SnippetPage