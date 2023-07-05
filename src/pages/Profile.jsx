import React, { useEffect } from 'react'
import Header from '../components/common/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/common/Button/Button';
import { signOut } from 'firebase/auth';
import { auth, db } from '../firebase';
import { toast } from 'react-toastify';
import { clearUser } from '../slices/userSlice';
import { useState } from 'react';
import { collection, onSnapshot, query } from 'firebase/firestore';
import PodcastCard from '../components/common/Podcasts/PodcastCard/PodcastCard';

const Profile = () => {
    const user = useSelector((state)=> state.user.user);
    const dispatch = useDispatch();
    const [myPodcasts, setMyPodcasts] = useState([])

    useEffect(()=>{
        onSnapshot(query(collection(db, "podcasts")),
        (querySnapshot)=>{
            const podcastData = [];
            querySnapshot.forEach((doc)=>{
                podcastData.push({id:doc.id, ...doc.data()});
            });
            setMyPodcasts(podcastData);
        },(error)=>{
            console.log(error);
            toast.error(error);
        })
    },[dispatch])

    

  return (
    <div>
        <Header/>
        <div className='input-wrapper' style={{marginTop:'2rem'}}>
            <h1>Welcome Back {user?.name}, Check out your latest Podcasts</h1>
            {myPodcasts.length > 0 ? (
            <div className='podcasts-flex' style={{marginTop:'2rem'}}>
                {myPodcasts.map((item)=>{
                    return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}/>
                })}
            </div>) : ( <p>No Podcasts</p>)}
            
        </div> 
        
    </div>
  )
}

export default Profile