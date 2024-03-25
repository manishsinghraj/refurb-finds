import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';

export const ShippingInfo = ({  saveShippingInfoHandler, onFormChange }) => {
  const shippingInfo = useSelector(state => state.shipping.shippingInfo);

  const [values, setValues] = useState(shippingInfo || {
    firstname: '',
    lastname: '',
    address: '',
    zip: '',
    city: '',
    state: '',
    phone: '',
  });
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    setIsSaved(false);
    onFormChange();
  };

  useEffect(() => {

    if (Object.keys(shippingInfo).length > 0) {
      setIsSaved(true)
    } else {
      setIsSaved(false)
    }
  }, [saveShippingInfoHandler, shippingInfo])

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSaved(true); 
    saveShippingInfoHandler(values);
  };

  return (
    <>
      <section className='shipping-info'>
        <form onSubmit={handleSubmit}>
          <h3>Shipping Address</h3>
          <div className='shipping-info-name input-wrapper'>
            <input type='text' name="firstname" placeholder='First Name' id='firstname' value={values.firstname} onChange={handleChange} required={true}></input>
            <input type='text' name="lastname" placeholder='Last Name' id='lastname' value={values.lastname} onChange={handleChange} required={true}></input>
          </div>
          <div className='shipping-info-address input-wrapper'>
            <input type='text' name="address" placeholder='Address' id='address' value={values.address} onChange={handleChange} required={true}></input>
          </div>
          <div className='shipping-info-location input-wrapper'>
            <input type='text' name="zip" placeholder='Zip' id='zip' value={values.zip} onChange={handleChange} required={true}></input>
            <input type='text' name="city" placeholder='City' id='city' value={values.city} onChange={handleChange} required={true}></input>
            <input type='text' name="state" placeholder='State' id='state' value={values.state} onChange={handleChange} required={true}></input>
          </div>
          <div className='shipping-info-phone input-wrapper'>
            <input type='text' name="phone" placeholder='Phone' id='phone' value={values.phone} onChange={handleChange} required={true}></input>
          </div>
          <div className='save' >
            {isSaved ?
              <button className='btn saved-btn' >saved</button> :
              <button className='btn save-btn' >save</button>
            }
          </div>
        </form>
      </section>
    </>
  )
}
