import React from 'react'
import { Success } from './Success'
import { Failed } from './Failed'
import { OrderPlaced } from './OrderPlaced';
const PAYMENT_SUCCESS = process.env.REACT_APP_PAYMENT_SUCCESS;


export const OrderConfirmation = ({ paymentStatus, orderPlacedDetails }) => {
  return (
    <>
      {!paymentStatus ? <OrderPlaced orderPlacedDetails={orderPlacedDetails} /> :
        paymentStatus === PAYMENT_SUCCESS ? <Success paymentStatus={paymentStatus} /> : <Failed />}
    </>
  )
}
