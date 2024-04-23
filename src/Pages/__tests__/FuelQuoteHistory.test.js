import React from 'react';
import { render, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import FuelQuoteHistory from '../FuelQuoteHistory';

jest.mock('../../api/FuelQuote.api', () => ({
  getQuotes: jest.fn().mockImplementation((ID) => {
    return Promise.resolve([
      { 
        ClientID: ID,
        GallonsRequested: 4353,
        DeliveryAddress: '123 Main St',
        DeliveryDate: '2024-04-12',
        SuggestedPricePerGallon: '1.71',
        TotalAmountDue: '7443.63'
      }
    ]);
  }),
}));

describe('FuelQuoteHistory', () => {
  it('renders fuel quote history component correctly', () => {
    const { getByText, getByRole } = render(<FuelQuoteHistory />);

    // Check if the main heading is present
    expect(getByText('Fuel Quote History')).toBeInTheDocument();

    // Check if the table container is present
    const tableGrid = getByRole('grid');
    expect(tableGrid).toBeInTheDocument();

    // Check if the table headers are present
    const tableHeaders = within(tableGrid).getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(3); // Ensure all headers are present
    expect(tableHeaders.some(header => header.textContent.includes('Delivery Address'))).toBeTruthy();
  });
});
