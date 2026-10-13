interface LogoProps {
  className?: string;
}

const Logo = ({ className = '' }: LogoProps) => (
  <span className={`inline-flex items-center gap-2.5 ${className}`}>
    <svg viewBox="0 0 32 32" className="h-7 w-7" fill="none" aria-hidden="true">
      <path d="M2 27 12 8l5 9 3-5 10 15H2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="m9.5 13 2.5 2.5 2.5-2.5" stroke="#D4AF37" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
    <span className="font-display text-lg font-semibold uppercase tracking-[0.28em]">Story Express</span>
  </span>
);

export default Logo;
