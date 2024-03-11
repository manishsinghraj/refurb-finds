import React, { useCallback, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { FaHeartCrack } from "react-icons/fa6";
import { useDispatch } from 'react-redux';
import { removeFromLike } from '../../redux/like/likeAction';
import { addToCart } from '../../redux/cart/cartActions';

export const LikeCard = ({ item }) => {
  const dispatch = useDispatch();
  const [breakHeart, setBreakHeart] = useState(false);

  const handleHeartClick = useCallback(() => {
    setBreakHeart(!breakHeart);
  }, [breakHeart]);

  useEffect(() => {
    let timeOutId = "";
    if (breakHeart) {
      timeOutId = setTimeout(() => {
        dispatch(removeFromLike(item.id));
      }, 2000);
    }

    return () => {
      clearTimeout(timeOutId);
    };
  }, [dispatch, breakHeart, item]);

  const handleAddToCart = () => {
    dispatch(addToCart(item));
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
