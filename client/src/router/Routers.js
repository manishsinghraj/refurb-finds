import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import Home from '../pages/Home';
import { Shop } from '../pages/Shop';

export const Routers = () => {
  return (
    <Routes>
      <Route path='/home' element={<Home />} />
      <Route path='/shop' element={<Shop />} />
      <Route path='/' element={<Navigate to="/home"/>} />
    </Routes>
  )
}
