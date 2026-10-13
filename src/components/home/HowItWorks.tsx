import { Headphones, GitFork, UserRound } from 'lucide-react';

const STEPS = [
  { icon: UserRound, title: 'Pick a reader', body: 'Each reader gets stories matched to their age.' },
  { icon: GitFork, title: 'Choose at every fork', body: 'Your decisions steer the plot toward a different ending.' },
  { icon: Headphones, title: 'Listen along', body: 'Pick a narrator and let the story read itself aloud.' },
];

const HowItWorks = () => (
  <section id="how" className="mx-auto max-w-7xl scroll-mt-8 px-5 pb-28 pt-24 sm:px-8 lg:px-12">
    <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">How it works</p>
    <ol className="mt-8 grid gap-6 md:grid-cols-3">
      {STEPS.map(({ icon: Icon, title, body }, index) => (
        <li key={title} className="glass-dark rounded-3xl p-7">
          <div className="flex items-center justify-between">
            <Icon className="h-7 w-7 text-gold" aria-hidden="true" />
            <span className="font-display text-4xl text-white/10" aria-hidden="true">
              0{index + 1}
            </span>
          </div>
          <h3 className="mt-6 font-display text-lg font-semibold uppercase tracking-[0.1em]">{title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/60">{body}</p>
        </li>
      ))}
    </ol>
  </section>
);

export default HowItWorks;
