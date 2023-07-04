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
        <Link to="/signup" className={pathname === "/" ? 'active' : ''}>Sign Up</Link>
        <Link to="/podcasts" className={pathname === "podcasts" ? 'active' : ''}>Podcasts</Link>
        <Link to="/start-a-podcast" className={pathname === "start-a-podcast" ? 'active' : ''}>Start A Podcast</Link>
        <Link to="/profile" className={pathname === "profile" ? 'active' : ''}>Profile</Link>
      </div>
    </div>
  )
}

export default Header