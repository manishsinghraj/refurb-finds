import React from 'react';
import { Link } from 'react-router-dom';
import StarRating from './StarRating';

export const ProductCard = ({ product }) => {
   
    return (
        <div className='product-card'>
            <Link to={`/shop/${product.id}`}>
                <img src={product.images[0]} alt={product.title} />
                <div className='product-details'>
                    <p>{product.title}</p>
                    <div className='product-rating'>
                        <span className='star-icon'>
                            <StarRating product={product} />
                        </span>
                        <span>{product.reviewCount}</span>
                    </div>
                    <p className='product-price'><span>₹</span> {product.price}</p>
                </div>
            </Link>
        </div>
    );

}
