import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import StarRating from './StarRating';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToLike, removeFromLike } from '../../redux/like/likeAction';
import { postLikeItems, removeLikeItems } from '../../redux/like/likeReducer';
import { toastNotify } from '../../redux/toast/toastActions';

export const ProductCard = ({ product }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [isLiked, setIsLiked] = useState(false);
    const userDetails = useSelector((state) => state.userDetails.userDetails);

    const likedProductIds = useSelector((state) =>
        state.like.likedProductIds
    );

    useEffect(() => {
        setIsLiked(likedProductIds?.includes(product._id))
    }, [likedProductIds, product])

    const handleLike = () => {
        if (!userDetails) {
            navigate('/signin');
        } else {
            if (!isLiked) {
                dispatch(addToLike(product._id));
                dispatch(toastNotify('Added to Like', 'info'));
                dispatch(postLikeItems(product._id, userDetails.user._id));
            } else {
                dispatch(removeFromLike(product._id));
                dispatch(toastNotify('Removed from Like', 'info'));
                dispatch(removeLikeItems(product._id, userDetails.user._id));
            }
            setIsLiked(!isLiked);
        }
    };

    return (
        <div className='product-card'>
            <Link to={`/shop/${product._id}`}>
                <img src={product.images[0]} alt={product.title} />
            </Link>
            <div className='product-details'>
                <p>{product.title}</p>
                <div className='product-rating'>
                    <span className='star-icon'>
                        <StarRating product={product} />
                    </span>
                    <span className='product-rating-count'>{product.reviewCount}</span>
                </div>
                <div className='product-interact'>
                    <p className='product-price'><span>₹</span> {product.price}</p>
                    <span
                        className={`product__interact__icons__like ${isLiked ? "active" : ""}`}
                        onClick={handleLike}>
                        {isLiked ? <FaHeart /> : <FaRegHeart />}
                    </span>
                </div>
            </div>
        </div >
    );
};