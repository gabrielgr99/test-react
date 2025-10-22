import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'
import { EmptyState } from '.';
import type { EmptyStateProps } from './types';

const onClickMock = jest.fn();

function EmptyStateComponent(props: Partial<EmptyStateProps>) {
	return (
		<EmptyState
			title='Title'
			description='Description'
			actionLabel='Action label'
			onClick={onClickMock}
			{...props}
		/>
	);
}

describe('EmptyState', () => {
	test('should show content', () => {
		render(<EmptyStateComponent />);

		expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
		expect(screen.getByRole('paragraph', { name: 'Description' })).toBeInTheDocument();
		expect(screen.getByRole('button', { name: 'Action label' })).toBeInTheDocument();
	});

	test('should call action from action button', async () => {
		render(<EmptyStateComponent />);

		await userEvent.click(screen.getByRole('button', { name: 'Action label' }))
		expect(onClickMock).toHaveBeenCalled();
	});

	test('should not show action button when do not have click action', () => {
		render(<EmptyStateComponent onClick={undefined} />);

		expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
		expect(screen.getByRole('paragraph', { name: 'Description' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Action label' })).not.toBeInTheDocument();
	});

	test('should not show action button when do not have action label', () => {
		render(<EmptyStateComponent actionLabel={undefined} />);

		expect(screen.getByRole('heading', { name: 'Title' })).toBeInTheDocument();
		expect(screen.getByRole('paragraph', { name: 'Description' })).toBeInTheDocument();
		expect(screen.queryByRole('button', { name: 'Action label' })).not.toBeInTheDocument();
	});
});