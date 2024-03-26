import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Profile from '../src/Profile';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Profile', () => {
  it('handleProfile function works correctly with valid input', async () => {
    jest.spyOn(Axios, 'post').mockResolvedValue({
      data: { message: 'Profile' },
    });

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const input = screen.getByPlaceholderText('Enter Ingredient Name');
    fireEvent.change(input, { target: { value: 'Chicken' } });

    const saveButton = screen.getByText('Save');
    fireEvent.click(saveButton);

    await waitFor(() => {
      expect(input.value).toBe('Chicken');
    });
  });
});
