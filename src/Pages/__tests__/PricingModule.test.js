import PricingModule from '../../PricingModule';

describe('PricingModule', () => {
  it('calculates pricing correctly for Texas state and gallons requested <= 1000', () => {
    const state = 'TX';
    const gallonsRequested = 500;
    const [ppg, total] = PricingModule(state, gallonsRequested);

    expect(ppg).toEqual(1.725);
    expect(total).toEqual(1050);
  });

  it('calculates pricing correctly for Texas state and gallons requested > 1000', () => {
    const state = 'TX';
    const gallonsRequested = 1500;
    const [ppg, total] = PricingModule(state, gallonsRequested);

    expect(ppg).toEqual(1.71);
    expect(total).toEqual(3375);
  });

  it('calculates pricing correctly for non-Texas state and gallons requested <= 1000', () => {
    const state = 'Other';
    const gallonsRequested = 500;
    const [ppg, total] = PricingModule(state, gallonsRequested);

    expect(ppg).toEqual(1.755);
    expect(total).toEqual(1200);
  });

  it('calculates pricing correctly for non-Texas state and gallons requested > 1000', () => {
    const state = 'Other';
    const gallonsRequested = 1500;
    const [ppg, total] = PricingModule(state, gallonsRequested);

    expect(ppg).toEqual(1.74);
    expect(total).toEqual(3825);
  });
});
