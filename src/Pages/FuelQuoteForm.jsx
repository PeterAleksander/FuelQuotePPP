
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
  const [showQuoteResult, setShowQuoteResult] = useState(false); // Visibility control for quote results
  const [isQuoteButtonDisabled, setIsQuoteButtonDisabled] = useState(true);

  const handleSetGallonsRequested = (event) => {
    setGallonsRequested(event.target.value);
    checkFormFields(GallonsRequested, DeliveryDate, state, DeliveryAddress);
  };
  const handleSetDeliveryDate = (event) => {
    setDeliveryDate(event.target.value);
    checkFormFields(GallonsRequested, DeliveryDate, state, DeliveryAddress);
  };

  function onClickCalculate() {
    var result = PricingModule(state, GallonsRequested)
    setPricePerGallon(result[0]);
    setTotalPrice(result[1]); 
    setShowQuoteResult(true); // Show quote results
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

  const checkFormFields = (gallons, date, stateValue, address) => {
    const isValidGallons = gallons > 0 && gallons < 1000000;
    const isFormFullyFilled = isValidGallons && date && stateValue && address;
    setIsQuoteButtonDisabled(!isFormFullyFilled);
  };

  // Ensure to update isQuoteButtonDisabled when DeliveryAddress and state change
  useEffect(() => {
    checkFormFields(GallonsRequested, DeliveryDate, state, DeliveryAddress);
  }, [DeliveryAddress, state]);

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

      <Button variant="primary" type="button" disabled={isQuoteButtonDisabled} onClick={onClickCalculate}>
          Generate Quote
        </Button>

        {showQuoteResult && (
          <>
            <Form.Group className="mb-3" controlId="suggestedPrice" style={{marginTop: 40}}>
              <Form.Label>Suggested Price / Gallon</Form.Label>
              <Form.Control plaintext readOnly style={{textAlign: 'center'}} defaultValue={`$${PricePerGallon}`} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="totalAmountDue">
              <Form.Label>Total Amount Due</Form.Label>
              <Form.Control plaintext readOnly style={{textAlign: 'center'}} defaultValue={`$${TotalPrice}`} />
            </Form.Group>

            <Button variant="primary" type="submit">
            Submit Quote
            </Button>
          </>
        )}

    </Form>
    </div>
  );
};

export default FuelQuoteForm;