import { act, fireEvent, render, renderHook, screen, waitFor } from '@testing-library/react';
import { NarrationEngine } from '../engine/narrationEngine';
import { FakeProvider, flush, librarian } from '../testing/fakes';
import { useNarrationSettings } from '../store/narrationSettings';
import { NarratorAvatar } from './NarratorAvatar';
import { NarratorPicker } from './NarratorPicker';
import { NarrationControls } from './NarrationControls';
import { NarrationSettings } from './NarrationSettings';
import { useNarration } from './useNarration';

function ControlsHarness({ paragraphs }: { paragraphs: string[] }) {
  return <NarrationControls narration={useNarration(paragraphs)} />;
}

const harness = vi.hoisted(() => ({ engine: null as unknown, voices: [] as unknown[], ping: true }));

vi.mock('../engine/createNarrationEngine', () => ({
  createNarrationEngine: () => harness.engine,
}));

vi.mock('../providers/voiceStudioClient', async () => {
  const actual = await vi.importActual<typeof import('../providers/voiceStudioClient')>('../providers/voiceStudioClient');
  return {
    ...actual,
    VoiceStudioClient: class {
      ping = async () => harness.ping;
      listVoices = async () => harness.voices;
    },
  };
});

const initialSettings = useNarrationSettings.getState();
let provider: FakeProvider;

beforeEach(() => {
  localStorage.clear();
  useNarrationSettings.setState(initialSettings, true);
  provider = new FakeProvider('voicestudio');
  harness.engine = new NarrationEngine([provider]);
  harness.voices = [];
  harness.ping = true;
});

describe('NarratorAvatar', () => {
  it.each(['librarian', 'studio'] as const)('draws the %s as a labelled image', (id) => {
    render(<NarratorAvatar narratorId={id} />);
    expect(screen.getByRole('img', { name: /./ })).toBeInTheDocument();
  });

  it('marks the avatar as speaking', () => {
    render(<NarratorAvatar narratorId="studio" speaking />);
    expect(screen.getByRole('img').getAttribute('data-speaking')).toBe('true');
  });
});

describe('NarratorPicker', () => {
  it('shows both storytellers and marks the current one', () => {
    render(<NarratorPicker />);
    const radios = screen.getAllByRole('radio');
    expect(radios).toHaveLength(2);
    expect(screen.getByRole('radio', { name: /Mama Thuli/ })).toBeChecked();
  });

  it('lets the reader choose the Studio host', () => {
    render(<NarratorPicker />);
    fireEvent.click(screen.getByRole('radio', { name: /Studio Sam/ }));
    expect(useNarrationSettings.getState().narratorId).toBe('studio');
    expect(screen.getByRole('radio', { name: /Studio Sam/ })).toBeChecked();
  });
});

describe('useNarration', () => {
  it('plays the paragraphs with the selected narrator and chosen voice', async () => {
    useNarrationSettings.setState({ narratorId: 'studio', voiceByNarrator: { studio: 'profile-7' } });
    const { result } = renderHook(() => useNarration(['One.', 'Two.']));

    act(() => result.current.play());
    await act(flush);

    expect(provider.playbacks[0].request).toMatchObject({ text: 'One.', voiceId: 'profile-7' });
    expect(provider.playbacks[0].request.narrator.id).toBe('studio');
    expect(result.current.state.status).toBe('playing');
    expect(result.current.narrator.id).toBe('studio');
  });

  it('stops narration when the page changes', async () => {
    const { result, rerender } = renderHook(({ text }) => useNarration([text]), { initialProps: { text: 'A.' } });
    act(() => result.current.play());
    await act(flush);

    rerender({ text: 'B.' });
    expect(provider.playbacks[0].calls).toContain('stop');
    expect(result.current.state.status).toBe('idle');
  });

  it('narrates automatically on each page when auto-narrate is on', async () => {
    useNarrationSettings.setState({ autoNarrate: true });
    const { rerender } = renderHook(({ text }) => useNarration([text]), { initialProps: { text: 'A.' } });
    await act(flush);
    expect(provider.playbacks[0].request.text).toBe('A.');

    rerender({ text: 'B.' });
    await act(flush);
    expect(provider.playbacks[1].request.text).toBe('B.');
  });

  it('stays quiet until asked when auto-narrate is off', async () => {
    renderHook(() => useNarration(['A.']));
    await act(flush);
    expect(provider.playbacks).toHaveLength(0);
  });
});

