/* ═══════════════════════════════════════════════════════════════
   HARSHIT.DEV — Script.js
   Boot sequence · Matrix rain · Typewriter · Tab switching
   Particles · Line numbers · Minimap · Terminal log
   ═══════════════════════════════════════════════════════════════ */

/* ─── State ─── */
let currentTab = 'about';

/* ═══════════════════ MATRIX RAIN ═══════════════════ */
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  let W, H, cols, drops;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    cols = Math.floor(W / 14);
    drops = Array(cols).fill(1);
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\|{}[]';

  function draw() {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, W, H);
    ctx.font = '13px JetBrains Mono, monospace';

    for (let i = 0; i < drops.length; i++) {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      const x = i * 14;
      const y = drops[i] * 14;
      const bright = Math.random() > 0.92;
      ctx.fillStyle = bright ? '#00f5ff' : '#00b8c8';
      ctx.fillText(ch, x, y);
      if (y > H && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  return setInterval(draw, 50);
}

/* ═══════════════════ BOOT SEQUENCE ═══════════════════ */
const bootLines = [
  { text: 'Initializing HARSHIT.DEV kernel v2.6.0...', type: 'dim', delay: 0 },
  { text: '[ OK ] Mounting filesystem /dev/portfolio...', type: 'ok', delay: 300 },
  { text: '[ OK ] Loading neural interface modules...', type: 'ok', delay: 600 },
  { text: '[ OK ] Starting WebGL particle engine...', type: 'ok', delay: 900 },
  { text: '[ OK ] Connecting to matrix network...', type: 'ok', delay: 1100 },
  { text: '[ WARN ] Legacy browser detected — upgrading experience...', type: 'warn', delay: 1400 },
  { text: '[ OK ] Injecting neon color palette...', type: 'ok', delay: 1700 },
  { text: '[ OK ] Compiling skill tree (95 nodes)...', type: 'ok', delay: 1900 },
  { text: '[ OK ] Loading project manifests...', type: 'ok', delay: 2100 },
  { text: '[ OK ] Establishing secure channel...', type: 'ok', delay: 2300 },
  { text: '[ OK ] Boot complete. Launching portfolio...', type: 'ok', delay: 2600 },
];

function runBoot() {
  const matrixInterval = initMatrix();
  const log = document.getElementById('boot-log');
  const progress = document.getElementById('boot-progress');
  const percent = document.getElementById('boot-percent');

  bootLines.forEach((line, i) => {
    setTimeout(() => {
      const span = document.createElement('span');
      span.className = `boot-log-line ${line.type}`;
      span.textContent = '> ' + line.text;
      log.appendChild(span);
      log.scrollTop = log.scrollHeight;

      const pct = Math.round(((i + 1) / bootLines.length) * 100);
      progress.style.width = pct + '%';
      percent.textContent = pct + '%';
    }, line.delay);
  });

  // Launch VS Code after boot
  const lastDelay = bootLines[bootLines.length - 1].delay;
  setTimeout(() => {
    clearInterval(matrixInterval);
    const boot = document.getElementById('boot-screen');
    boot.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    boot.style.opacity = '0';
    boot.style.transform = 'scale(1.05)';
    setTimeout(() => {
      boot.classList.add('hidden');
      const vscode = document.getElementById('vscode');
      vscode.classList.remove('hidden');
      onVSCodeOpen();
    }, 650);
  }, lastDelay + 600);
}

/* ═══════════════════ VS CODE OPEN ═══════════════════ */
function onVSCodeOpen() {
  initParticles();
  buildLineNumbers();
  startTypewriter();
  animateSkillBars();
  initTabs();
  initSidebar();
  initTerminal();
  initMinimap();
  startTerminalLog();
}

/* ═══════════════════ PARTICLES ═══════════════════ */
function initParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-canvas';
  document.body.appendChild(canvas);
  const ctx = canvas.getContext('2d');
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.3,
    alpha: Math.random() * 0.5 + 0.1,
    color: Math.random() > 0.5 ? '0,245,255' : '189,147,249',
  }));

  function draw() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
      ctx.fill();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0,245,255,${0.06 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(draw);
  }
  draw();
}

/* ═══════════════════ LINE NUMBERS ═══════════════════ */
function buildLineNumbers() {
  const container = document.getElementById('line-numbers');
  for (let i = 1; i <= 300; i++) {
    const div = document.createElement('div');
    div.textContent = i;
    div.id = `ln-${i}`;
    container.appendChild(div);
  }

  const scroll = document.getElementById('editor-scroll');
  scroll.addEventListener('scroll', () => {
    const lineH = 26.6;
    const currentLine = Math.floor(scroll.scrollTop / lineH) + 1;
    document.querySelectorAll('.line-numbers div').forEach(d => d.classList.remove('active-line'));
    const active = document.getElementById(`ln-${currentLine}`);
    if (active) active.classList.add('active-line');
    document.getElementById('status-line').textContent = currentLine;
    updateMinimap(scroll.scrollTop, scroll.scrollHeight, scroll.clientHeight);
  });
}

