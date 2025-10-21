import { render, screen, within } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { MediaList } from '.';
import type { MediaListProps } from './types';

const mediasMock = [
	{
		id: 12547852,
		posterPath: '/',
		title: 'Filme de aventura',
		voteAverage: 8
	},
	{
		id: 12547853,
		posterPath: '/',
		title: 'Filme de ação',
		voteAverage: 4.9
	}
];

const onRedirectMock = jest.fn();

function MediaListComponent(props: Partial<MediaListProps>) {
	return (
		<MediaList
			medias={mediasMock}
			loading={false}
			onRedirect={onRedirectMock}
			onRemoveFavorite={jest.fn()}
			onAddFavorite={jest.fn()}
			{...props}
		/>
	);
}

describe('MediaList', () => {
	test('should show medias', () => {
		render(<MediaListComponent />);

		const firstMediaItem = screen.getByRole('listitem', { name: 'Filme de aventura' });

		expect(within(firstMediaItem).getByText('Filme de aventura')).toBeInTheDocument();
		expect(within(firstMediaItem).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(firstMediaItem).getByText('8.0')).toBeInTheDocument();

		const secondMediaItem = screen.getByRole('listitem', { name: 'Filme de ação' });

		expect(within(secondMediaItem).getByText('Filme de ação')).toBeInTheDocument();
		expect(within(secondMediaItem).getByRole('img', { name: 'Movie poster' })).toBeInTheDocument();
		expect(within(secondMediaItem).getByText('4.9')).toBeInTheDocument();
	});

	test('should redirect to media details when click', async () => {
		render(<MediaListComponent />);

		const mediaItem = screen.getByRole('listitem', { name: 'Filme de aventura' });

		await userEvent.click(within(mediaItem).getByRole('img', { name: 'Movie poster' }));

		expect(onRedirectMock).toHaveBeenCalledWith(mediasMock[0].id);
	});
});