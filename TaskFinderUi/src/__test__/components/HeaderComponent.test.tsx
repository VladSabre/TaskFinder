import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Header from '../../components/header/HeaderComponent';

describe('Header component tests', () => {
    it('Callback is called on add new task click', () => {
        // Arrange
        const onSearchPerformed = jest.fn<void, [string]>();
        const onAddClicked = jest.fn();
        const onImportClicked = jest.fn();

        // Act
        const screen = render(<Header onSearchPerformed={onSearchPerformed}
            onAddClicked={onAddClicked}
            onImportClicked={onImportClicked} />);

        screen.getByText('Add new task').click();

        // Assert
        expect(onAddClicked).toBeCalledTimes(1);
    });

    it('Callback is called on import task from a file click', () => {
        // Arrange
        const onSearchPerformed = jest.fn<void, [string]>();
        const onAddClicked = jest.fn();
        const onImportClicked = jest.fn();

        // Act
        const screen = render(<Header onSearchPerformed={onSearchPerformed}
            onAddClicked={onAddClicked}
            onImportClicked={onImportClicked} />);

        screen.getByText('Import task from a file').click();

        // Assert
        expect(onImportClicked).toBeCalledTimes(1);
    });

    it('Callback is called on search typed', async () => {
        // Arrange
        const onSearchPerformed = jest.fn<void, [string]>();
        const onAddClicked = jest.fn();
        const onImportClicked = jest.fn();

        // Act
        const screen = render(<Header onSearchPerformed={onSearchPerformed}
            onAddClicked={onAddClicked}
            onImportClicked={onImportClicked} />);

        expect(screen.getByRole('textbox')).toBeInTheDocument();

        //fireEvent.change(screen.getByRole('textbox'), { target: { value: 'task' } });
        await waitFor(() => userEvent.type(screen.getByRole('textbox'), 'task2'));

        // Assert
        await waitFor(() => expect(onSearchPerformed).toBeCalled());
        expect(onSearchPerformed).toBeCalledTimes(1);
        expect(onSearchPerformed).toBeCalledWith('task');
    });
});