/* ═══════════════════ TYPEWRITER ═══════════════════ */
function startTypewriter() {
  const el = document.getElementById('typewriter');
  const phrases = [
    'One Stop Solution for Marketing & Tech',
    'Performance Marketing Expert',
    'SaaS & Web App Builder',
    'High-ROI Campaign Strategist',
    'API & Automation Specialist',
    'Marketing Brains. Tech Hands.',
  ];
  let pi = 0, ci = 0, deleting = false;

  function type() {
    const current = phrases[pi];
    if (!deleting) {
      el.textContent = current.slice(0, ++ci);
      if (ci === current.length) { deleting = true; setTimeout(type, 2000); return; }
    } else {
      el.textContent = current.slice(0, --ci);
      if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
    }
    setTimeout(type, deleting ? 40 : 80);
  }
  type();
}

/* ═══════════════════ SKILL BARS ═══════════════════ */
function animateSkillBars() {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.style.getPropertyValue('--w');
        });
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll('.skill-category').forEach(el => observer.observe(el));
}

/* ═══════════════════ TABS ═══════════════════ */
function initTabs() {
  document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      if (e.target.classList.contains('tab-close')) return;
      switchTab(tab.dataset.tab);
    });
    const close = tab.querySelector('.tab-close');
    if (close) {
      close.addEventListener('click', (e) => {
        e.stopPropagation();
        // Just animate, don't actually close in portfolio mode
        tab.style.opacity = '0.3';
        tab.style.pointerEvents = 'none';
        setTimeout(() => { tab.style.opacity = ''; tab.style.pointerEvents = ''; }, 800);
      });
    }
  });
}

