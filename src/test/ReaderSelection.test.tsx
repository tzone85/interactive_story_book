import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReaderSelection from '../components/ReaderSelection';
import { readers } from '../data/readers';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('ReaderSelection', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <ReaderSelection />
      </BrowserRouter>
    );
  });

  it('renders all readers', () => {
    readers.forEach(reader => {
      expect(screen.getByText(reader.name)).toBeInTheDocument();
      expect(screen.getByText(`${reader.age} years old`)).toBeInTheDocument();
    });
  });

  it('navigates to library when reader is selected', () => {
    const firstReader = readers[0];
    fireEvent.click(screen.getByText(firstReader.name));
    expect(mockNavigate).toHaveBeenCalledWith('/library');
  });
});