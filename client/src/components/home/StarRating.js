import React from 'react';
import { MdOutlineStar, MdOutlineStarBorder, MdOutlineStarHalf } from "react-icons/md";

const StarRating = ({ product }) => {

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
        <div>{starRating}</div>
    )
}

export default StarRating