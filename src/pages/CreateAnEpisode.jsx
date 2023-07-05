import React, { useState } from "react";
import Header from "../components/common/Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Input from "../components/common/Input/Input";
import Button from "../components/common/Button/Button";
import { toast } from "react-toastify";
import { auth, db, storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const CreateAnEpisode = () => {
  const {id} = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState(""); 
  const [audioFile, setAudioFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit= async()=>{
    setIsLoading(true);
    if(title && description && audioFile && id) {
      try {
        const audioRef = ref(storage, `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`);
        await uploadBytes(audioRef, audioFile);

        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title : title,
          description : description,
          audioFile : audioURL,
        }

        await addDoc(
          collection(db, "podcasts", id, "episodes"), episodeData
        )
        toast.success("Episode created succcessfully");
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setAudioFile(null);
        navigate(`/podcast/${id}`)
        
      } catch (error) {
        toast.error(error.message);
        setIsLoading(false);
      }
    }else {
      toast.error("Please fill all the fields");
      setIsLoading(false);
    }
  }

  return (
    <div>
      <Header />
      <div className="input-wrapper">
          <h1>Create An Episode</h1>
          <Input type="text" state={title} setState={setTitle} placeholder="Enter Title" required={true}/>
        <Input type="text" state={description} setState={setDescription} placeholder="Enter Description" required={true}/>
        <label>Upload File</label>
        <input type="file" state={audioFile} onChange={(e)=> setAudioFile(e.target.files[0])} required={true} className='custom-input'/>
        <Button text={isLoading ? "Loading.." : "Submit"} disabled = {isLoading} onClick={handleSubmit}/>
      </div>
    </div>
  );
};

export default CreateAnEpisode;
