import React from 'react'
import { NavLink } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";

export const SearchList = ({ filteredSearchProduct, searchText, clearSearchText }) => {

    return (
        <div className='search__list'>

            <NavLink to={`/shop`}>
                <span className='search__list-item user-text' onClick={clearSearchText}> <FaSearch className='icon' /> {searchText}</span>
            </NavLink>

            {filteredSearchProduct.map((item, index) => {
                return (
                    <>
                        <NavLink to={`/shop/${item._id}`}>
                            <div key={index} className='search__list-item' onClick={clearSearchText}>
                                <img src={item.images[0]} alt={item.title}/>
                                <p>{item.title}</p>
                            </div >
                        </NavLink>
                    </>
                )
            })}
        </div >
    )
}
