import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingMethod } from '../../redux/shipping/shippingAction';
import { CiCircleInfo } from "react-icons/ci";
const SHIPPING_METHOD_COD = process.env.REACT_APP_SHIPPING_METHOD_COD;
const SHIPPING_METHOD_PREPAID = process.env.REACT_APP_SHIPPING_METHOD_PREPAID;

export const ShippingMethod = () => {
  const dispatch = useDispatch();
  const shippingMethod = useSelector((state) => state.shipping.shippingMethod);
  const [selectedMethod, setSelectedMethod] = useState(shippingMethod);

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };

  useEffect(() => {
    dispatch(saveShippingMethod(selectedMethod));
  }, [dispatch, selectedMethod])

  return (
    <section className='shipping-method'>
      <form>
        <div className='radio-wrapper'>
          <div className={`radio ${selectedMethod === SHIPPING_METHOD_PREPAID ? 'selected' : ''}`} onClick={() => handleSelectMethod(SHIPPING_METHOD_PREPAID)}>
            <div>
              <input
                type='radio'
                name='shippingMethod'
                value={SHIPPING_METHOD_PREPAID}
                checked={selectedMethod === SHIPPING_METHOD_PREPAID}
                onChange={() => { }}
              />
              <label>Prepaid - Net banking, UPI, Debit/Credit Card</label>
            </div>
            <div>
              <span style={{ fontStyle: "italic", fontSize: "12px" }}>Free</span>
            </div>
          </div>
          <div className={`radio ${selectedMethod === SHIPPING_METHOD_COD ? 'selected' : ''}`} onClick={() => handleSelectMethod(SHIPPING_METHOD_COD)}>
            <div>
              <input
                type='radio'
                name='shippingMethod'
                value={SHIPPING_METHOD_COD}
                checked={selectedMethod === SHIPPING_METHOD_COD}
                onChange={() => { }}
              />
              <label>Cash on Delivery</label>
            </div>
            <div>
              <span style={{ fontStyle: "italic", fontSize: "12px" }}>Shipping Charge included</span>
            </div>
          </div>
        </div>

      </form>
      {selectedMethod === SHIPPING_METHOD_PREPAID &&
        (<div style={{ display: "flex", alignItems: "center", gap: "0.5em", marginTop: "25px" }}>
          <CiCircleInfo style={{ color: "red", fontSize: "25px" }} />
          <span className='span-info' style={{ fontStyle: "italic", padding: 0, margin: 0 }}>Copy this 4000003560000008 in order to test Payment</span>
        </div>)}
    </section>
  );
};