describe('NarrationControls', () => {
  it('lets the reader listen, pause, resume and stop', async () => {
    render(<ControlsHarness paragraphs={['Once upon a time.']} />);

    fireEvent.click(screen.getByRole('button', { name: /listen/i }));
    await act(flush);
    expect(screen.getByText(/VoiceStudio/)).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /pause/i }));
    expect(screen.getByRole('button', { name: /resume/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /resume/i }));
    expect(screen.getByRole('button', { name: /pause/i })).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /stop/i }));
    expect(screen.getByRole('button', { name: /listen/i })).toBeInTheDocument();
  });

  it('shows the narrator and that they are speaking', async () => {
    render(<ControlsHarness paragraphs={['Hello.']} />);
    expect(screen.getByText(librarian.name)).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /listen/i }));
    await act(flush);
    expect(screen.getByRole('img').getAttribute('data-speaking')).toBe('true');
  });

  it('explains when no voice could be used', async () => {
    provider.available = false;
    render(<ControlsHarness paragraphs={['Hello.']} />);
    fireEvent.click(screen.getByRole('button', { name: /listen/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent(/no voice/i);
  });
});

describe('NarrationSettings', () => {
  it('tests the connection and reports success', async () => {
    render(<NarrationSettings />);
    fireEvent.click(screen.getByRole('button', { name: /test connection/i }));
    expect(await screen.findByText(/connected/i)).toBeInTheDocument();
  });

  it('reports when VoiceStudio cannot be reached', async () => {
    harness.ping = false;
    render(<NarrationSettings />);
    fireEvent.click(screen.getByRole('button', { name: /test connection/i }));
    expect(await screen.findByText(/could not reach/i)).toBeInTheDocument();
  });

  it('saves a new server URL and rejects a bad one', () => {
    render(<NarrationSettings />);
    const input = screen.getByLabelText(/server url/i);

    fireEvent.change(input, { target: { value: 'http://10.0.0.5:3900' } });
    fireEvent.blur(input);
    expect(useNarrationSettings.getState().serverUrl).toBe('http://10.0.0.5:3900');

    fireEvent.change(input, { target: { value: 'ftp://nope' } });
    fireEvent.blur(input);
    expect(screen.getByRole('alert')).toHaveTextContent(/http/i);
    expect(useNarrationSettings.getState().serverUrl).toBe('http://10.0.0.5:3900');
  });

  it('lists VoiceStudio voices for each narrator and remembers the choice', async () => {
    harness.voices = [
      { id: 'p-1', name: 'Gogo Nomsa', kind: 'profile' },
      { id: 'alloy', name: 'Alloy', kind: 'preset' },
    ];
    render(<NarrationSettings />);
    fireEvent.click(screen.getByRole('button', { name: /test connection/i }));

    const select = await screen.findByLabelText(/voice for mama thuli/i);
    await waitFor(() => expect(screen.getAllByRole('option', { name: 'Gogo Nomsa' }).length).toBeGreaterThan(0));
    fireEvent.change(select, { target: { value: 'p-1' } });
    expect(useNarrationSettings.getState().voiceByNarrator.librarian).toBe('p-1');
  });

  it('toggles auto-narrate', () => {
    render(<NarrationSettings />);
    fireEvent.click(screen.getByLabelText(/read each page aloud automatically/i));
    expect(useNarrationSettings.getState().autoNarrate).toBe(true);
  });
});
