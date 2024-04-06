import React, { useEffect, useState } from 'react'
import { FormInputs } from '../components/sign/FormInputs';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearError, registerUser } from '../redux/user/userReducer';
import 'react-toastify/dist/ReactToastify.css';
import { toastNotify } from '../redux/toast/toastActions';

export const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const error = useSelector((state) => state.userDetails.error);
    const isLoading = useSelector((state) => state.userDetails.loading);
    const userDetails = useSelector((state) => state.userDetails.userDetails);

    const [values, setValues] = useState({
        "name": "",
        "email": "",
        "phone": "",
        "password": "",
        "confirmPassword": ""
    });

    const inputs = [
        {
            id: 1,
            name: "name",
            type: "text",
            placeholder: "name",
            label: "name",
            errorMessage: "",
            required: true,
        },
        {
            id: 2,
            name: "email",
            type: "email",
            placeholder: "Email",
            label: "Email",
            errorMessage: "its should be valid email!",
            required: true,
        },
        {
            id: 3,
            name: "phone",
            type: "phone",
            placeholder: "Phone",
            label: "Phone",
            errorMessage: "its should be valid phone number!",
            required: true,
        },
        {
            id: 4,
            name: "password",
            type: "password",
            placeholder: "Password",
            label: "Password",
            errorMessage: "Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character!",
            pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[ !@#$%^&* ])[a-zA-Z0-9!@#$%^&*]{8,20}$`,
            required: true,
        },
        {
            id: 5,
            name: "confirmPassword",
            type: "password",
            placeholder: "ConfirmPassword",
            label: "ConfirmPassword",
            errorMessage: "Passwords dont match",
            pattern: values.password,
            required: true,
        }
    ]


    useEffect(() => {
        if (!error && userDetails) { // If there's no error and user exists
            dispatch(toastNotify('Account Created', 'success'));
            setTimeout(() => {
                navigate('/home');
            }, 2000)
        } else {
            if (error) {
                dispatch(toastNotify(error, 'error'));
                dispatch(clearError());
            }
        }
    }, [error, userDetails, navigate, dispatch]);

    const handleRegisterUser = (e) => {
        e.preventDefault();
        dispatch(registerUser(values));
    }

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }

    const handleSignIn = () => {
        setValues({
            ...values,
            name: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: ""
        });
    };


    return (
        <>
            <section className='signup'>
                <div className='signup-container'>
                    <div className='form-container'>
                        <form onSubmit={handleRegisterUser}>
                            <h1>Create Account</h1>
                            {inputs.map((input) => (
                                <FormInputs key={input.id} {...input} value={values[input.name]} onChange={onChange}></FormInputs>
                            ))}
                            <button className='submit-btn'>{isLoading ? "Loading..." : "Submit"}</button>
                            <hr />
                            <div className='signin-account'>
                                <span className='signin-account-span'>Already have an account?</span>
                                <NavLink to={'/signin'}>
                                    <button className='signin-account-btn' onClick={handleSignIn}>Sign In</button>
                                </NavLink>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            {/* {error && <Error error={error} />} */}
        </>
    )
}
