export interface PlayerAvatarProps {
  player?: { id?: number | string; name: string };
  id?: number | string;
  name?: string;
  size?: number;
  jerseyColor?: string;
  secondaryColor?: string;
  number?: number;
  className?: string;
}

export function PlayerAvatar({
  player,
  id,
  name,
  size = 48,
  jerseyColor = '#3b82f6',
  secondaryColor = '#ffffff',
  number,
  className = ''
}: PlayerAvatarProps) {
  const actualId = id ?? player?.id ?? 1;
  const actualName = name ?? player?.name ?? 'Player';
  // Deterministic hash based on name or id
  const str = `${actualId}-${actualName}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  const skinTones = ['#f5d0b5', '#e8b896', '#cf9972', '#a16e4b', '#734426', '#4a2c17'];
  const hairColors = ['#1a1a1a', '#3b2219', '#5c3826', '#b0824b', '#d1ab6e', '#80261b'];
  const eyeColors = ['#2e1f14', '#1b3240', '#2d4a22'];

  const skin = skinTones[Math.abs(hash) % skinTones.length];
  const hair = hairColors[Math.abs(hash >> 3) % hairColors.length];
  const eyes = eyeColors[Math.abs(hash >> 6) % eyeColors.length];
  const hairStyle = Math.abs(hash >> 2) % 4; // 0: short crop, 1: curly/afro, 2: fade, 3: styled/quiff
  const hasBeard = (Math.abs(hash >> 5) % 3 === 0);

  return (
    <div
      className={`player-avatar-container ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.9))',
        border: `2px solid ${jerseyColor}`,
        boxShadow: `0 0 10px ${jerseyColor}33`,
        position: 'relative',
        flexShrink: 0
      }}
      title={name}
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Jersey / Torso */}
        <path d="M15 100 C15 78, 28 66, 50 66 C72 66, 85 78, 85 100 Z" fill={jerseyColor} />
        {/* Collar / Trim */}
        <path d="M40 66 L50 78 L60 66 C55 68, 45 68, 40 66 Z" fill={secondaryColor} />
        {/* Jersey stripes detail */}
        <line x1="30" y1="72" x2="30" y2="100" stroke={secondaryColor} strokeWidth="3" opacity="0.4" />
        <line x1="70" y1="72" x2="70" y2="100" stroke={secondaryColor} strokeWidth="3" opacity="0.4" />

        {/* Neck */}
        <rect x="42" y="52" width="16" height="18" rx="4" fill={skin} />

        {/* Head */}
        <ellipse cx="50" cy="42" rx="22" ry="24" fill={skin} />

        {/* Ears */}
        <circle cx="28" cy="44" r="5" fill={skin} />
        <circle cx="72" cy="44" r="5" fill={skin} />

        {/* Eyes */}
        <ellipse cx="42" cy="42" rx="3" ry="3.5" fill="#ffffff" />
        <circle cx="42" cy="42" r="2" fill={eyes} />
        <ellipse cx="58" cy="42" rx="3" ry="3.5" fill="#ffffff" />
        <circle cx="58" cy="42" r="2" fill={eyes} />

        {/* Eyebrows */}
        <path d="M38 36 Q42 34 46 36" stroke={hair} strokeWidth="2.5" strokeLinecap="round" />
        <path d="M54 36 Q58 34 62 36" stroke={hair} strokeWidth="2.5" strokeLinecap="round" />

        {/* Nose */}
        <path d="M50 42 L48 48 L52 48" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" fill="none" />

        {/* Mouth */}
        <path d="M45 54 Q50 58 55 54" stroke="#000000" strokeWidth="2" strokeLinecap="round" opacity="0.4" fill="none" />

        {/* Beard (optional) */}
        {hasBeard && (
          <path d="M36 48 C36 62, 64 62, 64 48 C60 56, 40 56, 36 48 Z" fill={hair} opacity="0.75" />
        )}

        {/* Hair Styles */}
        {hairStyle === 0 && (
          // Short crop
          <path d="M28 36 C28 20, 72 20, 72 36 C68 24, 32 24, 28 36 Z" fill={hair} />
        )}
        {hairStyle === 1 && (
          // Afro / Curly
          <ellipse cx="50" cy="28" rx="26" ry="18" fill={hair} />
        )}
        {hairStyle === 2 && (
          // High fade / Undercut
          <path d="M30 32 C32 18, 68 18, 70 32 C65 22, 35 22, 30 32 Z" fill={hair} />
        )}
        {hairStyle === 3 && (
          // Styled Quiff
          <path d="M28 34 C30 14, 70 12, 74 34 C64 18, 36 20, 28 34 Z" fill={hair} />
        )}
      </svg>
      {number !== undefined && (
        <span
          style={{
            position: 'absolute',
            bottom: 2,
            right: 4,
            fontSize: `${Math.max(9, Math.round(size * 0.22))}px`,
            fontWeight: 900,
            color: secondaryColor,
            textShadow: '0 1px 3px rgba(0,0,0,0.8)'
          }}
        >
          {number}
        </span>
      )}
    </div>
  );
}
