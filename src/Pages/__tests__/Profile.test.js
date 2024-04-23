import { updateInfo, getInfo } from '../../api/Profile.api';

describe('Profile API', () => {
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

  describe('updateInfo', () => {
    it('makes a PUT request with correct data', async () => {
      const ID = '123';
      const itemBody = { FullName: 'John Doe', Address: '123 Street' };

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ results: 'success' }), // Mock successful response
      });

      await updateInfo(ID, itemBody);

      expect(fetch).toHaveBeenCalledWith('https://fuel.college:3001/api/clientinfo/123', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemBody),
      });
    });

    it('returns data on success', async () => {
      const ID = '123';
      const itemBody = { FullName: 'John Doe', Address: '123 Street' };

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ results: 'success' }), // Mock successful response
      });

      const data = await updateInfo(ID, itemBody);

      expect(data).toEqual('success');
    });

    it('throws error on failure', async () => {
      const ID = '123';
      const itemBody = { FullName: 'John Doe', Address: '123 Street' };

      global.fetch.mockResolvedValueOnce({
        status: 500, // Mock failed response
      });

      await expect(updateInfo(ID, itemBody)).rejects.toThrowError();
    });
  });

  describe('getInfo', () => {
    it('makes a GET request', async () => {
      const ID = '123';

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: 'info' }), // Mock successful response
      });

      await getInfo(ID);

      expect(fetch).toHaveBeenCalledWith('https://fuel.college:3001/api/clientinfo/123');
    });

    it('returns data on success', async () => {
      const ID = '123';

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: 'info' }), // Mock successful response
      });

      const data = await getInfo(ID);

      expect(data).toEqual('info');
    });

    it('throws error on failure', async () => {
      const ID = '123';

      global.fetch.mockResolvedValueOnce({
        status: 500, // Mock failed response
      });

      await expect(getInfo(ID)).rejects.toThrowError();
    });
  });
});
