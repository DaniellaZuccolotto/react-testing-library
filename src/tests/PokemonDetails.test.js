import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('7. Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do pokémon selecionado são mostradas na tela.',
    () => {
      RenderWithRouter(<App />);
      const link = screen.queryByRole('link', { name: /More details/i });
      userEvent.click(link);
      const detailsName = screen.getByRole('heading', { name: /Details/i, level: 2 });
      expect(detailsName).toBeInTheDocument();
      expect(detailsName.textContent).toBe('Pikachu Details');
      const title = screen.getByRole('heading', { name: /Game Locations/i, level: 2 });
      expect(title).toBeInTheDocument();
      expect(title.textContent).toBe('Game Locations of Pikachu');
      expect(link).not.toBeInTheDocument();
      const details = screen.getByRole('heading', { name: 'Summary', level: 2 });
      expect(details).toBeInTheDocument();
      const detailsP = screen.getByText(/This intelligent Pokémon roasts/i);
      expect(detailsP).toBeInTheDocument();
    });
  test(`Teste se existe na página uma seção com os 
  mapas contendo as localizações do pokémon`, () => {
    RenderWithRouter(<App />);
    const link = screen.queryByRole('link', { name: /More details/i });
    userEvent.click(link);
    const title = screen.getByRole('heading', { name: /Game Locations/i, level: 2 });
    expect(title).toBeInTheDocument();
    expect(title.textContent).toBe('Game Locations of Pikachu');
    const img = screen.getAllByRole('img', { name: /pikachu location/i });
    expect(img[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(img[1]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
    expect(img[0]).toHaveAttribute('alt', 'Pikachu location');
    expect(img[1]).toHaveAttribute('alt', 'Pikachu location');
  });
  test(`Teste se o usuário pode favoritar um 
  pokémon através da página de detalhes.`, () => {
    RenderWithRouter(<App />);
    const link = screen.queryByRole('link', { name: /More details/i });
    userEvent.click(link);
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();
    userEvent.click(favorite);
    const img = screen.queryByRole('img', { name: /favorite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
    userEvent.click(favorite);
    expect(img).not.toBeInTheDocument();
  });
});
