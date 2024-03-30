import { render, screen } from '@testing-library/react';
import ProfileManagement from '../ProfileManagement';

test('renders form labels', () => {
    render(<ProfileManagement />);

    const fullname_labelElement = screen.getByText(/full name/i);
    expect(fullname_labelElement).toBeInTheDocument();
    
    const address1_labelElement = screen.getByText(/address 1/i);
    expect(address1_labelElement).toBeInTheDocument();

    const address2_labelElement = screen.getByText(/address 2/i);
    expect(address2_labelElement).toBeInTheDocument();

    const city_labelElement = screen.getByText(/city/i);
    expect(city_labelElement).toBeInTheDocument();

    const state_labelElement = screen.getByText(/state/i);
    expect(state_labelElement).toBeInTheDocument();

    const zipcode_labelElement = screen.getByText(/zipcode/i);
    expect(zipcode_labelElement).toBeInTheDocument();
})