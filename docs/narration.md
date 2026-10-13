---
tags: [project/interactive-story-book, type/spec]
---

# Narration: two storytellers, one local voice engine

Stories are read aloud by a storyteller the child picks: **Mama Thuli, the Librarian** (slow, warm, calm) or **Studio Sam, the Studio Host** (bright, bouncy). Speech comes from [VoiceStudio](https://github.com/debpalash/VoiceStudio) running on the family's own machine; if it is not running, the browser's built-in voice takes over. Nothing leaves the device.

## Layers depend inward only

| Layer | Folder | Knows about | Does not know about |
|---|---|---|---|
| Domain | `src/narration/domain` | Narrator, SpeechProvider and Playback types, paragraph and chunk helpers | React, fetch, the DOM |
| Providers (adapters) | `src/narration/providers` | VoiceStudio HTTP API, Web Speech API | React, the engine |
| Engine (use case) | `src/narration/engine` | Provider order, fallback, pause and stop | Which providers exist |
| Store | `src/narration/store` | Persisted choices in `localStorage` | Audio |
| UI | `src/narration/ui` | React, Tailwind | HTTP details |

`StoryReader` owns one `useNarration` call and hands the result to `NarrationControls` (presentational), so the highlighted paragraph and the buttons always agree.

## SOLID, concretely

- **Single responsibility:** `VoiceStudioClient` talks HTTP, `VoiceStudioProvider` turns audio into a `Playback`, `NarrationEngine` sequences paragraphs, `LruCache` evicts.
- **Open/closed:** a new backend (a hosted TTS, a recorded-audio provider) is one new class implementing `SpeechProvider`, plus one line in `createProviders`. Engine and UI are untouched.
- **Liskov:** the engine treats every `SpeechProvider` identically; `Playback.finished` means the same thing everywhere (resolves on end or stop, rejects on failure).
- **Interface segregation:** providers receive narrow ports (`SpeechSynthesizer`, `AudioLike`, `ObjectUrls`, `SpeechSynthesisLike`), not the real browser objects.
- **Dependency inversion:** `createNarrationEngine` is the only place real `Audio`, `URL.createObjectURL` and `speechSynthesis` are wired in. Every other test uses fakes from `src/narration/testing/fakes.ts`.

## Fallback behaviour

The engine tries providers in order (VoiceStudio, then browser). A provider that is unreachable, fails to start, or fails mid-paragraph is skipped for the rest of that narration and the same paragraph is retried on the next provider. If none can speak, the reader sees one plain message instead of a dead button.

## VoiceStudio setup

1. Install VoiceStudio and start it. It serves an OpenAI-compatible API on `http://127.0.0.1:3900`.
2. The app calls `POST /v1/audio/speech` (model `tts-1`, which VoiceStudio maps onto the active engine) and `GET /v1/audio/voices`.
3. Narrator character comes from the `instructions` field (voice-design tags such as `female, middle-aged, low pitch`). Under Voice settings the reader can pick any VoiceStudio voice profile per narrator, including a cloned family voice.
4. Open Voice settings, press **Test connection**.

### Using the deployed site with a local VoiceStudio

VoiceStudio only accepts browser requests from origins on its allow-list. Add the site before starting it:

```bash
OMNIVOICE_ALLOWED_ORIGINS="http://localhost:5173,https://<your-project>.vercel.app" <start VoiceStudio>
```

Chrome treats `127.0.0.1` as a secure origin, so an HTTPS page may call it, but recent Chrome versions ask permission for local-network access on first use. A remote VoiceStudio must be served over HTTPS, and its API key goes in Voice settings (stored in this browser only).

## Configuration

| Name | Where | Default |
|---|---|---|
| `VITE_VOICESTUDIO_URL` | build-time env (`.env.example`, Vercel project settings) | `http://127.0.0.1:3900` |
| Server URL, API key, voices, auto-narrate | Voice settings in the app (`localStorage`, key `narration-settings`) | Librarian, manual playback |

## Deploying to Vercel

`vercel.json` sets the Vite build, the single-page-app rewrite, security headers and long-lived asset caching. Import the repository from the [Vercel dashboard](https://vercel.com/new) (or use the deploy button in the README), then set `VITE_VOICESTUDIO_URL` only if the default is wrong for your setup. Preview deployments get their own URLs; add each one to `OMNIVOICE_ALLOWED_ORIGINS` if you test narration on it.

## Tests

```bash
npm test               # unit and component tests (vitest)
npm run test:coverage  # coverage report
npm run test:e2e       # Playwright; VoiceStudio is stubbed with route mocks
```

## Known limits

- Text is spoken as written; there is no word-by-word highlight, only the current paragraph.
- Only English narrator tags are tuned. Other languages need VoiceStudio voices chosen in Voice settings.
- The Librarian and Studio voice-design tags are starting points; engines ignore tags they do not support, so tune `instructions` in `src/narration/domain/narrators.ts` for the engine you run.
