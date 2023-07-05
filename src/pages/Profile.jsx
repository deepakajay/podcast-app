import React from 'react'
import Header from '../components/common/Header/Header'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/common/Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { toast } from 'react-toastify';
import { clearUser } from '../slices/userSlice';

const Profile = () => {
    const user = useSelector((state)=> state.user.user);
    const dispatch = useDispatch();

    const handleLogout = ()=> {
        signOut(auth).then(()=>{
            toast.success("Logged out")
            dispatch(clearUser());
        }).catch((error)=>{
            console.log(error);
            toast.error(error);
        })
    }

  return (
    <div>
        <Header/>
        <h1>{user?.name}</h1>
        <Button text={"LogOut"} onClick={handleLogout}/>
    </div>
  )
}

export default Profile