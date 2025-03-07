import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StoryReader from '../components/StoryReader';
import { useAppStore } from '../store';
import { stories } from '../data/stories';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ storyId: stories[0].id }),
  };
});

describe('StoryReader', () => {
  beforeEach(() => {
    useAppStore.setState({
      currentReader: {
        id: '1',
        name: 'Pholani',
        age: 17,
        preferences: [],
        completedStories: []
      },
      storyProgress: null
    });
  });

  it('displays story content and choices', () => {
    render(
      <BrowserRouter>
        <StoryReader />
      </BrowserRouter>
    );

    const story = stories[0];
    const firstScene = story.scenes[story.firstSceneId];

    expect(screen.getByText(story.title)).toBeInTheDocument();
    expect(screen.getByText(firstScene.content)).toBeInTheDocument();

    firstScene.choices?.forEach(choice => {
      expect(screen.getByText(choice.text)).toBeInTheDocument();
    });
  });

  it('handles choice selection', () => {
    const { rerender } = render(
      <BrowserRouter>
        <StoryReader />
      </BrowserRouter>
    );

    const story = stories[0];
    const firstScene = story.scenes[story.firstSceneId];
    const firstChoice = firstScene.choices?.[0];

    if (firstChoice) {
      fireEvent.click(screen.getByText(firstChoice.text));
      
      rerender(
        <BrowserRouter>
          <StoryReader />
        </BrowserRouter>
      );

      const nextScene = story.scenes[firstChoice.nextSceneId];
      expect(screen.getByText(nextScene.content)).toBeInTheDocument();
    }
  });
});