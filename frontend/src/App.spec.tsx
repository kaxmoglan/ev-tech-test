import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './app';

test(`renders home screen`, () => {
	render(<App />);
	const element = screen.getByText(/Welcome to Max's EV Tech Test/i);
	expect(element).toBeInTheDocument();
});
