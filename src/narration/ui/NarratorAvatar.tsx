import { getNarrator } from '../domain/narrators';
import type { NarratorId } from '../domain/types';

interface NarratorAvatarProps {
  narratorId: NarratorId;
  size?: number;
  speaking?: boolean;
  /** Hide from assistive tech when the narrator's name is already shown next to the avatar. */
  decorative?: boolean;
}

const SKIN = '#7a4a2b';
const SKIN_SHADE = '#613a21';

function Librarian({ mouthClass }: { mouthClass: string }) {
  return (
    <>
      {/* shoulders and cardigan */}
      <path d="M14 100c2-20 18-28 34-28s32 8 34 28z" fill="#9a3412" />
      {/* open book */}
      <path d="M26 92l22-6 22 6v8H26z" fill="#fff7ed" stroke="#7c2d12" strokeWidth="1.5" />
      <path d="M48 86v14" stroke="#7c2d12" strokeWidth="1.5" />
      {/* head */}
      <circle cx="48" cy="46" r="21" fill={SKIN} />
      {/* doek head wrap */}
      <path d="M26 42c0-18 12-26 24-26s22 8 22 26c-6-8-14-12-23-12s-17 4-23 12z" fill="#c2410c" />
      <path d="M30 34c6-6 12-8 20-8" stroke="#fed7aa" strokeWidth="2" fill="none" strokeLinecap="round" strokeDasharray="1 5" />
      <circle cx="68" cy="26" r="6" fill="#ea580c" />
      {/* glasses */}
      <circle cx="40" cy="47" r="6" fill="none" stroke="#451a03" strokeWidth="1.8" />
      <circle cx="56" cy="47" r="6" fill="none" stroke="#451a03" strokeWidth="1.8" />
      <path d="M46 47h4" stroke="#451a03" strokeWidth="1.8" />
      <circle cx="40" cy="47" r="1.8" fill="#1c1917" />
      <circle cx="56" cy="47" r="1.8" fill="#1c1917" />
      {/* smile */}
      <ellipse className={mouthClass} cx="48" cy="60" rx="5" ry="2.6" fill="#7f1d1d" />
      <circle cx="35" cy="57" r="2.6" fill={SKIN_SHADE} opacity="0.5" />
      <circle cx="61" cy="57" r="2.6" fill={SKIN_SHADE} opacity="0.5" />
    </>
  );
}

function Studio({ mouthClass }: { mouthClass: string }) {
  return (
    <>
      {/* hoodie */}
      <path d="M12 100c2-20 18-28 36-28s34 8 36 28z" fill="#155e75" />
      <path d="M40 74l8 12 8-12" fill="none" stroke="#a5f3fc" strokeWidth="2" strokeLinecap="round" />
      {/* head */}
      <circle cx="48" cy="46" r="21" fill={SKIN} />
      {/* short hair */}
      <path d="M27 42c0-14 9-22 21-22s21 8 21 22c-4-6-10-9-21-9s-17 3-21 9z" fill="#1c1917" />
      {/* eyes and brows */}
      <circle cx="40" cy="48" r="2.2" fill="#1c1917" />
      <circle cx="56" cy="48" r="2.2" fill="#1c1917" />
      <path d="M36 42l8-1M52 41l8 1" stroke="#1c1917" strokeWidth="1.8" strokeLinecap="round" />
      {/* big grin */}
      <ellipse className={mouthClass} cx="48" cy="60" rx="6" ry="3.2" fill="#7f1d1d" />
      {/* headphones */}
      <path d="M25 46c0-17 10-27 23-27s23 10 23 27" fill="none" stroke="#0f172a" strokeWidth="4" strokeLinecap="round" />
      <rect x="21" y="43" width="8" height="14" rx="4" fill="#0e7490" stroke="#0f172a" strokeWidth="2" />
      <rect x="67" y="43" width="8" height="14" rx="4" fill="#0e7490" stroke="#0f172a" strokeWidth="2" />
      {/* boom mic */}
      <path d="M71 56c2 6-2 10-12 10" fill="none" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
      <circle cx="57" cy="66" r="3.2" fill="#e2e8f0" stroke="#0f172a" strokeWidth="1.5" />
    </>
  );
}

/** Illustrated storyteller portrait; the mouth bounces while `speaking`. */
export function NarratorAvatar({ narratorId, size = 72, speaking = false, decorative = false }: NarratorAvatarProps) {
  const narrator = getNarrator(narratorId);
  const mouthClass = speaking ? 'animate-pulse' : '';
  const accessibility = decorative
    ? { 'aria-hidden': true as const }
    : { role: 'img' as const, 'aria-label': `${narrator.name}, ${narrator.title}` };

  return (
    <svg
      viewBox="0 0 96 100"
      width={size}
      height={(size * 100) / 96}
      data-speaking={speaking}
      data-narrator={narrator.id}
      style={{ background: narrator.palette.soft, borderRadius: '9999px', overflow: 'hidden' }}
      {...accessibility}
    >
      {narrator.id === 'librarian' ? <Librarian mouthClass={mouthClass} /> : <Studio mouthClass={mouthClass} />}
    </svg>
  );
}
