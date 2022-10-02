/* eslint-disable no-unused-vars */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';

describe('Flag component tests', () => {
    // [true, false].forEach((selected) => it(`Flag is rendered and ${selected ? '' : 'un'}selected`, () => {
    //     // Arrange
    //     const onSelect = jest.fn();

    //     // Act
    //     const screen = render(<Flag selected={selected} onSelect={onSelect} />);

    //     // Assert
    //     const element = screen.getByRole('checkbox');
    //     selected ? expect(element).toBeChecked() : expect(element).not.toBeChecked();
    // }));

    // [true, false].forEach((selected) => it('callback is called on click', () => {
    //     // Arrange
    //     const onSelect = jest.fn();

    //     // Act
    //     const screen = render(<Flag selected={selected} onSelect={onSelect} />);
    //     const element = screen.getByRole('checkbox');
    //     fireEvent.click(element);

    //     // Assert
    //     expect(onSelect).toBeCalledTimes(1);
    //     expect(onSelect).toBeCalledWith(!selected);
    // }));
});