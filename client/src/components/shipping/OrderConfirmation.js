import React from 'react'
import { Success } from './Success'
import { Failed } from './Failed'
import { OrderPlaced } from './OrderPlaced';


export const OrderConfirmation = ({ paymentStatus, orderPlacedDetails }) => {
  return (
    <>
      {!paymentStatus ? <OrderPlaced orderPlacedDetails={orderPlacedDetails} /> :
        paymentStatus === "success" ? <Success /> : <Failed />}
    </>
  )
}
