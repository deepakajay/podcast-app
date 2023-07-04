import React, { useState } from 'react'
import Header from '../components/common/Header/Header';
import SignUpForm from '../components/signUpComponent/SignUpForm/SignUpForm';
import LogInForm from '../components/signUpComponent/LogInForm/LogInForm';

const SignUpPage = () => {
  const [flag, setFlag] = useState(false);
  
  return (
    <div>
      <Header/>
      <div className='input-wrapper'>
        {!flag ? <h1>SignUp</h1> : <h1>Log In</h1>}
        {!flag ? <SignUpForm/> : <><LogInForm/></>}
        {!flag ? <p style={{cursor : 'pointer'}} onClick={()=> setFlag(!flag)} > Already Have An Account ?</p> : <p style={{cursor : 'pointer'}}  onClick={()=> setFlag(!flag)}>Create An Account !</p>}
        
      </div>
      
    </div>
  )
}

export default SignUpPage