import { FakeProvider, flush, librarian, studio } from '../testing/fakes';
import { NarrationEngine } from './narrationEngine';

function setup() {
  const primary = new FakeProvider('voicestudio');
  const fallback = new FakeProvider('browser');
  const engine = new NarrationEngine([primary, fallback]);
  return { primary, fallback, engine };
}

describe('NarrationEngine', () => {
  it('starts idle', () => {
    const { engine } = setup();
    expect(engine.getState()).toEqual({
      status: 'idle',
      providerId: null,
      paragraphIndex: 0,
      paragraphCount: 0,
      error: null,
    });
  });

  it('narrates paragraphs one after another with the first available provider', async () => {
    const { engine, primary } = setup();
    const done = engine.narrate(['One.', 'Two.'], librarian);
    await flush();

    expect(engine.getState()).toMatchObject({ status: 'playing', providerId: 'voicestudio', paragraphIndex: 0, paragraphCount: 2 });
    expect(primary.playbacks[0].request.text).toBe('One.');

    primary.playbacks[0].complete();
    await flush();
    expect(engine.getState()).toMatchObject({ status: 'playing', paragraphIndex: 1 });
    expect(primary.playbacks[1].request.text).toBe('Two.');

    primary.playbacks[1].complete();
    await done;
    expect(engine.getState()).toMatchObject({ status: 'idle', error: null });
  });

  it('passes the narrator and chosen voice to the provider', async () => {
    const { engine, primary } = setup();
    void engine.narrate(['Hi.'], studio, { voiceId: 'profile-3' });
    await flush();
    expect(primary.playbacks[0].request).toMatchObject({ text: 'Hi.', narrator: studio, voiceId: 'profile-3' });
  });

  it('skips providers that are not available', async () => {
    const { engine, primary, fallback } = setup();
    primary.available = false;
    void engine.narrate(['Hi.'], librarian);
    await flush();
    expect(primary.playbacks).toHaveLength(0);
    expect(fallback.playbacks).toHaveLength(1);
    expect(engine.getState().providerId).toBe('browser');
  });

  it('falls back when a provider fails to start', async () => {
    const { engine, primary, fallback } = setup();
    primary.startError = new Error('server down');
    void engine.narrate(['Hi.'], librarian);
    await flush();
    expect(fallback.playbacks).toHaveLength(1);
    expect(engine.getState()).toMatchObject({ status: 'playing', providerId: 'browser', error: null });
  });

  it('falls back and retries the paragraph when playback fails midway', async () => {
    const { engine, primary, fallback } = setup();
    void engine.narrate(['One.', 'Two.'], librarian);
    await flush();
    primary.playbacks[0].fail(new Error('Audio playback failed'));
    await flush();

    expect(fallback.playbacks[0].request.text).toBe('One.');
    expect(engine.getState().providerId).toBe('browser');

    fallback.playbacks[0].complete();
    await flush();
    // The failed provider is not retried for the rest of this narration.
    expect(fallback.playbacks[1].request.text).toBe('Two.');
    expect(primary.playbacks).toHaveLength(1);
  });

  it('reports an error when every provider fails', async () => {
    const { engine, primary, fallback } = setup();
    primary.startError = new Error('server down');
    fallback.startError = new Error('no voices');
    await engine.narrate(['Hi.'], librarian);
    expect(engine.getState()).toMatchObject({ status: 'error', providerId: null });
    expect(engine.getState().error).toContain('no voices');
  });

  it('reports an error when no provider is available', async () => {
    const { engine, primary, fallback } = setup();
    primary.available = false;
    fallback.available = false;
    await engine.narrate(['Hi.'], librarian);
    expect(engine.getState()).toMatchObject({ status: 'error' });
    expect(engine.getState().error).toMatch(/no voice/i);
  });

  it('does nothing for an empty story page', async () => {
    const { engine, primary } = setup();
    await engine.narrate([], librarian);
    expect(primary.playbacks).toHaveLength(0);
    expect(engine.getState().status).toBe('idle');
  });

  it('pauses and resumes the live playback', async () => {
    const { engine, primary } = setup();
    void engine.narrate(['Hi.'], librarian);
    await flush();

    engine.pause();
    expect(engine.getState().status).toBe('paused');
    engine.resume();
    expect(engine.getState().status).toBe('playing');
    expect(primary.playbacks[0].calls).toEqual(['pause', 'resume']);
  });

  it('ignores pause and resume when nothing is playing', () => {
    const { engine } = setup();
    engine.pause();
    engine.resume();
    expect(engine.getState().status).toBe('idle');
  });

  it('stop halts playback, returns to idle and settles the narrate promise', async () => {
    const { engine, primary } = setup();
    const done = engine.narrate(['One.', 'Two.'], librarian);
    await flush();

    engine.stop();
    await done;

    expect(primary.playbacks[0].calls).toContain('stop');
    expect(primary.playbacks).toHaveLength(1);
    expect(engine.getState()).toMatchObject({ status: 'idle', paragraphIndex: 0, paragraphCount: 0 });
  });

  it('a new narration replaces the one in progress', async () => {
    const { engine, primary } = setup();
    const first = engine.narrate(['Old.'], librarian);
    await flush();
    void engine.narrate(['New.'], studio);
    await first;
    await flush();

    expect(primary.playbacks[0].calls).toContain('stop');
    expect(primary.playbacks[1].request.text).toBe('New.');
    expect(engine.getState()).toMatchObject({ status: 'playing', paragraphCount: 1 });
  });

  it('notifies subscribers with immutable snapshots until they unsubscribe', async () => {
    const { engine, primary } = setup();
    const seen: string[] = [];
    const unsubscribe = engine.subscribe(() => seen.push(engine.getState().status));
    const before = engine.getState();

    void engine.narrate(['Hi.'], librarian);
    await flush();
    expect(seen).toContain('loading');
    expect(seen).toContain('playing');
    expect(engine.getState()).not.toBe(before);
    expect(before.status).toBe('idle');

    unsubscribe();
    const count = seen.length;
    primary.playbacks[0].complete();
    await flush();
    expect(seen).toHaveLength(count);
  });
});
