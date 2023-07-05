import React from 'react'
import './styles.css'

const Button = ({text, disabled, onClick}) => {
  return (
    <div onClick={onClick} className='custom-btn' disabled = {disabled}>{text}</div>
  )
}

export default Button