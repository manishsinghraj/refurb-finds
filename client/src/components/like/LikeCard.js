import React, { useCallback, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaHeartCrack } from "react-icons/fa6";
import { useDispatch, useSelector } from 'react-redux';
import { removeFromLike } from '../../redux/like/likeAction';
import { addToCart } from '../../redux/cart/cartActions';
import { useNavigate } from 'react-router-dom';
import { removeLikeItems } from '../../redux/like/likeReducer';
import { postCartItems } from '../../redux/cart/cartReducer';

export const LikeCard = ({ item }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails.userDetails);
  const [breakHeart, setBreakHeart] = useState(false);

  const handleHeartClick = useCallback(() => {
    setBreakHeart(!breakHeart);
  }, [breakHeart]);

  useEffect(() => {
    let timeOutId = "";
    if (breakHeart) {
      timeOutId = setTimeout(() => {
        dispatch(removeFromLike(item._id));
        dispatch(removeLikeItems(item._id, userDetails.user._id));
      }, 2000);
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, breakHeart, item, userDetails]);

  const handleAddToCart = () => {
    if (!userDetails) {
      navigate('/signin');
    } else {
      dispatch(addToCart(item._id));
      dispatch(postCartItems(item._id, userDetails.user._id));
    }
  };

  return (
    <div className={`like-item ${breakHeart ? "fade" : ""}`}>
      <div className='like-item-image'>
        <img src={item.images[0]} alt={item.title}></img>
      </div>
      <div className='like-item-details'>
        <h1 className='like-item-details-heading'>{item.title}</h1>
        <h4 className='like-item-details-description'>{item.description}</h4>
        <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
      </div>
      <div className='like-item-price'>
        <div>
          <span>₹ {item.price}</span>
          <div onClick={handleHeartClick}>
            {breakHeart ? <FaHeartCrack className='icon' /> : <FaHeart className='icon' />}
          </div>
        </div>
      </div>
    </div>
  );
};
