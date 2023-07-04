import React, { useState } from 'react'
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const SignUpForm = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSignUp = ()=> {
    console.log("Handling sign up!");
  }

  return (
    <>
      <Input type="text" state={fullName} setState={setFullName} placeholder="Enter Full Name" required={true}/>
        <Input type="email" state={email} setState={setEmail} placeholder="Enter Email Address" required={true}/>
        <Input type="password" state={password} setState={setPassword} placeholder="Enter Your Password" required={true}/>
        <Input type="password" state={confirmPassword} setState={setConfirmPassword} placeholder="Enter Your Password Again" required={true}/>
        <Button text="Sign Up" onClick={handleSignUp}/>
    </>
  )
}

export default SignUpForm