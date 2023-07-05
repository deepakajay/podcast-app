import React, { useState } from 'react'
import Button from '../../Button/Button'
import Player from '../../Player/Player'

const EpisodeDetails = ({index, title, description, audioFile, onClick}) => {
    const [player, setPlayer] = useState("");

  return (
    <div style={{width:"100%"}}>
        <h1 style={{textAlign:"left",marginBottom:0}}>{index} - {title}</h1>
        <p style={{marginLeft:'1rem'}} className='podcast-description'>{description}</p>
        {player ? <><Player src={player}/></> : <Button text={"Play"} onClick={()=> setPlayer(audioFile)} width={"200px"}/>}
    </div>
  )
}

export default EpisodeDetails