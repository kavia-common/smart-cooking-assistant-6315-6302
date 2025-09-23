import React, { useEffect, useMemo, useRef, useState } from 'react';

function fmt(ms) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const m = Math.floor(s / 60);
  const ss = String(s % 60).padStart(2, '0');
  return `${m}:${ss}`;
}

// PUBLIC_INTERFACE
export default function InteractiveTimer({ seconds = 60, onDone }) {
  /** Simple interactive countdown timer with start/pause/reset. */
  const total = useMemo(() => seconds * 1000, [seconds]);
  const [remaining, setRemaining] = useState(total);
  const [running, setRunning] = useState(false);
  const raf = useRef(null);
  const last = useRef(0);

  useEffect(() => {
    setRemaining(total);
    setRunning(false);
  }, [total]);

  useEffect(() => {
    if (!running) return;
    const step = (ts) => {
      if (!last.current) last.current = ts;
      const delta = ts - last.current;
      last.current = ts;
      setRemaining(prev => {
        const next = prev - delta;
        if (next <= 0) {
          cancelAnimationFrame(raf.current);
          setRunning(false);
          last.current = 0;
          onDone?.();
          return 0;
        }
        return next;
      });
      raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [running, onDone]);

  const start = () => { if (remaining <= 0) setRemaining(total); last.current = 0; setRunning(true); };
  const pause = () => setRunning(false);
  const reset = () => { setRunning(false); last.current = 0; setRemaining(total); };

  return (
    <div className="card" style={{ display: 'flex', alignItems:'center', gap: 12 }}>
      <div style={{ fontWeight: 800, fontSize: 20, minWidth: 64, textAlign:'center' }}>{fmt(remaining)}</div>
      {!running ? <button className="btn secondary" onClick={start}>Start</button> : <button className="btn ghost" onClick={pause}>Pause</button>}
      <button className="btn ghost" onClick={reset}>Reset</button>
    </div>
  );
}
