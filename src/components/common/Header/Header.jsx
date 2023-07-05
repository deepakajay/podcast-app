import React from 'react'
import './styles.css'
import { Link, useLocation } from 'react-router-dom'

const Header = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log("Psa",pathname);

  return (
    <div className='navbar'>
      <div className='gradient'></div>
      <div className='links'>
        <Link to="/" className={pathname === "/" ? 'active' : ''}>Sign Up</Link>
        <Link to="/podcasts" className={pathname === "/podcasts" ? 'active' : ''}>Podcasts</Link>
        <Link to="/create-a-podcast" className={pathname === "/create-a-podcast" ? 'active' : ''}>Create A Podcast</Link>
        <Link to="/profile" className={pathname === "/profile" ? 'active' : ''}>Profile</Link>
      </div>
    </div>
  )
}

export default Header