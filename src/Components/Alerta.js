
import React from 'react'

const Alerta = ({children}) => {

  return (

    <div className='bg-warning p-1 rounded-3 mb-3 text-uppercase text-dark fw-bold text-center'>
        {children}
    </div>
  )
}

export default Alerta