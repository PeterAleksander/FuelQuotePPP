import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../SignUp';
import { userRegistration } from '../../api/Users.api';

jest.mock('../../api/Users.api', () => ({
  userRegistration: jest.fn(),
}));

describe('RegisterForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits registration form with valid credentials', async () => {
    userRegistration.mockResolvedValueOnce(true);
  
    const { getByPlaceholderText, getByRole, queryByRole } = render(<RegisterForm />);
  
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByRole('button', { name: 'Register' });
  
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(registerButton);
  
    await waitFor(() => {
      expect(userRegistration).toHaveBeenCalledWith({ Username: 'testUser', Password: 'password' });
      expect(queryByRole('alert')).not.toBeInTheDocument(); // No error message displayed
    });
  });
  

  it('displays error message for invalid credentials', async () => {
    userRegistration.mockRejectedValueOnce(new Error('Input error, please fix!'));

    const { getByPlaceholderText, getByRole } = render(<RegisterForm />);

    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByRole('button', { name: 'Register' });

    fireEvent.change(usernameInput, { target: { value: 'invalidUser' } });
    fireEvent.change(passwordInput, { target: { value: 'invalidPassword' } });
    fireEvent.click(registerButton);

    await waitFor(() => {
      expect(userRegistration).toHaveBeenCalledWith({ Username: 'invalidUser', Password: 'invalidPassword' });
      expect(getByRole('alert')).toHaveTextContent('Input error, please fix!'); // Error message displayed
    });
  });
});
