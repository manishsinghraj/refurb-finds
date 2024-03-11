import React from 'react'
import { NavLink } from 'react-router-dom'

export const UserDropDown = ({ handleUserAccount }) => {

    const dropDownList = [
        {
            path: "orders",
            name: "Orders"
        },
        {
            path: "account",
            name: "Account"
        },
        {
            path: "signin",
            name: "SignOut"
        },
    ]

    return (
        <>
            <div className='header__navigation__signin'>
                <NavLink to={'/signin'}>
                    <button className='header__navigation__signin-button' onClick={handleUserAccount}>Sign in</button>
                </NavLink>
                <p>New customer ?
                    <NavLink to={'/signup'}>
                        <span onClick={handleUserAccount}> start here</span>
                    </NavLink>
                </p>
            </div >
            {
                dropDownList.map((item, index) => {
                    return (
                        <div className='header__navigation__dropdownlist' onClick={handleUserAccount}>
                            <NavLink to={`/${item.path}`}>
                                <div key={index} className='header__navigation__dropdownlist-item'>
                                    {item.name}
                                </div>
                            </NavLink>
                        </div>
                    )
                })
            }
        </>
    )
}
