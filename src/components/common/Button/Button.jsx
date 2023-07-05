import React from 'react'
import './styles.css'

const Button = ({width,height, text, disabled, onClick}) => {
  return (
    <div onClick={onClick} className='custom-btn' disabled = {disabled} style={{width:width, height:height}}>{text}</div>
  )
}

export default Button