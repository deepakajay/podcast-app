import React from 'react'
import './styles.css'

const Button = ({width, text, disabled, onClick}) => {
  return (
    <div onClick={onClick} className='custom-btn' disabled = {disabled} style={{width:width}}>{text}</div>
  )
}

export default Button