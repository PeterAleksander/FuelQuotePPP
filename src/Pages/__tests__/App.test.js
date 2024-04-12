import React from 'react';
import { render } from '@testing-library/react';
import App from '../../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    const { getByText } = render(<App />);
    
    // Assert that the Home link is rendered
    const homeLink = getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });
});
