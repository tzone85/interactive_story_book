import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StoryLibrary from '../components/StoryLibrary';
import { useAppStore } from '../store';
import { stories } from '../data/stories';
import { useNarrationSettings } from '../narration/store/narrationSettings';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('StoryLibrary', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentReader: {
        id: '1',
        name: 'Pholani',
        age: 17,
        preferences: [],
        completedStories: []
      }
    });
  });

  it('displays age-appropriate stories', () => {
    render(
      <BrowserRouter>
        <StoryLibrary />
      </BrowserRouter>
    );

    const youngAdultStories = stories.filter(
      story => story.ageRange.min <= 17 && story.ageRange.max >= 17
    );

    youngAdultStories.forEach(story => {
      expect(screen.getByText(story.title)).toBeInTheDocument();
      expect(screen.getByText(story.description)).toBeInTheDocument();
    });
  });

  it('navigates to story when clicked', () => {
    render(
      <BrowserRouter>
        <StoryLibrary />
      </BrowserRouter>
    );

    const firstStory = stories.find(
      story => story.ageRange.min <= 17 && story.ageRange.max >= 17
    );

    if (firstStory) {
      fireEvent.click(screen.getByText(firstStory.title));
      expect(mockNavigate).toHaveBeenCalledWith(`/story/${firstStory.id}`);
    }
  });

  it('lets the reader choose their storyteller before opening a story', () => {
    render(
      <BrowserRouter>
        <StoryLibrary />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByRole('radio', { name: /Studio Sam/ }));
    expect(useNarrationSettings.getState().narratorId).toBe('studio');
  });
});
