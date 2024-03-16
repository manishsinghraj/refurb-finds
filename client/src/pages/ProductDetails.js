import React from 'react';
import { useNavigate, useParams } from "react-router-dom";
import StarRating from '../components/home/StarRating';
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from '../redux/cart/cartActions';
import { postCartItems } from '../redux/cart/cartReducer';


export const ProductDetails = () => {
    const products = useSelector((state) => state.data.products);

    const { id } = useParams();
    const product = products.find((item) => item._id === id);
   
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const userDetails = useSelector((state) => state.userDetails.userDetails)

    const handleAddToCart = () => {
        if (!userDetails) {
            navigate('/signin');
        } else {
            dispatch(addToCart(product._id));
            dispatch(postCartItems(product._id, userDetails.user._id));
        }
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
