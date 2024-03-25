import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateAmount } from '../../redux/shipping/shippingAction';

export const OrderSummary = () => {
  const dispatch = useDispatch();
  const cartDetails = useSelector((state) => state.cart.cartDetails);
  const sippingInfoDetails = useSelector((state) => state.shipping.shippingInfo);
  const sippingMethod = useSelector((state) => state.shipping.shippingMethod);
  const amount = useSelector((state) => state.shipping.amount);
  const [shippingCharge, setShippingCharge] = useState(0);
  const [totalCharge, setTotalCharge] = useState(0);

  const subTotal = cartDetails?.reduce((total, item) => total + (item.price * item.quantity), 0);

  useEffect(() => {
    const newShippingCharge = sippingMethod === "cod" ? (subTotal * 15) / 100 : 0;
    const newTotalCharge = subTotal + newShippingCharge;

    setShippingCharge(newShippingCharge);
    setTotalCharge(newTotalCharge);

    if (subTotal !== amount?.subTotal ||
      newShippingCharge !== amount?.shippingCharge ||
      newTotalCharge !== amount?.totalCharge) {
      dispatch(updateAmount(subTotal, newShippingCharge, newTotalCharge));
    }
  }, [subTotal, sippingMethod, dispatch, amount]);

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
                  <td className='shipping-charge-price'>{shippingCharge === 0 ? `Free` : `₹ ${shippingCharge}`}</td>
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
              <p>{sippingInfoDetails.city}</p>
              <p>{sippingInfoDetails.state}</p>
              <p>{sippingInfoDetails.zip}</p>
              <p>{"India"}</p>
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
