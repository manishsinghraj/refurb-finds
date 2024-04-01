import React from 'react'
import { CiWarning } from "react-icons/ci";

export const Orders = () => {
  return (
    <>
      <section className='orders' style={{ display: "flex", justifyContent: "center", height: "80vh", alignItems: "center" }}>

        <div style={{ fontSize: "25px", display: "flex", flexDirection:"column", justifyContent: "center", alignItems: "center" }}>
          <span style={{ fontSize: "35px", color:"yellow" }}> <CiWarning /></span>
          Work In Progress...</div>
      </section>
    </>
  )
}
