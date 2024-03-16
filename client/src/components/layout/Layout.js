import React, { useEffect } from 'react'
import Header from '../header/Header'
import { Footer } from '../footer/Footer'
import { Routers } from '../../router/Routers'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../../redux/data/dataReducer'

export const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      <Header />
      <div className='main'>
        <Routers />
      </div>
      <Footer />
    </>
  )
}
