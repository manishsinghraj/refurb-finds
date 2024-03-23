import React from 'react'
import { MdCancel } from "react-icons/md";

export const Failed = () => {
  return (
    <>
      <div className='failed'>
        <h2 className='failed-heading'>Payment Failed</h2>
        <MdCancel className='failed-icon' />
      </div>
    </>
  )
}
