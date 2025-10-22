import { render, screen, within } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter';
import { userEvent } from '@testing-library/user-event'
import { SearchView } from '.';
import { apiClient, getFavoriteMovies, GetPopularMoviesResponse } from 'src/api';
import { useNavigate, useSearchParams } from 'react-router';
import { Providers } from 'src/test/providers';
import { GET_MOVIES_LANGUAGES } from 'src/constants/languages';

const searchMoviesMock: GetPopularMoviesResponse = {
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
	useSearchParams: jest.fn()
}));

const getFavoriteMoviesMock = getFavoriteMovies as jest.Mock;
const useSearchParamsMock = useSearchParams as jest.Mock;
const useNavigateMock = useNavigate as jest.Mock;
const navigateMock = jest.fn();
const searchParamsMock = [{ get: () => 'Termo pesquisado' }];

function SearchViewComponent() {
	return (
		<Providers>
			<SearchView />
		</Providers>
	);
}

let mock: MockAdapter;

describe('SearchView', () => {
	beforeEach(() => {
		mock = new MockAdapter(apiClient);

		mock.onGet('/search/movie').reply(200, searchMoviesMock);
		useSearchParamsMock.mockReturnValue(searchParamsMock);
		useNavigateMock.mockReturnValue(navigateMock);
		getFavoriteMoviesMock.mockReturnValue([]);
	});

	test('should show content', async () => {
		render(<SearchViewComponent />);

		const heading = await screen.findByRole('heading')
		expect(within(heading).getByText('Resultados para:')).toBeInTheDocument();
		expect(within(heading).getByText('"Termo pesquisado"')).toBeInTheDocument();
		expect(screen.getByRole('paragraph', { name: 'Buscando...' })).toBeInTheDocument();
		expect(await screen.findByRole('paragraph', { name: 'Encontrados 2 filmes' })).toBeInTheDocument();

		const firstMediaItem = screen.getByRole('listitem', { name: 'Filme de aventura' });

		expect(within(firstMediaItem).getByText('Filme de aventura')).toBeInTheDocument();
		expect(within(firstMediaItem).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(firstMediaItem).getByText('8.0')).toBeInTheDocument();

		const secondMediaItem = screen.getByRole('listitem', { name: 'Filme de ação' });

		expect(within(secondMediaItem).getByText('Filme de ação')).toBeInTheDocument();
		expect(within(secondMediaItem).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(secondMediaItem).getByText('4.9')).toBeInTheDocument();
	});

	test('should redirect to movie details when click', async () => {
		render(<SearchViewComponent />);

		const mediaItem = await screen.findByRole('listitem', { name: 'Filme de aventura' });

		await userEvent.click(within(mediaItem).getByRole('img', { name: 'Movie poster' }));

		expect(navigateMock).toHaveBeenCalledWith(`/movie/${searchMoviesMock.results[0].id}`);
	});
	
		test('should show empty state', async () => {
			mock.onGet('/search/movie').reply(200, { ...searchMoviesMock, total_results: 0, results: [] });
	
			const spyGet = jest.spyOn(apiClient, 'get');
	
			render(<SearchViewComponent />);
	
			expect(await screen.findByRole('heading', { name: 'Nenhum filme encontrado' })).toBeInTheDocument();
			expect(screen.getByRole('paragraph', { name: 'Ops, não econtramos nenhum filme com esse nome, tente outro!' })).toBeInTheDocument();
		
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});
});