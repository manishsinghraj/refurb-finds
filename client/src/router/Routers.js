import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductDetails } from '../pages/ProductDetails';
import { Cart } from '../pages/Cart';

export const Routers = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/shop/:id' element={<ProductDetails />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/' element={<Navigate to="/home"/>} />
    </Routes>
  )
}
