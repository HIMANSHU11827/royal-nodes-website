import React, { useEffect, useRef, useState } from 'react';

export const Reveal = ({ children, delay = 0, className = '', as: Tag = 'div' }) => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
};

export const Counter = ({ to = 0, suffix = '', prefix = '', duration = 1400, className = '' }) => {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const run = () => {
      if (started.current) return;
      started.current = true;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(to * eased));
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    if (typeof IntersectionObserver === 'undefined') {
      run();
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          run();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString('en-IN')}
      {suffix}
    </span>
  );
};

export const SectionLabel = ({ children }) => (
  <div className="inline-flex items-center px-3 py-1 bg-[#1769FF]/15 border border-[#1769FF]/40 text-[#48B7FF] font-bold text-[11px] uppercase tracking-wider">
    {children}
  </div>
);

export const GlowOrbs = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="orb animate-glow bg-[#1769FF]/30 w-[420px] h-[420px] -top-32 -left-24" />
    <div className="orb animate-float bg-[#48B7FF]/20 w-[360px] h-[360px] top-24 right-0" />
    <div className="orb animate-glow bg-[#1769FF]/20 w-[300px] h-[300px] bottom-0 left-1/3" />
  </div>
);


export const ScrollProgress = () => {
  const [progress, setProgress] = React.useState(0);
  React.useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(height > 0 ? Math.min(100, (window.scrollY / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div
      aria-hidden="true"
      className="fixed left-0 top-0 z-[60] h-[2px] bg-gradient-to-r from-[#1769FF] via-[#48B7FF] to-[#1769FF]"
      style={{ width: `${progress}%`, transition: 'width 80ms linear' }}
    />
  );
};

export const CursorGlow = () => {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const move = (event) => {
      if (!ref.current) return;
      ref.current.style.left = `${event.clientX}px`;
      ref.current.style.top = `${event.clientY}px`;
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return <div ref={ref} aria-hidden="true" className="cursor-glow" />;
};

export const Marquee = ({ items = [], className = '' }) => (
  <div className={`overflow-hidden marquee ${className}`} aria-hidden="true">
    <div className="marquee-track">
      {[0, 1].map((dup) => (
        <div key={dup} className="flex items-center gap-8 pr-8">
          {items.map((item) => (
            <span
              key={`${dup}-${item}`}
              className="flex items-center gap-2 whitespace-nowrap text-[11px] uppercase tracking-[0.18em] text-gray-500"
            >
              <span className="h-1 w-1 bg-[#1769FF]" />
              {item}
            </span>
          ))}
        </div>
      ))}
    </div>
  </div>
);

export const WaveDivider = () => (
  <div className="w-full overflow-hidden leading-none" aria-hidden="true">
    <svg viewBox="0 0 1440 60" className="h-[60px] w-full" preserveAspectRatio="none">
      <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill="#0D1522" />
      <path
        d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30"
        fill="none"
        stroke="#1769FF"
        strokeOpacity="0.5"
        strokeWidth="1"
        className="dash-line"
      />
    </svg>
  </div>
);

export const GlitchText = ({ children, className = '' }) => (
  <span className={`glitch ${className}`} data-text={children}>
    {children}
  </span>
);

const NODES = [
  [60, 60], [200, 40], [340, 90], [120, 160], [250, 150], [330, 220], [70, 240], [200, 260]
];
const EDGES = [
  [0, 1], [1, 2], [0, 3], [1, 4], [2, 5], [3, 4], [4, 5], [3, 6], [6, 7], [4, 7], [5, 7]
];

export const NetworkGraph = ({ className = '' }) => (
  <svg viewBox="0 0 400 300" className={className} aria-hidden="true">
    {EDGES.map(([a, b], i) => (
      <line
        key={i}
        x1={NODES[a][0]}
        y1={NODES[a][1]}
        x2={NODES[b][0]}
        y2={NODES[b][1]}
        stroke="#1E293B"
        strokeWidth="1"
        className="dash-line"
        style={{ animationDelay: `${i * 0.25}s` }}
      />
    ))}
    {NODES.map(([x, y], i) => (
      <g key={i}>
        <circle cx={x} cy={y} r="10" fill="#1769FF" opacity="0.12" className="animate-glow" style={{ animationDelay: `${i * 0.4}s` }} />
        <circle cx={x} cy={y} r="3" fill="#48B7FF" />
      </g>
    ))}
  </svg>
);

export const OrbitRings = () => (
  <div aria-hidden="true" className="pointer-events-none absolute inset-0 flex items-center justify-center">
    <div className="orbit-ring" style={{ width: '70%', height: '70%' }} />
    <div className="orbit-ring" style={{ width: '90%', height: '90%', animationDirection: 'reverse' }} />
    <div className="orbit-ring" style={{ width: '50%', height: '50%', animationDuration: '18s' }} />
  </div>
);


const BG_PARTICLES = [
  ['8%', '18%'], ['16%', '62%'], ['24%', '34%'], ['33%', '78%'],
  ['41%', '12%'], ['49%', '55%'], ['57%', '28%'], ['64%', '72%'],
  ['72%', '20%'], ['79%', '48%'], ['86%', '66%'], ['92%', '30%'],
  ['12%', '86%'], ['68%', '88%']
];

const BG_NODES = [
  [120, 120], [340, 80], [560, 160], [820, 90], [1040, 170],
  [220, 340], [480, 300], [720, 360], [980, 320],
  [160, 560], [400, 520], [660, 580], [920, 540], [1120, 600]
];

const BG_EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [1, 6], [2, 7], [3, 8],
  [4, 8], [5, 6], [6, 7], [7, 8], [5, 9], [6, 10], [7, 11], [8, 12],
  [9, 10], [10, 11], [11, 12], [12, 13]
];

export const AnimatedBackground = () => (
  <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
    {/* Aurora orbs */}
    <div className="orb animate-aurora bg-[#1769FF]/15 w-[620px] h-[620px] -top-56 -left-44" />
    <div className="orb animate-float-slow bg-[#48B7FF]/10 w-[540px] h-[540px] top-1/4 right-[-10%]" />
    <div className="orb animate-glow bg-[#1769FF]/10 w-[460px] h-[460px] bottom-[-12%] left-1/3" />
    <div className="orb animate-aurora bg-[#7b66ff]/10 w-[420px] h-[420px] top-[55%] left-[-6%]" style={{ animationDelay: '-7s' }} />

    {/* Panning grid */}
    <div className="absolute inset-0 grid-bg opacity-[0.05] animate-grid-pan" />

    {/* Constellation */}
    <svg className="absolute inset-0 h-full w-full opacity-[0.14]" viewBox="0 0 1200 800" preserveAspectRatio="none">
      {BG_EDGES.map(([a, b], i) => (
        <line
          key={i}
          x1={BG_NODES[a][0]}
          y1={BG_NODES[a][1]}
          x2={BG_NODES[b][0]}
          y2={BG_NODES[b][1]}
          stroke="#48B7FF"
          strokeWidth="1"
          className="dash-line"
          style={{ animationDelay: `${i * 0.35}s` }}
        />
      ))}
      {BG_NODES.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="2" fill="#48B7FF" opacity="0.6" className="animate-glow" style={{ animationDelay: `${i * 0.4}s` }} />
      ))}
    </svg>

    {/* Drifting shapes */}
    <div className="shape" style={{ width: 120, height: 120, top: '12%', left: '8%', animationDelay: '-4s' }} />
    <div className="shape" style={{ width: 84, height: 84, bottom: '18%', right: '10%', borderRadius: '50%', animationDelay: '-9s' }} />
    <div className="shape" style={{ width: 160, height: 160, top: '58%', left: '70%', animationDelay: '-14s' }} />
    <div className="shape" style={{ width: 60, height: 60, top: '36%', left: '46%', borderRadius: '50%', animationDelay: '-6s' }} />
    <div className="orbit-ring opacity-20" style={{ left: '50%', top: '50%', width: '72vw', height: '72vw', marginLeft: '-36vw', marginTop: '-36vw' }} />

    {/* Diagonal light streams */}
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} className="stream" style={{ top: `${8 + i * 19}%`, animationDelay: `${i * 2.3}s` }} />
    ))}

    {/* Floating particles */}
    {BG_PARTICLES.map(([left, top], i) => (
      <span key={i} className="particle" style={{ left, top, animationDelay: `${i * 0.6}s` }} />
    ))}

    {/* Grain + vignette */}
    <div className="noise-overlay" />
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,transparent_0%,rgba(0,0,0,0.28)_75%)]" />
  </div>
);
