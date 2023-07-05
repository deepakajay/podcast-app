import React from 'react'
import './styles.css'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Button from '../Button/Button';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../../slices/userSlice';

const Header = () => {
  const user = useSelector((state)=> state.user.user);
  const location = useLocation();
  const pathname = location.pathname;
  console.log("Psa",pathname);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = ()=> {
    signOut(auth).then(()=>{
        toast.success("Logged out")
        dispatch(clearUser());
        navigate("/")
    }).catch((error)=>{
        console.log(error);
        toast.error(error);
    })
}

  return (
    <div className='navbar'>
      <div className="brand">
        
      </div>

      <div className='gradient'></div>
      <div className='links'>
      <Link to="/">
      
          
          <span className="app-name">PodNet</span>
        </Link>
      {!user && <Link to="/" className={pathname === "/" ? 'active' : ''}>Sign Up</Link>}
          <Link to="/podcasts" className={pathname === "/podcasts" ? 'active' : ''}>Podcasts</Link>
        {user && <><Link to="/create-a-podcast" className={pathname === "/create-a-podcast" ? 'active' : ''}>Create</Link>
          <Link to="/profile" className={pathname === "/profile" ? 'active' : ''}>Profile</Link>
          <Link to="/logout" onClick={handleLogout} className={pathname === "/logout" ? 'active' : ''}>LOG OUT</Link>
          </>  
        }
        
        </div>
    </div>
  )
}

export default Header