import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '../store';
import { ArrowRight, Users } from 'lucide-react';
import { stories } from '../data/stories';
import { NarratorPicker } from '../narration/ui/NarratorPicker';
import Logo from './home/Logo';

const StoryLibrary = () => {
  const navigate = useNavigate();
  const currentReader = useAppStore((state) => state.currentReader);

  if (!currentReader) {
    navigate('/');
    return null;
  }

  const recommendedStories = stories.filter(
    story =>
      currentReader.age >= story.ageRange.min &&
      currentReader.age <= story.ageRange.max
  );

  return (
    <div className="min-h-screen bg-navy">
      <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-6 sm:px-8 lg:px-12">
        <Link to="/" aria-label="Story Express home" className="text-white">
          <Logo />
        </Link>
        <button
          type="button"
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-semibold text-white transition hover:border-gold hover:text-gold"
        >
          <Users className="h-4 w-4" aria-hidden="true" />
          Switch reader
        </button>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 lg:px-12">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">Your library</p>
        <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-[0.06em] text-white sm:text-5xl">
          Welcome, {currentReader.name}!
        </h1>

        <div className="mt-10 max-w-3xl rounded-3xl bg-white p-5 text-gray-800 shadow-xl shadow-black/30">
          <NarratorPicker />
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {recommendedStories.map((story) => (
            <li key={story.id}>
              <button
                onClick={() => navigate(`/story/${story.id}`)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-3xl bg-white text-left text-gray-800 shadow-lg shadow-black/30 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-black/50"
              >
                <span className="block h-52 overflow-hidden bg-navy-700">
                  <img
                    src={`${story.coverImage}?auto=format&fit=crop&w=800&h=420&q=70`}
                    alt={story.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </span>
                <span className="flex flex-1 flex-col p-6">
                  <span className="font-display text-xl font-semibold leading-snug tracking-wide text-navy">
                    {story.title}
                  </span>
                  <span className="mt-2 text-gray-600">{story.description}</span>
                  <span className="mt-4 flex flex-wrap gap-2">
                    {story.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-gold/60 bg-gold/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-navy-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 pt-6 text-xs font-bold uppercase tracking-[0.2em] text-navy">
                    Start reading
                    <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default StoryLibrary;
