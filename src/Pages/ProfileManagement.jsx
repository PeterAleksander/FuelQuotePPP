import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Form } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import { profileManagement } from "../api/Users.api";

import "../Styles/ProfileManagement.css"

const states = [
    { code: 'AL', name: 'AL' },
    { code: 'AK', name: 'AK' },
    // Add other states as needed...
  ];
  
  const ProfileManagement = () => {
    const [showAlert1, setShowAlert1] = React.useState(false);
    const [errorMessage1, setErrorMessage1] = React.useState("");

    const [formData, setFormData] = useState({
      fullName: '',
      address1: '',
      address2: '',
      city: '',
      state: '',
      zipcode: '',
    });
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };
  
    const handleSubmit = async e => {
      e.preventDefault();
      if(formData["fullName"] === 'NULL' || formData["fullName"] === 'null' || formData["fullName"] === '' || formData["fullName"].length > 50 || formData["fullName"].length <= 0) {
        formData["fullName"] = null;
      }
      if(formData["address1"] === 'NULL' || formData["address1"] === 'null' || formData["address1"] === '' || formData["address1"].length > 100 || formData["address1"].length <= 0) {
        formData["address1"] = null;
      }
      if(formData["address2"] === 'NULL' || formData["address2"] === 'null' || formData["address2"] === '' || formData["address2"].length > 100) {
        formData["address2"] = null;
      }
      if(formData["city"] === 'NULL' || formData["city"] === 'null' || formData["city"] === '' || formData["city"].length > 100 || formData["city"].length <= 0) {
        formData["city"] = null;
      }
      if(formData["state"] === 'NULL' || formData["state"] === 'null' || formData["state"] === '' || formData["state"].length <= 0) {
        formData["state"] = null;
      }
      if(formData["zipcode"] === 'NULL' || formData["zipcode"] === 'null' || formData["zipcode"] === '' || formData["zipcode"].length > 9 || formData["zipcode"].length < 5 || parseInt(formData["zipcode"]).isInteger) {
        formData["zipcode"] = null;
      }
      try {
        console.log(formData);
        await profileManagement(formData);
        setShowAlert1(false);
        setErrorMessage1("");
      } catch (error) {
        setErrorMessage1("Input error, please fix!");
        setShowAlert1(true);
      } 
    };
  
    return (
      <div id="profile-management">
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter full name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="address1">
          <Form.Label>Address 1</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address"
            name="address1"
            value={formData.address1}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="address2">
          <Form.Label>Address 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter address (optional)"
            name="address2"
            value={formData.address2}
            onChange={handleChange}
            maxLength={100}
          />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="city">
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            maxLength={100}
          />
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="state">
          <Form.Label>State</Form.Label>
          <Form.Select
            name="state"
            value={formData.state}
            onChange={handleChange}
            required
          >
            <option value="">Select state</option>
            {states.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
  
        <Form.Group className="mb-3" controlId="zipcode">
          <Form.Label>Zipcode</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter zipcode"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={9}
          />
        </Form.Group>
  
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Save
        </Button>

        {showAlert1 && (
          <Alert
            severity="error"
            onClose={() => setShowAlert1(false)}
            sx={{ marginTop: 2, marginBottom: -2 }}
            >
            {errorMessage1}
          </Alert>
        )}
      </Form>
      </div>
    );
  };

  export default ProfileManagement;