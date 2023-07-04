import React, { useState } from 'react'
import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogIn = ()=> {
    console.log("Handling Log up!");
  }

  return (
    <>
        <Input type="email" state={email} setState={setEmail} placeholder="Enter Email Address" required={true}/>
        <Input type="password" state={password} setState={setPassword} placeholder="Enter Your Password" required={true}/>
        <Button text="Log In" onClick={handleLogIn}/>
    </>
  )
}

export default LogInForm