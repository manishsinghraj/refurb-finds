import React, { useEffect } from 'react'
import Header from '../header/Header'
import { Footer } from '../footer/Footer'
import { Routers } from '../../router/Routers'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/data/dataReducer'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { toastNotify } from '../../redux/toast/toastActions';


export const Layout = () => {
  const dispatch = useDispatch();
  const toastMessage = useSelector((state) => state.toast.toastMessage);
  const toastType = useSelector((state) => state.toast.toastType);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    if (toastType === 'success') {
      toast.success(toastMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    } else if (toastType === 'error') {
      toast.error(toastMessage, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }else if (toastType === 'info') {
      toast.info(toastMessage, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

    return () => {
      dispatch(toastNotify(null, null))
    }
  }, [toastMessage, toastType, dispatch ]);

  return (
    <>
      <ToastContainer limit={1} />
      <Header />
      <div className='main'>
        <Routers />
      </div>
      <Footer />
    </>
  )
}
