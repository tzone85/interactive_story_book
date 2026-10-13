import { useMemo } from 'react';
import { Clock, GitFork, Flag } from 'lucide-react';
import type { Story } from '../../types';
import { outlineStory, readingMinutes } from '../../lib/storyOutline';
import Modal from './Modal';

interface StoryPreviewModalProps {
  story: Story;
  startLabel: string;
  onClose: () => void;
  onStart: (story: Story) => void;
}

const StoryPreviewModal = ({ story, startLabel, onClose, onStart }: StoryPreviewModalProps) => {
  const outline = useMemo(() => outlineStory(story), [story]);
  const minutes = useMemo(() => readingMinutes(story), [story]);

  const stats = [
    { icon: Clock, value: `${minutes} min`, label: 'one read-through' },
    { icon: GitFork, value: String(outline.decisionCount), label: 'choice points' },
    { icon: Flag, value: String(outline.endingCount), label: 'endings' },
  ];

  return (
    <Modal label={`${story.title} route preview`} onClose={onClose}>
      <div className="relative h-44 overflow-hidden rounded-t-3xl sm:h-56">
        <img
          src={`${story.coverImage}?auto=format&fit=crop&w=1200&h=500&q=70`}
          alt=""
          className="h-full w-full bg-navy-700 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-800 via-navy-800/30 to-transparent" />
      </div>

      <div className="p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-gold">
          Ages {story.ageRange.min} to {story.ageRange.max}
        </p>
        <h2 className="mt-2 font-display text-3xl font-semibold uppercase tracking-[0.08em]">{story.title}</h2>
        <p className="mt-3 text-white/70">{story.description}</p>

        <dl className="mt-6 grid grid-cols-3 gap-3">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="rounded-2xl border border-white/10 bg-white/5 p-3 text-center">
              <Icon className="mx-auto h-4 w-4 text-gold" aria-hidden="true" />
              <dt className="sr-only">{label}</dt>
              <dd className="mt-1 text-lg font-bold">{value}</dd>
              <p className="text-[11px] uppercase tracking-wider text-white/50" aria-hidden="true">
                {label}
              </p>
            </div>
          ))}
        </dl>

        <h3 className="mt-8 text-xs font-semibold uppercase tracking-[0.24em] text-white/50">Route at a glance</h3>
        <ol className="mt-4 space-y-5 border-l border-white/15 pl-6">
          {outline.steps.map((step, index) => (
            <li key={step.sceneId} className="relative">
              <span
                className={`absolute -left-[31px] top-1.5 h-2.5 w-2.5 rounded-full ring-4 ring-navy-800 ${
                  step.isEnding ? 'bg-emerald' : 'bg-gold'
                }`}
                aria-hidden="true"
              />
              <p className="text-xs font-semibold uppercase tracking-wider text-gold/90">
                {step.isEnding ? 'An ending' : `Chapter ${index + 1}`}
                {step.choiceCount > 0 && (
                  <span className="ml-2 text-white/50">· {step.choiceCount} ways forward</span>
                )}
              </p>
              <p className="mt-1 text-sm leading-relaxed text-white/80">{step.excerpt}</p>
            </li>
          ))}
        </ol>

        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <ul className="flex flex-wrap gap-2">
            {story.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/20 px-3 py-1 text-xs text-white/70">
                {tag}
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={() => onStart(story)}
            className="rounded-full bg-gold px-7 py-3 text-sm font-bold uppercase tracking-[0.16em] text-navy transition hover:-translate-y-0.5 hover:bg-gold-soft"
          >
            {startLabel}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default StoryPreviewModal;
