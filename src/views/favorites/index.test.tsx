import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { FavoritesView } from '.';
import { getFavoriteMovies, GetFavoriteMoviesResponse } from 'src/api';
import { useNavigate } from 'react-router';
import { Providers } from 'src/test/providers';

const favoriteMoviesMock: GetFavoriteMoviesResponse[] = [
	{
		id: 12547852,
		posterPath: '/',
		title: 'Filme de aventura',
		voteAverage: 8
	},
	{
		id: 12547853,
		posterPath: '/',
		title: 'Filme de ficção',
		voteAverage: 4.9
	}
];

jest.mock('src/api/get-favorite-movies');
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate: jest.fn(),
}));

const getFavoriteMoviesMock = getFavoriteMovies as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const navigateMock = jest.fn();

function FavoritesViewComponent() {
	return (
		<Providers>
			<FavoritesView />
		</Providers>
	);
}

describe('FavoritesView', () => {
	beforeEach(() => {
		useNavigateMock.mockReturnValue(navigateMock);
		getFavoriteMoviesMock.mockReturnValue(favoriteMoviesMock);
	});

	test('should show favorite movies ordered', async () => {
		render(<FavoritesViewComponent />);

		expect(await screen.findByLabelText('Ordenar por:')).toHaveTextContent('Título (A-Z)');

		const allFavoriteMovies = screen.getAllByRole('listitem');

		expect(within(allFavoriteMovies[0]).getByText('Filme de aventura')).toBeInTheDocument();
		expect(within(allFavoriteMovies[0]).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(allFavoriteMovies[0]).getByText('8.0')).toBeInTheDocument();

		expect(within(allFavoriteMovies[1]).getByText('Filme de ficção')).toBeInTheDocument();
		expect(within(allFavoriteMovies[1]).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(allFavoriteMovies[1]).getByText('4.9')).toBeInTheDocument();
	});

	test('should redirect to movie details when click', async () => {
		render(<FavoritesViewComponent />);

		const mediaItem = await screen.findByRole('listitem', { name: 'Filme de aventura' });

		await userEvent.click(within(mediaItem).getByRole('img', { name: 'Movie poster' }));

		expect(navigateMock).toHaveBeenCalledWith(`/movie/${favoriteMoviesMock[0].id}`);
	});

	test('should show empty state', async () => {
		getFavoriteMoviesMock.mockReturnValue([]);

		render(<FavoritesViewComponent />);

		expect(await screen.findByRole('heading', { name: 'Nenhum filme favorito ainda' })).toBeInTheDocument();
		expect(screen.getByRole('paragraph', { name: 'Comece explorando filmes populares e adicione seus favoritos!' })).toBeInTheDocument();

		await userEvent.click(screen.getByRole('button', { name: 'Explorar Filmes' }));
		expect(navigateMock).toHaveBeenCalledWith('/');
	});
});