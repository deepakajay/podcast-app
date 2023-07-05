import React, { useState } from 'react'
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import {auth, storage, db} from '../../../firebase'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../slices/userSlice';
import { toast } from 'react-toastify';

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogIn = async()=> {
    console.log("Handling Log up!");
    setIsLoading(true);
    if(email && password) {
        try {
            //creating users account
            const userCredentials = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredentials.user; 
            console.log(user); 
            //get the doc from firestore
            const userDoc= await getDoc(doc(db, "users", user.uid));
            const userData = userDoc.data();
            //save teh user to redux store
            dispatch(setUser({
              name : userData.name,
              email : userData.email,
              uid : userData.uid,
            }))
            setIsLoading(false);
            toast.success("Logged In Successfully!")
            navigate("/profile", {replace:"true"});
          } catch (error) {
            console.log(error);
            setIsLoading(false);
            toast.error(error);
          }
    }else {
        toast.error("Please enter a valid email and password");
        setIsLoading(false)
    }
    
  }

  return (
    <>
        <Input type="email" state={email} setState={setEmail} placeholder="Enter Email Address" required={true}/>
        <Input type="password" state={password} setState={setPassword} placeholder="Enter Your Password" required={true}/>
        <Button text={isLoading ? "Loading..." : "Log In"} disabled={isLoading} onClick={handleLogIn}/>
    </>
  )
}

export default LogInForm