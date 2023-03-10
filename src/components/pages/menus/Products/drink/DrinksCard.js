import './drinks.css';
import React, { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '../../../../../context/ThemeContext';
import axios from '../../../../../api/axios';
import { Card, Form } from 'react-bootstrap';

import Counter from '../../../../counter/Counter';
import Beer from '../../../../../assets/icons/Beer';

const DrinksCard = ({ drink, setError, setMessageModalShow, setMessageToShow }) => {
  const [count, setCount] = useState(1);
  const [cart, setCart] = useState({});
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    if (cart.name) {
      postCart();
    }
  }, [cart]);

  const postCart = async () => {
    try {
      const { data } = await axios.post('/cart', cart);
      setMessageToShow(data.message);
      setMessageModalShow(true);
    } catch (error) {
      setError(error.response.data.message);
      setMessageModalShow(true);
    }
  };

  const addToCart = (e) => {
    e.preventDefault();
    const preferences = {};
    for (const target of e.target) {
      if (target.type === 'radio') {
        if (target.id === '2' && target.checked === true) {
          preferences.size = '1 lt';
          preferences.price = drink.price;
          target.checked = false;
        } else {
          preferences.size = '500cc';
          preferences.price = drink.price / 2;
        }
      }
    }
    preferences.name = drink.name;
    preferences.quantity = count;
    preferences.category = drink.category;
    preferences.toppings = [];
    preferences.removed = [];
    setCount(1);
    e.target[0].checked = true;
    setCart(preferences);
  };
  return (
    <div>
      <Card className={ darkMode ? 'drink-card-dark' : 'drink-card' }>
        <div className='card-image-container' style={{
          backgroundImage: `url(${drink.image})`
        }}
        ></div>
        <Card.Header className={ darkMode ? 'card-header-dark' : 'card-header'}>
          <Card.Title >
            <h5 className='product-card-title'>
              {drink.name.toString().toLowerCase()}
            </h5>
            <b className='product-price'>
                            ${drink.price} { drink?.hasAlcohol && <Beer />}
            </b>
          </Card.Title>
        </Card.Header>
        <Card.Body className='p-0'>
          <Form onSubmit={addToCart}>
            <div className="size-container">
              <span>Size: </span>
              <Form.Check
                inline
                label={`500cc ($${drink.price / 2})`}
                name="size"
                type='radio'
                defaultChecked
                id='1'
              />
              <Form.Check
                inline
                label={`1lt ($${drink.price})`}
                name="size"
                type='radio'
                id='2'
              />
              <div className='addCartButton'>
                <Counter
                  count={count}
                  setCount={setCount}
                />
              </div>
            </div>
            <div className={ darkMode ? 'text-center button-footer-dark' : 'text-center button-footer' }>
              <button className='icon-btn drinks-icon-btn add-btn' type='submit'>
                <div className="add-icon"></div>
                <div className="btn-txt">Add to Cart</div>
              </button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DrinksCard;
