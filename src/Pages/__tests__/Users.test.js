import bcrypt from 'bcryptjs'; // Assuming this import is accessible in the test file
import { userRegistration, userLogin, profileManagement } from '../../api/Users.api';

// Mocking bcrypt.hash function
jest.mock('bcryptjs', () => ({
  hash: jest.fn((data, saltRounds) => 'hashedPassword') // Mocking bcrypt.hash to return a fixed hashed password
}));

describe('userRegistration', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('throws an error for non-200 response', async () => {
    const mockItemBody = { Username: 'testUser', Password: 'password' };

    // Mocking fetch function to simulate non-200 response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Bad request' }), // Simulate response JSON
      })
    );

    await expect(userRegistration(mockItemBody)).rejects.toThrow('Bad request'); // Expect the function to throw an error
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });

  it('registers a user successfully', async () => {
    const mockItemBody = { Username: 'testUser', Password: 'password' };

    // Mocking fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ results: {} })
      })
    );

    const result = await userRegistration(mockItemBody);

    expect(result).toBe(true); // Expect the function to return true for successful registration
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });

  it('throws an error for failed registration', async () => {
    const mockItemBody = { Username: 'testUser', Password: 'password' };

    // Mocking fetch function to simulate failure
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 400,
        json: () => Promise.resolve({ error: 'Registration failed' })
      })
    );

    await expect(userRegistration(mockItemBody)).rejects.toThrow('Registration failed'); // Expect the function to throw an error
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });
});

describe('userLogin', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('logs in a user successfully', async () => {
    const mockItemBody = { Username: 'testUser', Password: 'password' };

    // Mocking fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ results: {} })
      })
    );

    const result = await userLogin(mockItemBody);

    expect(result).toEqual({}); // Expect the function to return the user data
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });

  it('throws an error for fetch failure', async () => {
    const mockItemBody = { Username: 'testUser', Password: 'password' };

    // Mocking fetch function to simulate fetch failure
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
      })
    );

    await expect(userLogin(mockItemBody)).rejects.toThrow('Fetch error: 500'); // Expect the function to throw an error
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });

  it('returns null for invalid login credentials', async () => {
    const mockItemBody = { Username: 'testUser', Password: 'password' };

    // Mocking fetch function to simulate invalid credentials
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
      })
    );

    const result = await userLogin(mockItemBody);

    expect(result).toBeNull(); // Expect the function to return null for invalid credentials
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });
});

describe('profileManagement', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('throws an error for fetch failure', async () => {
    const mockItemBody = { info: 'user info' };

    // Mocking fetch function to simulate fetch failure
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 500,
      })
    );

    await expect(profileManagement(mockItemBody)).rejects.toThrow('Fetch error: 500'); // Expect the function to throw an error
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });

  it('saves user information successfully', async () => {
    const mockItemBody = { info: 'user info' };

    // Mocking fetch function
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ results: {} })
      })
    );

    const result = await profileManagement(mockItemBody);

    expect(result).toEqual({}); // Expect the function to return the saved user information
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });

  it('returns null for invalid login credentials', async () => {
    const mockItemBody = { info: 'user info' };

    // Mocking fetch function to simulate invalid credentials
    global.fetch = jest.fn(() =>
      Promise.resolve({
        status: 401,
      })
    );

    const result = await profileManagement(mockItemBody);

    expect(result).toBeNull(); // Expect the function to return null for invalid credentials
    expect(fetch).toHaveBeenCalledTimes(1); // Expect fetch function to be called once
  });
});
