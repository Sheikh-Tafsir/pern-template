import React, {useState, useEffect} from 'react'
import './NavigationBar.css';
import {BsFillPlayCircleFill} from 'react-icons/bs';
import {ImCross} from 'react-icons/im';
import {GiHamburgerMenu} from 'react-icons/gi';
import { Link } from 'react-router-dom';
const NavigationBar = () => {
  const loginToggle = () => {
    const token = localStorage.getItem('hackInShellAccessToken');
    return (token == null || token == undefined || token == "");
  }
  
  return (
    <div className="homepage_navigation">
      <div className="navigation">
        <div className="logoBar">
          <a href="/" className='my-auto'>
            <img src="/navbar/logo.png" alt="navlogo" loading="lazy"/>
          </a>
          <div className='my-auto navBarIconBar'>
            <GiHamburgerMenu className='my-auto navBurgerIcon navBarIconBurger' onClick={()=> respNav()}/>
            <ImCross className='my-auto navBurgerIcon navBarIconCross' onClick={()=> respNav()}/>
          </div>
        </div>

        <div className='navMain'>
          <div className='navMenu'>
            <div className="my-auto navSubMenu">
              <Link to="/" className='navMenuPageLinks'>Home</Link> 
              <Link to="/chats" className='navMenuPageLinks'>Chat</Link> 
              <Link to="/projects" className='navMenuPageLinks'>Projects</Link> 
              <a href="#pricing" className='navMenuPageLinks'>Pricing</a>
              <a href="#guides" className='navMenuPageLinks'>Guides</a> 
              {
                loginToggle() ? 
                (
                  <Link to="/login" className="my-auto navbar_login">
                    <button className='mx-auto'>Log In</button>
                  </Link>
                )
                :
                (
                  <Link to="/profile" className="my-auto navbar_login">
                    <button className='mx-auto'>Profile</button>
                  </Link>
                )
              }
            </div>
          </div> 
          <div className='navExtra' onClick={()=> respNav()}></div>
        </div>
      </div>
    </div>
  )
}

export default NavigationBar