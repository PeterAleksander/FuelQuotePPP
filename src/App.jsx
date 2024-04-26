import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
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
export {
  App,
  LoginFormWithNavbar,
  FuelQuoteHistoryWithNavbar,
  ProfileManagementWithNavbar,
  FuelQuoteFormWithNavbar
};


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Route for the login page */}
          <Route path='/' element={<LoginFormWithNavbar />} />
          {/* Routes for other pages */}
          <Route path='/register' element={<RegisterForm />} />
          <Route path='/fuelquotehistory' element={<FuelQuoteHistoryWithNavbar />} />
          <Route path='/profilemanagement' element={<ProfileManagementWithNavbar />} />
          <Route path='/fuelquoteform' element={<FuelQuoteFormWithNavbar />} />
        </Routes>
      </Router>
    </div>
  );
}

function LoginFormWithNavbar() {
  // We're on the login page, so we don't render the navbar
  return (
    <>
      <LoginForm />
    </>
  );
}

function FuelQuoteHistoryWithNavbar() {
  // We're on a page other than login, so render the navbar
  return (
    <>
      <NavbarComponent />
      <FuelQuoteHistory />
    </>
  );
}

function ProfileManagementWithNavbar() {
  // We're on a page other than login, so render the navbar
  return (
    <>
      <NavbarComponent />
      <ProfileManagement />
    </>
  );
}

function FuelQuoteFormWithNavbar() {
  // We're on a page other than login, so render the navbar
  return (
    <>
      <NavbarComponent />
      <FuelQuoteForm />
    </>
  );
}

function NavbarComponent() {
  return (
    <nav>
      <div className="wrapper">
        <div className="logo"></div>
        <input type="radio" name="slider" id="menu-btn" />
        <input type="radio" name="slider" id="close-btn" />
        <ul className="nav-links">
          <label htmlFor="close-btn" className="btn close-btn"><i className="fas fa-times"></i></label>
          {/* Navbar options */}
          <li><a href="/profilemanagement">Profile Management</a></li>
          <li data-testid="fuel-quote-form"><a href="/fuelquoteform">Fuel Quote Form</a></li>
          <li data-testid="fuel-quote-history"><a href="/fuelquotehistory">Fuel Quote History</a></li>
        </ul>
        <label htmlFor="menu-btn" className="btn menu-btn"><i className="fas fa-bars"></i></label>
      </div>
    </nav>
  );
}



export default App;
