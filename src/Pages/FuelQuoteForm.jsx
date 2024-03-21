
import '../Styles/FuelQuoteForm.css';
import "bootstrap/dist/css/bootstrap.min.css";
import React from 'react';
import { Form, Button } from 'react-bootstrap';

const FuelQuoteForm = () => {
  return (
    <div id="fuel-quote-form">
    <Form>
      <Form.Group className="mb-3" controlId="gallonsRequested">
        <Form.Label>Gallons Requested</Form.Label>
        <Form.Control type="number" placeholder="Enter gallons requested" required />
      </Form.Group>

      <Form.Group className="mb-3" controlId="deliveryAddress">
        <Form.Label>Delivery Address</Form.Label>
        <Form.Control plaintext readOnly defaultValue="4300 Martin Luther King Blvd, Houston, TX 77204" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="deliveryDate">
        <Form.Label>Delivery Date</Form.Label>
        <Form.Control type="date" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="suggestedPrice">
        <Form.Label>Suggested Price / Gallon</Form.Label>
        <Form.Control plaintext readOnly defaultValue="$2.75" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="totalAmountDue">
        <Form.Label>Total Amount Due</Form.Label>
        <Form.Control plaintext readOnly defaultValue="$66.79" />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    </div>
  );
};

export default FuelQuoteForm;