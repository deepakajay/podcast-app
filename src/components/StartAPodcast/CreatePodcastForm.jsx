import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../../firebase';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';

const CreatePodcastForm = () => {
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const[isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async()=>{
        console.log("Hanfel submit", title, desc, displayImage, bannerImage);
        if(title && desc && displayImage && bannerImage) {
            //upload the files and get the downloadable links
            setIsLoading(true);
            try {
            const bannerImageRef = ref(
                storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(bannerImageRef, bannerImage);

            const bannerImageUrl = await getDownloadURL(bannerImageRef);

            const displayImageRef = ref(
                storage, `podcasts/${auth.currentUser.uid}/${Date.now()}`
            );
            await uploadBytes(displayImageRef, displayImage);

            const displayImageUrl = await getDownloadURL(displayImageRef);

            //store the object inside collections
            await addDoc(collection(db, "podcasts"), {
                title : title,
                description:desc,
                bannerImage:bannerImageUrl,
                displayImage:displayImageUrl,
                createdBy : auth.currentUser.uid,

            })
            setTitle("");
            setDesc("");
            setBannerImage(null);
            setDisplayImage(null);

            const fileInputs = document.querySelectorAll('input[type="file"]');
        fileInputs.forEach((input) => {
          input.value = '';
        });
        
            toast.success("Podcast Created")
            setIsLoading(false);
            } catch (error) {
                toast.error(error.message);
                setIsLoading(false);
                console.log(error);
            }
            
        }else {
            toast.error("Please fill all fields")
        }
    }

  return (
    <>
        <Input type="text" state={title} setState={setTitle} placeholder="Enter the Title" required={true}/>
        <Input type="text" state={desc} setState={setDesc} placeholder="Enter Description" required={true}/>
        <label>Upload Display Image</label>
        <input type="file" state={displayImage} onChange={(e)=> setDisplayImage(e.target.files[0])} required={true} className='custom-input'/>
        <label>Upload Banner Image</label>
        <input type='file' onChange={(e)=> setBannerImage(e.target.files[0])} className='custom-input'/>
        <Button text={isLoading ? "Loading.." : "Submit"} disabled = {isLoading} onClick={handleSubmit}/>
    </>
  )
}

export default CreatePodcastForm