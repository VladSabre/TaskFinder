import React from 'react';
import { render } from '@testing-library/react';
import App from '../../../components/app/AppComponent';

test('renders learn react link', () => {
    const screen = render(<App />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeInTheDocument();
});
