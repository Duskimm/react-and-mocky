import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import mocks from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(()=>{
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(mocks)
    });
    
    render(<App/>)
  })
  
  test('Verifica se aparece o card com titulo de "Rick Sanchez"', async () => {
    const rick = await screen.findByRole('heading', { name: /rick sanchez/i})
    expect(rick).toBeInTheDocument();
  })

  test('Verifica se existem o input de texto e o botão "Buscar"', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /buscar/i});
    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  })

  test('Verifica se ao buscar por "Smith" aparecem 4 cards', () => {
    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button', { name: /buscar/i});
    userEvent.type(input, 'Smith');
    userEvent.click(button);

    const cards = screen.getAllByRole('article');
    expect(cards).toHaveLength(4);
  })

})
