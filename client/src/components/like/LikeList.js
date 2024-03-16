import React from 'react'
import { LikeCard } from './LikeCard';

export const LikeList = ({ likedProducts }) => {
    return (
        <>
            <div className='like-items'>
                {likedProducts && likedProducts.length > 0 ? (
                    <>
                        <h1 className='like-heading'>Liked Items ❤️</h1>
                        {likedProducts.map((item, _) => {
                            return <LikeCard key={item._id} item={item} />;
                        })}
                    </>
                ) : (
                    <h2 className='like-heading'>You don't love me! 😭💔</h2>
                )}
            </div>
        </>
    )
}
