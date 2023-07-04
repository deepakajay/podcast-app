import React from 'react'
import './styles.css';

const Input = ({type, state, setState, placeholder, required}) => {
  return (
    <div><input type={type} value={state} onChange={(e)=> setState(e.target.value)} placeholder={placeholder} required={required} className='custom-input'/></div>
  )
}

export default Input