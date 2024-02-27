import React from 'react';
import { Link } from "react-router-dom";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { RiMailFill } from "react-icons/ri";

export const Footer = () => {
  return (
    <>
      <div className='footer'>
        <div className='footer__left'>
          <div className='footer__left__logo'>
            <img src="refurb-logo.png" alt='refurb-logo'></img>
            <h3 className='footer__left__logo-text'>Refurb<span className='footer__left__logo-text-span'>Finds</span></h3>
          </div>
          <div className='footer__left__about'>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci recusandae numquam tenetur voluptate quia quisquam odit consequuntur ex aut! Sit sint odit quidem iure, deserunt perferendis quibusdam quo fugiat?</p>
          </div>
        </div>


        <div className='footer__mid'>
          <div className='footer__mid__about'>
            <p>Now available on both Android and IOS</p>
          </div>
          <div className='footer__mid__logo'>
            <a href='https://play.google.com/store/games?hl=en_IN&gl=US&pli=1' target='blank'><img src="google-play.png" alt='google-logo'></img></a>
            <a href='https://www.apple.com/in/app-store/' target='blank'><img src="app-store.png" alt='app-store-logo'></img></a>
          </div>
        </div>



        <div className='footer__right'>

          <div className='footer__right__links'>
            <p>Quick links</p>
            <Link to={"/home"}><li>Home</li></Link>
            <Link to={"/shop"}><li>Shop</li></Link>
            <Link to={"/home"}><li>login</li></Link>
            <Link to={"/home"}><li>signup</li></Link>
            <Link to={"/home"}><li>about</li></Link>
            <Link to={"/home"}><li>privacy</li></Link>
          </div>
          <div className='footer__right__contacts'>
            <p>Contacts</p>
            <div>
              <span><FaLocationDot /></span>
              <p>23/24, Singh Indl Estate No 70, Ram Mandir Rd, Goregaon (west)</p>
            </div>
            <div>
              <span><FaPhone /></span>
              <p>+91 7259159962</p>
            </div>
            <div>
              <span><RiMailFill /></span>
              <p>manishpurohit97@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
