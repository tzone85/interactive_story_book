import { createProviders } from './createNarrationEngine';

describe('createProviders', () => {
  it('prefers VoiceStudio and keeps the browser voice as fallback', () => {
    const providers = createProviders({ serverUrl: 'http://127.0.0.1:3900', apiKey: '' });
    expect(providers.map((p) => p.id)).toEqual(['voicestudio', 'browser']);
  });

  it('drops VoiceStudio when the URL is invalid instead of crashing', () => {
    const providers = createProviders({ serverUrl: 'nonsense', apiKey: '' });
    expect(providers.map((p) => p.id)).toEqual(['browser']);
  });
});
