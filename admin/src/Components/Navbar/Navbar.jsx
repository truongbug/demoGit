import React from 'react'
import './Navbar.css'
import loqua from '../../assets/loqua_pig.png'
import navlogo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className="logo_title">
      <img src={loqua} alt="" className="nav-logo"/>
      <p>Trang Admin</p>
      </div>
      
      <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
