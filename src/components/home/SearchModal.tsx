import { useMemo, useState } from 'react';
import { Search } from 'lucide-react';
import type { Story } from '../../types';
import { collectTags, searchStories } from '../../lib/storySearch';
import Modal from './Modal';

interface SearchModalProps {
  stories: readonly Story[];
  onClose: () => void;
  onSelect: (story: Story) => void;
}

const SearchModal = ({ stories, onClose, onSelect }: SearchModalProps) => {
  const [query, setQuery] = useState('');
  const tags = useMemo(() => collectTags(stories, 8), [stories]);
  const results = useMemo(() => searchStories(stories, query), [stories, query]);

  return (
    <Modal label="Search stories" onClose={onClose} align="top">
      <div className="p-6 sm:p-8">
        <h2 className="font-display text-2xl font-semibold uppercase tracking-[0.12em]">Find a story</h2>

        <label className="relative mt-5 block">
          <span className="sr-only">Search by title, theme or tag</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/50" aria-hidden="true" />
          <input
            data-autofocus
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Dragons, mystery, friendship…"
            className="w-full rounded-full border border-white/20 bg-white/10 py-3.5 pl-12 pr-5 text-base text-white placeholder:text-white/40 focus:border-gold focus:outline-none"
          />
        </label>

        <div className="mt-4 flex flex-wrap gap-2" role="group" aria-label="Popular tags">
          {tags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => setQuery(tag)}
              aria-pressed={query.toLowerCase() === tag}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
                query.toLowerCase() === tag
                  ? 'border-gold bg-gold text-navy'
                  : 'border-white/20 text-white/80 hover:border-gold hover:text-gold'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <ul className="mt-6 space-y-2" aria-live="polite">
          {results.map((story) => (
            <li key={story.id}>
              <button
                type="button"
                onClick={() => onSelect(story)}
                className="flex w-full items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-3 text-left transition hover:border-gold/60 hover:bg-white/10"
              >
                <img
                  src={`${story.coverImage}?auto=format&fit=crop&w=160&h=160&q=70`}
                  alt=""
                  loading="lazy"
                  className="h-16 w-16 flex-none rounded-xl bg-navy-700 object-cover"
                />
                <span className="min-w-0">
                  <span className="block font-semibold">{story.title}</span>
                  <span className="mt-0.5 block truncate text-sm text-white/60">{story.description}</span>
                </span>
              </button>
            </li>
          ))}
          {results.length === 0 && (
            <li className="rounded-2xl border border-dashed border-white/20 p-6 text-center text-sm text-white/60">
              No stories match “{query.trim()}”. Try a different word.
            </li>
          )}
        </ul>
      </div>
    </Modal>
  );
};

export default SearchModal;
