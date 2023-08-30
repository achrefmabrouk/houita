import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Store } from '../Store';
import CheckoutSteps from '../components/CheckoutSteps';


export default function ShippingAddressScreen() {
  const navigate = useNavigate();
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    fullBox,
    userInfo,
    cart: { shippingAddress },
  } = state;
  const [fullName, setFullName] = useState(shippingAddress.fullName || '');
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ''
  );
  const [tel, setTel] = useState(shippingAddress.tel || '');
/*   useEffect(() => {
    if (!userInfo) {
      navigate('/shipping');
    }
  }, [userInfo, navigate]); */
  const [country, setCountry] = useState(shippingAddress.country || '');
  const [step, setStep] = useState(0);
  const submitHandler = (e) => {
    e.preventDefault();
    ctxDispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: {
        fullName,
        address,
        city,
        postalCode,
        tel
        
      },
    });
    localStorage.setItem(
      'shippingAddress',
      JSON.stringify({
        fullName,
        address,
        city,
        postalCode,
        tel
        
       
      })
    );
    navigate('/placeorder')
    //setStep(1)
  };

 useEffect(() => {
    ctxDispatch({ type: 'SET_FULLBOX_OFF' });
  }, [ctxDispatch, fullBox])


  
    return (
    
      <div style={{marginTop:'100px'}}>
        <Helmet>
          <title>Livraison</title>
        </Helmet>
  
        <CheckoutSteps step2 ></CheckoutSteps>
        
        <div className="container small-container">
          <h1 className="my-3">Remplir le formulaire</h1>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="fullName">
              <Form.Label>Nom et prenom</Form.Label>
              <Form.Control
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="address">
              <Form.Label>Adresse</Form.Label>
              <Form.Control
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="city">
              <Form.Label>Cité</Form.Label>
              <Form.Control
                value={city}
                onChange={(e) => setCity(e.target.value)}
                required
              />
            </Form.Group>
  
  
            <Form.Group className="mb-3" controlId="postalCode">
              <Form.Label>Numéro du téléphone </Form.Label>
              <Form.Control
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
              />
            </Form.Group>
            
            <div className="mb-3" >
              <Button variant="primary" type="submit">
                Continuez
              </Button>
              <Button 
              style={{marginLeft:'30px'}}
              variant="primary"
              onClick={()=>{navigate('/cart')}}
              >
                Retour
              </Button>
            </div>
          </Form>
        </div>
      </div>
  
    )
}
