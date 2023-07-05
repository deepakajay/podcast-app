import React, { useState } from 'react'
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';
import {auth, storage, db} from '../../../firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import {useDispatch} from 'react-redux'
import {setUser} from '../../../slices/userSlice'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async ()=> {
    console.log("Handling sign up!");
    setIsLoading(true);
    if(password === confirmPassword && password.length >= 6) {
      try {
        //creating users account
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredentials.user; 
        console.log(user); 
        //saving users details in a collections
        await setDoc(doc(db, "users", user.uid), {
          name : fullName,
          email : email,
          uid : user.uid,
        });

        //save teh user to redux store
        dispatch(setUser({
          name : fullName,
          email : email,
          uid : user.uid,
        }))
        setIsLoading(false);
        navigate("/profile", {replace:"true"});
        toast.success("User has been created!")
      } catch (error) {
        console.log(error);
        setIsLoading(false);
        toast.error(error);        
      }
    }else {
      //throw errors
      if(password !== confirmPassword) {
        toast.error("Password and confirm password does not match")
      }
      if(password.length < 6) {
        toast.error("Password is less than 6 characters")
      }
      setIsLoading(false);
    }
    
  }

  return (
    <>
      <Input type="text" state={fullName} setState={setFullName} placeholder="Enter Full Name" required={true}/>
        <Input type="email" state={email} setState={setEmail} placeholder="Enter Email Address" required={true}/>
        <Input type="password" state={password} setState={setPassword} placeholder="Enter Your Password" required={true}/>
        <Input type="password" state={confirmPassword} setState={setConfirmPassword} placeholder="Enter Your Password Again" required={true}/>
        <Button text={isLoading ? "Loading.." : "Sign Up"} disabled = {isLoading} onClick={handleSignUp}/>
    </>
  )
}

export default SignUpForm