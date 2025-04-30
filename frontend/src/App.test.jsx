import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

beforeEach(() => {
  // Resetear el mock de fetch antes de cada prueba
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          {
            id: '1',
            name: 'Camisa Roja',
            description: 'Talla M',
            price: '45000',
            stock: 5,
            image: 'https://example.com/image.jpg',
          },
        ]),
    })
  );
});

test('renderiza el título principal', () => {
  render(<App />);
  const heading = screen.getByText(/Tienda Wompi/i);
  expect(heading).toBeInTheDocument();
});

test('renderiza productos disponibles desde la API', async () => {
  render(<App />);
  const producto = await screen.findByText(/Camisa Roja/i);
  expect(producto).toBeInTheDocument();
});

test('abre el modal de pago al hacer clic en Comprar', async () => {
  render(<App />);
  const comprarBtn = await screen.findByText(/Comprar/i);
  userEvent.click(comprarBtn);

  const tituloModal = await screen.findByText(/Formulario de pago/i);
  expect(tituloModal).toBeInTheDocument();
});
