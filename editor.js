/* SOAR reel editor: canvas preview, trim, speed, slow motion at peak, filters, text, music, export to a real video file */
'use strict';
window.Editor = (() => {
  const SIZES = { '9:16': [540, 960], '1:1': [720, 720], '16:9': [960, 540] };
  const FILTERS = [
    ['none', 'Original', 'none'],
    ['punch', 'Red Bull Punch', 'contrast(1.25) saturate(1.45) brightness(1.03)'],
    ['cine', 'Cinematic', 'contrast(1.12) saturate(.85) sepia(.18) brightness(.95)'],
    ['mono', 'Mono', 'grayscale(1) contrast(1.25)'],
    ['vivid', 'Vivid', 'saturate(1.8) contrast(1.08)'],
    ['gold', 'Golden hour', 'sepia(.35) saturate(1.3) brightness(1.06) hue-rotate(-10deg)'],
  ];
  const TEMPLATES = {
    epic: { name: 'Epic Summit', filter: 'cine', speed: 1, text: 'EARN YOUR WINGS', pos: 'bottom', music: 'rise', ratio: '9:16' },
    fast: { name: 'Fast Cuts', filter: 'punch', speed: 1.5, text: 'NO REMOTE. NO CREW.', pos: 'top', music: 'rush', ratio: '9:16' },
    heart: { name: 'Heartbeat Edit', filter: 'vivid', speed: 1, text: 'MY HEART SAID GO', pos: 'middle', music: 'rush', ratio: '9:16', slow: true },
    clean: { name: 'Clean', filter: 'none', speed: 1, text: '', pos: 'bottom', music: 'none', ratio: '16:9' },
  };
  const SAMPLE = ['rider.jpg', 'bikers.jpg', 'paraglider.jpg', 'skydiver.jpg', 'sunset.jpg', 'creator.jpg'];
  const E = {
    kind: 'images', imgs: [], picked: ['rider.jpg', 'paraglider.jpg', 'skydiver.jpg'], video: null, videoURL: null, dur: 12,
    a: 0, b: 12, t: 0, playing: false, speed: 1, slow: true, filter: 'punch', text: 'EARN YOUR WINGS', pos: 'bottom', badge: true, mark: true,
    ratio: '9:16', music: 'none', vol: .7, peak: 151, peakAt: .6, exporting: false, tab: 'source', last: 0,
  };
  let cv, ctx, built = false, raf, ac, srcNode, musicGain, musicStop, recDest;
  const $ = (s, r = document) => r.querySelector(s);
  const icon = window.icon || (() => '');
  const supportsFilter = (() => { try { const c = document.createElement('canvas').getContext('2d'); return 'filter' in c; } catch (e) { return false; } })();

  function build() {
    const el = $('#v-create');
    el.innerHTML = `
    <div class="chips" id="edTpl">${Object.entries(TEMPLATES).map(([k, t]) => `<button class="chip" data-tpl="${k}">${t.name}</button>`).join('')}</div>
    <div class="edstage" style="margin-top:10px"><canvas id="edCanvas"></canvas></div>
    <div class="edbar">
      <button class="iconbtn" id="edPlay" aria-label="Play">${icon('play')}</button>
      <div class="scrub" id="scrub"><div class="sel"></div><div class="pk"></div><div class="head"></div></div>
      <div class="time" id="edTime">0:00</div>
    </div>
    <div class="toolrow" id="edTools">
      ${[['source', 'folder', 'Clips'], ['trim', 'scissors', 'Trim'], ['speed', 'gauge', 'Speed'], ['filter', 'sparkles', 'Filter'], ['text', 'type', 'Text'], ['music', 'music', 'Music']]
        .map(([k, i, t]) => `<button class="tool ${k === E.tab ? 'active' : ''}" data-tab="${k}">${icon(i)}${t}</button>`).join('')}
    </div>
    <div class="panel" data-p="source">
      <div class="btnrow" style="margin-top:0"><button class="btn red" id="edImport">${icon('upload')}From phone</button><button class="btn ghost" id="edSample">${icon('drone')}My SOAR clips</button></div>
      <div class="tiny muted" style="margin-top:8px">Tap clips to add or remove them from the reel</div>
      <div class="srcpick" id="srcPick">${SAMPLE.map(s => `<img src="assets/${s}" data-s="${s}" alt="">`).join('')}</div>
    </div>
    <div class="panel" data-p="trim">
      <label class="field"><span>Start: <b id="trA">0.0 s</b></span><input type="range" id="trimA" min="0" max="100" value="0"></label>
      <label class="field" style="margin:0"><span>End: <b id="trB">12.0 s</b></span><input type="range" id="trimB" min="0" max="100" value="100"></label>
      <label class="field" id="lenWrap" style="margin-top:10px"><span>Reel length: <b id="lenV">12 s</b></span><input type="range" id="lenR" min="6" max="30" value="12"></label>
    </div>
    <div class="panel" data-p="speed">
      <div class="field"><span>Speed</span><div class="chips" id="spdChips">${[.25, .5, 1, 1.5, 2].map(s => `<button class="chip" data-spd="${s}">${s}x</button>`).join('')}</div></div>
      <div class="between"><div><b>Slow motion at my peak</b><div class="tiny muted">Drops to 0.4x around the heartbeat spike</div></div><button class="toggle" id="slowT"></button></div>
      <div class="field" style="margin-top:12px"><span>Shape</span><div class="chips" id="ratioChips">${Object.keys(SIZES).map(r => `<button class="chip" data-ratio="${r}">${r === '9:16' ? '9:16 Reels' : r === '1:1' ? '1:1 Post' : '16:9 YouTube'}</button>`).join('')}</div></div>
    </div>
    <div class="panel" data-p="filter"><div class="swatches">${FILTERS.map(([k, n, f]) => `<button class="swatch" data-f="${k}"><img src="assets/rider.jpg" style="filter:${f}" alt=""><div>${n}</div></button>`).join('')}</div></div>
    <div class="panel" data-p="text">
      <label class="field"><span>Title on the reel</span><input id="edText" maxlength="40"></label>
      <div class="field"><span>Position</span><div class="chips" id="posChips">${['top', 'middle', 'bottom'].map(p => `<button class="chip" data-pos="${p}">${p}</button>`).join('')}</div></div>
      <div class="between"><div><b>Heartbeat badge</b><div class="tiny muted">Shows your bpm at the peak</div></div><button class="toggle" id="badgeT"></button></div>
      <div class="between" style="margin-top:10px"><div><b>SOAR watermark</b><div class="tiny muted">Small corner logo</div></div><button class="toggle" id="markT"></button></div>
    </div>
    <div class="panel" data-p="music">
      <div class="chips" id="musChips">${[['none', 'No music'], ['rush', 'Rush beat'], ['rise', 'Rise pad']].map(([k, n]) => `<button class="chip" data-mus="${k}">${n}</button>`).join('')}</div>
      <label class="field" style="margin-top:10px"><span>Music volume</span><input type="range" id="musVol" min="0" max="100" value="70"></label>
      <div class="tiny muted">Original sound from your video is kept and mixed under the music.</div>
    </div>
    <div class="btnrow"><button class="btn red" id="edExport">${icon('download')}Export and download</button><button class="btn" id="edPost">${icon('upload')}Post</button></div>
    <div class="progress"><i id="edProg"></i></div>
    <div class="tiny muted" id="edStatus" style="margin-top:6px">Pick clips or import a video, then export. The reel saves to your phone and your library.</div>
    <div style="height:12px"></div>`;
    window.hydrateIcons && hydrateIcons(el);
    cv = $('#edCanvas'); ctx = cv.getContext('2d');
    wire(el); built = true;
  }

  function wire(el) {
    el.addEventListener('click', e => {
      const b = e.target.closest('button,img'); if (!b) return;
      if (b.dataset.tab) { E.tab = b.dataset.tab; syncUI(); }
      else if (b.dataset.tpl) applyTpl(b.dataset.tpl);
      else if (b.dataset.s) { const s = b.dataset.s; E.picked = E.picked.includes(s) ? E.picked.filter(x => x !== s) : [...E.picked, s]; if (!E.picked.length) E.picked = [s]; loadImages(E.picked); }
      else if (b.dataset.spd) { E.speed = +b.dataset.spd; syncUI(); }
      else if (b.dataset.ratio) { E.ratio = b.dataset.ratio; resize(); syncUI(); }
      else if (b.dataset.f) { E.filter = b.dataset.f; syncUI(); }
      else if (b.dataset.pos) { E.pos = b.dataset.pos; syncUI(); }
      else if (b.dataset.mus) { E.music = b.dataset.mus; if (E.playing) { stopMusic(); startMusic(); } syncUI(); }
      else if (b.id === 'slowT') { E.slow = !E.slow; syncUI(); }
      else if (b.id === 'badgeT') { E.badge = !E.badge; syncUI(); }
      else if (b.id === 'markT') { E.mark = !E.mark; syncUI(); }
      else if (b.id === 'edPlay') togglePlay();
      else if (b.id === 'edImport') pickFile();
      else if (b.id === 'edSample') { E.picked = ['rider.jpg', 'paraglider.jpg', 'skydiver.jpg']; loadImages(E.picked); }
      else if (b.id === 'edExport') exportReel(false);
      else if (b.id === 'edPost') exportReel(true);
    });
    $('#edText').addEventListener('input', e => { E.text = e.target.value; draw(); });
    $('#trimA').addEventListener('input', e => { E.a = Math.min(+e.target.value / 100 * E.dur, E.b - 1); E.t = E.a; syncUI(); seek(); });
    $('#trimB').addEventListener('input', e => { E.b = Math.max(+e.target.value / 100 * E.dur, E.a + 1); syncUI(); });
    $('#lenR').addEventListener('input', e => { E.dur = +e.target.value; E.a = 0; E.b = E.dur; E.t = 0; syncUI(); });
    $('#musVol').addEventListener('input', e => { E.vol = +e.target.value / 100; if (musicGain) musicGain.gain.value = E.vol * .5; });
    $('#scrub').addEventListener('pointerdown', e => { const r = e.currentTarget.getBoundingClientRect(); E.t = Math.max(E.a, Math.min(E.b, (e.clientX - r.left) / r.width * E.dur)); seek(); draw(); syncTime(); });
  }

  function applyTpl(k) { const t = TEMPLATES[k]; Object.assign(E, { filter: t.filter, speed: t.speed, text: t.text, pos: t.pos, music: t.music, ratio: t.ratio, slow: t.slow ?? E.slow }); resize(); syncUI(); draw(); toastE(t.name + ' applied'); }
  function toastE(m) { window.toast && toast(m); }

  function syncUI() {
    const el = $('#v-create');
    el.querySelectorAll('.tool').forEach(b => b.classList.toggle('active', b.dataset.tab === E.tab));
    el.querySelectorAll('.panel').forEach(p => p.classList.toggle('active', p.dataset.p === E.tab));
    el.querySelectorAll('#srcPick img').forEach(i => i.classList.toggle('on', E.kind === 'images' && E.picked.includes(i.dataset.s)));
    el.querySelectorAll('[data-spd]').forEach(b => b.classList.toggle('active', +b.dataset.spd === E.speed));
    el.querySelectorAll('[data-ratio]').forEach(b => b.classList.toggle('active', b.dataset.ratio === E.ratio));
    el.querySelectorAll('[data-f]').forEach(b => b.classList.toggle('active', b.dataset.f === E.filter));
    el.querySelectorAll('[data-pos]').forEach(b => b.classList.toggle('active', b.dataset.pos === E.pos));
    el.querySelectorAll('[data-mus]').forEach(b => b.classList.toggle('active', b.dataset.mus === E.music));
    $('#slowT').classList.toggle('on', E.slow); $('#badgeT').classList.toggle('on', E.badge); $('#markT').classList.toggle('on', E.mark);
    if (document.activeElement !== $('#edText')) $('#edText').value = E.text;
    $('#trimA').value = E.a / E.dur * 100; $('#trimB').value = E.b / E.dur * 100;
    $('#trA').textContent = E.a.toFixed(1) + ' s'; $('#trB').textContent = E.b.toFixed(1) + ' s';
    $('#lenWrap').style.display = E.kind === 'images' ? 'block' : 'none'; $('#lenV').textContent = E.dur + ' s';
    const sel = $('#scrub .sel'); sel.style.left = E.a / E.dur * 100 + '%'; sel.style.width = (E.b - E.a) / E.dur * 100 + '%';
    $('#scrub .pk').style.left = E.peakAt * 100 + '%';
    syncTime(); draw();
  }
  const mmss = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  function syncTime() { const h = $('#scrub .head'); if (h) h.style.left = E.t / E.dur * 100 + '%'; const tm = $('#edTime'); if (tm) tm.textContent = mmss(E.t - E.a) + ' / ' + mmss((E.b - E.a) / E.speed); }

  function resize() { const [w, h] = SIZES[E.ratio]; cv.width = w; cv.height = h; draw(); }

  /* ---------- sources */
  function loadImages(list) {
    stopPlay(); E.kind = 'images'; if (E.video) { E.video.pause(); }
    E.imgs = list.map(s => { const i = new Image(); i.src = 'assets/' + s; i.onload = draw; return i; });
    E.dur = Math.max(6, Math.min(30, list.length * 4)); E.a = 0; E.b = E.dur; E.t = 0; E.peakAt = .6; syncUI();
  }
  function loadBlob(blob, label) {
    stopPlay(); E.kind = 'video';
    if (E.videoURL) URL.revokeObjectURL(E.videoURL);
    E.videoURL = URL.createObjectURL(blob);
    if (!E.video) { E.video = document.createElement('video'); E.video.playsInline = true; E.video.setAttribute('playsinline', ''); E.video.crossOrigin = 'anonymous'; E.video.preload = 'auto'; }
    const v = E.video; v.src = E.videoURL; v.muted = false;
    v.onloadedmetadata = () => {
      E.dur = isFinite(v.duration) && v.duration > 0 ? v.duration : 15; E.a = 0; E.b = Math.min(E.dur, 60); E.t = 0; E.peakAt = .5;
      v.currentTime = 0.01; syncUI(); toastE((label || 'Video') + ' loaded: ' + E.dur.toFixed(1) + ' s');
    };
    v.onseeked = draw; v.onloadeddata = draw;
    E.tab = 'trim';
  }
  function pickFile() {
    const inp = document.getElementById('fileVideo');
    inp.onchange = e => { const f = e.target.files[0]; e.target.value = ''; if (!f) return; if (f.type.startsWith('image')) { const u = URL.createObjectURL(f); stopPlay(); E.kind = 'images'; const i = new Image(); i.onload = draw; i.src = u; E.imgs = [i]; E.picked = []; E.dur = 8; E.a = 0; E.b = 8; E.t = 0; syncUI(); } else loadBlob(f, f.name); };
    inp.click();
  }

  /* ---------- drawing */
  function cover(src, sw, sh, scale = 1, px = 0, py = 0) {
    const W = cv.width, H = cv.height; if (!sw || !sh) return;
    const s = Math.max(W / sw, H / sh) * scale; const w = sw * s, h = sh * s;
    ctx.drawImage(src, (W - w) / 2 + px * W, (H - h) / 2 + py * H, w, h);
  }
  function currentRate(t) {
    const pk = E.peakAt * E.dur; let r = E.speed;
    if (E.slow && Math.abs(t - pk) < 1.2) r = Math.min(r, .4);
    return r;
  }
  function draw() {
    if (!ctx) return;
    const W = cv.width, H = cv.height; const t = E.t;
    ctx.save(); ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
    const f = FILTERS.find(x => x[0] === E.filter)[2];
    if (supportsFilter) ctx.filter = f;
    if (E.kind === 'video' && E.video && E.video.readyState >= 2) cover(E.video, E.video.videoWidth, E.video.videoHeight);
    else if (E.kind === 'images' && E.imgs.length) {
      const n = E.imgs.length, seg = (E.b - E.a) / n, rel = Math.max(0, t - E.a), k = Math.min(n - 1, Math.floor(rel / seg)), p = (rel - k * seg) / seg;
      const drawK = (j, pp, alpha) => { const im = E.imgs[j]; if (!im || !im.complete || !im.naturalWidth) return; ctx.globalAlpha = alpha; const dir = j % 2 ? 1 : -1; cover(im, im.naturalWidth, im.naturalHeight, 1.06 + pp * .14, dir * (pp - .5) * .05, (j % 3 - 1) * .02 * pp); };
      drawK(k, p, 1);
      const fade = .35 / seg; if (p > 1 - fade && k < n - 1) drawK(k + 1, 0, (p - (1 - fade)) / fade);
      ctx.globalAlpha = 1;
    }
    ctx.filter = 'none';
    if (!supportsFilter && E.filter !== 'none') { // fallback tint for browsers without canvas filters
      ctx.globalCompositeOperation = E.filter === 'mono' ? 'saturation' : 'overlay';
      ctx.fillStyle = { punch: 'rgba(229,22,61,.18)', cine: 'rgba(40,60,90,.35)', mono: '#888', vivid: 'rgba(255,200,0,.18)', gold: 'rgba(255,170,60,.3)' }[E.filter];
      ctx.fillRect(0, 0, W, H); ctx.globalCompositeOperation = 'source-over';
    }
    if (E.filter === 'cine') { ctx.fillStyle = '#000'; const bar = H * .07; ctx.fillRect(0, 0, W, bar); ctx.fillRect(0, H - bar, W, bar); }
    const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * .35, W / 2, H / 2, Math.max(W, H) * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(0,0,0,.45)'); ctx.fillStyle = g; ctx.fillRect(0, 0, W, H);
    // title
    if (E.text) {
      const fs = Math.round(Math.min(W, H) * .085); ctx.font = `900 ${fs}px Arial, sans-serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      const words = E.text.toUpperCase().split(' '); const lines = []; let line = '';
      words.forEach(w => { const test = line ? line + ' ' + w : w; if (ctx.measureText(test).width > W * .84 && line) { lines.push(line); line = w; } else line = test; }); if (line) lines.push(line);
      const lh = fs * 1.08; const y0 = E.pos === 'top' ? H * .14 : E.pos === 'middle' ? H / 2 - (lines.length - 1) * lh / 2 : H * .8 - (lines.length - 1) * lh;
      ctx.shadowColor = 'rgba(0,0,0,.6)'; ctx.shadowBlur = 18; ctx.fillStyle = '#fff';
      lines.forEach((l, i) => ctx.fillText(l, W / 2, y0 + i * lh)); ctx.shadowBlur = 0;
      ctx.fillStyle = '#e5163d'; ctx.fillRect(W / 2 - W * .09, y0 + (lines.length - 1) * lh + fs * .62, W * .18, Math.max(4, fs * .08));
    }
    // peak badge
    const pk = E.peakAt * E.dur;
    if (E.badge && Math.abs(t - pk) < 1.6) {
      const s = Math.min(W, H) / 540; const bw = 250 * s, bh = 58 * s, bx = W / 2 - bw / 2, by = H * .3;
      ctx.fillStyle = 'rgba(229,22,61,.92)'; roundRect(bx, by, bw, bh, bh / 2); ctx.fill();
      ctx.fillStyle = '#fff'; ctx.font = `900 ${26 * s}px Arial`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('♥ ' + E.peak + ' BPM PEAK', W / 2, by + bh / 2);
      if (E.slow) { ctx.font = `800 ${18 * s}px Arial`; ctx.fillStyle = '#ffcc00'; ctx.fillText('SLOW MOTION', W / 2, by + bh + 22 * s); }
    }
    if (E.mark) { const s = Math.min(W, H) / 540; ctx.font = `900 ${18 * s}px Arial`; ctx.textAlign = 'right'; ctx.textBaseline = 'alphabetic'; ctx.fillStyle = 'rgba(255,255,255,.85)'; ctx.fillText('RED BULL ', W - 64 * s, H - 22 * s); ctx.fillStyle = '#ffcc00'; ctx.fillText('SOAR', W - 18 * s, H - 22 * s); }
    ctx.restore();
  }
  function roundRect(x, y, w, h, r) { ctx.beginPath(); ctx.moveTo(x + r, y); ctx.arcTo(x + w, y, x + w, y + h, r); ctx.arcTo(x + w, y + h, x, y + h, r); ctx.arcTo(x, y + h, x, y, r); ctx.arcTo(x, y, x + w, y, r); ctx.closePath(); }

  /* ---------- playback */
  function seek() { if (E.kind === 'video' && E.video) try { E.video.currentTime = E.t; } catch (e) { } }
  function ensureAudio() {
    if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)(); } catch (e) { return; } }
    if (ac.state === 'suspended') ac.resume();
    if (E.kind === 'video' && E.video && !E.video._wired) { try { srcNode = ac.createMediaElementSource(E.video); srcNode.connect(ac.destination); E.video._wired = true; } catch (e) { } }
  }
  function togglePlay() { E.playing ? stopPlay() : startPlay(); }
  function startPlay() {
    if (E.t >= E.b - .05) E.t = E.a;
    E.playing = true; ensureAudio(); startMusic();
    $('#edPlay').innerHTML = icon('pause');
    if (E.kind === 'video') { E.video.currentTime = E.t; E.video.playbackRate = currentRate(E.t); E.video.play().catch(() => { E.video.muted = true; E.video.play(); }); }
    E.last = performance.now(); cancelAnimationFrame(raf); raf = requestAnimationFrame(loop);
  }
  function stopPlay() { E.playing = false; cancelAnimationFrame(raf); stopMusic(); if (E.video) E.video.pause(); const p = $('#edPlay'); if (p) p.innerHTML = icon('play'); }
  function loop(now) {
    const dt = Math.min(.1, (now - E.last) / 1000); E.last = now;
    if (E.kind === 'video') { E.t = E.video.currentTime; const r = currentRate(E.t); if (Math.abs(E.video.playbackRate - r) > .01) E.video.playbackRate = r; }
    else E.t += dt * currentRate(E.t);
    if (E.t >= E.b) { E.t = E.b; draw(); syncTime(); if (E.exporting) { finishExport(); return; } E.t = E.a; seek(); }
    draw(); syncTime();
    if (E.exporting) { const pr = (E.t - E.a) / (E.b - E.a); $('#edProg').style.width = (pr * 100).toFixed(1) + '%'; }
    if (E.playing) raf = requestAnimationFrame(loop);
  }

  /* ---------- music (synthesised, no files needed) */
  function startMusic() {
    stopMusic(); if (E.music === 'none' || !ac) return;
    musicGain = ac.createGain(); musicGain.gain.value = E.vol * .5; musicGain.connect(ac.destination); if (recDest) musicGain.connect(recDest);
    const bpm = E.music === 'rush' ? 128 : 84, beat = 60 / bpm; let next = ac.currentTime + .05, n = 0;
    const noise = ac.createBuffer(1, ac.sampleRate * .1, ac.sampleRate); const d = noise.getChannelData(0); for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    const notes = [55, 55, 65.4, 49], chords = [[220, 277, 330], [196, 247, 294], [175, 220, 262], [165, 208, 247]];
    const iv = setInterval(() => {
      while (next < ac.currentTime + .15) {
        if (E.music === 'rush') {
          const o = ac.createOscillator(), g = ac.createGain(); o.frequency.setValueAtTime(150, next); o.frequency.exponentialRampToValueAtTime(40, next + .12); g.gain.setValueAtTime(1, next); g.gain.exponentialRampToValueAtTime(.001, next + .18); o.connect(g).connect(musicGain); o.start(next); o.stop(next + .2);
          const hs = ac.createBufferSource(), hf = ac.createBiquadFilter(), hg = ac.createGain(); hs.buffer = noise; hf.type = 'highpass'; hf.frequency.value = 7000; hg.gain.setValueAtTime(.35, next + beat / 2); hg.gain.exponentialRampToValueAtTime(.001, next + beat / 2 + .05); hs.connect(hf).connect(hg).connect(musicGain); hs.start(next + beat / 2);
          const b = ac.createOscillator(), bg = ac.createGain(); b.type = 'sawtooth'; b.frequency.value = notes[Math.floor(n / 4) % 4]; bg.gain.setValueAtTime(.18, next); bg.gain.exponentialRampToValueAtTime(.001, next + beat * .9); const lp = ac.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 500; b.connect(lp).connect(bg).connect(musicGain); b.start(next); b.stop(next + beat);
        } else if (n % 4 === 0) {
          chords[Math.floor(n / 4) % 4].forEach(fq => { const o = ac.createOscillator(), g = ac.createGain(), lp = ac.createBiquadFilter(); o.type = 'sawtooth'; o.frequency.value = fq; lp.type = 'lowpass'; lp.frequency.value = 900; g.gain.setValueAtTime(.001, next); g.gain.linearRampToValueAtTime(.09, next + beat * 1.5); g.gain.linearRampToValueAtTime(.001, next + beat * 4); o.connect(lp).connect(g).connect(musicGain); o.start(next); o.stop(next + beat * 4.1); });
        }
        next += beat; n++;
      }
    }, 30);
    musicStop = () => { clearInterval(iv); try { musicGain.disconnect(); } catch (e) { } };
  }
  function stopMusic() { if (musicStop) musicStop(); musicStop = null; }

  /* ---------- export */
  let rec, chunks, postAfter = false, recMime = '';
  function pickMime() {
    const list = ['video/mp4;codecs=avc1.42E01E,mp4a.40.2', 'video/mp4', 'video/webm;codecs=vp9,opus', 'video/webm;codecs=vp8,opus', 'video/webm'];
    if (!window.MediaRecorder) return null;
    return list.find(m => { try { return MediaRecorder.isTypeSupported(m); } catch (e) { return false; } }) || '';
  }
  function exportReel(post) {
    if (E.exporting) return;
    if (!cv.captureStream || !window.MediaRecorder) { toastE('This browser cannot record video. Try Chrome or Safari 15+.'); return; }
    if ((E.b - E.a) / E.speed > 75) { toastE('Keep the reel under 60 seconds: trim it first'); E.tab = 'trim'; syncUI(); return; }
    postAfter = post; recMime = pickMime();
    stopPlay(); ensureAudio();
    const stream = cv.captureStream(30);
    try { recDest = ac.createMediaStreamDestination(); if (srcNode) srcNode.connect(recDest); recDest.stream.getAudioTracks().forEach(t => stream.addTrack(t)); } catch (e) { recDest = null; }
    chunks = [];
    try { rec = new MediaRecorder(stream, recMime ? { mimeType: recMime, videoBitsPerSecond: 6e6 } : { videoBitsPerSecond: 6e6 }); }
    catch (e) { rec = new MediaRecorder(stream); }
    rec.ondataavailable = e => e.data && e.data.size && chunks.push(e.data);
    rec.onstop = saveExport;
    E.exporting = true; $('#edStatus').textContent = 'Recording your reel... keep this screen open'; $('#edExport').disabled = true; $('#edPost').disabled = true;
    E.t = E.a; seek();
    setTimeout(() => { rec.start(250); startPlay(); }, 250);
  }
  function finishExport() { E.playing = false; stopMusic(); if (E.video) E.video.pause(); setTimeout(() => rec && rec.state !== 'inactive' && rec.stop(), 200); }
  async function saveExport() {
    E.exporting = false; $('#edExport').disabled = false; $('#edPost').disabled = false; $('#edProg').style.width = '100%';
    try { if (srcNode && recDest) srcNode.disconnect(recDest); } catch (e) { } recDest = null;
    const type = (rec.mimeType || recMime || 'video/webm').split(';')[0];
    const blob = new Blob(chunks, { type }); const ext = type.includes('mp4') ? 'mp4' : 'webm';
    const id = 'r' + Date.now(), key = 'reel-' + id, name = 'SOAR_reel_' + new Date().toISOString().slice(0, 16).replace(/[-:T]/g, '') + '.' + ext;
    const S = window.__S;
    try { await DB.put(key, blob); S.reels.unshift({ id, key, title: (E.text || 'SOAR reel').slice(0, 28), dur: mmss((E.b - E.a) / E.speed), ts: Date.now(), mime: type }); window.__save(); } catch (e) { }
    const url = URL.createObjectURL(blob);
    $('#edStatus').textContent = 'Done: ' + (blob.size / 1e6).toFixed(1) + ' MB ' + ext.toUpperCase() + ', saved in your library';
    if (S.settings.autoDl && !postAfter) { const a = document.createElement('a'); a.href = url; a.download = name; document.body.appendChild(a); a.click(); a.remove(); }
    if (postAfter) { window.composeSheet(true, { kind: 'video', blob, url }); return; }
    openSheet(`<h3>Your reel is ready</h3><video src="${url}" controls playsinline style="width:100%;border-radius:16px;max-height:52vh;background:#000"></video>
      <div class="btnrow"><a class="btn red" href="${url}" download="${name}">${icon('download')}Download</a><button class="btn" id="rsShare">${icon('share')}Share</button></div>
      <button class="btn ghost block" style="margin-top:8px" id="rsPost">${icon('upload')}Post to SOAR Wall</button>
      <div class="tiny muted" style="text-align:center;margin-top:8px">${ext === 'webm' ? 'Saved as WebM. Instagram and WhatsApp on Android accept it; on iPhone, Safari saves MP4.' : 'Saved as MP4, ready for Reels, Shorts and WhatsApp.'}</div>`, () => {
      $('#rsShare').onclick = () => window.shareThing('My SOAR reel', '#EarnYourWings', new File([blob], name, { type }));
      $('#rsPost').onclick = () => window.composeSheet(true, { kind: 'video', blob, url });
    });
  }

  /* ---------- public */
  async function show(opts = {}) {
    if (!built) { build(); resize(); loadImages(E.picked); applyTpl('fast'); E.tab = 'source'; syncUI(); }
    if (opts.key) { const b = await DB.get(opts.key).catch(() => null); if (b) loadBlob(b, 'Reel'); }
    else if (opts.image) { E.picked = [opts.image, ...SAMPLE.filter(s => s !== opts.image).slice(0, 2)]; loadImages(E.picked); }
    if (opts.peak) E.peak = opts.peak; else if (window.__S.peaks[0]) E.peak = window.__S.peaks[0].bpm;
    syncUI();
  }
  document.addEventListener('visibilitychange', () => { if (document.hidden && E.playing && !E.exporting) stopPlay(); });
  return { show, pickFile, state: E };
})();
if (typeof current !== 'undefined' && current === 'create') Editor.show();
