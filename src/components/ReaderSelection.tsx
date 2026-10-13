import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { readers } from '../data/readers';
import { stories } from '../data/stories';
import type { Story } from '../types';
import Hero from './home/Hero';
import StoryShelf from './home/StoryShelf';
import HowItWorks from './home/HowItWorks';
import SearchModal from './home/SearchModal';
import StoryPreviewModal from './home/StoryPreviewModal';
import Logo from './home/Logo';

type Overlay = { kind: 'search' } | { kind: 'preview'; story: Story } | null;

const ReaderSelection = () => {
  const navigate = useNavigate();
  const currentReader = useAppStore((state) => state.currentReader);
  const setCurrentReader = useAppStore((state) => state.setCurrentReader);
  const [overlay, setOverlay] = useState<Overlay>(null);
  const [pendingStory, setPendingStory] = useState<Story | null>(null);

  const handleReaderSelect = (readerId: string) => {
    const reader = readers.find((r) => r.id === readerId);
    if (!reader) return;
    setCurrentReader(reader);
    navigate(pendingStory ? `/story/${pendingStory.id}` : '/library');
  };

  const handleStart = (story: Story) => {
    setOverlay(null);
    if (currentReader) {
      navigate(`/story/${story.id}`);
      return;
    }
    setPendingStory(story);
    document.getElementById('readers')?.scrollIntoView?.({ behavior: 'smooth' });
  };

  return (
    <div className="bg-navy">
      <Hero onSearch={() => setOverlay({ kind: 'search' })} />

      <StoryShelf stories={stories} onPreview={(story) => setOverlay({ kind: 'preview', story })} />

      <section id="readers" className="scroll-mt-8 border-y border-white/10 bg-navy-800/60 py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">All aboard</p>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.08em] sm:text-4xl">
            Who's Reading Today?
          </h2>
          {pendingStory && (
            <p
              role="status"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-emerald/40 bg-emerald/10 px-4 py-2 text-sm text-white"
            >
              <span className="h-2 w-2 rounded-full bg-emerald" aria-hidden="true" />
              Pick a reader to start {pendingStory.title}.
            </p>
          )}

          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {readers.map((reader) => (
              <li key={reader.id}>
                <button
                  type="button"
                  onClick={() => handleReaderSelect(reader.id)}
                  className="group flex w-full flex-col items-center rounded-3xl border border-white/10 bg-navy p-8 text-center transition duration-300 hover:-translate-y-1.5 hover:border-gold/60 hover:shadow-2xl hover:shadow-black/40"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-20 w-20 items-center justify-center rounded-full border border-gold/60 bg-gradient-to-br from-navy-600 to-navy-700 font-display text-3xl font-semibold text-gold transition group-hover:scale-105"
                  >
                    {reader.name.charAt(0)}
                  </span>
                  <h3 className="mt-5 font-display text-xl font-semibold tracking-wide">{reader.name}</h3>
                  <p className="mt-1 text-sm text-white/60">{reader.age} years old</p>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <HowItWorks />

      <footer className="border-t border-white/10 py-10 text-center text-white/40">
        <Logo className="text-white/60" />
      </footer>

      {overlay?.kind === 'search' && (
        <SearchModal
          stories={stories}
          onClose={() => setOverlay(null)}
          onSelect={(story) => setOverlay({ kind: 'preview', story })}
        />
      )}
      {overlay?.kind === 'preview' && (
        <StoryPreviewModal
          story={overlay.story}
          startLabel={currentReader ? 'Start Reading' : 'Choose a Reader'}
          onClose={() => setOverlay(null)}
          onStart={handleStart}
        />
      )}
    </div>
  );
};

export default ReaderSelection;
