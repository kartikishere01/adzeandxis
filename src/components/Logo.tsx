export default function Logo({ className = "w-64 h-64", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={`relative flex flex-col items-center justify-center rounded-full border border-[var(--accent)] aspect-square ${className}`}
      {...props}
      style={{ overflow: 'hidden' }}
    >
      {/* Background inherit/overlay - giving it a slight olive/dark tint to match the image if placed on black */}
      <div className="absolute inset-0 bg-[#3a3832] opacity-30 pointer-events-none -z-10" />

      {/* Inner concentric circle */}
      <div className="absolute inset-[5%] rounded-full border-[1.5px] border-[var(--accent)] opacity-80 pointer-events-none -z-10" />

      {/* Scalable Container for Text */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center">
        
        {/* Top Text */}
        <span 
          className="font-serif tracking-[0.4em] font-light text-[var(--foreground)] ml-[0.4em]" 
          style={{ fontSize: 'clamp(1rem, 15cqw, 4rem)' }}
        >
          ADZE
        </span>

        {/* Divider 1 */}
        <div className="w-[30%] h-[1px] bg-[var(--accent)] opacity-80 mt-[3%] mb-[3%]" />

        {/* Center Ampersand */}
        <span 
          className="font-serif italic text-[var(--accent)] font-normal leading-none" 
          style={{ fontSize: 'clamp(1.5rem, 24cqw, 6rem)' }}
        >
          &amp;
        </span>

        {/* Divider 2 */}
        <div className="w-[30%] h-[1px] bg-[var(--accent)] opacity-80 mt-[4%] mb-[4%]" />

        {/* Bottom Text */}
        <span 
          className="font-serif tracking-[0.3em] font-light text-[var(--foreground)] ml-[0.3em]" 
          style={{ fontSize: 'clamp(1rem, 15cqw, 4rem)' }}
        >
          AXIS
        </span>

        {/* Bottom Studio Tag */}
        <span 
          className="font-condensed uppercase tracking-[0.6em] text-[var(--muted)] opacity-80 ml-[0.6em] mt-[8%]" 
          style={{ fontSize: 'clamp(0.5rem, 5cqw, 2rem)' }}
        >
          STUDIO
        </span>

      </div>
    </div>
  );
}