window.switchTab = function(tabName) {
  currentTab = tabName;
  document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t.dataset.tab === tabName));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${tabName}`));
  document.querySelectorAll('.tree-item').forEach(i => i.classList.toggle('active', i.dataset.tab === tabName));

  // Update breadcrumb
  const fileNames = { about: 'about.js', projects: 'projects.json', skills: 'skills.css', experience: 'experience.ts', contact: 'contact.html' };
  document.getElementById('breadcrumb-file').textContent = fileNames[tabName] || tabName;
  document.getElementById('status-file').textContent = fileNames[tabName] || tabName;

  // If skills tab, re-trigger bars
  if (tabName === 'skills') animateSkillBars();

  // Scroll to top
  document.getElementById('editor-scroll').scrollTop = 0;

  addTerminalLog(`Opening ${fileNames[tabName]}...`);
};

/* ═══════════════════ SIDEBAR ─── */
function initSidebar() {
  document.querySelectorAll('.tree-item[data-tab]').forEach(item => {
    item.addEventListener('click', () => switchTab(item.dataset.tab));
  });
  document.querySelectorAll('.outline-item').forEach(item => {
    item.addEventListener('click', () => {
      const sectionId = 'section-' + item.dataset.section;
      const section = document.getElementById(sectionId);
      if (section) {
        const tabMap = { hero: 'about', about: 'about', projects: 'projects', skills: 'skills', contact: 'contact' };
        switchTab(tabMap[item.dataset.section] || item.dataset.section);
        setTimeout(() => section.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
      }
      document.getElementById('breadcrumb-section').textContent = item.textContent.replace('◆ ', '');
    });
  });
  document.querySelectorAll('.activity-icon').forEach(icon => {
    icon.addEventListener('click', () => {
      document.querySelectorAll('.activity-icon').forEach(i => i.classList.remove('active'));
      icon.classList.add('active');
    });
  });
}

/* ═══════════════════ TERMINAL ═══════════════════ */
let terminalOpen = true;
function initTerminal() {
  document.getElementById('toggle-terminal').addEventListener('click', () => {
    const panel = document.getElementById('terminal-panel');
    terminalOpen = !terminalOpen;
    panel.classList.toggle('collapsed', !terminalOpen);
    document.getElementById('toggle-terminal').textContent = terminalOpen ? '⌃' : '⌄';
  });
}

const termLines = [
  'npm run dev',
  '> portfolio@1.0.0 dev',
  '> vite --host',
  '',
  'VITE v5.0.12  ready in 312 ms',
  '',
  '➜  Local:   http://localhost:5173/',
  '➜  Network: http://192.168.1.42:5173/',
  '',
  'git status',
  'On branch main',
  'nothing to commit, working tree clean',
];

let termIndex = 0;
function startTerminalLog() {
  const terminal = document.getElementById('main-terminal');
  const prompt = terminal.querySelector('.term-prompt');

  function nextLine() {
    if (termIndex >= termLines.length) return;
    const line = termLines[termIndex++];

    const div = document.createElement('div');
    if (line.startsWith('>') || line.startsWith('➜') || line.startsWith('On branch') || line.startsWith('nothing')) {
      div.style.color = 'var(--text-dim)';
    } else if (line.startsWith('VITE')) {
      div.style.color = 'var(--cyan)';
    } else if (line.startsWith('npm') || line.startsWith('git')) {
      div.style.color = 'var(--yellow)';
      div.textContent = 'harshit@dev:~/portfolio$ ' + line;
      div.style.display = 'block';
      terminal.insertBefore(div, prompt);
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(nextLine, 600);
      return;
    }
    div.textContent = line;
    div.style.display = 'block';
    terminal.insertBefore(div, prompt);
    terminal.scrollTop = terminal.scrollHeight;
    setTimeout(nextLine, line === '' ? 100 : 120);
  }
  setTimeout(nextLine, 800);
}

function addTerminalLog(msg) {
  const terminal = document.getElementById('main-terminal');
  const prompt = terminal.querySelector('.term-prompt');
  const div = document.createElement('div');
  div.textContent = `harshit@dev:~/portfolio$ code ${msg}`;
  div.style.color = 'var(--yellow)';
  div.style.display = 'block';
  terminal.insertBefore(div, prompt);
  terminal.scrollTop = terminal.scrollHeight;
}

/* ═══════════════════ MINIMAP ═══════════════════ */
function initMinimap() {
  const canvas = document.getElementById('minimap-canvas');
  const container = document.getElementById('minimap');
  canvas.width  = container.offsetWidth;
  canvas.height = container.offsetHeight;
}

function updateMinimap(scrollTop, scrollHeight, clientHeight) {
  const canvas = document.getElementById('minimap-canvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.clearRect(0, 0, W, H);

  const ratio = H / scrollHeight;
  const viewH = clientHeight * ratio;
  const viewY = scrollTop * ratio;

  // Fake code lines
  ctx.fillStyle = 'rgba(100,110,140,0.15)';
  for (let y = 0; y < H; y += 6) {
    const w = (20 + Math.sin(y * 0.15) * 8 + Math.random() * 20);
    ctx.fillRect(8, y, w, 2);
  }

  // Viewport highlight
  ctx.fillStyle = 'rgba(0,245,255,0.07)';
  ctx.fillRect(0, viewY, W, viewH);
  ctx.fillStyle = 'rgba(0,245,255,0.3)';
  ctx.fillRect(0, viewY, 2, viewH);
}

/* ═══════════════════ FORM SUBMIT (Real — FormSubmit.co) ═══════════════════ */
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    const btn     = document.getElementById('form-submit-btn');
    const btnText = document.getElementById('form-btn-text');
    const toast   = document.getElementById('form-toast');

    // Loading state
    btn.disabled = true;
    btnText.textContent = '⏳ Sending...';

    try {
      const formData = new FormData(contactForm);
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        btnText.textContent = '✓ Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #22c55e, #16a34a)';
        toast.classList.remove('hidden');
        contactForm.reset();
        setTimeout(() => {
          toast.classList.add('hidden');
          btnText.textContent = '⚡ Send Message';
          btn.disabled = false;
          btn.style.background = '';
        }, 5000);
      } else {
        throw new Error('Failed');
      }
    } catch {
      btnText.textContent = '❌ Failed — try email directly';
      btn.disabled = false;
      setTimeout(() => { btnText.textContent = '⚡ Send Message'; }, 4000);
    }
  });
}

/* ═══════════════════ KEYBOARD SHORTCUTS ═══════════════════ */
document.addEventListener('keydown', (e) => {
  // Ctrl/Cmd + 1-5 to switch tabs
  if (e.ctrlKey || e.metaKey) {
    const map = { '1': 'about', '2': 'projects', '3': 'skills', '4': 'experience', '5': 'contact' };
    if (map[e.key]) { e.preventDefault(); switchTab(map[e.key]); }
    // Ctrl+` to toggle terminal
    if (e.key === '`') { e.preventDefault(); document.getElementById('toggle-terminal').click(); }
  }
});

/* ═══════════════════ HOVER GLOW ON CARDS ═══════════════════ */
function initCardGlow() {
  document.querySelectorAll('.project-card, .tl-card, .stat-chip').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
}

/* ═══════════════════ CURSOR GLOW ═══════════════════ */
function initCursorGlow() {
  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9998;
    width: 300px; height: 300px; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,245,255,0.04) 0%, transparent 70%);
    transform: translate(-50%,-50%);
    transition: opacity 0.3s;
  `;
  document.body.appendChild(glow);
  document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  });
}

/* ═══════════════════ BOOT ═══════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  runBoot();
  initCardGlow();
  initCursorGlow();
});
document.querySelector('.project-card').addEventListener('click', () => {
  window.location.href = 'https://niftypapertrade.in/';
});