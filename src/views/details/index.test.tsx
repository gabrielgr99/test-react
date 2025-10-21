import { render, screen } from '@testing-library/react'
import MockAdapter from 'axios-mock-adapter';
import { DetailsView } from '.';
import { addFavoriteMovie, apiClient, GetMovieByIdResponse, removeFavoriteMovie } from 'src/api';
import { getFavoriteMovieById } from 'src/api/get-favorite-movie-by-id';
import { Providers } from 'src/test/providers';
import { useParams } from 'react-router';
import userEvent from '@testing-library/user-event';
import { POSTER_PREFIX_URL } from 'src/constants/image-prefix-url';

const detailsMovieMock: GetMovieByIdResponse = {
	backdrop_path: '/',
	genres: [
		{
			id: 48913464,
			name: 'Ação'
		},
		{
			id: 48913463,
			name: 'Aventura'
		}
	],
	overview: 'Movie overview',
	poster_path: '/',
	release_date: '2025-10-21',
	title: 'Filme de ação',
	vote_average: 8
}

jest.mock('src/api/get-favorite-movie-by-id');
jest.mock('src/api/add-favorite-movie');
jest.mock('src/api/remove-favorite-movie');
jest.mock("react-router", () => ({
	...jest.requireActual("react-router"),
	useParams: jest.fn(),
}));

const getFavoriteMovieByIdMock = getFavoriteMovieById as jest.Mock;
const addFavoriteMovieMock = addFavoriteMovie as jest.Mock;
const removeFavoriteMovieMock = removeFavoriteMovie as jest.Mock;
const useParamsMock = useParams as jest.Mock;

function DetailsViewComponent() {
	return (
		<Providers>
			<DetailsView />
		</Providers>
	);
}

let mock: MockAdapter;

describe('DetailsView', () => {
	beforeEach(() => {
		mock = new MockAdapter(apiClient);

		mock.onGet('/movie/548416561').reply(200, detailsMovieMock);
		useParamsMock.mockReturnValue({ movieId: 548416561 });
		getFavoriteMovieByIdMock.mockReturnValue(false);
	});

	test('should show content', async () => {
		render(<DetailsViewComponent />);

		expect(await screen.findByRole('heading', { name: 'Filme de ação' })).toBeInTheDocument();
		expect(screen.getByRole('listitem', { name: 'Ação' })).toBeInTheDocument();
		expect(screen.getByRole('listitem', { name: 'Aventura' })).toBeInTheDocument();
		expect(screen.getByText('Data de lançamento:')).toBeInTheDocument();
		expect(screen.getByText('21 de outubro de 2025')).toBeInTheDocument();
		expect(screen.getByText('Nota TMDB:')).toBeInTheDocument();
		expect(screen.getByText('8.0')).toBeInTheDocument();
		expect(screen.getByRole('heading', { name: 'Sinopse' })).toBeInTheDocument();
		expect(screen.getByRole('paragraph', { name: 'Movie overview' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: /Adicionar aos Favoritos/ })).toBeInTheDocument();
	});

	test('should not show overview content', async () => {
		mock.onGet('/movie/548416561').reply(200, { ...detailsMovieMock, overview: '' });

		render(<DetailsViewComponent />);

		expect(await screen.findByRole('heading', { name: 'Filme de ação' })).toBeInTheDocument();
		expect(screen.queryByRole('heading', { name: 'Sinopse' })).not.toBeInTheDocument();
	});

	test('should save favorite movie', async () => {
		render(<DetailsViewComponent />);

		await userEvent.click(await screen.findByRole('button', { name: /Adicionar aos Favoritos/ }));
		expect(addFavoriteMovieMock).toHaveBeenCalledWith({
			id: 548416561,
			posterPath: `${POSTER_PREFIX_URL}${detailsMovieMock.poster_path}`,
			title: detailsMovieMock.title,
			voteAverage: detailsMovieMock.vote_average
		});
	});

	test('should remove favorite movie', async () => {
		getFavoriteMovieByIdMock.mockReturnValue({});

		render(<DetailsViewComponent />);

		await userEvent.click(await screen.findByRole('button', { name: /Remover dos Favoritos/ }));
		expect(removeFavoriteMovieMock).toHaveBeenCalledWith(548416561);
	});

	test('should show unfavorite button text', async () => {
		getFavoriteMovieByIdMock.mockReturnValue({});

		render(<DetailsViewComponent />);

		expect(await screen.findByRole('button', { name: /Remover dos Favoritos/ })).toBeInTheDocument();
	});
});