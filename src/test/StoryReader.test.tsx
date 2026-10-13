import { act, fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import StoryReader from '../components/StoryReader';
import { useAppStore } from '../store';
import { stories } from '../data/stories';
import { splitParagraphs } from '../narration/domain/paragraphs';
import { NarrationEngine } from '../narration/engine/narrationEngine';
import { FakeProvider, flush } from '../narration/testing/fakes';
import { useNarrationSettings } from '../narration/store/narrationSettings';

const mockNavigate = vi.fn();
const narrationHarness = vi.hoisted(() => ({ engine: null as unknown }));

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ storyId: stories[0].id }),
  };
});

vi.mock('../narration/engine/createNarrationEngine', () => ({
  createNarrationEngine: () => narrationHarness.engine,
}));

const initialSettings = useNarrationSettings.getState();
let provider: FakeProvider;

const renderReader = () =>
  render(
    <BrowserRouter>
      <StoryReader />
    </BrowserRouter>,
  );

describe('StoryReader', () => {
  beforeEach(() => {
    localStorage.clear();
    useNarrationSettings.setState(initialSettings, true);
    provider = new FakeProvider('voicestudio');
    narrationHarness.engine = new NarrationEngine([provider]);
    useAppStore.setState({
      currentReader: {
        id: '1',
        name: 'Pholani',
        age: 17,
        preferences: [],
        completedStories: [],
      },
      storyProgress: null,
    });
  });

  it('displays story content and choices', () => {
    renderReader();

    const story = stories[0];
    const firstScene = story.scenes[story.firstSceneId];

    expect(screen.getByText(story.title)).toBeInTheDocument();
    splitParagraphs(firstScene.content).forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });

    firstScene.choices?.forEach((choice) => {
      expect(screen.getByText(choice.text)).toBeInTheDocument();
    });
  });

  it('handles choice selection', () => {
    renderReader();

    const story = stories[0];
    const firstChoice = story.scenes[story.firstSceneId].choices?.[0];
    expect(firstChoice).toBeDefined();

    fireEvent.click(screen.getByText(firstChoice!.text));

    splitParagraphs(story.scenes[firstChoice!.nextSceneId].content).forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('offers the chosen storyteller and reads the page aloud', async () => {
    renderReader();
    expect(screen.getByText('Mama Thuli')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /listen/i }));
    await act(flush);

    const story = stories[0];
    const paragraphs = splitParagraphs(story.scenes[story.firstSceneId].content);
    expect(provider.playbacks[0].request.text).toBe(paragraphs[0]);
    expect(screen.getByText(paragraphs[0])).toHaveAttribute('aria-current', 'true');
  });

  it('stops reading when the reader makes a choice', async () => {
    renderReader();
    fireEvent.click(screen.getByRole('button', { name: /listen/i }));
    await act(flush);

    const story = stories[0];
    const firstChoice = story.scenes[story.firstSceneId].choices![0];
    fireEvent.click(screen.getByText(firstChoice.text));

    expect(provider.playbacks[0].calls).toContain('stop');
  });

  it('lets the reader pick the Studio host from the voice settings', () => {
    renderReader();
    fireEvent.click(screen.getByRole('button', { name: /voice settings/i }));
    fireEvent.click(screen.getByRole('radio', { name: /Studio Sam/ }));

    expect(useNarrationSettings.getState().narratorId).toBe('studio');
    expect(screen.getAllByText('Studio Sam').length).toBeGreaterThan(0);
  });
});
