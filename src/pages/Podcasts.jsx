import React, { useEffect, useState } from 'react'
import Header from '../components/common/Header/Header';
import { collection, doc, onSnapshot, query } from 'firebase/firestore';
import { db } from '../firebase';
import { setPodcasts } from '../slices/podcastSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import PodcastCard from '../components/common/Podcasts/PodcastCard/PodcastCard';
import Input from '../components/common/Input/Input';

const Podcasts = () => {
    const dispatch = useDispatch();
    const podcasts = useSelector((state)=>state.podcasts.podcasts)
    const [search, setSearch] = useState("");

    useEffect(()=>{
        onSnapshot(query(collection(db, "podcasts")),
        (querySnapshot)=>{
            const podcastData = [];
            querySnapshot.forEach((doc)=>{
                podcastData.push({id:doc.id, ...doc.data()});
            });

            dispatch(setPodcasts(podcastData));
        },(error)=>{
            console.log(error);
            toast.error(error);
        })
    },[dispatch])

    var filteredPodcasts = podcasts.filter((item)=>item.title.trim().toLowerCase().includes(search.trim().toLowerCase()))

  return (
    <div>
        <Header/>
        <div className='input-wrapper' style={{marginTop:'2rem'}}>
            <h1>Discover Podcasts</h1>
            <Input type="text" state={search} setState={setSearch} placeholder="Search By Title"/>
            {filteredPodcasts.length > 0 ? (
            <div className='podcasts-flex' style={{marginTop:'2rem'}}>
                {filteredPodcasts.map((item)=>{
                    return <PodcastCard key={item.id} id={item.id} title={item.title} displayImage={item.displayImage}/>
                })}
            </div>) : ( <p>No Podcasts</p>)}
        </div> 
    </div>
  )
}

export default Podcasts