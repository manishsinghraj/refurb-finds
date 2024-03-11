import React, { useState } from 'react'
import { FormInputs } from '../components/sign/FormInputs';
import { NavLink } from 'react-router-dom'

export const SignIn = () => {

  const [values, setValues] = useState({
    "email": "",
    "password": "",
  });

  const [inputs, setInputs] = useState([
    {
      id: 1,
      name: "email",
      type: "email",
      placeholder: "Email",
      label: "Email",
      errorMessage: "its should be valid email!",
      required: true,
    },

    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },

  ])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  console.log(values);

  const handleAccountCreate = () => {
    setInputs(inputs.map(input => ({
      ...input,
      required: false
    })));

    setValues({
      ...values,
      email: '',
      password: ''
    });
  };




  return (
    <section className='signin'>
      <div className='signin-container'>
        <div className='form-container'>
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            {inputs.map((input) => (
              <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange}></FormInputs>
            ))}
            <button>Submit</button>
            <hr />
            <div className='create-account'>
              <span className='create-account-span'>New to RefurbFinds?</span>
              <NavLink to={'/signup'}>
                <button className='create-account-button' onClick={handleAccountCreate}>Create Account</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
