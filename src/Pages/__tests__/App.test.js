import React from 'react';
import { render, screen } from '@testing-library/react'; // Import screen
import {
  App,
  LoginFormWithNavbar,
  FuelQuoteHistoryWithNavbar,
  ProfileManagementWithNavbar,
  FuelQuoteFormWithNavbar
} from '../../App'; // Import the functions to be tested

test('renders App component', () => {
  const { getByTestId } = render(
      <App />
  );

  // Check if the login form is rendered
  const loginForm = getByTestId('login-form');
  expect(loginForm).toBeInTheDocument();

});

test('renders FuelQuoteHistoryWithNavbar', () => {
  render(<FuelQuoteHistoryWithNavbar />);
  const fuelQuoteHistoryPage = screen.getByTestId('fuel-quote-history');
  expect(fuelQuoteHistoryPage).toBeInTheDocument();
});


test('renders FuelQuoteFormWithNavbar', () => {
  render(<FuelQuoteFormWithNavbar />);
  const fuelQuoteFormPage = screen.getByTestId('fuel-quote-form');
  expect(fuelQuoteFormPage).toBeInTheDocument();
});
