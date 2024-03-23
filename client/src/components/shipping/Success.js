import React from 'react';
import { IoMdDoneAll } from "react-icons/io";

export const Success = () => {
  return (
    <>
      <div className='success'>
        <h2 className='success-heading'>Payment Successful</h2>
        <IoMdDoneAll className='success-icon' />
      </div>
    </>
  )
}
