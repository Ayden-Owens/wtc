import React from 'react';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import Axios from 'axios';
import { MemoryRouter } from 'react-router-dom';
import Dietary from '../src/DietaryRestrictions';

global.fetch = jest.fn().mockResolvedValue({});

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Price', () => {
  it('handlePrice function works correctly with valid input', async () => {
    const healthLabels = ['Mediterranean','Vegetarian', 'Vegan', 'Gluten-Free'];
    const { queryByText, getByText } = render(
      <MemoryRouter>
        <Dietary healthLabels={healthLabels}/>
      </MemoryRouter>
    );

    //expect(queryByText('Your Saved Restrictions')).toBeInTheDocument();
    // expect(queryByText('Mediterranean')).toBeNull();
    // expect(queryByText('Vegetarian')).toBeNull();
    // expect(queryByText('Vegan')).toBeNull();
    // expect(queryByText('Gluten-Free')).toBeNull();

    // Simulate click on each label
    healthLabels.forEach((label) => {
      const labelElement = getByText(label);
      fireEvent.click(labelElement);
      fireEvent.click('Save Dietary Restrictions');
      expect(queryByText(`Your Saved Restrictions ${label}`)).toBeInTheDocument();
    });
  });
});
