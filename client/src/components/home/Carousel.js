import React from 'react';
import { FaArrowCircleLeft, FaArrowCircleRight } from "react-icons/fa";
import { data } from "../../assets/data/slides/slides.js";
import { useSelector, useDispatch } from "react-redux"
import { nextSlide, prevSlide } from '../../redux/banner/bannerActions.js';

export const Carousel = () => {
    const slides = data || null;
    const currentSlide = useSelector((state) => state.banner.slide);
    const dispatch = useDispatch();

    const handlePrevious = () => {
        dispatch(prevSlide(slides))
    }

    const handleNext = () => {
        dispatch(nextSlide(slides));
    }


    // useEffect(() => {
    //     const slideInterval = setTimeout(() => {
    //         dispatch(nextSlide(slides));
    //     }, 3000); 

    //     return () => {
    //         clearTimeout(slideInterval);
    //     };
    // }, [currentSlide, dispatch, slides]);



    return (
        <>
            <div className='carousel'>
                <FaArrowCircleLeft className='arrow arrow-left' onClick={handlePrevious} />

                {slides.map((item, index) => {
                    return (
                        <img key={item.id} src={item.src} alt={item.alt} className={currentSlide === index ? "slide " : "slide slide-hidden"} />
                    )
                })}

                <button className='shop_now'>Shop Now</button>

                <FaArrowCircleRight className='arrow arrow-right' onClick={handleNext} />
            </div>
        </>
    )
}
