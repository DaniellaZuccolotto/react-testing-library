import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test(`Teste se é exibida na tela a mensagem No favorite pokemon found,
   caso a pessoa não tenha pokémons favoritos.`, () => {
    RenderWithRouter(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });
  test('Teste se são exibidos todos os cards de pokémons favoritados.',
    () => {
      RenderWithRouter(<App />);
      const details = screen.getByRole('link', { name: /more details/i });
      userEvent.click(details);
      expect(screen.getByRole('heading', { name: /summary/i })).toBeInTheDocument();
      const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
      userEvent.click(favorite);
      const favPokemons = screen.getByRole('link', { name: /favorite Pokémons/i });
      userEvent.click(favPokemons);
      const average = screen.getByText(/Average weight/i);
      expect(average).toBeInTheDocument();
    });
});
