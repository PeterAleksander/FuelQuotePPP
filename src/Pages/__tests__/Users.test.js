import { userRegistration, userLogin, profileManagement } from '../../api/Users.api';

describe('User API', () => {
  let originalFetch;

  beforeAll(() => {
    originalFetch = global.fetch;
  });

  afterAll(() => {
    global.fetch = originalFetch;
  });

  beforeEach(() => {
    global.fetch = jest.fn(); // Mocking fetch function
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('userRegistration', () => {
    it('makes a POST request with correct data', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 200,
      });

      await userRegistration(itemBody);

      expect(fetch).toHaveBeenCalledWith('https://fuel.college:3001/api/usercredentials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemBody),
      });
    });

    it('returns true on success', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 200,
      });

      const result = await userRegistration(itemBody);

      expect(result).toEqual(true);
    });

    it('returns false on conflict', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 409, // Mock conflict response
      });

      const result = await userRegistration(itemBody);

      expect(result).toEqual(false);
    });

    it('throws error on failure', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 500, // Mock failed response
      });

      await expect(userRegistration(itemBody)).rejects.toThrowError();
    });
  });

  describe('userLogin', () => {
    it('makes a POST request with correct data', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ results: 'success' }), // Mock successful response
      });

      await userLogin(itemBody);

      expect(fetch).toHaveBeenCalledWith('https://fuel.college:3001/api/usercredentials/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemBody),
      });
    });

    it('returns data on success', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ results: 'success' }), // Mock successful response
      });

      const data = await userLogin(itemBody);

      expect(data).toEqual('success');
    });

    it('returns null on unauthorized login', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 401, // Mock unauthorized response
      });

      const result = await userLogin(itemBody);

      expect(result).toEqual(null);
    });

    it('throws error on failure', async () => {
      const itemBody = { username: 'testUser', password: 'password' };

      global.fetch.mockResolvedValueOnce({
        status: 500, // Mock failed response
      });

      await expect(userLogin(itemBody)).rejects.toThrowError();
    });
  });

  describe('profileManagement', () => {
    it('makes a POST request with correct data', async () => {
      const itemBody = { /* Some data for profile management */ };

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ results: 'success' }), // Mock successful response
      });

      await profileManagement(itemBody);

      expect(fetch).toHaveBeenCalledWith('https://fuel.college:3001/api/usercredentials/information', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemBody),
      });
    });

    it('returns data on success', async () => {
      const itemBody = { /* Some data for profile management */ };

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ results: 'success' }), // Mock successful response
      });

      const data = await profileManagement(itemBody);

      expect(data).toEqual('success');
    });

    it('returns null on unauthorized access', async () => {
      const itemBody = { /* Some data for profile management */ };

      global.fetch.mockResolvedValueOnce({
        status: 401, // Mock unauthorized response
      });

      const result = await profileManagement(itemBody);

      expect(result).toEqual(null);
    });

    it('throws error on failure', async () => {
      const itemBody = { /* Some data for profile management */ };

      global.fetch.mockResolvedValueOnce({
        status: 500, // Mock failed response
      });

      await expect(profileManagement(itemBody)).rejects.toThrowError();
    });
  });
});
