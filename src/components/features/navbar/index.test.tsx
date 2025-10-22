import { render, screen } from '@testing-library/react'
import { Navbar } from '.';
import { Providers } from 'src/test/providers';
import { Route, Routes, useLocation, useNavigate, useSearchParams } from 'react-router';
import userEvent from '@testing-library/user-event';
import { SearchMoviesProvider } from 'src/contexts/use-search-movies';

const userEventSetup = userEvent.setup({ delay: null });

jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate: jest.fn(),
	useLocation: jest.fn(),
	useSearchParams: jest.fn()
}));

const useNavigateMock = useNavigate as jest.Mock;
const useLocationMock = useLocation as jest.Mock;
const useSearchParamsMock = useSearchParams as jest.Mock;

const navigateMock = jest.fn();
const setSearchParamsMock = jest.fn();
const searchParamsMock = [{ get: () => '' }, setSearchParamsMock];

function NavbarComponent() {
	return (
		<Providers>
			<SearchMoviesProvider>
				<Navbar />
				<Routes>
					<Route path="/" element={<div>Página home</div>} />
					<Route path="/favorites" element={<h1>Página de favoritos</h1>} />
				</Routes>
			</SearchMoviesProvider>
		</Providers>
	);
}

describe('Navbar', () => {
	beforeEach(() => {
		useNavigateMock.mockReturnValue(navigateMock);
		useLocationMock.mockReturnValue({ pathname: '/' });
		useSearchParamsMock.mockReturnValue(searchParamsMock);

		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.clearAllMocks();
		jest.clearAllTimers();
	});

	test('should show content', () => {
		render(<NavbarComponent />);

		expect(screen.getByRole('heading', { name: /MovieDB/ })).toBeInTheDocument();
		expect(screen.getByRole('textbox', { name: 'Search movies' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
		expect(screen.getByRole('link', { name: 'Favoritos' })).toBeInTheDocument();
	});

	test('should navigate to route', async () => {
		render(<NavbarComponent />);

		await userEventSetup.click(screen.getByRole('link', { name: 'Favoritos' }))
		expect(screen.getByText('Página de favoritos')).toBeInTheDocument();

		await userEventSetup.click(screen.getByRole('link', { name: 'Home' }))
		expect(screen.getByText('Página home')).toBeInTheDocument();
	});

	test('should search movie', async () => {
		render(<NavbarComponent />);

		await userEventSetup.type(screen.getByRole('textbox', { name: 'Search movies' }), 'Naruto');

		jest.advanceTimersByTime(500);

		expect(navigateMock).toHaveBeenCalledWith('search?query=Naruto');
	});

	test('should search movie in search page', async () => {
		useSearchParamsMock.mockReturnValue([{ get: () => 'Guerra' }, searchParamsMock[1]]);
		useLocationMock.mockReturnValue({ pathname: '/search' });

		render(<NavbarComponent />);

		await userEventSetup.type(screen.getByRole('textbox', { name: 'Search movies' }), ' infinita');

		jest.advanceTimersByTime(500);

		expect(setSearchParamsMock).toHaveBeenCalledWith({ query: 'Guerra infinita' });
	});

	test('should redirect to home page if search is clear', async () => {
		useLocationMock.mockReturnValue({ pathname: '/search' });

		render(<NavbarComponent />);

		jest.advanceTimersByTime(500);

		expect(navigateMock).toHaveBeenCalledWith('/');
	});
});