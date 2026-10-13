import { DEFAULT_SERVER_URL, useNarrationSettings } from './narrationSettings';

const initial = useNarrationSettings.getState();

beforeEach(() => {
  localStorage.clear();
  useNarrationSettings.setState(initial, true);
});

describe('narration settings', () => {
  it('defaults to the Librarian, a local VoiceStudio and manual playback', () => {
    const state = useNarrationSettings.getState();
    expect(state.narratorId).toBe('librarian');
    expect(state.serverUrl).toBe(DEFAULT_SERVER_URL);
    expect(state.apiKey).toBe('');
    expect(state.autoNarrate).toBe(false);
    expect(state.voiceByNarrator).toEqual({});
  });

  it('switches narrators and ignores unknown ids', () => {
    useNarrationSettings.getState().setNarrator('studio');
    expect(useNarrationSettings.getState().narratorId).toBe('studio');
    useNarrationSettings.getState().setNarrator('robot');
    expect(useNarrationSettings.getState().narratorId).toBe('studio');
  });

  it('remembers a chosen voice per narrator without mutating the old map', () => {
    const before = useNarrationSettings.getState().voiceByNarrator;
    useNarrationSettings.getState().setVoice('librarian', 'profile-1');
    useNarrationSettings.getState().setVoice('studio', 'profile-2');

    expect(useNarrationSettings.getState().voiceByNarrator).toEqual({
      librarian: 'profile-1',
      studio: 'profile-2',
    });
    expect(before).toEqual({});
  });

  it('clears a chosen voice with null', () => {
    useNarrationSettings.getState().setVoice('librarian', 'profile-1');
    useNarrationSettings.getState().setVoice('librarian', null);
    expect(useNarrationSettings.getState().voiceByNarrator).toEqual({});
  });

  it('accepts a valid server URL and normalises it', () => {
    const result = useNarrationSettings.getState().setServerUrl(' http://192.168.1.5:3900/ ');
    expect(result).toEqual({ ok: true });
    expect(useNarrationSettings.getState().serverUrl).toBe('http://192.168.1.5:3900');
  });

  it('rejects an invalid server URL and keeps the previous one', () => {
    const result = useNarrationSettings.getState().setServerUrl('javascript:alert(1)');
    expect(result.ok).toBe(false);
    expect(useNarrationSettings.getState().serverUrl).toBe(DEFAULT_SERVER_URL);
  });

  it('stores the API key trimmed and the auto-narrate flag', () => {
    useNarrationSettings.getState().setApiKey('  secret ');
    useNarrationSettings.getState().setAutoNarrate(true);
    expect(useNarrationSettings.getState().apiKey).toBe('secret');
    expect(useNarrationSettings.getState().autoNarrate).toBe(true);
  });

  it('persists choices to localStorage', () => {
    useNarrationSettings.getState().setNarrator('studio');
    const raw = localStorage.getItem('narration-settings');
    expect(raw).not.toBeNull();
    expect(JSON.parse(raw as string).state.narratorId).toBe('studio');
  });
});
