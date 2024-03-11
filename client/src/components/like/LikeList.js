import React from 'react'
import { LikeCard } from './LikeCard';

export const LikeList = ({ likedProducts }) => {
    return (
        <>
            <div className='like-items'>
                {likedProducts && likedProducts.length > 0 ? (
                    <>
                        <h1 className='like-heading'>Liked Items ❤️</h1>
                        {likedProducts.map((item, index) => {
                            return <LikeCard key={item.id} item={item} />;
                        })}
                        {/* <div className='like-subtotal'>
                          <h2>SubTotal ({likedProducts.length} items): ₹ {0}</h2>
                      </div> */}
                    </>
                ) : (
                    <h2 className='like-heading'>You don't love me! 😭💔</h2>
                )}
            </div>
        </>
    )
}
