import React from 'react';
import { screen } from '@testing-library/react';
import RenderWithRouter from '../RenderWithRouter';
import { About } from '../components';

describe('2. Teste o componente <About.js />.', () => {
  test('Teste se a página contém as informações sobre a Pokédex.',
    () => {
      RenderWithRouter(<About />);
      const aboutPokedex = screen.getByText(
        'One can filter Pokémons by type, and see more details for each one of them',
      );
      expect(aboutPokedex).toBeInTheDocument();
    });
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    RenderWithRouter(<About />);
    expect(screen
      .getByRole('heading', { name: /About Pokédex/i, level: 2 })).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    RenderWithRouter(<About />);
    const aboutPokedex = screen.getByText(
      'This application simulates a Pokédex'
      + ', a digital encyclopedia containing all Pokémons',
    );
    expect(aboutPokedex).toBeInTheDocument();
    const aboutPokedex2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(aboutPokedex2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    RenderWithRouter(<About />);
    const img = screen.getByRole('img', { name: 'Pokédex' });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
