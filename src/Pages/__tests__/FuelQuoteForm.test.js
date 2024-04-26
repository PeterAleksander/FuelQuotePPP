import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FuelQuoteForm from '../FuelQuoteForm';
import { getInfo } from '../../api/Profile.api';
import { sendQuote } from '../../api/FuelQuote.api';
import PricingModule from '../../PricingModule';

// Mock the API functions
jest.mock('../../api/Profile.api', () => ({
  getInfo: jest.fn(),
}));

jest.mock('../../api/FuelQuote.api', () => ({
  sendQuote: jest.fn(),
}));

jest.mock('../../PricingModule', () => jest.fn());

describe('FuelQuoteForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders fuel quote form correctly', () => {
    const { getByLabelText, getByText } = render(<FuelQuoteForm />);
    
    expect(getByLabelText(/Gallons Requested/i)).toBeInTheDocument();
    expect(getByLabelText(/Delivery Address/i)).toBeInTheDocument();
    expect(getByLabelText(/Delivery Date/i)).toBeInTheDocument();
    expect(getByText(/Generate Quote/i)).toBeInTheDocument();
  });

  test('updates state when gallons requested changes', () => {
    const { getByLabelText } = render(<FuelQuoteForm />);
    const gallonsInput = getByLabelText(/Gallons Requested/i);

    fireEvent.change(gallonsInput, { target: { value: '500' } });

    expect(gallonsInput.value).toBe('500');
  });

  test('displays quote result and enables submit button when quote is generated', async () => {
    const mockedInfo = {
      Address1: '123 Main St',
      State: 'TX',
    };

    const mockedQuoteResult = [2.5, 500];

    getInfo.mockResolvedValueOnce([mockedInfo]);
    PricingModule.mockResolvedValueOnce(mockedQuoteResult);

    const { getByText, getByLabelText } = render(<FuelQuoteForm />);
    const gallonsInput = getByLabelText(/Gallons Requested/i);
    const deliveryDateInput = getByLabelText(/Delivery Date/i);
    const generateQuoteButton = getByText(/Generate Quote/i);

    fireEvent.change(gallonsInput, { target: { value: '500' } });
    fireEvent.change(deliveryDateInput, { target: { value: '2024-04-30' } });
    fireEvent.click(generateQuoteButton);

  });

  test('submits quote successfully', async () => {
    const mockedQuote = {
      ClientID: 1,
      GallonsRequested: '500',
      DeliveryAddress: '123 Main St',
      DeliveryDate: '2024-04-30',
      SuggestedPricePerGallon: 2.5,
      TotalAmountDue: 500,
    };

    sendQuote.mockResolvedValueOnce();

    const { getByText } = render(<FuelQuoteForm />);

    });
  });

  test('displays error message when sending quote fails', async () => {
    sendQuote.mockRejectedValueOnce(new Error('Failed to send quote'));

    const { getByText } = render(<FuelQuoteForm />);

});

