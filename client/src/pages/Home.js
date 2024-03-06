import React, { useEffect, useMemo } from 'react';
import 'react-loading-skeleton/dist/skeleton.css'
import { Carousel } from '../components/home/Carousel'
import { ProductList } from '../components/home/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { topProducts, electronicProducts, furnitureProducts, recommendedProducts, setLoading } from '../redux/filters/filtersAction';


const Home = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.data.products);

  const error = useSelector((state) => state.filters.error);
  const isLoading = useSelector((state) => state.filters.loading);

  const electronicProduct = useSelector((state) => state.filters.electronicProducts);
  const furnitureProduct = useSelector((state) => state.filters.furnitureProducts);
  const topProduct = useSelector((state) => state.filters.topProducts);
  const recommendedProduct = useSelector((state) => state.filters.recommendedProducts);


  //Memoizing to avoid re-render
  const electronicProductMemo = useMemo(() => electronicProduct, [electronicProduct]);
  const furnitureProductMemo = useMemo(() => furnitureProduct, [furnitureProduct]);
  const topProductMemo = useMemo(() => topProduct, [topProduct]);
  const recommendedProductMemo = useMemo(() => recommendedProduct, [recommendedProduct]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(electronicProducts(products));
        await dispatch(furnitureProducts(products));
        await dispatch(topProducts(products));
        await dispatch(recommendedProducts(products));
        dispatch(setLoading(false));
      } catch (error) {
        dispatch(error(error));
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [products, dispatch]);


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
        {error && <div className='error-message'>{error}</div>}
        <div className='product'>
          <h2 className='product-heading'>Top Products</h2>
          <div className='product-container'>
            {isLoading ? <h1>Loading...</h1> : <ProductList products={topProductMemo} />}
          </div>
        </div>


        <div className='product'>
          <h2 className='product-heading'>Recommended Products</h2>
          <div className='product-container'>
            {isLoading ? <h1>Loading...</h1> : <ProductList products={recommendedProductMemo} />}
          </div>
        </div>

        <div className='product'>
          <h2 className='product-heading'>Furninture Products</h2>
          <div className='product-container'>
            {isLoading ? <h1>Loading...</h1> : <ProductList products={furnitureProductMemo} />}
          </div>
        </div>

        <div className='product'>
          <h2 className='product-heading'>Electronic Products</h2>
          <div className='product-container'>
            {isLoading ? <h1>Loading...</h1> : <ProductList products={electronicProductMemo} />}
          </div>
        </div>

      </section>
    </section>
  )
}

export default Home