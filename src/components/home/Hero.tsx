import { ArrowRight } from 'lucide-react';
import SiteNav from './SiteNav';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

export const HERO_VIDEO_URL = 'https://strvid.nyc3.cdn.digitaloceanspaces.com/motionsite/hero_bg_train.mp4';
export const HERO_POSTER_URL = '/hero-poster.jpg';

interface HeroProps {
  onSearch: () => void;
}

const Hero = ({ onSearch }: HeroProps) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <section id="top" className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-navy">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{ backgroundImage: `url(${HERO_POSTER_URL})` }}
      />
      {!reducedMotion && (
        <video
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          src={HERO_VIDEO_URL}
          poster={HERO_POSTER_URL}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          data-testid="hero-video"
        />
      )}

      <SiteNav onSearch={onSearch} />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-5 pb-24 pt-32 text-center sm:px-8">
        <p className="glass inline-flex animate-fade-up items-center gap-2.5 rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.24em] text-white sm:text-xs">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald" />
          </span>
          <span aria-hidden="true">✧</span> Story Express Adventures
        </p>

        <h1
          className="mt-8 animate-fade-up font-display text-5xl font-bold uppercase leading-[1.12] tracking-[0.05em] text-black [animation-delay:120ms] sm:text-6xl lg:text-7xl"
        >
          Choose Your
          <br />
          Journey
        </h1>

        <p className="mt-6 animate-fade-up text-lg font-semibold text-black [animation-delay:240ms] sm:text-2xl">
          Discover stories. Shape the ending.
        </p>

        <a
          href="#readers"
          className="mt-10 inline-flex animate-fade-up items-center gap-3 rounded-full bg-white px-8 py-4 text-sm font-bold uppercase tracking-[0.18em] text-black shadow-xl shadow-black/20 transition duration-300 [animation-delay:360ms] hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 sm:text-base"
        >
          Begin Reading
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
};

export default Hero;
