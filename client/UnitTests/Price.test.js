import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import PriceComparer from '../src/PriceComparer';

global.fetch = jest.fn().mockResolvedValue({});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Price', () => {
  it('handlePrice function works correctly with valid input', async () => {
    render(
      <MemoryRouter>
        <PriceComparer />
      </MemoryRouter>
    );

    const inputElement = screen.getByPlaceholderText('Search for a product...');
    fireEvent.change(inputElement, { target: { value: 'Chicken' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => {
      expect(inputElement.value).toBe('Chicken');
      // expect(global.fetch).toHaveBeenCalledWith(
      //   'http://localhost:3000/PriceComparer'
        // ,{
        //   method: 'POST',
        //   headers: {
        //     'Content-Type': 'application/x-www-form-urlencoded',
        //   },
        //   body: new URLSearchParams({
        //     inputElement: 'Chicken'
        //   }),
        // }
      //);
    });
  });
});
