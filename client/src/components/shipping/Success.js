import React from 'react';
import { OrderPlaced } from './OrderPlaced';

export const Success = ({ paymentStatus }) => {
  return (
    <>
      <div className='success'>
        <h2 className='success-heading'>Payment Successful</h2>       
        <OrderPlaced paymentStatus={paymentStatus}/>
      </div>
    </>
  )
}
