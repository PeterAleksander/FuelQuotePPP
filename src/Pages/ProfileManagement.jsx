import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import { Form } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import { profileManagement } from "../api/Users.api";

import "../Styles/ProfileManagement.css"

const states = [
    { code: 'TX', name: 'TX' },
    { code: 'Other', name: 'Other' },
    // Add other states as needed...
  ];
  
export default function ProfileManagement() {
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

    const onClickSubmit = async event => {
      event.preventDefault();
        var truth1, truth2, truth3, truth4, truth5, truth6;
      if (formData.fullName === "NULL" || formData.fullName === "null" || formData.fullName === "" || formData.fullName.length > 50 || formData.state.length <= 0) {
        truth1 = null;
      } else {
        truth1 = formData.fullName;
      }
      if (formData.address1 === "NULL" || formData.address1 === "null" || formData.address1 === "" || formData.address1.length > 100 || formData.state.length <= 0) {
        truth2 = null;
      } else {
        truth2 = formData.address1;
      }      
      if (formData.address2 === "NULL" || formData.address2 === "null" || formData.address2 === "" || formData.address2.length > 100 || formData.state.length <= 0) {
        truth3 = null;
      } else {
        truth3 = formData.address2;
      }   
      if (formData.city === "NULL" || formData.city === "null" || formData.city === "" || formData.city.length > 100) {
        truth4 = null;
      } else {
        truth4 = formData.city;
      }   
      if (formData.state === "NULL" || formData.state === "null" || formData.state === "" || formData.state.length <= 0) {
        truth5 = null;
      } else {
        truth5 = formData.state;
      }   
      if (formData.zipcode === "NULL" || formData.zipcode === "null" || formData.zipcode === "" || formData.zipcode.length > 9 || formData.zipcode.length < 5 || !parseInt(formData.zipcode).isInteger) {
        truth6 = null;
      } else {
        truth6 = formData.zipcode;
      }     
      try {
        const newInfo = { FullName: truth1, Address1: truth2, Address2: truth3, City: truth4, State: truth5, Zipcode: truth6 };
        console.log(newInfo);
        await profileManagement(newInfo);
        setShowAlert1(false);
        setErrorMessage1("");
    } catch {
        setErrorMessage1("Input error, please fix!");
        setShowAlert1(true);
      }

    }
  
    return (
      <div id="profile-management">
      <Form onSubmit={onClickSubmit}>
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