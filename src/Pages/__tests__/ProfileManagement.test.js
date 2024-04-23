import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import ProfileManagement from '../ProfileManagement';
import { getInfo, updateInfo } from '../../api/Profile.api';

jest.mock('../../api/Profile.api', () => ({
  getInfo: jest.fn(),
  updateInfo: jest.fn(),
}));

describe('ProfileManagement component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits form with valid data', async () => {
    const fakeUserData = {
      FullName: 'John Doe',
      Address1: '123 Main St',
      City: 'Anytown',
      State: 'TX',
      Zipcode: '12345',
    };

    const fakeUserId = 'fakeUserId';
    sessionStorage.setItem('currentUser', JSON.stringify([fakeUserId]));

    getInfo.mockResolvedValueOnce([fakeUserData]);

    const { getByLabelText, getByText } = render(<ProfileManagement />);

    fireEvent.change(getByLabelText('Full Name'), { target: { value: 'John Doe' } });
    fireEvent.change(getByLabelText('Address 1'), { target: { value: '123 Main St' } });
    fireEvent.change(getByLabelText('City'), { target: { value: 'Anytown' } });
    fireEvent.change(getByLabelText('State'), { target: { value: 'TX' } });
    fireEvent.change(getByLabelText('Zipcode'), { target: { value: '12345' } });

    fireEvent.click(getByText('Save'));

    await waitFor(() => {
      expect(updateInfo).toHaveBeenCalledWith(fakeUserId, {
        FullName: 'John Doe',
        Address1: '123 Main St',
        Address2: null,
        City: 'Anytown',
        State: 'TX',
        Zipcode: '12345',
      });
    });
  });

  it('handles form submission with invalid data', async () => {
    // Mock user ID
    const fakeUserId = 'fakeUserId';
    sessionStorage.setItem('currentUser', JSON.stringify([fakeUserId]));
  
    // Render component
    const { getByText, queryByText } = render(<ProfileManagement />);
  
    // Click save button without filling out the form
    fireEvent.click(getByText('Save'));
  
    // Wait for error message to appear
    await waitFor(() => {
      // Assert that the error message is displayed
      expect(queryByText(/input error, please fix/i)).toBeInTheDocument();
    });
  
    // Assert that updateInfo is not called
    expect(updateInfo).not.toHaveBeenCalled();
  });
  
});
