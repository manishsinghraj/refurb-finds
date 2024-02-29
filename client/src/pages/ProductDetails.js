import React from 'react';
import { useParams } from "react-router-dom";
import products from "../assets/data/products/products.json";
import StarRating from '../components/home/StarRating';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from '../redux/cart/cartActions';


export const ProductDetails = () => {

    const { id } = useParams();
    const product = products.find((item) => item.id === parseInt(id));

    const dispatch = useDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    }

    return (
        <>
            <section className='product__details'>
                <div className='product__details-container'>
                    <div className='product__details-image'>
                        <img src={product?.images[0]} alt={product.title}></img>
                    </div>
                    <div className='product__details-about'>
                        <h6>{product?.category.name}</h6>
                        <h2>{product?.title}</h2>
                        <h4>{product?.description}</h4>
                        <div className='product__details-rating'>
                            <span className='star-icon'>
                                <StarRating product={product} />
                            </span>
                            <span>{product.reviewCount}</span>
                        </div>
                        <hr></hr>
                        <div className='product__details-price'>
                            <p className='product-price'><span>₹</span> {product.price}</p>
                            <button className='add-to-cart' onClick={handleAddToCart}>Add to Cart</button>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
