import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingMethod } from '../../redux/shipping/shippingAction';

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
            <input
              type='radio'
              name='shippingMethod'
              value='prepaid'
              checked={selectedMethod === 'prepaid'}
              onChange={() => { }}
            />
            <label>Prepaid - Net banking, UPI, Debit/Credit Card</label>
          </div>
          <div className={`radio ${selectedMethod === 'cod' ? 'selected' : ''}`} onClick={() => handleSelectMethod('cod')}>
            <input
              type='radio'
              name='shippingMethod'
              value='cod'
              checked={selectedMethod === 'cod'}
              onChange={() => { }}
            />
            <label>Cash on Delivery</label>
          </div>
        </div>
      </form>
    </section>
  );
};
