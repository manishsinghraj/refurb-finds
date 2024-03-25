import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { signOutUser } from '../../redux/user/userAction';

export const UserDropDown = ({ handleUserAccount }) => {
    const userDetails = useSelector((state) => state.userDetails.userDetails);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSignOut = () => {
        dispatch(signOutUser());
        navigate('/signin');
        window.location.reload(); // need to refresh page
    };

    const dropDownList = [
        {
            path: "orders",
            name: "Orders"
        },
        {
            path: "cart",
            name: "Cart"
        },
        {
            path: "like",
            name: "Like"
        },
        {
            path: "signin",
            name: "SignOut",
            onClick: handleSignOut
        },
    ];

    return (
        <>
            <div className='header__navigation__signin'>
                {!userDetails ? (
                    <>
                        <NavLink to={'/signin'}>
                            <button className='header__navigation__signin-button' onClick={handleUserAccount}>Sign in</button>
                        </NavLink>
                        <p>New customer ?
                            <NavLink to={'/signup'}>
                                <span onClick={handleUserAccount}> start here</span>
                            </NavLink>
                        </p>
                    </>
                ) : (
                <h2>Hello {userDetails?.user?.name || "user"}</h2>
                )}
            </div>
            {userDetails && dropDownList.map((item, index) => (
                <div key={index} className='header__navigation__dropdownlist' onClick={handleUserAccount}>
                    <NavLink to={`/${item.path}`} onClick={item.onClick}>
                        <div key={index} className='header__navigation__dropdownlist-item'>
                            {item.name}
                        </div>
                    </NavLink>
                </div>
            ))}
        </>
    );
};
