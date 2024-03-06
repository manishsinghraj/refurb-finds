import React from 'react';
import { useSelector } from "react-redux";
import { ShopProductList } from '../components/shop/ShopProductList';

export const Shop = () => {

 return (
    <>
      <div className='shop__container'>
        <ShopProductList />
      </div>
    </>
  )
}
