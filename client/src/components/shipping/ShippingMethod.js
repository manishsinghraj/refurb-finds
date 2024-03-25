import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingMethod } from '../../redux/shipping/shippingAction';
import { CiCircleInfo } from "react-icons/ci";

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
          <div className={`radio ${selectedMethod === 'prepaid' ? 'selected' : ''}`} onClick={() => handleSelectMethod('prepaid')}>
            <div>
              <input
                type='radio'
                name='shippingMethod'
                value='prepaid'
                checked={selectedMethod === 'prepaid'}
                onChange={() => { }}
              />
              <label>Prepaid - Net banking, UPI, Debit/Credit Card</label>
            </div>
            <div>
              <span style={{ fontStyle: "italic", fontSize: "12px" }}>Free</span>
            </div>
          </div>
          <div className={`radio ${selectedMethod === 'cod' ? 'selected' : ''}`} onClick={() => handleSelectMethod('cod')}>
            <div>
              <input
                type='radio'
                name='shippingMethod'
                value='cod'
                checked={selectedMethod === 'cod'}
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
      {selectedMethod === 'prepaid' &&
        (<div style={{ display: "flex", alignItems: "center", gap: "0.5em", marginTop: "25px" }}>
          <CiCircleInfo style={{ color: "red", fontSize: "25px" }} />
          <span style={{ fontStyle: "italic", padding: 0, margin: 0 }}>Copy this 4000003560000008 in order to test Payment</span>
        </div>)}
    </section>
  );
};
