import { render, screen, within } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter';
import { userEvent } from '@testing-library/user-event'
import { HomeView } from '.';
import { apiClient, getFavoriteMovies, GetPopularMoviesResponse } from 'src/api';
import { useNavigate } from 'react-router';
import { Providers } from 'src/test/providers';
import { GET_MOVIES_LANGUAGES } from 'src/constants/languages';

const popularMoviesMock: GetPopularMoviesResponse = {
	page: 1,
	total_pages: 1,
	total_results: 2,
	results: [
		{
			id: 12547852,
			poster_path: '/',
			title: 'Filme de aventura',
			vote_average: 8
		},
		{
			id: 12547853,
			poster_path: '/',
			title: 'Filme de ação',
			vote_average: 4.9
		}
	]
};

jest.mock('src/api/get-favorite-movies');
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useNavigate: jest.fn(),
}));

const getFavoriteMoviesMock = getFavoriteMovies as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const navigateMock = jest.fn();

function HomeViewComponent() {
	return (
		<Providers>
			<HomeView />
		</Providers>
	);
}

let mock: MockAdapter;

describe('HomeView', () => {
	beforeEach(() => {
		mock = new MockAdapter(apiClient);

		mock.onGet('/movie/popular').reply(200, popularMoviesMock);
		useNavigateMock.mockReturnValue(navigateMock);
		getFavoriteMoviesMock.mockReturnValue([]);
	});

	test('should show movies', async () => {
		render(<HomeViewComponent />);

		const firstMediaItem = await screen.findByRole('listitem', { name: 'Filme de aventura' });

		expect(within(firstMediaItem).getByText('Filme de aventura')).toBeInTheDocument();
		expect(within(firstMediaItem).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(firstMediaItem).getByText('8.0')).toBeInTheDocument();

		const secondMediaItem = screen.getByRole('listitem', { name: 'Filme de ação' });

		expect(within(secondMediaItem).getByText('Filme de ação')).toBeInTheDocument();
		expect(within(secondMediaItem).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(secondMediaItem).getByText('4.9')).toBeInTheDocument();
	});

	test('should redirect to movie details when click', async () => {
		render(<HomeViewComponent />);

		const mediaItem = await screen.findByRole('listitem', { name: 'Filme de aventura' });

		await userEvent.click(within(mediaItem).getByRole('img', { name: 'Movie poster' }));

		expect(navigateMock).toHaveBeenCalledWith(`/movie/${popularMoviesMock.results[0].id}`);
	});

	test('should show empty state', async () => {
		mock.onGet('/movie/popular').reply(200, { ...popularMoviesMock, total_results: 0, results: [] });

		const spyGet = jest.spyOn(apiClient, 'get');

		render(<HomeViewComponent />);

		expect(await screen.findByRole('heading', { name: 'Sem filmes por aqui' })).toBeInTheDocument();
		expect(screen.getByRole('paragraph', { name: 'Ops, acho que tivemos um erro, por favor, tente novamente...' })).toBeInTheDocument();


		await userEvent.click(screen.getByRole('button', { name: 'Tentar novamente' }));
		expect(spyGet).toHaveBeenCalledWith('/movie/popular', {
			params: {
				language: GET_MOVIES_LANGUAGES.PT_BR,
				page: 1
			}
		});
	});
});