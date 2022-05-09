import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

describe('1. Teste o componente <App.js />', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação.',
    () => {
      RenderWithRouter(<App />);
      const home = screen.getByRole('link', { name: /home/i });
      const about = screen.getByRole('link', { name: /about/i });
      const favorite = screen.getByRole('link', { name: /favorite pokémons/i });

      expect(home).toBeInTheDocument();
      expect(about).toBeInTheDocument();
      expect(favorite).toBeInTheDocument();
    });
  test(`Teste se a aplicação é redirecionada para a página inicial,
  na URL / ao clicar no link Home da barra de navegação.`, () => {
    RenderWithRouter(<App />);
    const home = screen.getByRole('link', { name: /home/i });
    userEvent.click(home);
    const homeText = screen
      .getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(homeText).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página de About,
  na URL /about ao clicar no link About da barra de navegação.`, () => {
    RenderWithRouter(<App />);
    const about = screen.getByRole('link', { name: /about/i });
    userEvent.click(about);
    expect(screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 })).toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página de Pokémons Favoritados, 
  na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.`, () => {
    RenderWithRouter(<App />);
    const favorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favorite);
    expect(screen
      .getByRole('heading', { name: /Favorite pokémons/i, level: 2 }))
      .toBeInTheDocument();
  });
  test(`Teste se a aplicação é redirecionada para a página Not Found ao entrar 
  em uma URL desconhecida.`, () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pagina-desconhecida');
    expect(screen
      .getByRole('heading', { name: /Page requested not found /i, level: 2 }))
      .toBeInTheDocument();
  });
});
