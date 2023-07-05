import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import './styles.css' 

// import 'react-h5-audio-player/src/styles.scss' Use SASS

const Player = ({src}) => (
  <AudioPlayer
  autoPlay
    src={src}
    onPlay={e => console.log("onPlay")}
    // other props here
    className='player'
  />
);

export default Player