import React from 'react';
import { render, fireEvent } from '@testing-library/react';

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

    it('Callback is called on search typed', () => {
        // Arrange
        const onSearchPerformed = jest.fn<void, [string]>();
        const onAddClicked = jest.fn();
        const onImportClicked = jest.fn();

        // Act
        const screen = render(<Header onSearchPerformed={onSearchPerformed}
            onAddClicked={onAddClicked}
            onImportClicked={onImportClicked} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'task' } })

        // Assert
        expect(onSearchPerformed).toBeCalledTimes(1);
        expect(onSearchPerformed).toBeCalledWith('task');
    });
});