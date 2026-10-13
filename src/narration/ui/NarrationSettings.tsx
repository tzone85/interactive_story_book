import { useState } from 'react';
import { NARRATORS } from '../domain/narrators';
import type { VoiceOption } from '../domain/types';
import { VoiceStudioClient } from '../providers/voiceStudioClient';
import { useNarrationSettings } from '../store/narrationSettings';

type Connection =
  | { kind: 'untested' }
  | { kind: 'testing' }
  | { kind: 'connected'; voices: VoiceOption[] }
  | { kind: 'unreachable'; url: string };

/** Connection and voice choices for a VoiceStudio server; the browser voice needs no setup. */
export function NarrationSettings() {
  const { serverUrl, apiKey, autoNarrate, voiceByNarrator } = useNarrationSettings();
  const { setServerUrl, setApiKey, setVoice, setAutoNarrate } = useNarrationSettings.getState();
  const [draftUrl, setDraftUrl] = useState(serverUrl);
  const [urlError, setUrlError] = useState<string | null>(null);
  const [connection, setConnection] = useState<Connection>({ kind: 'untested' });

  const commitUrl = () => {
    const result = setServerUrl(draftUrl);
    if (result.ok) {
      setUrlError(null);
      setDraftUrl(useNarrationSettings.getState().serverUrl);
      setConnection({ kind: 'untested' });
    } else {
      setUrlError(result.error);
    }
  };

  const testConnection = async () => {
    setConnection({ kind: 'testing' });
    try {
      const client = new VoiceStudioClient({ baseUrl: serverUrl, apiKey });
      if (!(await client.ping())) {
        setConnection({ kind: 'unreachable', url: serverUrl });
        return;
      }
      const voices = await client.listVoices().catch(() => []);
      setConnection({ kind: 'connected', voices });
    } catch {
      setConnection({ kind: 'unreachable', url: serverUrl });
    }
  };

  const inputClass = 'w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-800';

  return (
    <div className="space-y-4 text-gray-800">
      <div>
        <label htmlFor="vs-url" className="mb-1 block text-sm font-semibold">
          VoiceStudio server URL
        </label>
        <input
          id="vs-url"
          type="url"
          value={draftUrl}
          onChange={(e) => setDraftUrl(e.target.value)}
          onBlur={commitUrl}
          className={inputClass}
          aria-invalid={urlError !== null}
        />
        {urlError && (
          <p role="alert" className="mt-1 text-sm text-red-700">
            {urlError}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="vs-key" className="mb-1 block text-sm font-semibold">
          API key (only for a remote server)
        </label>
        <input
          id="vs-key"
          type="password"
          autoComplete="off"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          className={inputClass}
        />
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={testConnection}
          disabled={connection.kind === 'testing'}
          className="rounded-lg bg-gray-800 px-4 py-2 font-semibold text-white disabled:opacity-60"
        >
          Test connection
        </button>
        <p aria-live="polite" className="text-sm">
          {connection.kind === 'testing' && 'Checking…'}
          {connection.kind === 'connected' && 'Connected to VoiceStudio.'}
          {connection.kind === 'unreachable' &&
            `Could not reach VoiceStudio at ${connection.url}. The browser voice will be used instead.`}
        </p>
      </div>

      {connection.kind === 'connected' &&
        NARRATORS.map((narrator) => (
          <div key={narrator.id}>
            <label htmlFor={`voice-${narrator.id}`} className="mb-1 block text-sm font-semibold">
              Voice for {narrator.name}
            </label>
            <select
              id={`voice-${narrator.id}`}
              value={voiceByNarrator[narrator.id] ?? ''}
              onChange={(e) => setVoice(narrator.id, e.target.value || null)}
              className={inputClass}
            >
              <option value="">{narrator.title} default</option>
              {connection.voices.map((voice) => (
                <option key={voice.id} value={voice.id}>
                  {voice.name}
                </option>
              ))}
            </select>
          </div>
        ))}

      <label className="flex items-center gap-2 text-sm font-semibold">
        <input type="checkbox" checked={autoNarrate} onChange={(e) => setAutoNarrate(e.target.checked)} />
        Read each page aloud automatically
      </label>
    </div>
  );
}
