import React from 'react'
import Button from '../../Button/Button'

const EpisodeDetails = ({index, title, description, audioFile, onClick}) => {
  return (
    <div style={{width:"100%"}}>
        <h1 style={{textAlign:"left",marginBottom:0}}>{index} - {title}</h1>
        <p style={{marginLeft:'1rem'}} className='podcast-description'>{description}</p>
        <Button text={"Play"} onClick={()=> onClick(audioFile)} width={"200px"}/>
    </div>
  )
}

export default EpisodeDetails