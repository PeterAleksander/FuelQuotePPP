import * as React from "react";
import { useState } from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { DataGrid, gridClasses } from "@mui/x-data-grid";
import TableContainer from '@mui/material/TableContainer';
import { Form } from 'react-bootstrap';

import "../Styles/ProfileManagement.css"

const states = [
    { code: 'AL', name: 'AL' },
    { code: 'AK', name: 'AK' },
    // Add other states as needed...
  ];
  
  const ProfileManagement = () => {
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
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Here you can handle form submission, e.g., send data to server
      console.log(formData);
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
          />
        </Form.Group>
  
        <Button variant="primary" type="submit">
          Save
        </Button>
      </Form>
      </div>
    );
  };

  export default ProfileManagement;