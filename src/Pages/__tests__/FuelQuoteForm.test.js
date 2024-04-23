import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FuelQuoteForm from '../FuelQuoteForm';

jest.mock('../../api/Profile.api', () => ({
  getInfo: jest.fn().mockImplementation((ID) => {
    return Promise.resolve([
      { 
        FullName: 'John Doe',
        Address1: '123 Main St',
        Address2: 'Apt 101',
        City: 'Anytown',
        State: 'TX',
        Zipcode: '12345'
      }
    ]);
  }),
}));

jest.mock('../../api/FuelQuote.api', () => ({
  sendQuote: jest.fn().mockResolvedValue({}),
}));

describe('FuelQuoteForm', () => {
  beforeEach(() => {
    sessionStorage.setItem('currentUser', JSON.stringify({ id: '1' }));
  });

  afterEach(() => {
    sessionStorage.clear();
  });

  test('renders form with initial values', async () => {
    const { getByLabelText, getByText } = render(<FuelQuoteForm />);
    
    await waitFor(() => {
      expect(getByLabelText('Gallons Requested')).toBeInTheDocument();
      expect(getByLabelText('Delivery Address')).toHaveValue('123 Main St');
      expect(getByLabelText('Delivery Date')).toBeInTheDocument();
      expect(getByText('Generate Quote')).toBeDisabled();
    });
  });

  test('calculates quote when "Generate Quote" button is clicked', async () => {
    const { getByLabelText, getByText } = render(<FuelQuoteForm />);
    
    fireEvent.change(getByLabelText('Gallons Requested'), { target: { value: 100 } });
    expect(getByLabelText('Gallons Requested')).toHaveValue(100);
    fireEvent.change(getByLabelText('Delivery Date'), { target: { value: '2024-04-12' } });
    expect(getByLabelText('Delivery Date')).toHaveValue('2024-04-12');
    expect(getByText('Generate Quote')).toBeEnabled();
    fireEvent.click(getByText('Generate Quote'));

    await waitFor(() => {
      expect(getByText('Suggested Price / Gallon')).toBeInTheDocument();
      expect(getByText('Total Amount Due')).toBeInTheDocument();
    });
  });

  test('submits quote when "Submit Quote" button is clicked', async () => {
    const { getByLabelText, getByText } = render(<FuelQuoteForm />);
    
    fireEvent.change(getByLabelText('Gallons Requested'), { target: { value: 100 } });
    fireEvent.change(getByLabelText('Delivery Date'), { target: { value: '2024-04-12' } });
    expect(getByText('Generate Quote')).toBeEnabled();
    fireEvent.click(getByText('Generate Quote'));

    await waitFor(() => {
      fireEvent.click(getByText('Submit Quote'));
    });

    expect(sendQuote).toHaveBeenCalled();
  });
});
