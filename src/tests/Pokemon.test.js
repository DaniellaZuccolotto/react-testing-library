import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('6. Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon.',
    () => {
      RenderWithRouter(<App />);
      const name = screen.getByTestId('pokemon-name');
      expect(name).toBeInTheDocument();
      expect(name.textContent).toBe('Pikachu');
      const type = screen.getByTestId('pokemon-type');
      expect(type).toBeInTheDocument();
      expect(type.textContent).toBe('Electric');
      const weight = screen.getByTestId('pokemon-weight');
      expect(weight).toBeInTheDocument();
      expect(weight.textContent).toBe('Average weight: 6.0 kg');
      const img = screen.getByRole('img', { name: /sprite/i });
      expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
      expect(img).toHaveAttribute('alt', 'Pikachu sprite');
    });
  test(`Teste se o card do pokémon indicado na Pokédex contém 
  um link de navegação para exibir detalhes deste pokémon.`, () => {
    RenderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/pokemons/25');
  });
  test(`Teste se ao clicar no link de navegação do pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de pokémon.`, () => {
    RenderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    expect(link).toBeInTheDocument();
    userEvent.click(link);
    const details = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(details).toBeInTheDocument();
  });
  test('Teste também se a URL exibida no navegador muda para /pokemon/<id>', () => {
    const { history } = RenderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos pokémons favoritados.', () => {
    RenderWithRouter(<App />);
    const link = screen.getByRole('link', { name: /More details/i });
    userEvent.click(link);
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    userEvent.click(favorite);
    const img = screen.getByRole('img', { name: /favorite/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', '/star-icon.svg');
    expect(img).toHaveAttribute('alt', 'Pikachu is marked as favorite');
  });
});
