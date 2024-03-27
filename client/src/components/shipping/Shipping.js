import React, { useEffect, useRef, useState } from 'react'
import { ShippingInfo } from './ShippingInfo'
import { ShippingMethod } from './ShippingMethod'
import { OrderConfirmation } from './OrderConfirmation'
import { useLocation, useNavigate } from 'react-router-dom';
import { OrderSummary } from './OrderSummary'
import { saveShippingInfo } from '../../redux/shipping/shippingAction'
import { useDispatch, useSelector } from 'react-redux';
import { getSavedShippingInfo, makePayment, placeCodOrder, postShippingDetails } from '../../redux/shipping/shippingReducer';
const SHIPPING_METHOD_COD = process.env.REACT_APP_SHIPPING_METHOD_COD;
const PAYMENT_SUCCESS = process.env.REACT_APP_PAYMENT_SUCCESS;
const PAYMENT_CANCEL = process.env.REACT_APP_PAYMENT_CANCEL;
const STATUS_OK = process.env.REACT_APP_STATUS_OK;

export const Shipping = () => {
    const dispatch = useDispatch();
    const stepRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();
    const cartDetails = useSelector((state) => state.cart.cartDetails);
    const shippingMethod = useSelector((state) => state.shipping.shippingMethod);
    const shippingInfo = useSelector((state) => state.shipping.shippingInfo);
    const amount = useSelector((state) => state.shipping.amount);
    const userDetails = useSelector((state) => state.userDetails.userDetails);
    const [currentStep, setCurrentStep] = useState(1);
    const [isComplete, setIsComplete] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const queryParams = new URLSearchParams(location.search);
    const paymentStatus = queryParams.get('payment');
    const [orderPlacedDetails, setOrderPlacedDetails] = useState(null);


    useEffect(() => {
        const step = location.search ? parseInt(new URLSearchParams(location.search).get('step')) : 1;
        if (step === 1) {
            navigate(`/shipping?step=${step}`);
        }
        setCurrentStep(step);
    }, [location.search, navigate]);

    useEffect(() => {
        dispatch(getSavedShippingInfo())
    }, [dispatch])

    useEffect(() => {

        if (Object.keys(shippingInfo).length > 0) {
            setIsDisabled(false);
        } else {
            setIsDisabled(true);
        }
    }, [shippingInfo]);

    const onFormChange = (e) => {
        setIsDisabled(true);
    }

    const stepperConfig = [
        {
            name: "shipping info",
            Component: () => <ShippingInfo saveShippingInfoHandler={saveShippingInfoHandler} onFormChange={onFormChange} />
        },
        {
            name: "shipping Method",
            Component: () => <ShippingMethod />
        },
        {
            name: "Order Summary",
            Component: () => <OrderSummary />
        },
        {
            name: "Order confirmation",
            Component: () => <OrderConfirmation paymentStatus={paymentStatus} orderPlacedDetails={orderPlacedDetails} />
        },
    ]


    const [margins, setMargins] = useState({
        marginLeft: 0,
        marginRight: 0,
    });

    useEffect(() => {
        setMargins({
            marginLeft: stepRef.current[0].offsetWidth / 2,
            marginRight: stepRef.current[stepperConfig.length - 1].offsetWidth / 2,
        });
    }, [stepRef, stepperConfig.length]);

    const calculateProgressBarWidth = () => {
        return ((currentStep - 1) / (stepperConfig.length - 1)) * 100 + (currentStep === 1 || currentStep === stepperConfig.length ? 0 : 2);
    };




    const ActiveComponent = stepperConfig[currentStep - 1]?.Component




    



    const handleNext = async (e) => {
        e.preventDefault();
        if (stepperConfig[currentStep - 1]?.name === "Order Summary" && shippingMethod !== SHIPPING_METHOD_COD) {
            makePayment(cartDetails, userDetails.user._id, amount);
        } else if (stepperConfig[currentStep - 1]?.name === "Order Summary" && shippingMethod === SHIPPING_METHOD_COD) {
            const response = await dispatch(placeCodOrder());
            setOrderPlacedDetails(response);
            setCurrentStep((prevStep) => {
                return prevStep + 1
            })
        } else {
            setCurrentStep((prevStep) => {
                if (prevStep === stepperConfig.length) {
                    setIsComplete(true)
                    navigate(`/home`);
                    dispatch(postShippingDetails())
                    return prevStep
                } else {
                    const nextStep = currentStep + 1;
                    navigate(`/shipping?step=${nextStep}`);
                    return prevStep + 1;
                }
            })
        }
    }

    const handlePrevious = () => {
        const prevStep = currentStep - 1;
        navigate(`/shipping?step=${prevStep}`);

        setCurrentStep((prevStep) => {
            return prevStep - 1;
        })
    }


    const saveShippingInfoHandler = (shippingInfoData) => {
        dispatch(saveShippingInfo(shippingInfoData));
        setIsDisabled(false)
    };


    return (
        <>
            <section className='shipping'>
                <div className='shipping-container'>
                    <div className="progress-bar"
                        style={{
                            width: `calc(100%-${margins.marginLeft + margins.marginRight}px)`,
                            marginLeft: margins.marginLeft,
                            marginRight: margins.marginRight,
                        }}>
                        <div className="progress" style={{ width: `${calculateProgressBarWidth()}%` }}></div>
                    </div>
                    <div className='steps'>
                        {stepperConfig.map((step, index) => {
                            return (
                                <>
                                    <div key={step.name} className={`step ${currentStep > index + 1 || isComplete ? "complete" : ""} 
                                    ${currentStep === index + 1 ? "active" : ""}`}
                                        ref={(el) => (stepRef.current[index] = el)}>
                                        <div className='step-number'>
                                            {currentStep > index + 1 || isComplete || paymentStatus === PAYMENT_SUCCESS || (orderPlacedDetails && orderPlacedDetails.status === STATUS_OK) ? (
                                                <span>&#10003;</span> // Checkmark
                                            ) : paymentStatus === PAYMENT_CANCEL || (orderPlacedDetails && orderPlacedDetails.status !== STATUS_OK) ? (
                                                <span style={{color:"red"}}>&#10005;</span> // Cross mark
                                            ) : (
                                                index + 1
                                            )}
                                        </div>
                                        <div className='step-name'>{step.name}</div>
                                    </div>
                                </>
                            )
                        })}
                    </div>

                    <div className='step-component'>
                        <ActiveComponent />
                    </div>
                    {!isComplete &&
                        <div className='proceed'>
                            {currentStep !== 1 && (
                                <button className={`proceed-btn ${currentStep === 1 || currentStep === stepperConfig.length ? "hide" : ""}`} onClick={handlePrevious}>Back</button>
                            )}
                            <button disabled={isDisabled} className={`proceed-btn  ${isDisabled ? "disabled" : ""} ${currentStep === 1 || currentStep === stepperConfig.length ? "continue-first-step" : ""}`} onClick={handleNext}>
                                {currentStep === stepperConfig.length - 1 ? shippingMethod === SHIPPING_METHOD_COD ? "Place Order" : "Make Payment" : "Continue"}
                            </button>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}
