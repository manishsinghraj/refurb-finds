import React from 'react';
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from "react-icons/md";

export const ProductCard = ({ product }) => {
    const rating = product?.rating || null;

    const starRating = Array.from({ length: 5 }, (elem, index) => {
        const number = index + 0.5; //for half star

        return (
            <span key={index}>

                {rating >= index + 1 ? <MdOutlineStar className='star-icon' /> :
                    rating >= number ? <MdOutlineStarHalf className='star-icon' /> :
                        <MdOutlineStarBorder className='star-icon' />
                }
            </span>

        )
    })



    return (
        <div className='product-card'>
            <img src={product.images[0]} alt={product.title} />
            <div className='product-details'>
                <p>{product.title}</p>
                <div className='product-rating'>
                    <span className='star-icon'>{starRating}</span>
                    <span>{product.reviewCount}</span>
                </div>
                <p className='product-price'><span>₹</span> {product.price}</p>
            </div>
        </div>
    );

}
