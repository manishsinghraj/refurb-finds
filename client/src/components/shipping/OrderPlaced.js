import React, { useState, useEffect } from 'react';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { OrderSummary } from './OrderSummary';
import { IoIosCheckmarkCircle } from "react-icons/io";

export const OrderPlaced = ({ orderPlacedDetails, paymentStatus }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);
  const shippingInfo = useSelector(state => state.shipping.shippingInfo);

  const firstName = shippingInfo.firstname
  const lastName = shippingInfo.lastname
  const address = shippingInfo.address
  const state = shippingInfo.state
  const city = shippingInfo.city
  const zip = shippingInfo.zip
  const phone = shippingInfo.phone

  console.log(shippingInfo)

  useEffect(() => {
    if ((orderPlacedDetails && orderPlacedDetails.status === 200) || paymentStatus === "success") {
      setOrderPlaced(true);
    } else {
      setOrderPlaced(false);
    }
  }, [orderPlacedDetails, paymentStatus]);

  return (
    <>
      <section className='order-placed-container'>
        <div className='order-placed'>
          {orderPlaced ?
            (<><IoIosCheckmarkCircle className='success-icon' />
              <h2>Your order has been placed</h2>
            </>) :
            (<><h2>Order couldn't be placed. Please try again later! </h2>
              <MdCancel className='failed-icon' /></>)
          }</div>
        {orderPlaced ?
          (<>
            <div className='order-placed-wrapper'>
              <h3>Shipping to</h3>
              <div className='shipping-to'>
                <p>{firstName} {lastName}</p>
                <p>{address}</p>
                <p>{city} {state} {zip}</p>
                <p>India</p>
                <p>{phone}</p>
              </div>
              <h3>Invoice</h3>
              <div className='order-details'>
                <OrderSummary/>
              </div>
            </div>
          </>) :
          (<><h2>Order couldn't be placed. Please try again later! </h2>
            <MdCancel className='failed-icon' /></>)}
      </section >
    </>
  );
};
