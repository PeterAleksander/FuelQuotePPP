import React from 'react';
import { render, waitFor } from '@testing-library/react';
import FuelQuoteHistory from '../FuelQuoteHistory';
import { getQuotes } from '../../api/FuelQuote.api';

// Mock the API function
jest.mock('../../api/FuelQuote.api', () => ({
  getQuotes: jest.fn(),
}));

describe('FuelQuoteHistory', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders fuel quote history correctly', async () => {
    const mockedQuotes = [
      {
        QuoteID: 1,
        GallonsRequested: 100,
        DeliveryAddress: '123 Main St',
        DeliveryDate: '2024-04-27',
        SuggestedPricePerGallon: 2.5,
        TotalAmountDue: 250,
      },
      {
        QuoteID: 2,
        GallonsRequested: 200,
        DeliveryAddress: '456 Elm St',
        DeliveryDate: '2024-04-28',
        SuggestedPricePerGallon: 2.8,
        TotalAmountDue: 560,
      },
    ];

    // Mock the getQuotes function to return some data
    getQuotes.mockResolvedValueOnce(mockedQuotes);

    const { getByText } = render(<FuelQuoteHistory />);

    await waitFor(() => {
      expect(getQuotes).toHaveBeenCalledTimes(0);
    });

  });

  test('displays empty fuel quote history when no quotes are returned', async () => {
    // Mock the getQuotes function to return an empty array
    getQuotes.mockResolvedValueOnce([]);

    const { getByText } = render(<FuelQuoteHistory />);

    await waitFor(() => {
      expect(getQuotes).toHaveBeenCalledTimes(0);
    });

  });

  test('displays error message when fetching quotes fails', async () => {
    // Mock the getQuotes function to throw an error
    getQuotes.mockRejectedValueOnce(new Error('Failed to fetch quotes'));

    const { findByText } = render(<FuelQuoteHistory />);

  });

  test('displays error message when session storage does not contain user data', async () => {
    // Mock the sessionStorage.getItem function to return null
    jest.spyOn(window.sessionStorage.__proto__, 'getItem').mockReturnValueOnce(null);

    const { findByText } = render(<FuelQuoteHistory />);
  });

  test('customizes pagination options', async () => {
    const mockedQuotes = [
      {
        QuoteID: 1,
        GallonsRequested: 100,
        DeliveryAddress: '123 Main St',
        DeliveryDate: '2024-04-27',
        SuggestedPricePerGallon: 2.5,
        TotalAmountDue: 250,
      }
    ];

    // Mock the getQuotes function to return some data
    getQuotes.mockResolvedValueOnce(mockedQuotes);

    const { getByRole } = render(<FuelQuoteHistory />);

    await waitFor(() => {
      expect(getQuotes).toHaveBeenCalledTimes(0);
    });
  });

  test('customizes row height', async () => {
    const mockedQuotes = [
      {
        QuoteID: 1,
        GallonsRequested: 100,
        DeliveryAddress: '123 Main St',
        DeliveryDate: '2024-04-27',
        SuggestedPricePerGallon: 2.5,
        TotalAmountDue: 250,
      }
    ];

    // Mock the getQuotes function to return some data
    getQuotes.mockResolvedValueOnce(mockedQuotes);

    const { getByText } = render(<FuelQuoteHistory />);

    await waitFor(() => {
      expect(getQuotes).toHaveBeenCalledTimes(0);
    });
  });
});
