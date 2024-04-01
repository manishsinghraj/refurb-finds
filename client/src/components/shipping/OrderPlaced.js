import React, { useState, useEffect } from 'react';
import { MdCancel } from "react-icons/md";
import { useSelector } from 'react-redux';
import { OrderSummary } from './OrderSummary';
import { IoIosCheckmarkCircle } from "react-icons/io";
const PAYMENT_SUCCESS = process.env.REACT_APP_PAYMENT_SUCCESS;
const STATUS_OK = process.env.REACT_APP_STATUS_OK;

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


  useEffect(() => {
    if ((orderPlacedDetails && orderPlacedDetails.status === parseInt(STATUS_OK)) || paymentStatus === PAYMENT_SUCCESS) {
      console.log("first")
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
            <IoIosCheckmarkCircle className='success-icon' /> :
            <MdCancel className='failed-icon' />
          }</div>
        {orderPlaced ?
          (<>
            <div className='order-placed-wrapper'>
              <h2>Your order has been placed</h2>
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
                <OrderSummary />
              </div>
            </div>
          </>) :
          (<><h2 className='order-failed'>Order couldn't be placed. Please try again later! </h2>
          </>)}
      </section >
    </>
  );
};
