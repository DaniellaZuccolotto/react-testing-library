import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../RenderWithRouter';
import App from '../App';

describe('5. Teste o componente <Pokedex.js />', () => {
  test('Teste se a página contém um heading h2 com o texto Encountered pokémons',
    () => {
      RenderWithRouter(<App />);
      const h2Text = screen.getByRole(
        'heading', { name: /encountered pokémons/i, level: 2 },
      );
      expect(h2Text).toBeInTheDocument();
    });
  test(`Teste se é exibido o próximo pokémon da lista 
  quando o botão Próximo pokémon é clicado.`, () => {
    RenderWithRouter(<App />);
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(buttonNext).toBeInTheDocument();
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    userEvent.click(buttonNext);
    const charmander = screen.getByText('Charmander');
    const pikachu2 = screen.queryByText('Pikachu');
    expect(charmander).toBeInTheDocument();
    expect(pikachu2).not.toBeInTheDocument();
  });
  test('Teste se é mostrado apenas um pokémon por vez.', () => {
    RenderWithRouter(<App />);
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const charmander = screen.queryByText('Charmander');
    const caterpie = screen.queryByText('Caterpie');
    expect(charmander).not.toBeInTheDocument();
    expect(caterpie).not.toBeInTheDocument();
  });
  test('Teste se a Pokédex tem os botões de filtro.', () => {
    RenderWithRouter(<App />);
    const buttons = ['Electric', 'Fire', 'Bug', 'Poison',
      'Psychic', 'Normal', 'Dragon'];
    buttons.forEach((button) => {
      const index = screen.getByRole('button', { name: button });
      expect(index).toBeInTheDocument();
    });
    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(7);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => {
    RenderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /All/i });
    expect(buttonAll).toBeInTheDocument();
    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
    const buttonNext = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonNext);
    const charmander = screen.getByText('Charmander');
    const pikachu2 = screen.queryByText('Pikachu');
    expect(charmander).toBeInTheDocument();
    expect(pikachu2).not.toBeInTheDocument();
    userEvent.click(buttonAll);
    const pikachu3 = screen.getByText('Pikachu');
    expect(pikachu3).toBeInTheDocument();
  });
});
