
import '../Styles/FuelQuoteForm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import { getInfo } from '../api/Profile.api';
import PricingModule from '../PricingModule';


const FuelQuoteForm = () => {
  //static values
  const [state, setState] = useState('');
  const [PricePerGallon, setPricePerGallon] = useState('');
  const [TotalPrice, setTotalPrice] = useState('');
  const [DeliveryAddress, setDeliveryAddress] = useState('');
  //dynamic values
  const [GallonsRequested, setGallonsRequested] = useState('');
  const [DeliveryDate, setDeliveryDate] = useState('');

  const handleSetGallonsRequested = (event) => {
    setGallonsRequested(event.target.value);
  };
  const handleSetDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
  };

  function onClickCalculate() {
    var quotedRate = PricingModule(state, GallonsRequested)
    var total = (quotedRate*GallonsRequested);
  }

  var clientdata = [];
  var currentUserData = sessionStorage.getItem("currentUser");
  var ID;
  if (currentUserData) {
    try {
      clientdata = Object.values(JSON.parse(currentUserData));
      ID = clientdata[0];
    } catch (error) {
      // Handle JSON parsing error
      console.error("Error parsing currentUser data:", error);
    }
  }

  useEffect(() => {
    // Assuming ID is retrieved from session storage or context
    var clientdata = [];
    var currentUserData = sessionStorage.getItem("currentUser");
    clientdata = Object.values(JSON.parse(currentUserData));
    ID = clientdata[0];

    const fetchData = async () => {
      const data = await getInfo(ID);
      if (data) {
        setDeliveryAddress(data[0].Address1 || '');
        setState(data[0].State || '');
      }
    };
    fetchData();
  }, []);

  return (
    <div id="fuel-quote-form">
    <Form>
      <Form.Group className="mb-3" controlId="gallonsRequested">
        <Form.Label>Gallons Requested</Form.Label>
        <Form.Control type="double" placeholder="Enter gallons requested" onChange={handleSetGallonsRequested} required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="deliveryAddress">
        <Form.Label>Delivery Address</Form.Label>
        <Form.Control plaintext readOnly defaultValue={DeliveryAddress} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="deliveryDate">
        <Form.Label>Delivery Date</Form.Label>
        <Form.Control type="date" onChange={handleSetDeliveryDate} required />
      </Form.Group>

      {/*<Form.Group className="mb-3" controlId="suggestedPrice">
        <Form.Label>Suggested Price / Gallon</Form.Label>
        <Form.Control plaintext readOnly defaultValue="$2.75" />
  </Form.Group>

      <Form.Group className="mb-3" controlId="totalAmountDue">
        <Form.Label>Total Amount Due</Form.Label>
        <Form.Control plaintext readOnly defaultValue="$66.79" />
      </Form.Group>*/}

      <Button variant="primary" type="submit">
        Generate Quote
      </Button>
    </Form>
    </div>
  );
};

export default FuelQuoteForm;