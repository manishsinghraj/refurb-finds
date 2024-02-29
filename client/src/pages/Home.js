import React, { useEffect, useState } from 'react'
import { Carousel } from '../components/home/Carousel'
import { ProductList } from '../components/home/ProductList';
import products from "../assets/data/products/products.json"

const Home = () => {

  const [electronicProducts, setElectronicProducts] = useState([]);
  const [furnitureProducts, setFurnitureProducts] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  useEffect(() => {
    setElectronicProducts(products.filter((item) => item.category.name.toLowerCase() === "electronics"));
    setFurnitureProducts(products.filter((item) => item.category.name.toLowerCase() === "furniture"));
    setTopProducts(products.filter((item) => item.rating >= 4));
    setRecommendedProducts(products.filter((item) => item.rating >= 2 && item.reviewCount >= 100));
  }, []);

  return (
    <section className='home'>
      <div className='watermark'>
        <img src="refurb-logo.png" alt='refurb-logo' className='watermark-logo' />
        <h1 className='watermark-text'>Refurb<span className='watermark-text-span'>Finds</span></h1>
      </div>

      <section className='banner'>
        <Carousel />
      </section>

      <section className='product-wrapper'>
        <div className='product'>
          <h2 className='product-heading'>Top Products</h2>
          <div className='product-container'>
            <ProductList products={topProducts} />
          </div>
        </div>


        <div className='product'>
          <h2 className='product-heading'>Recommended Products</h2>
          <div className='product-container'>
            <ProductList products={recommendedProducts} />
          </div>
        </div>

        <div className='product'>
          <h2 className='product-heading'>Furninture Products</h2>
          <div className='product-container'>
            <ProductList products={furnitureProducts} />
          </div>
        </div>

        <div className='product'>
          <h2 className='product-heading'>Electronic Products</h2>
          <div className='product-container'>
            <ProductList products={electronicProducts} />
          </div>
        </div>

      </section>
    </section>
  )
}

export default Home