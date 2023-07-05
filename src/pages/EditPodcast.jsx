import React, { useState } from 'react'
import Header from '../components/common/Header/Header'
import { useNavigate, useParams } from 'react-router-dom'
import Button from '../components/common/Button/Button';
import { auth, db, storage } from '../firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Input from '../components/common/Input/Input';

const EditPodcast = () => {
    const {id} = useParams();
    
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [newDisplayImage, setNewDisplayImage] = useState(null);
    const [newBannerImage, setNewBannerImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async()=> {
        setIsLoading(true);
        if(title) {
            const docRef = doc(db, 'podcasts', id);
            await updateDoc(docRef, { title: title });
            console.log('Title updated successfully!'); 
            toast.success("Title updated successfully")
            setTitle("");
        }
        if(desc) {
            const docRef = doc(db, 'podcasts', id);
            await updateDoc(docRef, { description: desc });
            console.log('Description updated successfully!'); 
            toast.success("Description updated successfully")
            setDesc("");
        }
        if(newDisplayImage) {
            //updare the display image
            const displayImageRef = ref(
                storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(displayImageRef, newDisplayImage);

            const displayImageURL = await getDownloadURL(displayImageRef);

            const docRef = doc(db, 'podcasts', id);
            await updateDoc(docRef, { displayImage: displayImageURL });
            console.log('Picture URL updated successfully!'); 
            toast.success("Display Image updated successfully")
            setNewDisplayImage(null);
        }
        if(newBannerImage) {
            //updare the display image
            const bannerImageRef = ref(
                storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(bannerImageRef, newBannerImage);

            const bannerImageURL = await getDownloadURL(bannerImageRef);

            const docRef = doc(db, 'podcasts', id);
            await updateDoc(docRef, { bannerImage: bannerImageURL });
            console.log('Picture URL updated successfully!'); 
            toast.success("Banner Image updated successfully")
            setNewDisplayImage(null);
        }
        setIsLoading(false);
        navigate("/podcasts");
    }

  return (
    <div>
        <Header/>
        <div className='input-wrapper'>
            <h1>Edit your Podcast</h1>
            <Input type="text" state={title} setState={setTitle} placeholder="Enter the Title" required={true}/>
            <Input type="text" state={desc} setState={setDesc} placeholder="Enter Description" required={true}/>
            <label>Upload a new Display Image</label>
            <input type="file" onChange={(e)=> setNewDisplayImage(e.target.files[0])} required={true} className='custom-input'/>
            <label>Upload a new Banner Image</label>
            <input type="file" onChange={(e)=> setNewBannerImage(e.target.files[0])} required={true} className='custom-input'/>
            <Button text={isLoading ? "Loading.." : "Submit"} disabled = {isLoading} onClick={handleSubmit}/>
        </div>
    </div>
  )
}

export default EditPodcast