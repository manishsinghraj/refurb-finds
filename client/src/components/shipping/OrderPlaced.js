import React, { useState, useEffect } from 'react';
import { IoMdDoneAll } from "react-icons/io";
import { MdCancel } from "react-icons/md";

export const OrderPlaced = ({ orderPlacedDetails }) => {
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (orderPlacedDetails && orderPlacedDetails.status === 200) {
      setOrderPlaced(true);
    } else {
      setOrderPlaced(false);
    }
  }, [orderPlacedDetails]);

  return (
    <>
      <div className='order-details'>
        <div className='order-placed'>
          {orderPlaced ?
            (<><h2>Your Order has been placed</h2> 
            <IoMdDoneAll className='success-icon' /></>) :
            (<><h2>Order couldn't be placed. Please try again later! </h2>
              <MdCancel className='failed-icon' /></>)}
        </div >
      </div >
    </>
  );
};
