import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import FuelQuoteHistory from './Pages/FuelQuoteHistory';
import LoginForm from './Pages/LoginForm';
import ProfileManagement from './Pages/ProfileManagement';
import FuelQuoteForm from './Pages/FuelQuoteForm';
import RegisterForm from './Pages/SignUp';

function App() {
  return (
    <div className="App">
      {/* This is where we add the routes to our pages.
          First import the path of the file (as done above for FuelQuoteHistory.jsx
          Then add a Route with the same format as below (within the <Routes> tags)
          The default page should have a path of '/' which makes it render when the site first opens */}
      <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/profilemanagement">Profile Management</Nav.Link>
              <Nav.Link href="/fuelquoteform">Fuel Quote</Nav.Link>
              <Nav.Link href="/fuelquotehistory">Fuel Quote History</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
        <Routes>
          <Route path='/register' element={<RegisterForm/>}></Route>
          <Route path='/' element={<LoginForm/>}></Route>
          <Route path='/fuelquotehistory' element={<FuelQuoteHistory/>}></Route>
          <Route path='/profilemanagement' element={<ProfileManagement/>}></Route>
          <Route path='/fuelquoteform' element={<FuelQuoteForm/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
