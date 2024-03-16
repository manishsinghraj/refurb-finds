import React, { useState } from 'react';
import { IoSearchSharp } from "react-icons/io5";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { LuShoppingCart } from "react-icons/lu";
import { FaRegCircleUser } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { searchProducts } from '../../redux/filters/filtersAction';
import { SearchList } from './SearchList';
import { UserDropDown } from './UserDropDown';

const Header = () => {

  const [searchText, setSearchText] = useState("");
  const [displayUserDropDown, setDisplayUserDropDown] = useState(false);

  const dispatch = useDispatch();
  const search = useSelector((state) => state.filters.search);
  const products = useSelector((state) => state.data.products);
  const cartItemsCount = useSelector((state) => state.cart?.cart?.length || 0);
  const likeItemsCount = useSelector((state) => state.like?.likedProductIds?.length || 0);

  const filteredSearchProduct = products.filter((item) => {
    return item.title.toLowerCase().includes(search?.toLowerCase());
  });


  const handleSearch = (e) => {
    const searchText = e.target.value;
    setSearchText(searchText);
    dispatch(searchProducts(searchText));
  }


  const clearSearchText = () => {
    setSearchText("");
  }

  const handleUserAccount = () => {
    setDisplayUserDropDown(!displayUserDropDown);
  }

  const navLinks = [
    {
      path: "home",
      name: "Home",
      exclude: false
    },
    {
      path: "shop",
      name: "Shop",
      exclude: false
    },
    {
      path: "like",
      name: <span className='header__navigation__icons__like'> {!likeItemsCount ? <FaRegHeart /> : <FaHeart className='active' />}
        {likeItemsCount !== 0 ? <span className='header__navigation__icons__like__badge'>{likeItemsCount}</span> : null}
      </span>,
      exclude: true
    },
    {
      path: "cart",
      name: <span className='header__navigation__icons__cart'><LuShoppingCart />
        {cartItemsCount !== 0 ? <span className='header__navigation__icons__cart__badge'>{cartItemsCount}</span> : null}
      </span>,
      exclude: true
    },
    {
      path: null,
      name: (
        <span className='header__navigation__icons__user'>
          <FaRegCircleUser onClick={handleUserAccount} />
          {displayUserDropDown ? <span className='header__navigation__icons__user__dropdown'><UserDropDown handleUserAccount={handleUserAccount} /></span> : ""}
        </span>
      ),
      exclude: true
    }
  ]

  return (
    <>
      <div className='container'>
        <header className='header'>

          <a href="/home">
            <div className='header__logo'>
              <img src="refurb-logo.png" alt='refurb-logo'></img>
              <h1 className='header__logo-text'>Refurb<span className='header__logo-text-span'>Finds</span></h1>
            </div>
          </a>

          <div className='header__search'>
            <div className='header__search__box'>
              <IoSearchSharp className='header__search__box-icon' />
              <input type='text' placeholder='Search for anything' className='header__search__box-input'
                value={searchText} onChange={handleSearch} ></input>
              {searchText &&
                <SearchList filteredSearchProduct={filteredSearchProduct} searchText={searchText} clearSearchText={clearSearchText} />}
            </div>
          </div>

        </header>

        <nav className='header__navigation'>
          <ul className='header__navigation__menu'>
            {navLinks.map((item, index) => (
              <li key={index}>
                <NavLink to={item.path}
                  className={(navClass) => `${navClass.isActive ? 'header__navigation__active' : ''} ${item.exclude ? 'icon' : ''}`}>
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

      </div>
    </>
  )
}

export default Header