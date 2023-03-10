import './orders.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../context/ThemeContext';
import { Button, Alert } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import axios from '../../../api/axios';

import Order from './Order';
import Loading from '../../loading/Loading';

const Orders = (props) => {
  const authProvider = useOutletContext();
  const [carts, setCarts] = useState([]);
  const [cartStatus, setCartStatus] = useState('');
  const [role, setRole] = useState('');
  const { darkMode } = useContext(ThemeContext);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { auth } = authProvider;
    setRole(auth.role);
  }, []);

  useEffect(() => {
    handleGetCart();
  }, [role, cartStatus]);

  const productsSelector = (cart) => {
    if (role === 'chef') {
      const chefProducts = cart.products.filter(product => product?.category?.name !== 'drink');
      return chefProducts;
    } else if (role === 'bartender') {
      const bartenderProducts = cart.products.filter(product => product?.category?.name === 'drink');
      return bartenderProducts;
    } else if (role === 'admin') return cart.products;
  };

  const handleGetCart = async () => {
    try {
      const { data } = await axios('/cart/allCarts');
      let activeCarts = [];
      if (role === 'admin') {
        activeCarts = data.allCarts.filter(cart => cart.cartStatus === 'bought' || cart.cartStatus === 'preparing');
        setCarts(activeCarts);
      } else if (role === 'chef' || role === 'bartender') {
        activeCarts = data.allCarts.filter(cart => cart.cartStatus === 'preparing');
        setCarts(activeCarts);
      }
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleCancelCart = async (id) => {
    try {
      await axios.patch('/cart/cancel/' + id);
      setCartStatus('cancelled');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handlePreparingCart = async (id) => {
    try {
      await axios.patch('/cart/preparing/' + id);
      setCartStatus('preparing');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handledeliveredCart = async (id) => {
    try {
      await axios.patch('/cart/delivered/' + id);
      setCartStatus('delivered');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className={darkMode ? 'main-orders-container-dark mt-2' : 'main-orders-container mt-2'}>
      <h2 className={darkMode ? 'text-center orders-title-dark my-2' : 'text-center orders-title my-2'}>all orders</h2>
      {
        errorMessage &&
        <Alert variant='danger'>{errorMessage}</Alert>
      }
      <div>
        {
          carts?.length ? (
            carts?.map((cart, index) => {
              let productsShow = productsSelector(cart);
              if (productsShow.length !== 0) {
                return (
                  <div className={'order-container py-3 m-2 ' + cart.cartStatus} key={index}>
                    <div className='overflow-table-container'>
                      <div className='d-flex flex-column ps-2 mb-2'>
                        <span>Owner: {cart?.owner?.username}</span>
                        <span>Status: {cart?.cartStatus}</span>
                      </div>
                      <div className='cart-table-container'>
                        <Order
                          productsShow={productsShow}
                          id={cart._id}
                          role={role}
                          cartStatus={cart.cartStatus}
                          setCartStatus={setCartStatus}
                        />
                      </div>
                    </div>
                    <div className='mt-3'>
                      {
                        cart?.cartStatus === 'bought' &&
                        <div className='button-cart-container button-buy-cart-container flex-column flex-sm-row'>
                          <Button variant='warning' onClick={() => handlePreparingCart(cart._id)}>Preparing</Button>
                          <Button variant='danger' onClick={() => handleCancelCart(cart._id)}>Cancel</Button>
                        </div>
                      }
                      {
                        cart?.cartStatus === 'preparing' && role === 'admin' &&
                        <div className='button-cart-container button-buy-cart-container flex-column flex-sm-row'>
                          <Button
                            variant='success'
                            onClick={() => handledeliveredCart(cart._id)}
                          >
                            Delivered
                          </Button>
                          <Button
                            variant='danger'
                            onClick={() => handleCancelCart(cart._id)}
                          >
                            Cancel
                          </Button>
                        </div>
                      }
                      {
                        cart?.cartStatus === 'cancelled' &&
                        <p>This order was cancelled by the administrator</p>
                      }
                      {
                        cart?.cartStatus === 'delivered' &&
                        <p>This order was delivered</p>
                      }
                    </div>
                  </div>
                );
              } else return <></>;
            }
            )
          ) :
            (
              <Loading />
            )
        }
      </div>
    </div>
  );
};

export default Orders;
