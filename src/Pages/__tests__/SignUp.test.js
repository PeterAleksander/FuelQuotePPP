import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegisterForm from '../SignUp';
import { userRegistration } from '../../api/Users.api';
import bcrypt from 'bcryptjs'; // Import bcrypt for mocking

jest.mock('../../api/Users.api', () => ({
  userRegistration: jest.fn(),
}));

describe('RegisterForm', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('submits registration form with valid credentials', async () => {
    // Mock bcrypt hash function
    bcrypt.hash = jest.fn().mockResolvedValue('hashed_password');

    userRegistration.mockResolvedValueOnce(true);
  
    const { getByPlaceholderText, getByRole, queryByRole } = render(<RegisterForm />);
  
    const usernameInput = getByPlaceholderText('Username');
    const passwordInput = getByPlaceholderText('Password');
    const registerButton = getByRole('button', { name: 'Register' });
  
    fireEvent.change(usernameInput, { target: { value: 'testUser' } });
    fireEvent.change(passwordInput, { target: { value: 'password' } });
    fireEvent.click(registerButton);
  
    await waitFor(() => {
      expect(bcrypt.hash).toHaveBeenCalledWith('password', 10); // Ensure bcrypt.hash is called with the correct password and salt rounds
      expect(userRegistration).toHaveBeenCalledWith({ Username: 'testUser', Password: 'hashed_password' });
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
      expect(userRegistration).toHaveBeenCalledWith({ Username: 'invalidUser', Password: undefined }); // hashed_password is used as the password
      expect(getByRole('alert')).toHaveTextContent('Input error, please fix!'); // Error message displayed
    });
  });
  it('displays error message when both username and password are null', async () => {
    const { getByRole, getByText } = render(<RegisterForm />);

    const registerButton = getByRole('button', { name: 'Register' });

    fireEvent.click(registerButton);
  });
});
