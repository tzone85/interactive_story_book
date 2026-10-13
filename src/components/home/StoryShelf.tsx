import type { Story } from '../../types';

interface StoryShelfProps {
  stories: readonly Story[];
  onPreview: (story: Story) => void;
}

const StoryShelf = ({ stories, onPreview }: StoryShelfProps) => (
  <section id="stories" className="mx-auto max-w-7xl scroll-mt-8 px-5 py-24 sm:px-8 lg:px-12">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">The Library</p>
    <h2 className="mt-3 max-w-3xl font-display text-3xl font-semibold uppercase leading-tight tracking-[0.08em] sm:text-4xl">
      {stories.length} journeys, one for every age
    </h2>
    <p className="mt-4 max-w-xl text-white/60">
      Open a route to see where each story can go before you board.
    </p>

    <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {stories.map((story) => (
        <li key={story.id}>
          <button
            type="button"
            onClick={() => onPreview(story)}
            aria-label={`Preview route for ${story.title}`}
            className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-navy-800 text-left transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-2xl hover:shadow-black/40"
          >
            <span className="relative block aspect-[4/3] overflow-hidden">
              <img
                src={`${story.coverImage}?auto=format&fit=crop&w=640&h=480&q=70`}
                alt=""
                loading="lazy"
                className="h-full w-full bg-navy-700 object-cover transition duration-700 group-hover:scale-105"
              />
              <span className="absolute left-3 top-3 rounded-full bg-navy/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-gold backdrop-blur">
                Ages {story.ageRange.min} to {story.ageRange.max}
              </span>
            </span>
            <span className="flex flex-1 flex-col p-5">
              <span className="font-display text-lg font-semibold leading-snug tracking-wide">{story.title}</span>
              <span className="mt-2 text-sm leading-relaxed text-white/60">{story.description}</span>
              <span className="mt-auto pt-5 text-xs font-bold uppercase tracking-[0.2em] text-gold transition group-hover:text-gold-soft">
                Preview route →
              </span>
            </span>
          </button>
        </li>
      ))}
    </ul>
  </section>
);

export default StoryShelf;
