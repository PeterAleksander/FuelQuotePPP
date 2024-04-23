import * as React from "react";
import { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { Form } from 'react-bootstrap';
import Alert from "@mui/material/Alert";
import "../Styles/ProfileManagement.css"
import { updateInfo, getInfo } from "../api/Profile.api";

const states = [
    { code: 'TX', name: 'TX' },
    { code: 'Other', name: 'Other' },
    // Add other states as needed...
  ];
  
export default function ProfileManagement() {
  //alert messages
  const [showAlert1, setShowAlert1] = React.useState(false);
  const [errorMessage1, setErrorMessage1] = React.useState("");
  const [showAlertSuccess, setShowAlertSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  //hooks for profile data
  const [fullName, setFullName] = useState('');
  const [address1, setAddress1] = useState('');
  const [address2, setAddress2] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zipcode, setZipcode] = useState('');

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
        setFullName(data[0].FullName || '');
        setAddress1(data[0].Address1 || '');
        setAddress2(data[0].Address2 || '');
        setCity(data[0].City || '');
        setState(data[0].State || '');
        setZipcode(data[0].Zipcode || '');
      }
      console.log(data[0].FullName);
    };
    fetchData();
  }, []);

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
        if (formData.fullName !== "" && !(formData.fullName === "NULL" || formData.fullName === "null" || formData.fullName === "" || formData.fullName.length > 50 || formData.fullName.length <= 0)){
        truth1 = formData.fullName;
      } else if (fullName !== "") {
        truth1 = fullName;
      } else {
        truth1 = null;
      }
      if (formData.address1 !== "" && !(formData.address1 === "NULL" || formData.address1 === "null" || formData.address1 === "" || formData.address1.length > 50 || formData.address1.length <= 0)){
        truth2 = formData.address1;
      } else if (address1 !== "") {
        truth2 = address1;
      } else {
        truth2 = null;
      }   
      if (formData.address2 !== "" && !(formData.address2 === "NULL" || formData.address2 === "null" || formData.address2 === "" || formData.address2.length > 50 || formData.address2.length <= 0)){
        truth3 = formData.address2;
      } else if (address2 !== "") {
        truth3 = address2;
      } else {
        truth3 = null;
      }
      if (formData.city !== "" && !(formData.city === "NULL" || formData.city === "null" || formData.city === "" || formData.city.length > 50 || formData.city.length <= 0)){
        truth4 = formData.city;
      } else if (city !== "") {
        truth4 = city;
      } else {
        truth4 = null;
      } 
      if (formData.state === "Other"){
        truth5 = "NA";
      } else if (formData.state !== "" && !(formData.state === "NULL" || formData.state === "null" || formData.state === "" || formData.state.length > 50 || formData.state.length <= 0)) {
        truth5 = formData.state;
      } else if (state !== "") {
        truth5 = state;
      } else {
        truth5 = null;
      }
      if (formData.zipcode !== "" && !(formData.zipcode === "NULL" || formData.zipcode === "null" || formData.zipcode === "" || formData.zipcode.length > 9 || formData.zipcode.length <= 0)){
        truth6 = formData.zipcode;
      } else if (zipcode !== "") {
        truth6 = zipcode;
      } else {
        truth6 = null;
      }   
      try {
        const newInfo = { FullName: truth1, Address1: truth2, Address2: truth3, City: truth4, State: truth5, Zipcode: truth6 };
        console.log(ID);
        console.log(newInfo);  
        await updateInfo(ID,newInfo);
        setSuccessMessage("Information Saved!");
        setShowAlertSuccess(true);
        setShowAlert1(false);
        setErrorMessage1("");
      } catch (error) {
        setErrorMessage1("Error saving information");
        setShowAlert1(true);
        setShowAlertSuccess(false);
      }    
    }
  
    return (
      <div id="profile-management">
      <Form onSubmit={onClickSubmit}>
        <Form.Group className="mb-3" controlId="fullName">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            placeholder={fullName}
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
            placeholder={address1}
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
            placeholder={address2 + " (Optional Address)"} 
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
            placeholder={city}
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
            <option value="">Current State: {state + " (NA = Other)"}</option>
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
            placeholder={zipcode}
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            required
            minLength={5}
            maxLength={9}
          />
        </Form.Group>
  
        <Button variant="primary" type="submit" onClick={onClickSubmit}>
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