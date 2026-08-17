/* ─────────────────────────────────────────────────────────────
   MFF3DEV Recruiter Chatbot — pure JS, no backend, no API key
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Knowledge base ──────────────────────────────────────── */
  const KB = [
    {
      patterns: ['who are you', 'tell me about yourself', 'introduce yourself', 'about marcelo', 'who is marcelo', 'background'],
      answer: `Hi! I'm the assistant for <strong>Marcelo Feliciano Filho</strong> — a Senior Software Engineer with 7 years of production experience.<br><br>Marcelo specialises in <strong>Python backend systems</strong>, <strong>AI/RAG pipelines</strong>, and <strong>cloud-native architecture</strong>. Currently working at <strong>BT (British Telecom)</strong> in London (remote) on their NaaS platform. Previously Technical Team Lead at Turing, leading 6–8 engineers on a healthcare AI platform.<br><br>Ask me anything — experience, skills, projects, or how to reach him!`
    },
    {
      patterns: ['current role', 'current job', 'where does he work', 'working now', 'bt ', 'british telecom', 'naas'],
      answer: `Marcelo is currently a <strong>Senior Software Engineer at BT (British Telecommunications)</strong>, working remotely from Brazil on their NaaS (Network as a Service) platform.<br><br>His focus there includes diagnosing and resolving production issues — idempotency failures, throughput bottlenecks, and SOAK testing against real field devices under sustained load on high-availability telecom infrastructure.`
    },
    {
      patterns: ['experience', 'years', 'how long', 'career', 'history', 'worked'],
      answer: `Marcelo has <strong>7 years of professional software engineering experience</strong>:<br><br>• <strong>BT</strong> — Sr. Software Engineer (present, ~1 year)<br>• <strong>Turing</strong> — Technical Team Lead (~2 years)<br>• <strong>Turing</strong> — Senior Software Engineer (~1.5 years)<br>• <strong>Dayway</strong> — Software Engineering Specialist (~1 year)<br>• <strong>LACTEC</strong> — Senior Software Developer (~7 months)<br>• <strong>A1 Engenharia</strong> — Junior → Developer II (~2 years)<br><br>He was promoted twice in 18 months at his first job.`
    },
    {
      patterns: ['skills', 'tech stack', 'technologies', 'programming', 'tools', 'what can he do', 'expertise', 'python', 'django', 'fastapi', 'vue'],
      answer: `Marcelo's core stack:<br><br><strong>🔥 Primary:</strong> Python · Django · FastAPI · PostgreSQL · RAG Pipelines · LangChain · MCP · LangFuse<br><br><strong>⚙️ Infrastructure:</strong> Docker · AWS ECS · GitHub Actions · Kafka · Redis · Celery<br><br><strong>🤖 AI/ML:</strong> pgvector · PyTorch · RAGAS · sentence-transformers · Pydantic v2<br><br><strong>🌐 Frontend:</strong> Vue 3<br><br><strong>🗄️ Databases:</strong> PostgreSQL · MySQL · Snowflake<br><br>Practices: TDD · SOLID · CI/CD · Clean Architecture`
    },
    {
      patterns: ['rag', 'retrieval', 'llm', 'ai', 'machine learning', 'artificial intelligence', 'langchain', 'vector', 'embedding'],
      answer: `AI/RAG is one of Marcelo's strongest areas. He architected a <strong>production RAG pipeline for a healthcare client</strong> at Turing:<br><br>• Hybrid retrieval: <strong>pgvector dense search + PostgreSQL full-text search</strong><br>• Merged via <strong>Reciprocal Rank Fusion</strong>, reranked with a cross-encoder<br>• Routed through a <strong>Noisy Top-K MoE</strong> layer<br>• Served via <strong>MCP over SSE transport</strong><br>• Observed with <strong>LangFuse + RAGAS</strong><br><br>Result: ↓ 70% hallucination rate, ↑ 40% product feedback, deploy time 2h → 30min.`
    },
    {
      patterns: ['mcp', 'model context protocol', 'agent', 'agentic'],
      answer: `Marcelo has deep hands-on experience with <strong>MCP (Model Context Protocol)</strong> — he built custom MCP servers and tooling for a production healthcare AI platform, serving over SSE transport as part of an agentic RAG system.<br><br>MFF3DEV LLC also offers MCP integration as a professional service.`
    },
    {
      patterns: ['project', 'built', 'portfolio', 'work', 'example', 'showcase', 'site', 'website'],
      answer: `Marcelo's key projects:<br><br><strong>01 · Production RAG Pipeline</strong> — Healthcare AI backend with hybrid retrieval, MoE routing, MCP. ↓70% hallucinations.<br><br><strong>02 · V-JEPA Robot Perception</strong> — Self-supervised kinematic phase discovery on a UR5 robot. <em>Published at EI2N 2026 / Springer LNCS.</em><br><br><strong>03 · Learning App</strong> — Duolingo-style AI coding platform: Django 5 · Vue 3 · Stripe · RAG · MoE · Docker. Open source.<br><br><strong>04 · Document Pipeline Overhaul</strong> — Async Celery+Redis pipeline, ↓95% registration time.<br><br>🌐 <a href="https://marcelo-feliciano-filho.github.io/MFF3DEV-website/portfolio.html" target="_blank" style="color:var(--accent-bot)">View full portfolio →</a>`
    },
    {
      patterns: ['publication', 'research', 'paper', 'academic', 'published', 'jepa', 'springer', 'ei2n', 'robot'],
      answer: `Marcelo published research at <strong>EI2N 2026 (IFAC/IFIP, Springer LNCS)</strong>:<br><br><em>"V-JEPA for Self-Supervised Industrial Robot Perception"</em> — spatiotemporal ViT encoder, EMA target encoding (τ=0.996). Discovers 5 kinematic phases with <strong>zero labels</strong>.<br><br>Open source on <a href="https://github.com/marcelo-feliciano-filho" target="_blank" style="color:var(--accent-bot)">GitHub →</a>`
    },
    {
      patterns: ['available', 'availability', 'open to', 'hire', 'hiring', 'opportunity', 'remote', 'relocate', 'freelance'],
      answer: `Marcelo is <strong>open to remote opportunities</strong> globally.<br><br>He works fully remote from Curitiba, Brazil (UTC-3) and has proven experience with remote-first teams across the US and UK.<br><br>You can book a call directly: <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot)">📅 Calendly</a> — or reach out via <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot)">LinkedIn</a> or <a href="https://shorturl.at/VNQv3" target="_blank" style="color:var(--accent-bot)">WhatsApp</a>.`
    },
    {
      patterns: ['location', 'where', 'based', 'timezone', 'brazil', 'curitiba'],
      answer: `Marcelo is based in <strong>Curitiba, Paraná, Brazil</strong> — UTC-3.<br><br>He works fully remote and has been delivering for clients in the <strong>US and UK</strong> for several years, with no timezone issues.`
    },
    {
      patterns: ['education', 'degree', 'university', 'study', 'graduated'],
      answer: `Marcelo holds two engineering degrees:<br><br>• <strong>BE in Control & Automation Engineering</strong><br>• <strong>MEng in Systems Engineering</strong><br><br>His engineering background gives him a systems-thinking approach: design for failure modes, analyse constraints before coding.`
    },
    {
      patterns: ['speak', 'language', 'english', 'portuguese', 'french', 'communication'],
      answer: `Marcelo speaks three languages:<br><br>• 🇧🇷 <strong>Portuguese</strong> — native<br>• 🇬🇧 <strong>English</strong> — professional fluency (works daily with US/UK teams)<br>• 🇫🇷 <strong>French</strong> — professional level`
    },
    {
      patterns: ['leadership', 'lead', 'team', 'manage', 'mentor', 'tech lead'],
      answer: `At <strong>Turing</strong>, Marcelo was Technical Team Lead for ~2 years, leading 6–8 remote engineers.<br><br>His split was <strong>70% coding, 30% leadership</strong> — architecture decisions, code reviews, sprint planning, and unblocking engineers. He stays hands-on as a lead.`
    },
    {
      patterns: ['salary', 'rate', 'compensation', 'pay', 'cost'],
      answer: `Compensation is best discussed directly. Reach Marcelo on <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot)">LinkedIn</a> or <a href="https://shorturl.at/VNQv3" target="_blank" style="color:var(--accent-bot)">WhatsApp</a>.`
    },
    {
      patterns: ['contact', 'reach', 'get in touch', 'linkedin', 'whatsapp', 'message', 'schedule', 'meeting', 'call', 'interview', 'calendly', 'book'],
      answer: `Best ways to reach Marcelo:<br><br>• 💼 <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot)">LinkedIn</a><br>• 💬 <a href="https://shorturl.at/VNQv3" target="_blank" style="color:var(--accent-bot)">WhatsApp</a><br>• 📅 <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot)">Book a call on Calendly</a><br><br>He typically responds within 24 hours.`
    },
    {
      patterns: ['resume', 'cv', 'curriculum', 'download'],
      answer: `Download Marcelo's CV:<br><br><a href="./resume.pdf" download style="color:var(--accent-bot); font-weight:600">⬇ Download Resume (PDF)</a>`
    },
    {
      patterns: ['github', 'open source', 'code', 'repository', 'repo'],
      answer: `Marcelo's GitHub: <a href="https://github.com/marcelo-feliciano-filho" target="_blank" style="color:var(--accent-bot)">github.com/marcelo-feliciano-filho</a><br><br>Key repos: <strong>Learning_App</strong> (Django 5 + Vue 3 + RAG) and <strong>V-JEPA</strong> (published robotics research).`
    },
    {
      patterns: ['devops', 'docker', 'aws', 'ci/cd', 'deploy', 'cloud', 'infrastructure'],
      answer: `Marcelo's deployment stack:<br><br>• <strong>Docker</strong> — containerisation<br>• <strong>AWS ECS</strong> — production deployments<br>• <strong>GitHub Actions</strong> — CI/CD<br>• <strong>Redis · Celery</strong> — async task queues<br>• <strong>Kafka</strong> — event streaming<br><br>He cut deployment time by 95% at A1 Engenharia by redesigning a sync pipeline into async Celery + Redis workers.`
    },
    {
      patterns: ['why', 'strengths', 'strong', 'good at', 'best', 'standout', 'unique'],
      answer: `What makes Marcelo stand out:<br><br>• Bridges <strong>backend architecture, AI/RAG systems, and technical leadership</strong> — rare combination<br>• Comes from <strong>control engineering</strong> — systems thinking is core<br>• Ships production AI with measurable results, not just demos<br>• Stays hands-on as a lead (70% coding)<br>• <strong>Published academic paper</strong> in AI/robotics<br>• Fluent in US, UK, and European timezone collaboration`
    },
    {
      patterns: ['hello', 'hi', 'hey', 'good morning', 'good afternoon'],
      answer: `Hey! 👋 I'm Marcelo's recruiter assistant. Ask me about his experience, skills, projects, availability, or how to reach him. Use the chips below to get started!`
    },
    {
      patterns: ['thank', 'thanks', 'great', 'awesome', 'perfect', 'nice'],
      answer: `Happy to help! Connect with Marcelo directly:<br><br>• 💼 <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot)">LinkedIn</a><br>• 💬 <a href="https://shorturl.at/VNQv3" target="_blank" style="color:var(--accent-bot)">WhatsApp</a>`
    },
  ];

  const SUGGESTIONS = [
    'Tell me about Marcelo',
    'What are his top skills?',
    'Is he available for hire?',
    'What projects has he built?',
    'Current role and experience?',
    'Book a call with him',
    'Download his CV',
    'Does he speak English?',
  ];

  const FALLBACK = `I'm not sure about that specific detail, but I can help with experience, skills, projects, availability, or contact info.<br><br>Try: <em>"What are his skills?"</em> or <em>"Is he open to new roles?"</em>`;

  function getAnswer(query) {
    const q = query.toLowerCase();
    for (const item of KB) {
      if (item.patterns.some(p => q.includes(p))) return item.answer;
    }
    return FALLBACK;
  }

  /* ── Styles ─────────────────────────────────────────────── */
  const style = document.createElement('style');
  style.textContent = `
    :root { --accent-bot:#16d6c9; --accent-bot2:#5ea1ff; }
    #mff-chat-btn {
      position:fixed; bottom:28px; right:28px; z-index:9999;
      width:56px; height:56px; border-radius:50%;
      background:linear-gradient(135deg,#5ea1ff,#7a5cff,#16d6c9);
      border:none; cursor:pointer;
      box-shadow:0 8px 30px rgba(94,161,255,0.45);
      display:flex; align-items:center; justify-content:center;
      font-size:22px; transition:transform 0.2s,box-shadow 0.2s; color:white;
    }
    #mff-chat-btn:hover { transform:scale(1.08); box-shadow:0 12px 40px rgba(94,161,255,0.6); }
    .mff-badge {
      position:absolute; top:-3px; right:-3px; width:14px; height:14px;
      border-radius:50%; background:#ff4e6a; border:2px solid #050816;
      animation:pulse-b 2s infinite;
    }
    @keyframes pulse-b { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:.7} }
    #mff-chat-win {
      position:fixed; bottom:96px; right:28px; z-index:9998;
      width:370px; max-height:580px;
      display:flex; flex-direction:column;
      background:rgba(13,19,33,0.97);
      border:1px solid rgba(151,178,255,0.18); border-radius:18px;
      box-shadow:0 24px 60px rgba(0,0,0,0.6); overflow:hidden;
      transform:scale(0.92) translateY(16px); opacity:0; pointer-events:none;
      transition:opacity 0.22s ease,transform 0.22s ease;
      backdrop-filter:blur(20px);
    }
    #mff-chat-win.open { transform:scale(1) translateY(0); opacity:1; pointer-events:all; }
    .bc-header {
      padding:16px 18px;
      background:linear-gradient(135deg,rgba(94,161,255,0.12),rgba(22,214,201,0.07));
      border-bottom:1px solid rgba(151,178,255,0.18);
      display:flex; align-items:center; gap:12px;
    }
    .bc-avatar {
      width:38px; height:38px; border-radius:50%;
      background:linear-gradient(135deg,#5ea1ff,#7a5cff,#16d6c9);
      display:flex; align-items:center; justify-content:center;
      font-size:16px; flex-shrink:0; box-shadow:0 4px 16px rgba(94,161,255,0.35);
    }
    .bc-name { font-family:'Inter',sans-serif; font-weight:700; font-size:.9rem; color:#e7ebff; }
    .bc-status {
      font-size:.72rem; color:var(--accent-bot);
      display:flex; align-items:center; gap:5px; margin-top:2px;
    }
    .bc-dot { width:6px; height:6px; border-radius:50%; background:var(--accent-bot); animation:blink 2.5s infinite; }
    @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.3} }
    .bc-close {
      margin-left:auto; background:none; border:none; cursor:pointer;
      color:#a6b2d8; font-size:18px; padding:4px; border-radius:6px;
      transition:color .15s,background .15s;
    }
    .bc-close:hover { color:#e7ebff; background:rgba(255,255,255,0.06); }
    #mff-msgs {
      flex:1; overflow-y:auto; padding:16px;
      display:flex; flex-direction:column; gap:12px;
      scrollbar-width:thin; scrollbar-color:rgba(94,161,255,0.2) transparent;
    }
    #mff-msgs::-webkit-scrollbar { width:4px; }
    #mff-msgs::-webkit-scrollbar-thumb { background:rgba(94,161,255,0.25); border-radius:4px; }
    .bc-msg { display:flex; align-items:flex-end; gap:8px; animation:msg-in .25s ease; }
    .bc-msg.user { flex-direction:row-reverse; }
    @keyframes msg-in { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:none} }
    .bc-bubble {
      max-width:82%; padding:10px 14px; border-radius:16px;
      font-family:'Inter',sans-serif; font-size:.83rem; line-height:1.6; color:#e7ebff;
    }
    .bc-msg.bot .bc-bubble {
      background:rgba(94,161,255,0.08); border:1px solid rgba(94,161,255,0.15);
      border-bottom-left-radius:4px;
    }
    .bc-msg.user .bc-bubble {
      background:linear-gradient(135deg,rgba(94,161,255,0.22),rgba(122,92,255,0.22));
      border:1px solid rgba(94,161,255,0.25); border-bottom-right-radius:4px; text-align:right;
    }
    .bc-bubble a { color:var(--accent-bot); }
    .bc-bubble strong { color:#e7ebff; }
    .bc-av { width:26px; height:26px; border-radius:50%; background:linear-gradient(135deg,#5ea1ff,#16d6c9); display:flex; align-items:center; justify-content:center; font-size:12px; flex-shrink:0; }
    .bc-typing {
      display:flex; align-items:center; gap:5px; padding:10px 14px;
      background:rgba(94,161,255,0.08); border:1px solid rgba(94,161,255,0.15);
      border-radius:16px; border-bottom-left-radius:4px; width:fit-content;
    }
    .bc-typing span { width:6px; height:6px; border-radius:50%; background:var(--accent-bot2); opacity:.6; animation:tdot 1.2s infinite; }
    .bc-typing span:nth-child(2){animation-delay:.2s} .bc-typing span:nth-child(3){animation-delay:.4s}
    @keyframes tdot { 0%,60%,100%{transform:translateY(0);opacity:.6} 30%{transform:translateY(-5px);opacity:1} }
    #mff-suggs { padding:0 12px 10px; display:flex; flex-wrap:wrap; gap:6px; }
    .bc-chip {
      padding:5px 10px; background:rgba(255,255,255,0.04);
      border:1px solid rgba(151,178,255,0.18); border-radius:999px;
      font-size:.72rem; color:#a6b2d8; cursor:pointer;
      font-family:'Inter',sans-serif; transition:all .15s; white-space:nowrap;
    }
    .bc-chip:hover { border-color:var(--accent-bot); color:var(--accent-bot); background:rgba(22,214,201,0.06); }
    .bc-input-row {
      padding:10px 12px 14px; border-top:1px solid rgba(151,178,255,0.18);
      display:flex; gap:8px; align-items:center;
    }
    #mff-input {
      flex:1; background:rgba(255,255,255,0.04);
      border:1px solid rgba(151,178,255,0.18); border-radius:10px;
      padding:10px 13px; font-size:.83rem; color:#e7ebff;
      font-family:'Inter',sans-serif; outline:none; transition:border-color .15s;
    }
    #mff-input::placeholder { color:#a6b2d8; }
    #mff-input:focus { border-color:rgba(94,161,255,0.45); }
    #mff-send {
      width:38px; height:38px; border-radius:10px; border:none; cursor:pointer;
      background:linear-gradient(135deg,#5ea1ff,#7a5cff); color:white; font-size:15px;
      display:flex; align-items:center; justify-content:center;
      transition:transform .15s,box-shadow .15s; flex-shrink:0;
      box-shadow:0 4px 14px rgba(94,161,255,0.3);
    }
    #mff-send:hover { transform:scale(1.06); box-shadow:0 6px 20px rgba(94,161,255,0.5); }
    #mff-send:disabled { opacity:.4; cursor:default; transform:none; }
    @media(max-width:420px){
      #mff-chat-win{width:calc(100vw - 24px);right:12px;bottom:84px;}
      #mff-chat-btn{bottom:18px;right:18px;}
    }
  `;
  document.head.appendChild(style);

  /* ── Build DOM ───────────────────────────────────────────── */
  const btn = document.createElement('button');
  btn.id = 'mff-chat-btn';
  btn.setAttribute('aria-label', 'Open recruiter chatbot');
  btn.innerHTML = `🤖<span class="mff-badge"></span>`;

  const win = document.createElement('div');
  win.id = 'mff-chat-win';
  win.innerHTML = `
    <div class="bc-header">
      <div class="bc-avatar">🤖</div>
      <div style="flex:1">
        <div class="bc-name">Marcelo's Assistant</div>
        <div class="bc-status"><span class="bc-dot"></span>Online · Ask me anything</div>
      </div>
      <button class="bc-close" id="mff-close">✕</button>
    </div>
    <div id="mff-msgs"></div>
    <div id="mff-suggs"></div>
    <div class="bc-input-row">
      <input id="mff-input" type="text" placeholder="Ask about experience, skills, availability…" maxlength="200" autocomplete="off"/>
      <button id="mff-send">➤</button>
    </div>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(win);

  const msgs   = document.getElementById('mff-msgs');
  const input  = document.getElementById('mff-input');
  const send   = document.getElementById('mff-send');
  const suggs  = document.getElementById('mff-suggs');
  const close  = document.getElementById('mff-close');

  let isOpen = false, busy = false;

  function toggleChat() {
    isOpen = !isOpen;
    win.classList.toggle('open', isOpen);
    btn.innerHTML = isOpen ? '✕' : '🤖<span class="mff-badge"></span>';
    if (isOpen) { if (!msgs.children.length) init(); input.focus(); }
  }

  function addMsg(html, role) {
    const d = document.createElement('div');
    d.className = 'bc-msg ' + role;
    d.innerHTML = role === 'bot'
      ? `<div class="bc-av">🤖</div><div class="bc-bubble">${html}</div>`
      : `<div class="bc-bubble">${html}</div>`;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function botReply(answer) {
    busy = true; send.disabled = true;
    const t = document.createElement('div');
    t.className = 'bc-msg bot'; t.id = 'bc-typing';
    t.innerHTML = `<div class="bc-av">🤖</div><div class="bc-typing"><span></span><span></span><span></span></div>`;
    msgs.appendChild(t); msgs.scrollTop = msgs.scrollHeight;
    setTimeout(() => {
      document.getElementById('bc-typing')?.remove();
      addMsg(answer, 'bot');
      busy = false; send.disabled = false; input.focus();
    }, Math.min(700 + answer.length * 1.3, 1600));
  }

  function handleSend() {
    const text = input.value.trim();
    if (!text || busy) return;
    addMsg(text, 'user');
    input.value = ''; suggs.innerHTML = '';
    botReply(getAnswer(text));
  }

  function init() {
    addMsg(`Hi there! 👋 I'm Marcelo's recruiter assistant.<br>Ask me about his <strong>experience</strong>, <strong>skills</strong>, <strong>projects</strong>, or <strong>availability</strong>. What would you like to know?`, 'bot');
    SUGGESTIONS.forEach(s => {
      const c = document.createElement('button');
      c.className = 'bc-chip'; c.textContent = s;
      c.addEventListener('click', () => { input.value = s; handleSend(); });
      suggs.appendChild(c);
    });
  }

  btn.addEventListener('click', toggleChat);
  close.addEventListener('click', toggleChat);
  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

})();
