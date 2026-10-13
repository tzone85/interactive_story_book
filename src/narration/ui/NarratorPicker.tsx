import { NARRATORS } from '../domain/narrators';
import { useNarrationSettings } from '../store/narrationSettings';
import { NarratorAvatar } from './NarratorAvatar';

/** Lets the reader choose which storyteller reads to them. */
export function NarratorPicker() {
  const narratorId = useNarrationSettings((s) => s.narratorId);
  const setNarrator = useNarrationSettings((s) => s.setNarrator);

  return (
    <fieldset className="grid gap-3 sm:grid-cols-2">
      <legend className="mb-2 text-sm font-semibold text-gray-700">Who should read to you?</legend>
      {NARRATORS.map((narrator) => {
        const selected = narrator.id === narratorId;
        return (
          <label
            key={narrator.id}
            className="flex cursor-pointer items-center gap-3 rounded-xl border-2 p-3 transition-shadow focus-within:ring-2 focus-within:ring-offset-2"
            style={{
              borderColor: selected ? narrator.palette.primary : 'transparent',
              background: selected ? narrator.palette.soft : '#fff',
              color: narrator.palette.ink,
            }}
          >
            <input
              type="radio"
              name="narrator"
              value={narrator.id}
              checked={selected}
              onChange={() => setNarrator(narrator.id)}
              className="sr-only"
            />
            <NarratorAvatar narratorId={narrator.id} size={64} decorative />
            <span>
              <span className="block font-bold">{narrator.name}</span>
              <span className="block text-sm font-medium opacity-80">{narrator.title}</span>
              <span className="mt-1 block text-sm opacity-80">{narrator.tagline}</span>
            </span>
          </label>
        );
      })}
    </fieldset>
  );
}
