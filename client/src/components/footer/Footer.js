import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { FaLocationDot, FaPhone } from "react-icons/fa6";
import { RiMailFill } from "react-icons/ri";

export const Footer = () => {

  const [currentYear, setCurrentYear] = useState("");

  useEffect(() => {
    const date = new Date();
    setCurrentYear(date.getFullYear());
  }, []);

  return (
    <>
      <section className='footer'>
        <section className='footer__left'>
          <div className='footer__left__logo'>
            <img src="refurb-logo.png" alt='refurb-logo'></img>
            <h3 className='footer__left__logo-text'>Refurb<span className='footer__left__logo-text-span'>Finds</span></h3>
          </div>
          <div className='footer__left__about'>
            <p className='footer__left__about_desc'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum adipisci recusandae numquam tenetur voluptate quia quisquam odit consequuntur ex aut! Sit sint odit quidem iure, deserunt perferendis quibusdam quo fugiat?</p>
            <p>© {currentYear} RefurbFinds, Inc.</p>
          </div>
        </section>

        <section className='footer_mobile'>
          <section className='footer__mid'>
            <div className='footer__mid__about'>
              <p className='header'>Now available on both Android and IOS</p>
            </div>
            <div className='footer__mid__logo'>
              <a href={process.env.REACT_APP_GOOGLE_PLAY} target='blank'><img src="google-play.png" alt='google-logo'></img></a>
              <a href={process.env.REACT_APP_APP_STORE} target='blank'><img src="app-store.png" alt='app-store-logo'></img></a>
            </div>
          </section>



          <section className='footer__right'>
            <div className='footer__right__links'>
              <p className='header'>Quick links</p>
              <Link to={"/home"}><li>Home</li></Link>
              <Link to={"/shop"}><li>Shop</li></Link>
              <Link to={"/signin"}><li>Signin</li></Link>
              <Link to={"/signup"}><li>Signup</li></Link>
              <Link to={"/home"}><li>About</li></Link>
              <Link to={"/home"}><li>Privacy</li></Link>
            </div>
            <div className='footer__right__contacts'>
              <p className='header'>Contacts</p>
              <div className='footer__right__contacts__details'>
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
          </section>
        </section>
      </section>
    </>
  )
}
