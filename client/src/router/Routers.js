import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home';
import { Shop } from '../pages/Shop';
import { ProductDetails } from '../pages/ProductDetails';
import { Cart } from '../pages/Cart';
import { Like } from '../pages/Like';
import { SignIn } from '../pages/SignIn';
import { SignUp } from '../pages/SignUp';
import { Orders } from '../pages/Orders';
import ScrollToTop from '../components/utils/ScrollToTop';
import { Accounts } from '../pages/Accounts';
import { Shipping } from '../components/shipping/Shipping';


export const Routers = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path='/home' element={<Home />} />
        <Route path='/shop' element={<Shop />} />
        <Route path='/like' element={<Like />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/orders' element={<Orders />} />
        <Route path='/account' element={<Accounts />} />
        <Route path='/shop/:id' element={<ProductDetails />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/' element={<Navigate to="/home" />} />
      </Routes>
    </>
  )
}
