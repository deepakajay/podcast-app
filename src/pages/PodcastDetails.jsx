import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import { collection, doc, getDoc, onSnapshot, query } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import Button from '../components/common/Button/Button';
import EpisodeDetails from '../components/common/Podcasts/EpisodeDetails/EpisodeDetails';

const PodcastDetails = () => {
    const {id} = useParams();
    const [podcast, setPodcast] = useState({});
    const navigate = useNavigate();
    const [episodes, setEpisodes] = useState([]);

    useEffect(()=>{
        if(id) {
            getData();

            onSnapshot(query(collection(db, "podcasts", id, "episodes")),
            (querySnapshot)=>{
                const episodeData = [];
                querySnapshot.forEach((doc)=>{
                    episodeData.push({id:doc.id, ...doc.data()})
                })
                setEpisodes(episodeData);
            }
            )
        }
    }, [])

    const getData = async()=> {
        try {
            const docRef = doc(db, "podcasts", id);
            const docSnap = await getDoc(docRef);

            if(docSnap.exists()) {
                console.log(docSnap.data());
                setPodcast({id:id, ...docSnap.data()})
            }else{
                console.log("Error");
                toast.error("No such pocast");
                navigate("/podcasts", {replace:"true"})
            }
        } catch (error) {
            toast.error(error.message);
            navigate("/podcasts", {replace:"true"})
        }     
    }

  return (
    <div>
        <Header/>
        <div className='input-wrapper' style={{marginTop:"0rem"}}>
            {podcast?.id && (
                <>
                <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', width:'100%'}}>
                    <h1 style={{textAlign:'left', width:'100%'}}>{podcast.title}</h1>
                    {podcast.createdBy == auth.currentUser.uid && (
                        <Button width='200px' text={"Create Episodes"} onClick={()=>{navigate(`/podcast/${id}/create-episode`)}}/>
                    )}
                    
                </div>
                
                <div className='banner-wrapper'>
                    <img src={podcast.bannerImage}/>
                </div>
                <p className='podcast-description'>{podcast.description}</p>
                <h1 style={{textAlign:'left', width:'100%'}}>Episodes</h1>
                {episodes.length>0 ? <>{episodes.map((episode, index)=>{
                    return <EpisodeDetails key={index} index={index + 1} title={episode.title} description={episode.description} audioFile={episode.audioFile} onClick={(file)=>console.log("Playing file", file)}/>
                })}</> : <><h1>No Episodes</h1></>}
                </>
                
            )}
        </div>
    </div>
  )
}

export default PodcastDetails