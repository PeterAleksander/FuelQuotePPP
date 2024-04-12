import { getQuotes, sendQuote } from '../../api/FuelQuote.api';

describe('Fuel Quotes API', () => {
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

  describe('getQuotes', () => {
    it('makes a GET request with correct ID', async () => {
      const ID = '123';

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: 'quotes' }), // Mock successful response
      });

      await getQuotes(ID);

      expect(fetch).toHaveBeenCalledWith('https://fuel.college:3001/api/fuelquotes/123');
    });

    it('returns data on success', async () => {
      const ID = '123';

      global.fetch.mockResolvedValueOnce({
        status: 200,
        json: async () => ({ data: 'quotes' }), // Mock successful response
      });

      const data = await getQuotes(ID);

      expect(data).toEqual('quotes');
    });

    it('returns null on unauthorized access', async () => {
      const ID = '123';

      global.fetch.mockResolvedValueOnce({
        status: 401, // Mock unauthorized response
      });

      const result = await getQuotes(ID);

      expect(result).toEqual(null);
    });

    it('throws error on failure', async () => {
      const ID = '123';

      global.fetch.mockResolvedValueOnce({
        status: 500, // Mock failed response
      });

      await expect(getQuotes(ID)).rejects.toThrowError();
    });
  });

  describe('sendQuote', () => {
    it('makes a POST request with correct data', async () => {
      const itemBody = { /* Some data for sending quote */ };

      global.fetch.mockResolvedValueOnce({
        status: 200,
      });

      await sendQuote(itemBody);

      expect(fetch).toHaveBeenCalledWith('https://fuel.college:3001/api/fuelquotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemBody),
      });
    });

    it('returns true on success', async () => {
      const itemBody = { /* Some data for sending quote */ };

      global.fetch.mockResolvedValueOnce({
        status: 200,
      });

      const result = await sendQuote(itemBody);

      expect(result).toEqual(true);
    });

    it('returns false on conflict', async () => {
      const itemBody = { /* Some data for sending quote */ };

      global.fetch.mockResolvedValueOnce({
        status: 409, // Mock conflict response
      });

      const result = await sendQuote(itemBody);

      expect(result).toEqual(false);
    });

    it('throws error on failure', async () => {
      const itemBody = { /* Some data for sending quote */ };

      global.fetch.mockResolvedValueOnce({
        status: 500, // Mock failed response
      });

      await expect(sendQuote(itemBody)).rejects.toThrowError();
    });
  });
});
