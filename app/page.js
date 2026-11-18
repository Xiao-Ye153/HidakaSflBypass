'use client';

import { useEffect, useRef, useState } from 'react';

const GLYPHS = 'abcdefghijklmnopqrstuvwxyz0123456789-_';

// huruf domain "diacak" dulu, lalu mengunci satu per satu setelah tag mendarat
function useScramble(text, on) {
  const [out, setOut] = useState('');
  useEffect(() => {
    if (!on || !text) {
      setOut('');
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setOut(text);
      return;
    }
    let raf = 0;
    let start = 0;
    const tick = (t) => {
      if (!start) start = t;
      const k = Math.min(1, (t - start) / 900);
      const fixed = Math.floor(k * text.length);
      let s = '';
      for (let i = 0; i < text.length; i++) {
        s += i < fixed || text[i] === '.' ? text[i] : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setOut(k < 1 ? s : text);
      if (k < 1) raf = requestAnimationFrame(tick);
    };
    const t0 = setTimeout(() => (raf = requestAnimationFrame(tick)), 450);
    return () => {
      clearTimeout(t0);
      cancelAnimationFrame(raf);
    };
  }, [text, on]);
  return out;
}

export default function Page() {
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | run | done | fail
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [p, setP] = useState(0);
  const [copied, setCopied] = useState(false);
  const t0 = useRef(0);
  const timer = useRef(null);

  // kursor menerangi kotak-kotak kertas, wordmark ikut bergeser tipis
  useEffect(() => {
    const root = document.documentElement;
    let raf = 0;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        root.style.setProperty('--mx', e.clientX + 'px');
        root.style.setProperty('--my', e.clientY + 'px');
        root.style.setProperty('--px', ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3));
      });
    };
    window.addEventListener('pointermove', move);
    return () => {
      window.removeEventListener('pointermove', move);
      cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => () => clearInterval(timer.current), []);

  const domain = result ? result.data.author : '';
  const finalUrl = result ? result.data.media[0].url : '';
  const safe = /^https?:\/\//i.test(finalUrl);
  const scrambled = useScramble(domain, phase === 'done');

  const onChange = (e) => {
    setUrl(e.target.value);
    if (phase === 'done' || phase === 'fail') {
      setPhase('idle');
      setP(0);
      setLogs([]);
    }
  };

  const run = async (e) => {
    e.preventDefault();
    if (phase === 'run' || !url.trim()) return;
    setPhase('run');
    setLogs([]);
    setResult(null);
    setError(null);
    setCopied(false);
    setP(0);
    t0.current = performance.now();
    clearInterval(timer.current);
    timer.current = setInterval(() => setP(Math.min(0.94, (performance.now() - t0.current) / 21000)), 100);
    const stamp = () => ((performance.now() - t0.current) / 1000).toFixed(1) + ' dtk';

    let finished = false;
    const finish = (r) => {
      finished = true;
      clearInterval(timer.current);
      if (r.status) {
        setResult(r);
        setP(1);
        setPhase('done');
      } else {
        setError({ msg: r.error || 'Gagal, penyebabnya tidak diketahui.', raw: r.raw });
        setPhase('fail');
      }
    };

    try {
      const res = await fetch('/api/bypass', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      if (!res.ok || !res.body) throw new Error('Server membalas HTTP ' + res.status);
      const reader = res.body.getReader();
      const dec = new TextDecoder();
      let buf = '';
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        buf += dec.decode(value, { stream: true });
        let i;
        while ((i = buf.indexOf('\n')) >= 0) {
          const line = buf.slice(0, i).trim();
          buf = buf.slice(i + 1);
          if (!line) continue;
          const m = JSON.parse(line);
          if (m.t === 'log') setLogs((l) => [...l, { msg: m.msg, at: stamp() }]);
          if (m.t === 'done') finish(m.result);
        }
      }
      if (!finished) {
        finish({ status: false, error: 'Koneksi putus sebelum selesai. Kalau di Vercel, cek batas waktu fungsi (maxDuration).' });
      }
    } catch (err) {
      if (!finished) finish({ status: false, error: err.message });
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {}
  };

  const blank = { idle: 'Hasil nongol di sini', run: 'Lagi diputus…', fail: 'Belum berhasil' }[phase];

  return (
    <>
      <div className="grid" aria-hidden />
      <div className="grid-hot" aria-hidden />

      <main className="sheet" data-phase={phase} style={{ '--p': p }}>
        <section className="hero">
          <h1 className="mark" aria-label="HidakaSfl">
            <span className="size" aria-hidden>
              Hidaka
              <br />
              Sfl
            </span>
            <span className="half top" aria-hidden>
              Hidaka
              <br />
              Sfl
            </span>
            <span className="half bot" aria-hidden>
              Hidaka
              <br />
              Sfl
            </span>
            <svg className="cutmark" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden>
              <line x1="0" y1="62" x2="100" y2="38" />
            </svg>
          </h1>
          <p className="intro">Tempel link sfl.gl, tunggu sekitar 20 detik, dapat link tujuannya.</p>
        </section>

        <div className="cut" aria-hidden>
          <div className="cut-line" />
          <svg className="scissors" viewBox="0 0 48 32">
            <g className="bl a">
              <line x1="4" y1="26" x2="46" y2="8" />
              <circle cx="4" cy="26" r="3.6" />
            </g>
            <g className="bl b">
              <line x1="4" y1="6" x2="46" y2="24" />
              <circle cx="4" cy="6" r="3.6" />
            </g>
            <circle className="pin" cx="27.3" cy="16" r="1.8" />
          </svg>
        </div>

        <form onSubmit={run}>
          <div className="row">
            <input
              className="field"
              type="text"
              inputMode="url"
              autoComplete="off"
              spellCheck="false"
              placeholder="https://sfl.gl/..."
              aria-label="Link sfl.gl"
              value={url}
              onChange={onChange}
            />
            <button className="btn go" type="submit" disabled={phase === 'run' || !url.trim()}>
              {phase === 'run' ? 'Memotong…' : 'Buka link'}
            </button>
          </div>
          <div className="dim" aria-hidden>
            <i />
            <span>{url.trim() ? `${url.trim().length} karakter` : 'panjang link'}</span>
            <i />
          </div>
        </form>

        <section className="stage" aria-live="polite">
          <div>
            {logs.length === 0 && !error ? (
              <p className="empty">Belum ada proses. Tempel link di atas, lalu tekan Buka link.</p>
            ) : (
              <ol className="notes">
                {logs.map((l, i) => (
                  <li key={i} className={phase === 'run' && i === logs.length - 1 ? 'now' : ''}>
                    <span>{l.msg}</span>
                    <time>{l.at}</time>
                  </li>
                ))}
              </ol>
            )}
            {error && (
              <div className="fail" role="alert">
                <strong>{error.msg}</strong>
                {error.raw ? (
                  <details>
                    <summary>Detail teknis</summary>
                    <pre>{String(error.raw).slice(0, 1500)}</pre>
                  </details>
                ) : null}
              </div>
            )}
          </div>

          <div className={`tag-wrap ${phase === 'done' ? 'landed' : ''}`}>
            <svg className="cord" viewBox="0 0 60 70" aria-hidden>
              <path d="M30 70 C30 44 12 44 12 24 C12 6 34 4 38 20 C40 30 31 38 30 52" />
              {phase !== 'done' && <path className="frayed" d="M30 52 L27 46 M30 52 L33 47" />}
            </svg>
            {phase === 'done' ? (
              <div className="tag">
                <p className="dom" aria-label={domain}>
                  {scrambled || domain}
                </p>
                <p className="url">{finalUrl}</p>
                <div className="acts">
                  {safe && (
                    <a className="btn open" href={finalUrl} target="_blank" rel="noopener noreferrer">
                      Buka link
                    </a>
                  )}
                  <button className="btn copy" type="button" onClick={copy}>
                    {copied ? 'Tersalin' : 'Salin'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="tag blank">
                <p>{blank}</p>
              </div>
            )}
          </div>
        </section>

        <footer className="foot">Logika bypass oleh JH a.k.a Dhika, kesayangan: Fiony Alveria♡</footer>
      </main>
    </>
  );
}
