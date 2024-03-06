import React, { useState, useEffect, useMemo } from 'react';
import { ProductCard } from '../home/ProductCard';
import { useDispatch, useSelector } from "react-redux";
import { MdOutlineStar, MdOutlineStarBorder } from 'react-icons/md';
import { sortBy, starFilterIndex } from '../../redux/filters/filtersAction';

export const ShopProductList = () => {
    const dispatch = useDispatch();
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(0);
    const [activeStarIndex, setActiveStarIndex] = useState(null);
    const [currentSliderValue, setCurrentSliderValue] = useState(0);
    const [sliderChanged, setSliderChanged] = useState(false);

    const products = useSelector((state) => state.data.products);
    const search = useSelector((state) => state.filters.search || "");
    const currentSort = useSelector((state => state.filters.sortBy));
    const starFilterIndexValue = useSelector((state) => state.filters.starFilterIndex);

    const filteredProduct = useMemo(() => {
        let filteredProducts = products.filter((item) => {
            return item.title.toLowerCase().includes(search.toLowerCase());
        });

        if (starFilterIndexValue !== null) {
            filteredProducts = filteredProducts.filter((item) => {
                return item.rating >= starFilterIndexValue;
            });
        }

       filteredProducts =  filteredProducts.filter((item) => item.price >= currentSliderValue);

        if (currentSort === "Price:Low to high") {
            filteredProducts.sort((a, b) => a.price - b.price);
        } else if (currentSort === "Price:High to Low") {
            filteredProducts.sort((a, b) => b.price - a.price);
        } else if (currentSort === "Product:A-Z") {
            filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
        } else if (currentSort === "Product:Z-A") {
            filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
        }

        return filteredProducts;
    }, [products, search, starFilterIndexValue, currentSort, currentSliderValue]);


    useEffect(() => {
        if (!sliderChanged) {
            const prices = filteredProduct.map((item) => item.price);
            const newMaxPrice = Math.max(...prices);
            const newMinPrice = Math.min(...prices);
            setMinPrice(newMinPrice);
            setMaxPrice(newMaxPrice);
        }
    }, [filteredProduct, sliderChanged]);


    const handleStarFilterClick = (index) => {
        dispatch(starFilterIndex(index));
        setActiveStarIndex(index);

        if (activeStarIndex === index) {
            setActiveStarIndex(null);
            dispatch(starFilterIndex(null));
        }
    };

    const handleSort = (e) => {
        dispatch(sortBy(e.target.value));
    }

    const handleSliderChange = (e) => {
        setCurrentSliderValue(e.target.value);
        setSliderChanged(true);
    }

    // Generate star filters
    const starFilters = [];
    for (let i = 4; i >= 1; i--) {
        const stars = [];
        for (let j = 1; j <= 5; j++) {
            stars.push(
                <span key={j}>
                    {j <= i ? <MdOutlineStar className='star-icon' /> : <MdOutlineStarBorder className='star-icon' />}
                </span>
            );
        }
        starFilters.push(
            <div key={i} className={`star-filter ${i === activeStarIndex ? 'active' : ''}`} onClick={() => handleStarFilterClick(i)}>
                {stars} <span className='and_up'> & up </span>
            </div>
        );
    }

    return (
        <div className='shop__products'>
            <div className='filter-section'>
                <div className='filters'>
                    <h1>Filters</h1>
                    <div className='customer__review'>
                        <label >Reviews : </label>
                        {starFilters}
                    </div>
                    <div className='product__sort'>
                        <label>Sort : </label>
                        <select value={currentSort} onChange={(e) => handleSort(e)}>
                            <option value="Price:Low to high" >Price:Low to high</option>
                            <option value="Price:High to Low">Price:High to Low</option>
                            <option value="Product:A-Z">Product:A-Z</option>
                            <option value="Product:Z-A">Product:Z-A</option>
                        </select>
                    </div>
                    <div className='product__price__range'>
                        <label htmlFor='price-slider'>Price : </label>
                        <div>
                            <input name="price-slider" type='range' max={maxPrice} min={minPrice} value={currentSliderValue}
                                onChange={(e) => handleSliderChange(e)}
                                onBlur={() => setSliderChanged(false)}></input>
                        </div>
                        <div className='product__price__range-value'>
                            <span>{minPrice}</span>
                            <span>{currentSliderValue}</span>
                            <span>{maxPrice}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='all-product'>
                <div className='product__result-count'>
                    <h3>{filteredProduct.length} results</h3>
                </div>
                <div className='product'>
                    {filteredProduct.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
};
