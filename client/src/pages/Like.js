import React from 'react'
import { useSelector } from 'react-redux'
import { LikeList } from '../components/like/LikeList'

export const Like = () => {

    const likedProductsIds = useSelector((state) => state.like.likedProductIds);
    const products = useSelector((state) => state.data.products);
    
    const likedProducts = products.filter((item) => likedProductsIds.includes(item._id));

    return (
        <>
            <section className='like'>
                <div className='like-container'>
                    <LikeList likedProducts={likedProducts} />
                </div>
            </section>
        </>
    )
}
