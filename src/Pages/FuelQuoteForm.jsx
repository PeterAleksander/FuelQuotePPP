import '../Styles/FuelQuoteForm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { useState, useEffect } from "react";
import { Form, Button } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import { getInfo } from '../api/Profile.api';
import PricingModule from '../PricingModule';
import { sendQuote } from '../api/FuelQuote.api';

const FuelQuoteForm = () => {
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [state, setState] = useState('');
  const [PricePerGallon, setPricePerGallon] = useState('');
  const [TotalPrice, setTotalPrice] = useState('');
  const [DeliveryAddress, setDeliveryAddress] = useState('');
  const [GallonsRequested, setGallonsRequested] = useState('');
  const [DeliveryDate, setDeliveryDate] = useState('');
  const [showQuoteResult, setShowQuoteResult] = useState(false);
  const [isQuoteButtonDisabled, setIsQuoteButtonDisabled] = useState(true);

  useEffect(() => {
    const currentUserData = sessionStorage.getItem("currentUser");
    if (currentUserData) {
      try {
        const clientdata = Object.values(JSON.parse(currentUserData));
        const ID = clientdata[0];
        getInfo(ID).then(data => {
          if (data) {
            setDeliveryAddress(data[0].Address1 || '');
            setState(data[0].State || '');
            checkFormFields(GallonsRequested, DeliveryDate, data[0].State, data[0].Address1);
          }
        });
      } catch (error) {
        console.error("Error parsing currentUser data:", error);
      }
    }
  }, []);

  const handleSetGallonsRequested = (event) => {
    const newGallons = event.target.value;
    setGallonsRequested(newGallons);
    checkFormFields(newGallons, DeliveryDate, state, DeliveryAddress);
  };

  const handleSetDeliveryDate = (event) => {
    const newDate = event.target.value;
    setDeliveryDate(newDate);
    checkFormFields(GallonsRequested, newDate, state, DeliveryAddress);
  };

  async function onClickCalculate() {
    const currentUserData = sessionStorage.getItem("currentUser");
    if (currentUserData) {
      const clientdata = Object.values(JSON.parse(currentUserData));
      const ID = clientdata[0];
      const result = await PricingModule(state, GallonsRequested, ID);
      setPricePerGallon(result[0]);
      setTotalPrice(result[1]);
      console.log(DeliveryDate);
      setShowQuoteResult(true);
    }
  }

  const onClickSubmit = async () => {
    const currentUserData = sessionStorage.getItem("currentUser");
    var ID;
    if (currentUserData) {
      try {
        const clientdata = Object.values(JSON.parse(currentUserData));
        ID = clientdata[0];
      } catch (error) {
        console.error("Error parsing currentUser data:", error);
      }
    }
    try {
      const newQuote = {
        ClientID: ID,
        GallonsRequested: GallonsRequested,
        DeliveryAddress: DeliveryAddress,
        DeliveryDate: DeliveryDate,
        SuggestedPricePerGallon: PricePerGallon,
        TotalAmountDue: TotalPrice
      };
      console.log(newQuote);
      await sendQuote(newQuote);
      setSuccessMessage("Quote sent to history!");
      setShowAlertSuccess(true);
    } catch (error) {
    }
  }

  const checkFormFields = (gallons, date, stateValue, address) => {
    const isValidGallons = gallons > 0 && gallons < 1000000 && gallons.length > 0;
    const isFormFullyFilled = isValidGallons && date && stateValue && address;
    setIsQuoteButtonDisabled(!isFormFullyFilled);
  };

  return (
    <div id="fuel-quote-form">
      <Form>
        <Form.Group className="mb-3" controlId="gallonsRequested">
          <Form.Label>Gallons Requested</Form.Label>
          <Form.Control type="number" placeholder="Enter gallons requested" onChange={handleSetGallonsRequested} required />
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
            <Form.Group className="mb-3" controlId="suggestedPrice" style={{ marginTop: 40 }}>
              <Form.Label>Suggested Price / Gallon</Form.Label>
              <Form.Control plaintext readOnly style={{ textAlign: 'center' }} defaultValue={`$${PricePerGallon}`} />
            </Form.Group>

            <Form.Group className="mb-3" controlId="totalAmountDue">
              <Form.Label>Total Amount Due</Form.Label>
              <Form.Control plaintext readOnly style={{ textAlign: 'center' }} defaultValue={`$${TotalPrice}`} />
            </Form.Group>

            <Button variant="primary" type="button" onClick={onClickSubmit}>
              Submit Quote
            </Button>
          </>
        )}
        {showAlertSuccess && (
          <Alert
          severity="success"  // This sets the color to green or similar successful color
          onClose={() => setShowAlertSuccess(false)}
          sx={{ marginTop: 2, marginBottom: -2 }}
          >
          {successMessage}
          </Alert>
        )}
      </Form>
    </div>
  );
};

export default FuelQuoteForm;