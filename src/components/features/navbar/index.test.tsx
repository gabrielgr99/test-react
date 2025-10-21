import { render, screen } from '@testing-library/react'
import { Navbar } from '.';
import { Providers } from 'src/test/providers';
import { Route, Routes } from 'react-router';
import userEvent from '@testing-library/user-event';

function NavbarComponent() {
	return (
		<Providers>
			<Navbar />
			<Routes>
				<Route path="/" element={<div>Página home</div>} />
        		<Route path="/favorites" element={<h1>Página de favoritos</h1>} />
			</Routes>
		</Providers>
	);
}

describe('Navbar', () => {
	test('should show content', () => {
		render(<NavbarComponent />);

		expect(screen.getByRole('heading', { name: /MovieDB/ })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Search movies' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Favoritos' })).toBeInTheDocument();
	});

	test('should navigate to route', async () => {
		render(<NavbarComponent />);

		await userEvent.click(screen.getByRole('link', { name: 'Favoritos' }))
		expect(screen.getByText('Página de favoritos')).toBeInTheDocument();

		await userEvent.click(screen.getByRole('link', { name: 'Home' }))
		expect(screen.getByText('Página home')).toBeInTheDocument();
	});
});