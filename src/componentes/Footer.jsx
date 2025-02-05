import React from 'react'
import {FaInstagram,FaGithub, FaTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className='footer'>


        <div className='container-made'>
            <p className='made'>  Made by Satolh </p>
            
            <img src={"src/assets/punisher.png"} alt="Logo The Punisher" className='logo-footer'/>
        </div>

        <div className='container-redes'>
          <a  className='a-icon-redes' href='#'><FaInstagram className='icon-redes' /></a>
          <a  className='a-icon-redes' href='#'><FaTwitter className='icon-redes' /></a>
          <a target='_blank' className='a-icon-redes' href='https://github.com/satolh'><FaGithub className='icon-redes'  /></a>
        </div>

    </footer>
  )
}

export default Footer