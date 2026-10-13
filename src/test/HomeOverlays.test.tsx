import { render, screen, fireEvent, within } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import ReaderSelection from '../components/ReaderSelection';
import { useAppStore } from '../store';
import { readers } from '../data/readers';
import { stories } from '../data/stories';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return { ...actual, useNavigate: () => mockNavigate };
});

const renderHome = () =>
  render(
    <BrowserRouter>
      <ReaderSelection />
    </BrowserRouter>,
  );

describe('landing page overlays', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
    useAppStore.setState({ currentReader: null, storyProgress: null });
  });

  it('plays the background video muted and looping', () => {
    renderHome();
    const video = screen.getByTestId('hero-video') as HTMLVideoElement;
    expect(video.muted).toBe(true);
    expect(video.loop).toBe(true);
    expect(video.getAttribute('src')).toContain('hero_bg_train.mp4');
  });

  it('opens the search modal and filters by typed query', () => {
    renderHome();
    expect(screen.queryByRole('dialog')).toBeNull();
    fireEvent.click(screen.getByLabelText('Search stories'));

    const dialog = screen.getByRole('dialog', { name: 'Search stories' });
    fireEvent.change(within(dialog).getByRole('searchbox'), { target: { value: 'dragons' } });
    expect(within(dialog).getByText("The Friendly Dragon's Dilemma")).toBeInTheDocument();
    expect(within(dialog).queryByText('Digital Detective')).toBeNull();
  });

  it('filters with a quick-tag pill and shows an empty state', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Search stories'));
    const dialog = screen.getByRole('dialog');

    fireEvent.click(within(dialog).getByRole('button', { name: 'mystery' }));
    expect(within(dialog).getByText('Digital Detective')).toBeInTheDocument();

    fireEvent.change(within(dialog).getByRole('searchbox'), { target: { value: 'zzzz' } });
    expect(within(dialog).getByText(/No stories match/)).toBeInTheDocument();
  });

  it('closes on Escape', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Search stories'));
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('closes when the backdrop is pressed but not the panel', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Search stories'));
    const dialog = screen.getByRole('dialog');
    fireEvent.mouseDown(dialog);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    fireEvent.mouseDown(dialog.parentElement as HTMLElement);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('opens a route preview from a search result', () => {
    renderHome();
    fireEvent.click(screen.getByLabelText('Search stories'));
    fireEvent.click(within(screen.getByRole('dialog')).getByText('Digital Detective'));
    const dialog = screen.getByRole('dialog', { name: /Digital Detective route preview/ });
    expect(within(dialog).getByText('Route at a glance')).toBeInTheDocument();
    expect(within(dialog).getByText(/Chapter 1/)).toBeInTheDocument();
  });

  it('asks for a reader first, then jumps straight into the previewed story', () => {
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /Preview route for The Quantum Decision/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Choose a Reader' }));

    expect(mockNavigate).not.toHaveBeenCalled();
    expect(screen.getByRole('status')).toHaveTextContent('Pick a reader to start The Quantum Decision.');

    fireEvent.click(screen.getByText(readers[0].name));
    expect(mockNavigate).toHaveBeenCalledWith(`/story/${stories[0].id}`);
  });

  it('starts the story directly when a reader is already chosen', () => {
    useAppStore.setState({ currentReader: readers[0] });
    renderHome();
    fireEvent.click(screen.getByRole('button', { name: /Preview route for Digital Detective/ }));
    fireEvent.click(screen.getByRole('button', { name: 'Start Reading' }));
    expect(mockNavigate).toHaveBeenCalledWith('/story/story-14-1');
  });

  it('toggles the mobile menu', () => {
    renderHome();
    const toggle = screen.getByLabelText('Open menu');
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    expect(document.getElementById('mobile-menu')).not.toBeNull();
    fireEvent.click(screen.getByLabelText('Close menu'));
    expect(document.getElementById('mobile-menu')).toBeNull();
  });
});
