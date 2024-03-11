import React from 'react'
import { useSelector } from 'react-redux'
import { LikeList } from '../components/like/LikeList'

export const Like = () => {

    const likedProducts = useSelector((state) => state.like.likedProducts)

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
