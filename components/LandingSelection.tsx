import React, { useState, useRef, useEffect } from 'react';
import { Film } from 'lucide-react';

interface LandingSelectionProps {
  onSelect: (mode: 'cafe' | 'gaming') => void;
}

const SESSION_KEY = 'salek_intro_viewed_session';

export const LandingSelection: React.FC<LandingSelectionProps> = ({ onSelect }) => {
  const [activeVideo, setActiveVideo] = useState<'cafe' | 'gaming' | null>(null);
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [hoveredHalf, setHoveredHalf] = useState<'cafe' | 'gaming' | null>(null);
  const [seenInSession, setSeenInSession] = useState(false);

  const cafeVideoRef = useRef<HTMLVideoElement | null>(null);
  const gamingVideoRef = useRef<HTMLVideoElement | null>(null);
  const hasFinishedRef = useRef(false);

  const cardImagePath = '/card-salek-zabavy.webp';

  // Check sessionStorage: cleared whenever user closes and re-opens browser/tab ("vypne a zapne web")
  useEffect(() => {
    try {
      const sessionSeen = sessionStorage.getItem(SESSION_KEY);
      if (sessionSeen === 'true') {
        setSeenInSession(true);
      }
    } catch {
      // SessionStorage unavailable
    }
  }, []);

  // Pre-load videos so they decode and play instantly without any black frame
  useEffect(() => {
    if (cafeVideoRef.current) {
      cafeVideoRef.current.load();
    }
    if (gamingVideoRef.current) {
      gamingVideoRef.current.load();
    }
  }, []);

  const handleSideClick = (mode: 'cafe' | 'gaming', forceVideo = false) => {
    // If user already watched intro in this session and didn't explicitly request replay, navigate directly without delay
    if (seenInSession && !forceVideo) {
      onSelect(mode);
      return;
    }

    if (activeVideo) return; // Already running

    hasFinishedRef.current = false;
    setActiveVideo(mode);

    const targetVideo = mode === 'cafe' ? cafeVideoRef.current : gamingVideoRef.current;
    if (targetVideo) {
      targetVideo.currentTime = 0;
      targetVideo.play().catch(() => {
        // Fallback if autoplay was blocked
        setIsVideoVisible(true);
      });
    }
  };

  const handleFinish = () => {
    if (hasFinishedRef.current || !activeVideo) return;
    hasFinishedRef.current = true;

    // Smooth fade out into the bright page with no abrupt cut
    setIsExiting(true);

    try {
      sessionStorage.setItem(SESSION_KEY, 'true');
      setSeenInSession(true);
    } catch {
      // Ignore
    }

    const currentMode = activeVideo;
    setTimeout(() => {
      onSelect(currentMode);
    }, 280);
  };

  // Limit video playback to exactly 6 seconds maximum
  const handleTimeUpdate = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    if (video.currentTime >= 6.0) {
      handleFinish();
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-[#0a0806] overflow-hidden select-none">
      
      {/* 1. BASE LAYER: CARD IMAGE (Always visible until video cross-fades in, preventing any black flash) */}
      <div className="absolute inset-0 w-full h-full flex items-center justify-center">
        {/* Ambient blurred backdrop for ultrawide / vertical mobile displays */}
        <img
          src={cardImagePath}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-40 scale-110 pointer-events-none"
        />

        {/* Full Screen Card Image */}
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={cardImagePath}
            alt="Šálek zábavy: Kavárna vs Herní doupě"
            className="w-full h-full object-contain md:object-cover pointer-events-none"
          />

          {/* Interactive 50% left & 50% right click zones */}
          {!activeVideo && (
            <div className="absolute inset-0 flex z-20">
              
              {/* LEFT 50%: Kavárna */}
              <div
                className={`w-1/2 h-full cursor-pointer transition-colors duration-200 ${
                  hoveredHalf === 'cafe' ? 'bg-amber-600/[0.08]' : 'bg-transparent'
                }`}
                onMouseEnter={() => setHoveredHalf('cafe')}
                onMouseLeave={() => setHoveredHalf(null)}
                onClick={() => handleSideClick('cafe')}
                role="button"
                tabIndex={0}
                aria-label="Kavárna"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSideClick('cafe'); }}
              />

              {/* RIGHT 50%: Herní Doupě */}
              <div
                className={`w-1/2 h-full cursor-pointer transition-colors duration-200 ${
                  hoveredHalf === 'gaming' ? 'bg-yellow-500/[0.08]' : 'bg-transparent'
                }`}
                onMouseEnter={() => setHoveredHalf('gaming')}
                onMouseLeave={() => setHoveredHalf(null)}
                onClick={() => handleSideClick('gaming')}
                role="button"
                tabIndex={0}
                aria-label="Herní doupě"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSideClick('gaming'); }}
              />

            </div>
          )}

          {/* Replay button if already seen in current session */}
          {seenInSession && !activeVideo && (
            <div className="absolute bottom-4 right-4 z-30 opacity-70 hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleSideClick(hoveredHalf || 'cafe', true)}
                className="px-3 py-1.5 rounded-full bg-black/60 hover:bg-black/80 text-xs text-amber-200/90 hover:text-white border border-amber-500/30 flex items-center gap-1.5 backdrop-blur-md shadow-lg cursor-pointer"
                title="Přehrát 6s video intro znovu"
              >
                <Film size={13} />
                <span>Přehrát video intro</span>
              </button>
            </div>
          )}

        </div>
      </div>

      {/* 2. PRELOADED KAVÁRNA VIDEO (Fades in without black flash once active and playing) */}
      <video
        ref={cafeVideoRef}
        src="/video/1.webm"
        preload="auto"
        muted
        playsInline
        onPlaying={() => setIsVideoVisible(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out z-30 pointer-events-none ${
          activeVideo === 'cafe' && isVideoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 3. PRELOADED HERNÍ DOUPĚ VIDEO (Fades in without black flash once active and playing) */}
      <video
        ref={gamingVideoRef}
        src="/video/2.webm"
        preload="auto"
        muted
        playsInline
        onPlaying={() => setIsVideoVisible(true)}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleFinish}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ease-out z-30 pointer-events-none ${
          activeVideo === 'gaming' && isVideoVisible ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* 4. VIDEO OVERLAY CONTROLS (Discreet skip button & click-to-finish) */}
      {activeVideo && isVideoVisible && (
        <div 
          className="absolute inset-0 z-40 cursor-pointer"
          onClick={handleFinish}
          title="Klikněte pro přeskočení načítání"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleFinish();
            }}
            className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white text-xs font-sans tracking-wider uppercase backdrop-blur-md border border-white/20 transition-all cursor-pointer"
          >
            Přeskočit načítání ➔
          </button>
        </div>
      )}

      {/* 5. SMOOTH EXIT FADE (Dissolves gracefully into white website background, removing abrupt cuts) */}
      <div 
        className={`absolute inset-0 z-50 bg-[#fcfbfa] pointer-events-none transition-opacity duration-300 ease-in-out ${
          isExiting ? 'opacity-100' : 'opacity-0'
        }`}
      />

    </div>
  );
};