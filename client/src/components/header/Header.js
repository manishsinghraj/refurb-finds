import React from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom"


const navLinks = [
  {
    path: "home",
    name: "Home"
  },
  {
    path: "shop",
    name: "Shop"
  },
  {
    path: "cart",
    name: "Cart",
    span: <span className='header__navigation__icons__cart__badge'>20</span>
  }
]

const Header = () => {
  return (
    <>
      <div className='container'>

        <header className='header'>

          <div className='header__logo'>
            <img src="refurb-logo.png" alt='refurb-logo'></img>
            <h1 className='header__logo-text'>Refurb<span className='header__logo-text-span'>Finds</span></h1>
          </div>

          <div className='header__search'>
            <div className='header__search__box'>
              <IoSearchSharp className='header__search__box-icon' />
              <input type='text' placeholder='Search for anything' className='header__search__box-input'></input>
            </div>
          </div>

        </header>

        <nav className='header__navigation'>
          <ul className='header__navigation__menu'>
            {
              navLinks.map((item, index) =>
              (<li key={index} >
                <NavLink to={item.path} className={(navClass) => navClass.isActive ? "header__navigation__active" : ""}>{item.name}</NavLink>
              </li>
              ))
            }
          </ul>

          <div className='header__navigation__icons'>
            <span className='header__navigation__icons__cart'><LuShoppingCart />
              <span className='header__navigation__icons__cart__badge'>20</span>
            </span>
            <span className='header__navigation__icons__like'><FaRegHeart />
              <span className='header__navigation__icons__like__badge'>20</span>
            </span>
            <span className='header__navigation__icons__userlogo'><FaRegCircleUser /></span>
          </div>
        </nav>

      </div>
    </>
  )
}

export default Header