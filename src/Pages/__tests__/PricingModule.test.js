import PricingModule from '../../PricingModule';

describe('PricingModule', () => {
  afterEach(() => {
    jest.clearAllMocks(); // Clear mocks after each test
  });

  it('calculates pricing correctly for TX state and gallons requested > 1000', async () => {
    const state = 'TX';
    const gallonsRequested = 1500;
    const ID = 123;

    const mockResponseData = { hasHistory: true };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponseData),
    });

    const [ppg, total] = await PricingModule(state, gallonsRequested, ID);

    // Assertions
    expect(ppg).toBeCloseTo(1.695, 2);
    expect(total).toBeCloseTo(2542.5, 2);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://fuel.college:3001/api/hasFuelQuotes/${ID}`);
  });

  it('calculates pricing correctly for non-TX state and gallons requested <= 1000', async () => {
    const state = 'CA';
    const gallonsRequested = 800;
    const ID = 456;

    const mockResponseData = { hasHistory: false };
    jest.spyOn(global, 'fetch').mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponseData),
    });

    const [ppg, total] = await PricingModule(state, gallonsRequested, ID);

    // Assertions
    expect(ppg).toBeCloseTo(1.755, 2);
    expect(total).toBeCloseTo(1404, 2);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://fuel.college:3001/api/hasFuelQuotes/${ID}`);
  });

  it('throws an error if fetch fails', async () => {
    const state = 'TX';
    const gallonsRequested = 1200;
    const ID = 789;

    jest.spyOn(global, 'fetch').mockRejectedValueOnce(new Error('Failed to fetch'));

    await expect(PricingModule(state, gallonsRequested, ID)).rejects.toThrow('Failed to fetch');
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`https://fuel.college:3001/api/hasFuelQuotes/${ID}`);
  });
});
