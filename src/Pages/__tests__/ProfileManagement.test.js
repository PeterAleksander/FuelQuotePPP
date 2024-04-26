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
  it('displays success message after successful save', async () => {
    const mockUserData = {
      FullName: 'John Doe',
      Address1: '123 Main St',
      Address2: '',
      City: 'Anytown',
      State: 'CA',
      Zipcode: '12345',
    };
    getInfo.mockResolvedValueOnce([mockUserData]);
    updateInfo.mockResolvedValueOnce();
  
    const { getByText } = render(<ProfileManagement />);
  
    fireEvent.click(getByText('Save'));
  
    await waitFor(() => {
      expect(updateInfo).toHaveBeenCalledTimes(1);
      expect(getByText('Information Saved!')).toBeInTheDocument();
    });
  });
});
