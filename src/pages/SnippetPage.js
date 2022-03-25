import React from 'react'

import Sidebar from '../Components/Sidebar'

import "react-pro-sidebar/dist/css/styles.css";

import Aside from '../Components/Aside'
import Main from '../Components/Main'

const SnippetPage = () => {
  return (
  
    <div className='Snippet'>
      <Aside />
      <Main />
    </div>

  )
}

export default SnippetPage