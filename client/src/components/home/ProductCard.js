import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { addToLike, removeFromLike } from '../../redux/like/likeAction';

export const ProductCard = ({ product }) => {
    const [isLiked, setIsLiked] = useState(false);

    const likedProduct = useSelector((state) =>
        state.like.likedProducts.find((item) =>
            item.id === product.id
        ));

    const dispatch = useDispatch();

    const handleLike = () => {
        if (!isLiked) {
            dispatch(addToLike(product));
        } else {
            dispatch(removeFromLike(product.id));
        }
        setIsLiked(!isLiked);
    };

    return (
        <div className='product-card'>
            <Link to={`/shop/${product.id}`}>
                <img src={product.images[0]} alt={product.title} />
            </Link>
            <div className='product-details'>
                <p>{product.title}</p>
                <div className='product-rating'>
                    <span className='star-icon'>
                        <StarRating product={product} />
                    </span>
                    <span>{product.reviewCount}</span>
                </div>
                <div className='product-interact'>
                    <p className='product-price'><span>₹</span> {product.price}</p>
                    <span
                        className={`product__interact__icons__like ${isLiked || likedProduct?.liked ? "active" : ""}`}
                        onClick={handleLike}
                    >
                        {isLiked || likedProduct?.liked ? <FaHeart /> : <FaRegHeart />}
                    </span>
                </div>
            </div>
        </div >
    );
};
