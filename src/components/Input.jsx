import React from 'react'

const Input = ({className="",...props}) => {


  return (
   <>
   <input type='text' 
   
   className={`border border gray-300 rounded px-3 py-2 focus:outline-none ${className}`}  
   
   {...props}
   />
   </>
  )
}

export default Input