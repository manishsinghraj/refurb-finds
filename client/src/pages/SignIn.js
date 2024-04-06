import React, { useState, useEffect } from 'react'
import { FormInputs } from '../components/sign/FormInputs';
import { NavLink, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { clearError, signUser } from '../redux/user/userReducer';
import { toastNotify } from '../redux/toast/toastActions';

export const SignIn = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const error = useSelector((state) => state.userDetails.error);
  const isLoading = useSelector((state) => state.userDetails.loading);
  const userDetails = useSelector((state) => state.userDetails.userDetails);

  const [values, setValues] = useState({
    "email": "",
    "password": "",
  });

  const inputs = [
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
  ]

  useEffect(() => {
    if (!error && userDetails) {
      dispatch(toastNotify('Login Successful!', 'success'));
      setTimeout(() => {
        navigate('/home');
        window.location.reload(); // need to refresh page
      }, 2000)
    } else {
      if (error) {
        dispatch(toastNotify(error, 'error'));
        dispatch(clearError());
      }
    }
  }, [error, userDetails, navigate, dispatch]);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signUser(values));
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }

  const handleAccountCreate = () => {

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
            <button className='submit-btn'>{isLoading ? "Loading..." : "Submit"}</button>
            {/* {error && <span className='credential-error'>{error}</span>} */}
            <hr />
            <div className='create-account'>
              <span className='create-account-span'>New to RefurbFinds?</span>
              <NavLink to={'/signup'}>
                <button className='create-account-btn' onClick={handleAccountCreate}>Create Account</button>
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </section>
  )
}
