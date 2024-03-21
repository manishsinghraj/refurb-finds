import React from 'react';
import { useSelector } from 'react-redux';

export const OrderSummary = () => {
  const cartDetails = useSelector((state) => state.cart.cartDetails);
  const sippingInfoDetails = useSelector((state) => state.shipping.shippingInfo);

  const subTotal = cartDetails?.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shippingCharge = (subTotal * 15) / 100;
  const totalCharge = subTotal + shippingCharge;

  return (
    <>
      <section className='order-summary'>
        {cartDetails.length > 0 ? (
          <>
            <table className='order-summary-table'>
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Qty</th>
                  <th>Total Price</th>
                </tr>
              </thead>
              <tbody>
                {cartDetails.map((item, index) => (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.quantity} x {item.price}</td>
                    <td>{item.price * item.quantity}</td>
                  </tr>
                ))}
                <tr className='subtotal'>
                  <td></td>
                  <td className='subtotal-title'>Subtotal</td>
                  <td className='subtotal-price'>₹ {subTotal}</td>
                </tr>
                <tr className='shipping-charge'>
                  <td></td>
                  <td className='shipping-charge-title'>Shipping Charge</td>
                  <td className='shipping-charge-price'>₹ {shippingCharge}</td>
                </tr>
                <tr className='total-charge'>
                  <td></td>
                  <td className='total-charge-title'>Total</td>
                  <td className='total-charge-price'>₹ {totalCharge}</td>
                </tr>
              </tbody>
            </table>
            <div className='break-line'>
              <hr></hr>
            </div>

            <div className='shipping-summary-table'>
              <h3>Billing address :</h3>
              <span> {sippingInfoDetails.firstname} </span>
              <span> {sippingInfoDetails.lastname} </span>
              <p>{sippingInfoDetails.address}</p>
              <p>{sippingInfoDetails.phone}</p>
            </div>

          </>

        ) : (
          <p>Oops! Something went wrong!</p>
        )}
      </section>
    </>
  );
};
