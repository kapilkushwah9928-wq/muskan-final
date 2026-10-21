import { useEffect, useRef, useState } from 'react';

const chapters = ['Hello, birthday girl', 'Make a wish', 'Tiny challenge', 'Pick your vibe', 'Our scrapbook', 'Little things', 'A letter', 'One last thing'];
const vibes = {
  sweet: 'I hope your day feels like a warm hug, your favourite song, and a hundred tiny reasons to smile. You deserve the softest kind of happiness. ♡',
  funny: 'Official birthday rule: calories do not count, embarrassing photos are legally protected, and you are allowed to be dramatic for the entire day. 🎂',
  peaceful: 'May this new year of your life bring a quieter mind, brave new beginnings, kind people, and the kind of peace that stays. ✨'
};
type Vibe = keyof typeof vibes;

export default function App() {
  const [chapter, setChapter] = useState(0);
  const [candles, setCandles] = useState([true, true, true]);
  const [wished, setWished] = useState(false);
  const [score, setScore] = useState(0);
  const [vibe, setVibe] = useState<Vibe | ''>('');
  const [revealed, setRevealed] = useState<number[]>([]);
  const [letterOpen, setLetterOpen] = useState(false);
  const [finalOpen, setFinalOpen] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [soundNotice, setSoundNotice] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const notesRef = useRef<number | null>(null);

  useEffect(() => () => {
    if (notesRef.current) window.clearInterval(notesRef.current);
    void audioRef.current?.close();
  }, []);

  function toggleMusic() {
    if (musicOn) {
      if (notesRef.current) window.clearInterval(notesRef.current);
      notesRef.current = null;
      setMusicOn(false);
      return;
    }
    try {
      const AudioCtx = window.AudioContext || (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) { setSoundNotice(true); return; }
      const ctx = audioRef.current ?? new AudioCtx();
      audioRef.current = ctx;
      void ctx.resume();
      const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46];
      let i = 0;
      const play = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = melody[i++ % melody.length];
        gain.gain.setValueAtTime(0.0001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.045, ctx.currentTime + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.48);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(); osc.stop(ctx.currentTime + 0.5);
      };
      play();
      notesRef.current = window.setInterval(play, 560);
      setMusicOn(true);
      setSoundNotice(false);
    } catch { setSoundNotice(true); }
  }

  function goTo(index: number) {
    setChapter(index);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function collect() {
    setScore(s => Math.min(5, s + 1));
  }
  function reset() {
    setChapter(0); setCandles([true, true, true]); setWished(false); setScore(0);
    setVibe(''); setRevealed([]); setLetterOpen(false); setFinalOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return <main className="site-shell">
    <div className="grain" aria-hidden="true" />
    <header className="topbar">
      <a className="brand" href="#home" onClick={e => { e.preventDefault(); goTo(0); }}><span className="brand-mark">♡</span> a little something</a>
      <div className="top-actions">
        <span className="date-chip">OCTOBER 22 · JUST FOR YOU</span>
        <button className={'sound-button ' + (musicOn ? 'is-on' : '')} onClick={toggleMusic} aria-pressed={musicOn}>{musicOn ? '♫ Sound on' : '♫ Play a tune'}</button>
      </div>
    </header>
    {soundNotice && <div className="sound-note">Your browser couldn't start audio. Tap the sound button once more to try again.</div>}
    <nav className="chapter-nav" aria-label="Birthday chapters">
      {chapters.map((name, i) => <button key={name} onClick={() => goTo(i)} className={chapter === i ? 'active' : ''} aria-label={name} title={name}><span>{String(i + 1).padStart(2, '0')}</span><i /></button>)}
    </nav>
    <section className="hero" id="home">
      <div className="hero-copy">
        <p className="eyebrow"><span className="eyebrow-line" /> A SMALL WORLD, MADE WITH LOVE <span className="eyebrow-line" /></p>
        <h1>A little birthday<br/>world for <em>Muskaan.</em></h1>
        <p className="hero-sub">A few tiny surprises, a little bit of chaos, and a whole lot of good wishes. Ready?</p>
        <button className="primary-button" onClick={() => goTo(1)}>Open your surprise <span>↗</span></button>
        <p className="handwritten hero-note">Psst… headphones optional, smiles compulsory.</p>
      </div>
      <div className="hero-art" aria-label="Illustration of a birthday gift">
        <div className="sun-disc" />
        <div className="spark spark-one">✳</div><div className="spark spark-two">✦</div><div className="spark spark-three">✧</div>
        <div className="ribbon-loop loop-left" /><div className="ribbon-loop loop-right" />
        <div className="gift-box"><div className="gift-lid" /><div className="gift-ribbon-v" /><div className="gift-ribbon-h" /><span>for you</span></div>
        <div className="art-caption">a day that's all yours <span>♡</span></div>
      </div>
      <div className="hero-bottom"><span>SCROLL YOUR LITTLE HEART OUT</span><span className="down-arrow">↓</span><span>MADE BY KAPIL · WITH CARE</span></div>
    </section>

    <div className="chapter-wrap">
      <div className="chapter-kicker"><span>CHAPTER {String(chapter + 1).padStart(2, '0')}</span><span className="kicker-dash" /><span>{chapters[chapter].toUpperCase()}</span></div>
      {chapter === 0 && <section className="chapter-card welcome-card">
        <div className="section-ornament">✳</div><p className="eyebrow">FIRST THINGS FIRST</p><h2>Today gets to be<br/><em>about you.</em></h2><p className="section-copy">No big speech. No awkward spotlight. Just a little corner of the internet to remind you that you make the world around you brighter.</p><button className="primary-button" onClick={() => goTo(1)}>Let's begin <span>→</span></button>
      </section>}
      {chapter === 1 && <section className="chapter-card wish-card">
        <div className="section-heading"><p className="eyebrow">A BIRTHDAY RITUAL</p><h2>Three little flames.<br/><em>One big wish.</em></h2><p className="section-copy">Tap each candle to blow it out, then make a wish. Keep it secret — the best ones are.</p></div>
        <div className="cake-scene"><div className="cake-spark">✦</div><div className="candles">{candles.map((lit, i) => <button key={i} className={'candle ' + (lit ? 'lit' : 'out')} onClick={() => setCandles(c => c.map((v, j) => i === j ? !v : v))} aria-label={lit ? 'Blow out candle' : 'Relight candle'}><span className="flame" /><span className="wick" /></button>)}</div><div className="cake-top" /><div className="cake-layer layer-one" /><div className="cake-layer layer-two" /><div className="cake-plate" /></div>
        {wished ? <p className="wish-reveal">May something wonderful find its way to you this year. ✨</p> : <button className="primary-button" disabled={candles.some(Boolean)} onClick={() => setWished(true)}>Make a wish ✨</button>}
        <div className="card-footer"><button className="text-button" onClick={() => goTo(2)}>Next little surprise →</button></div>
      </section>}
      {chapter === 2 && <section className="chapter-card game-card">
        <p className="eyebrow">A VERY SERIOUS BIRTHDAY GAME</p><h2>Catch 5 little<br/><em>happy things.</em></h2><p className="section-copy">Tap the floating stars and hearts to collect a tiny pocketful of joy.</p>
        <div className="score-row"><span>YOUR HAPPY SCORE</span><strong>{score}<small> / 5</small></strong></div>
        <div className="token-grid">{['✦','♡','✧','✿','♥'].map((t,i) => <button key={i} className={'token token-' + i + (score > i ? ' collected' : '')} onClick={collect} disabled={score > i} aria-label="Collect a happy token">{score > i ? '✓' : t}</button>)}</div>
        <div className="progress-track"><span style={{width: (score * 20) + '%'}} /></div>
        {score >= 5 ? <div className="success-note">You did it! Certified collector of good things. ♡ <button className="text-button" onClick={() => goTo(3)}>Continue →</button></div> : <p className="tiny-note">Just {5-score} more to unlock the next chapter.</p>}
      </section>}
      {chapter === 3 && <section className="chapter-card vibe-card">
        <p className="eyebrow">PICK YOUR KIND OF MAGIC</p><h2>What's the birthday<br/><em>mood today?</em></h2><div className="vibe-options">
          <button className={vibe==='sweet'?'selected':''} onClick={() => setVibe('sweet')}><span>🌷</span><strong>Soft & sweet</strong><small>A warm hug in words</small></button>
          <button className={vibe==='funny'?'selected':''} onClick={() => setVibe('funny')}><span>🍰</span><strong>Chaos & cake</strong><small>Because obviously</small></button>
          <button className={vibe==='peaceful'?'selected':''} onClick={() => setVibe('peaceful')}><span>☁️</span><strong>Calm & cozy</strong><small>A little peace, please</small></button>
        </div>{vibe && <div className="vibe-reveal">{vibes[vibe]}</div>}<div className="card-footer"><button className="text-button" onClick={() => goTo(4)}>See your scrapbook →</button></div>
      </section>}
      {chapter === 4 && <section className="chapter-card scrapbook-card">
        <p className="eyebrow">A LITTLE SPACE FOR THE GOOD STUFF</p><h2>Life, in little<br/><em>lovely pieces.</em></h2><p className="section-copy">A scrapbook is better when it's real. These are little placeholders for photos and memories you can add later.</p>
        <div className="scrapbook-grid"><div className="scrap photo-one"><span>01</span><div className="photo-placeholder">✿</div><strong>the candid ones</strong><small>the photos that make you laugh</small></div><div className="scrap photo-two"><span>02</span><div className="photo-placeholder">☼</div><strong>ordinary magic</strong><small>little days worth keeping</small></div><div className="scrap photo-three"><span>03</span><div className="photo-placeholder">♡</div><strong>more memories, please</strong><small>the best bits are still ahead</small></div></div>
        <p className="tiny-note">Photo slots are placeholders — no made-up memories here.</p><div className="card-footer"><button className="text-button" onClick={() => goTo(5)}>Keep going →</button></div>
      </section>}
      {chapter === 5 && <section className="chapter-card little-things-card">
        <p className="eyebrow">THE LITTLE THINGS ARE BIG THINGS</p><h2>Things that make<br/><em>you, you.</em></h2><p className="section-copy">Tap a card. One tiny reminder at a time.</p>
        <div className="little-grid">{[{title:'Your smile',body:'The kind that sneaks up on a room and makes it feel lighter.'},{title:'Your kindness',body:'The little ways you show up matter more than you know.'},{title:'Your energy',body:'A very particular kind of sunshine. Completely your own.'},{title:'Your becoming',body:'You do not have to have it all figured out to be doing beautifully.'}].map((c,i)=><button key={c.title} className={'little-card '+(revealed.includes(i)?'revealed':'')} onClick={() => setRevealed(r=>r.includes(i)?r.filter(n=>n!==i):[...r,i])}><span className="little-number">0{i+1}</span><span className="little-title">{c.title}</span><span className="little-body">{revealed.includes(i)?c.body:'tap to reveal ↗'}</span></button>)}</div>
        <div className="card-footer"><button className="text-button" onClick={() => goTo(6)}>A note for you →</button></div>
      </section>}
      {chapter === 6 && <section className="chapter-card letter-card">
        <div className={'envelope ' + (letterOpen?'opened':'')}><div className="envelope-back" /><div className="letter-paper"><span className="letter-date">OCTOBER 22</span><p>Dear Muskaan,</p><p>Happy birthday! I hope this year brings you beautiful surprises, lots of laughter, peace, and all the little things that make you happy.</p><p>You have a way of making ordinary days feel a little brighter, and I hope today gives some of that brightness back to you.</p><p>Stay exactly as wonderfully you as you are. Have the loveliest birthday. ❤️</p><p className="letter-sign">— Kapil</p></div><button className="envelope-flap" onClick={() => setLetterOpen(o=>!o)} aria-label={letterOpen?'Close letter':'Open letter'} /></div>
        {!letterOpen && <button className="primary-button" onClick={() => setLetterOpen(true)}>Open your letter <span>♡</span></button>}
        {letterOpen && <div className="card-footer"><button className="text-button" onClick={() => goTo(7)}>One last thing… →</button></div>}
      </section>}
      {chapter === 7 && <section className="chapter-card finale-card">
        <div className="finale-stars">✦　✧　✦</div><p className="eyebrow">AND BEFORE YOU GO…</p><h2>One last<br/><em>little thing.</em></h2>
        {!finalOpen ? <><p className="section-copy">The birthday wishes don't end here. There's one more waiting for you.</p><button className="primary-button" onClick={() => setFinalOpen(true)}>One last surprise <span>✧</span></button></> : <div className="final-message"><div className="confetti-row">✦ ♡ ✧ ✿ ♡ ✦</div><h3>Happy Birthday,<br/><em>Muskaan.</em> ❤️</h3><p>May life be gentle with you, may your dreams keep getting bigger, and may you always find reasons to laugh until your cheeks hurt.</p><p className="handwritten">You deserve so many good things.</p><button className="text-button" onClick={reset}>↺ Start the little journey again</button></div>}
      </section>}
    </div>
    <footer className="footer"><span>MADE WITH A LITTLE EXTRA CARE ♡</span><span>FOR MUSKAAN, ALWAYS WISHING YOU WELL</span></footer>
  </main>;
}