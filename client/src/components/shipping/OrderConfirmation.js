import React from 'react'
import { Success } from './Success'
import { Failed } from './Failed'

export const OrderConfirmation = ({ paymentStatus }) => {
  return (
    <>
      {!paymentStatus ? "order placed" :
        paymentStatus === "success" ? <Success /> : <Failed />}
    </>
  )
}
