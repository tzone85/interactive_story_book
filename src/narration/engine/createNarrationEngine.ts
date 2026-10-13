import type { SpeechProvider } from '../domain/types';
import { createBrowserSpeechProvider } from '../providers/browserSpeechProvider';
import { VoiceStudioClient } from '../providers/voiceStudioClient';
import { VoiceStudioProvider, type AudioLike } from '../providers/voiceStudioProvider';
import { NarrationEngine } from './narrationEngine';

export interface NarrationConnection {
  serverUrl: string;
  apiKey: string;
}

function createVoiceStudioProvider(connection: NarrationConnection): VoiceStudioProvider | null {
  try {
    const client = new VoiceStudioClient({ baseUrl: connection.serverUrl, apiKey: connection.apiKey });
    return new VoiceStudioProvider({
      client,
      // AudioLike only needs the handlers without the DOM event argument.
      createAudio: (src) => new Audio(src) as unknown as AudioLike,
      objectUrls: {
        create: (blob) => URL.createObjectURL(blob),
        revoke: (url) => URL.revokeObjectURL(url),
      },
    });
  } catch {
    // An invalid saved URL must not take narration down; the browser voice still works.
    return null;
  }
}

/** Provider order is the fallback order: VoiceStudio first, then the browser's own voice. */
export function createProviders(connection: NarrationConnection): SpeechProvider[] {
  const voiceStudio = createVoiceStudioProvider(connection);
  return [...(voiceStudio ? [voiceStudio] : []), createBrowserSpeechProvider()];
}

export function createNarrationEngine(connection: NarrationConnection): NarrationEngine {
  return new NarrationEngine(createProviders(connection));
}
