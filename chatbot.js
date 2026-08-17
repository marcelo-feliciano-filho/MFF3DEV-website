/* ─────────────────────────────────────────────────────────────
   MFF3DEV Recruiter Chatbot — Intelligent Matcher & Knowledge Base
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';

  /* ── Guardrails for out-of-scope / personal questions ───── */
  const GUARDRAIL_REGEX = /\b(gay|sexuality|sexual|dating|date|married|marriage|single|relationship|cheating|cheat|wife|husband|girlfriend|boyfriend|lover|religion|religious|god|politics|political|party|president|vote|gossip|rumor|scandal)\b/i;
  const GUARDRAIL_ANSWER = `I am Marcelo's professional AI assistant. I focus exclusively on his software engineering background, technical stack, architecture experience, and role availability.<br><br>Feel free to ask about his <strong>7+ years of backend experience</strong>, <strong>production RAG & AI systems</strong>, <strong>W2 contract availability</strong>, or <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot);font-weight:600">book a call directly on Calendly →</a>`;

  /* ── Knowledge Base with Weighted Intent Rules ──────────── */
  const INTENTS = [
    // 1. WHATSAPP DIRECT
    {
      id: 'whatsapp',
      phrases: ['whatsapp', 'whats app', 'zap', 'phone number', 'phone', 'text him', 'whatsapp link'],
      regexes: [/\bwhats?app\b/i, /\b(phone|cell|mobile)\b/i],
      answer: `You can reach Marcelo directly on WhatsApp:<br><br>💬 <a href="https://shorturl.at/VNQv3" target="_blank" style="color:var(--accent-bot);font-weight:600;font-size:0.92rem;">Open WhatsApp Chat (+55 41 98868-5818) →</a><br><br>He usually responds within a few hours.`
    },

    // 2. LINKEDIN DIRECT
    {
      id: 'linkedin',
      phrases: ['linkedin', 'linkedin profile', 'linkedin link', 'connect on linkedin'],
      regexes: [/\blinkedin\b/i],
      answer: `Connect with Marcelo on LinkedIn:<br><br>💼 <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot);font-weight:600;font-size:0.92rem;">linkedin.com/in/marcelo-feliciano-filho →</a><br><br>Active daily for recruiter inquiries and engineering leadership discussions.`
    },

    // 3. CALENDLY / SCHEDULE / INTERVIEW
    {
      id: 'calendly',
      phrases: ['book a call', 'schedule', 'calendly', 'interview', 'meeting', 'set up a call', 'talk to him', 'call him', 'calendar', 'availability this week', 'available this week', 'schedule interview'],
      regexes: [/\b(calendly|schedule|booking|book a call|set up a (call|meeting)|schedule an? (interview|call|meeting))\b/i],
      answer: `You can schedule an introductory call or interview directly on Marcelo's calendar:<br><br>📅 <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot);font-weight:600;font-size:0.92rem;">Book a Call on Calendly →</a><br><br>Select a time that works best across US or European timezones.`
    },

    // 4. AVAILABILITY / W2 / CONTRACT / ROLES
    {
      id: 'availability',
      phrases: [
        'available', 'availability', 'open to', 'open for', 'new roles', 'new opportunities',
        'looking for a job', 'looking for roles', 'hire him', 'hiring', 'w2', 'w-2', 'contract',
        'c2c', '1099', 'b2b', 'freelance', 'relocate', 'relocation', 'remote work', 'notice period',
        'start date', 'when can he start'
      ],
      regexes: [
        /\b(availab(le|ility)|open (to|for)|new (roles?|opportunities|positions?|jobs?)|hir(e|ing)|w2|w-2|1099|c2c|b2b|contract(ing|or)?|notice period|start date)\b/i
      ],
      answer: `Marcelo is <strong>currently available for W2 contracts, direct-hire remote roles, and B2B engagements</strong> globally.<br><br>• <strong>Location:</strong> Fully remote from Curitiba, Brazil (UTC-3), with extensive overlap for US (EST/PST) and UK/Europe.<br>• <strong>Engagement:</strong> W2 contract, 1099, C2C / B2B through MFF3DEV LLC, or permanent remote.<br>• <strong>Notice:</strong> Immediate or standard flexible transition.<br><br>👉 <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot);font-weight:600">Schedule an introductory call on Calendly →</a> or reach out on <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot)">LinkedIn</a>.`
    },

    // 5. RESUME / CV DOWNLOAD
    {
      id: 'resume',
      phrases: ['resume', 'cv', 'curriculum', 'download cv', 'download resume', 'pdf cv', 'pdf resume', 'send resume'],
      regexes: [/\b(resume|cv|curriculum(\s*vitae)?)\b/i],
      answer: `You can download Marcelo's full CV here:<br><br>📄 <a href="./resume.pdf" download style="color:var(--accent-bot);font-weight:600;font-size:0.92rem;">⬇ Download Marcelo's Resume (PDF)</a><br><br>Includes complete 7+ year work history, technical stack, published research, and enterprise accomplishments.`
    },

    // 6. RAG / AI / LLM / MACHINE LEARNING
    {
      id: 'rag_ai',
      phrases: [
        'rag', 'retrieval augmented generation', 'llm', 'large language model', 'generative ai',
        'langchain', 'vector database', 'pgvector', 'embeddings', 'langfuse', 'ragas', 'moe',
        'mixture of experts', 'semantic search', 'fine tuning', 'pytorch', 'ai pipeline', 'agentic ai', 'ai agents'
      ],
      regexes: [
        /\b(rag|llms?|pgvector|langchain|langfuse|ragas|vector\s*db|embeddings?|semantic search|mixture of experts|moe|pytorch|generative ai)\b/i,
        /\b(ai|artificial intelligence)\b/i
      ],
      answer: `AI & RAG systems are one of Marcelo's deepest specializations. At Turing, he architected a <strong>production RAG platform for a healthcare client</strong>:<br><br>• <strong>Hybrid Retrieval:</strong> pgvector dense search + PostgreSQL full-text search combined via Reciprocal Rank Fusion (RRF)<br>• <strong>Reranking & Routing:</strong> Cross-encoder reranking routed through a Noisy Top-K Mixture of Experts (MoE) layer<br>• <strong>Agent Protocol:</strong> Served via MCP (Model Context Protocol) over SSE transport<br>• <strong>Evaluation:</strong> Continuous observability and metric scoring using LangFuse + RAGAS<br><br><strong>Outcome:</strong> ↓ 70% hallucination rate, ↑ 40% user satisfaction, deployment time cut from 2h → 30min.`
    },

    // 7. MCP (MODEL CONTEXT PROTOCOL)
    {
      id: 'mcp',
      phrases: ['mcp', 'model context protocol', 'mcp server', 'mcp tools', 'anthropic mcp', 'tool use', 'function calling'],
      regexes: [/\bmcp\b/i, /\bmodel context protocol\b/i],
      answer: `Marcelo has deep production experience with <strong>MCP (Model Context Protocol)</strong>:<br><br>• Built custom MCP servers and modular toolsets for agentic enterprise AI workflows<br>• Implemented real-time streaming transports over Server-Sent Events (SSE)<br>• Integrates MCP tooling into enterprise backends via MFF3DEV LLC consulting.<br><br>Check out his work in the <a href="./portfolio.html" style="color:var(--accent-bot)">portfolio section →</a>`
    },

    // 8. TECH STACK & SKILLS
    {
      id: 'skills',
      phrases: [
        'skills', 'tech stack', 'technologies', 'programming language', 'languages',
        'frameworks', 'what stack', 'python', 'fastapi', 'django', 'postgresql', 'postgres',
        'redis', 'celery', 'kafka', 'docker', 'aws', 'vue', 'snowflake', 'mysql', 'backend stack'
      ],
      regexes: [
        /\b(skills?|tech\s*stack|technolog(y|ies)|frameworks?|languages?|backend)\b/i,
        /\b(python|django|fastapi|postgres(ql)?|redis|celery|kafka|docker|aws|snowflake|mysql|pydantic|vue)\b/i
      ],
      answer: `Marcelo's core technical stack:<br><br>• <strong>Languages & Frameworks:</strong> Python, FastAPI, Django, Pydantic v2, Vue 3, SQL<br>• <strong>AI & RAG:</strong> pgvector, LangChain, MCP, LangFuse, RAGAS, sentence-transformers, PyTorch<br>• <strong>Databases & Storage:</strong> PostgreSQL, MySQL, Snowflake, Redis, AWS S3<br>• <strong>Infra & Messaging:</strong> Docker, AWS ECS, GitHub Actions CI/CD, Celery, Kafka<br>• <strong>Practices:</strong> TDD (Test-Driven Development), SOLID architecture, microservices, async pipelines.`
    },

    // 9. CURRENT ROLE & BT (BRITISH TELECOM)
    {
      id: 'current_role',
      phrases: ['current role', 'current job', 'where does he work', 'working now', 'bt', 'british telecom', 'naas', 'present role'],
      regexes: [/\b(current\s*(role|job|company)|working now|where (does he|is he) work|bt|british tele(com|communications)|naas)\b/i],
      answer: `Marcelo is currently a <strong>Senior Software Engineer at BT (British Telecommunications)</strong>, working remotely on their NaaS (Network as a Service) platform.<br><br>• Focus: diagnosing and resolving high-throughput production bottlenecks, SOAK testing against field devices under sustained load, and ensuring high idempotency and reliability across telecom systems.`
    },

    // 10. OVERALL EXPERIENCE & CAREER HISTORY
    {
      id: 'experience',
      phrases: ['experience', 'years of experience', 'how many years', 'career history', 'work history', 'background', 'turing', 'past companies', 'dayway', 'lactec', 'a1 engenharia'],
      regexes: [/\b(years\s*of\s*experience|work\s*history|career|track\s*record|turing|dayway|lactec|a1 engenharia)\b/i],
      answer: `Marcelo brings <strong>7+ years of production software engineering experience</strong> (9+ years engineering & research):<br><br>• <strong>BT</strong> — Senior Software Engineer (Present, ~1 year)<br>• <strong>Turing</strong> — Technical Team Lead (~2 years) · Led 6–8 engineers on AI healthcare platform<br>• <strong>Turing</strong> — Senior Software Engineer (~1.5 years) · Multi-client Python/cloud delivery<br>• <strong>Dayway</strong> — Software Engineering Specialist (~1 year) · Migration to Django + ML<br>• <strong>LACTEC</strong> — Senior Software Developer (~7 months) · EV charging platform from scratch<br>• <strong>A1 Engenharia</strong> — Junior → Developer II (~2 years) · Async pipeline overhaul (promoted twice in 18 months).`
    },

    // 11. KEY PROJECTS & PORTFOLIO
    {
      id: 'projects',
      phrases: ['projects', 'key projects', 'what has he built', 'portfolio', 'showcase', 'built', 'learning app', 'v-jepa', 'vjepa', 'robotics'],
      regexes: [/\b(projects?|portfolio|what (has he|did he) (build|built|create|make)|learning\s*app|v-?jepa)\b/i],
      answer: `Featured Projects & Architecture:<br><br><strong>01 · Production Healthcare RAG Pipeline</strong> — Hybrid pgvector search, cross-encoder reranking, MoE routing, MCP server. ↓70% hallucinations.<br><br><strong>02 · V-JEPA Industrial Robot Perception</strong> — Self-supervised vision-language model on a UR5 robot. <em>Published at EI2N 2026 / Springer LNCS.</em><br><br><strong>03 · Learning App</strong> — Duolingo-style AI coding platform: Django 5 + Vue 3 + Stripe + RAG + MoE + Docker.<br><br><strong>04 · Document Processing Pipeline</strong> — Async Celery+Redis rewrite, cut processing time by 95%.<br><br>Explore the full portfolio at <a href="./portfolio.html" style="color:var(--accent-bot);font-weight:600">portfolio.html →</a>`
    },

    // 12. RESEARCH & PUBLICATIONS
    {
      id: 'research',
      phrases: ['research', 'publication', 'paper', 'published', 'springer', 'lncs', 'ei2n', 'phd', 'doctorate', 'academic'],
      regexes: [/\b(research|publications?|papers?|published|springer|lncs|ei2n|phd|doctorate|academic)\b/i],
      answer: `Marcelo is an active researcher in Artificial Intelligence (PhD ongoing at PUCPR) with published work:<br><br>📄 <strong>Springer LNCS (EI2N 2026, IFAC/IFIP):</strong><br><em>"V-JEPA for Self-Supervised Industrial Robot Perception"</em> — Spatiotemporal ViT architecture for label-free kinematic phase discovery on UR5 robots.<br><br>Open source code available on <a href="https://github.com/marcelo-feliciano-filho" target="_blank" style="color:var(--accent-bot)">GitHub →</a>`
    },

    // 13. LEADERSHIP & TEAM MANAGEMENT
    {
      id: 'leadership',
      phrases: ['leadership', 'lead', 'tech lead', 'manage', 'management', 'mentor', 'team lead', 'leading teams'],
      regexes: [/\b(leadership|tech\s*lead|team\s*lead|lead(ing)?\s*teams?|mentorship|management)\b/i],
      answer: `As <strong>Technical Team Lead at Turing</strong>, Marcelo led 6–8 distributed engineers on an enterprise healthcare AI platform.<br><br>• <strong>Hands-on Balance:</strong> Maintained a 70% architecture/coding and 30% technical leadership split.<br>• <strong>Responsibilities:</strong> Architecture decisions, code review standards, sprint roadmap, and developer mentoring.`
    },

    // 14. COMPENSATION / RATE / SALARY
    {
      id: 'salary',
      phrases: ['salary', 'rate', 'hourly rate', 'compensation', 'pay', 'cost', 'how much', 'rates'],
      regexes: [/\b(salary|compensation|hourly\s*rate|rates?|pay(ment)?|pricing|budget)\b/i],
      answer: `Compensation depends on the engagement structure (W2 contract, 1099, B2B, or direct hire) and role scope.<br><br>Marcelo is open to discussing competitive market rates for Senior/Lead Python, Cloud, and AI roles. Connect directly on <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot);font-weight:600">LinkedIn</a> or <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot);font-weight:600">book a call on Calendly →</a>`
    },

    // 15. LOCATION & TIMEZONE
    {
      id: 'location',
      phrases: ['location', 'where is he', 'based in', 'timezone', 'brazil', 'curitiba', 'time zone', 'remote timezone'],
      regexes: [/\b(location|where (is he|does he live)|based|time\s*zone|timezone|curitiba|brazil)\b/i],
      answer: `Marcelo is based in <strong>Curitiba, Brazil (UTC-3)</strong>.<br><br>He works 100% remote with extensive direct overlap for US (Eastern & Pacific) as well as UK / European working hours.`
    },

    // 16. EDUCATION & DEGREES
    {
      id: 'education',
      phrases: ['education', 'degree', 'university', 'college', 'engineering degree', 'academic background'],
      regexes: [/\b(education|degrees?|university|college|graduat(ed|ion))\b/i],
      answer: `Marcelo holds dual engineering credentials:<br><br>• 🎓 <strong>Bachelor of Engineering (BE)</strong> — Control & Automation Engineering<br>• 🎓 <strong>Master of Engineering (MEng)</strong> — Systems Engineering<br>• 🔬 <strong>PhD Candidate</strong> — Artificial Intelligence (PUCPR)<br><br>His control systems background enforces strict failure-mode analysis, constraint planning, and test discipline in production software.`
    },

    // 17. LANGUAGES SPOKEN
    {
      id: 'languages',
      phrases: ['languages', 'speak english', 'english', 'portuguese', 'french', 'fluent', 'communication'],
      regexes: [/\b(speak(s)?\s*english|languages?\s*spoken|fluent|english|portuguese|french)\b/i],
      answer: `Marcelo speaks 3 languages:<br><br>• 🇧🇷 <strong>Portuguese:</strong> Native<br>• 🇺🇸/🇬🇧 <strong>English:</strong> Full professional fluency (daily communication with US/UK teams for 6+ years)<br>• 🇫🇷 <strong>French:</strong> Professional working proficiency.`
    },

    // 18. GITHUB & CODE
    {
      id: 'github',
      phrases: ['github', 'open source', 'code repository', 'github link', 'git repo'],
      regexes: [/\b(github|open\s*source|repositor(y|ies)|codebase)\b/i],
      answer: `Check out Marcelo's open-source projects on GitHub:<br><br>🐙 <a href="https://github.com/marcelo-feliciano-filho" target="_blank" style="color:var(--accent-bot);font-weight:600;font-size:0.92rem;">github.com/marcelo-feliciano-filho →</a><br><br>Includes repos for <strong>Learning_App</strong>, <strong>V-JEPA robotics perception</strong>, and backend prototypes.`
    },

    // 19. GREETING (STRICT WORD BOUNDARIES ONLY)
    {
      id: 'greeting',
      phrases: ['hello', 'hi', 'hey', 'good morning', 'good afternoon', 'good evening', 'howdy', 'greetings'],
      regexes: [/^\s*(hi|hello|hey|greetings|howdy|good\s*(morning|afternoon|evening))\b/i, /\b(hello|hi there|hey there)\b/i],
      answer: `Hello! 👋 I'm Marcelo's recruiter assistant.<br><br>I can answer detailed questions regarding his <strong>7+ years of Python & AI experience</strong>, <strong>technical stack</strong>, <strong>W2 availability</strong>, or help you <strong>schedule an interview</strong>.<br><br>What would you like to explore?`
    },

    // 20. THANKS / PRAISE
    {
      id: 'thanks',
      phrases: ['thank you', 'thanks', 'awesome', 'great', 'cool', 'perfect', 'appreciate it'],
      regexes: [/\b(thanks?|thank\s*you|awesome|perfect|great|appreciated?)\b/i],
      answer: `You're welcome! Feel free to connect directly with Marcelo:<br><br>• 💼 <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot)">LinkedIn</a><br>• 📅 <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot)">Book a Call on Calendly</a><br>• 💬 <a href="https://shorturl.at/VNQv3" target="_blank" style="color:var(--accent-bot)">WhatsApp</a>`
    }
  ];

  const SUGGESTIONS = [
    'Tell me about Marcelo',
    'What are his top skills?',
    'Is he open to W2 contracts?',
    'What projects has he built?',
    'Current role at BT?',
    'Book a call with him',
    'Download his CV',
    'Does he speak English?',
  ];

  const FALLBACK = `I'd be happy to help with any details regarding Marcelo's software engineering background.<br><br>You can ask about:<br>• <strong>Tech Stack & Skills:</strong> Python, FastAPI, Django, RAG, MCP, AWS, Docker<br>• <strong>Availability:</strong> W2 contracts, remote roles, notice period<br>• <strong>Experience:</strong> BT, Turing (Tech Lead), production RAG pipelines<br>• <strong>Scheduling:</strong> <a href="https://calendly.com/marcelo-feliciano-f" target="_blank" style="color:var(--accent-bot)">Book a call on Calendly →</a> or connect on <a href="https://www.linkedin.com/in/marcelo-feliciano-filho-731504182/" target="_blank" style="color:var(--accent-bot)">LinkedIn</a>`;

  /* ── NLP Match Engine (Strict Boundaries & Priority Scoring) ── */
  function getAnswer(rawQuery) {
    const query = (rawQuery || '').trim();
    if (!query) return FALLBACK;

    // Check guardrails first
    if (GUARDRAIL_REGEX.test(query)) {
      return GUARDRAIL_ANSWER;
    }

    const qLower = query.toLowerCase();

    let bestIntent = null;
    let highestScore = 0;

    for (const intent of INTENTS) {
      let score = 0;

      // 1. Exact phrase match
      if (intent.phrases) {
        for (const phrase of intent.phrases) {
          if (qLower === phrase) {
            score += 150;
          } else if (qLower.includes(phrase)) {
            score += 40 + phrase.length;
          }
        }
      }

      // 2. Strict regex word-boundary match
      if (intent.regexes) {
        for (const rx of intent.regexes) {
          if (rx.test(query)) {
            score += 60;
          }
        }
      }

      // De-prioritize greeting if query has multiple substantive words
      if (intent.id === 'greeting' && score > 0) {
        const wordCount = query.split(/\s+/).length;
        if (wordCount > 3) {
          score = 5; // Demote greeting so actual topic wins
        }
      }

      if (score > highestScore) {
        highestScore = score;
        bestIntent = intent;
      }
    }

    if (bestIntent && highestScore >= 30) {
      return bestIntent.answer;
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

  function openChat(query) {
    if (!isOpen) {
      isOpen = true;
      win.classList.add('open');
      btn.innerHTML = '✕';
      if (!msgs.children.length) init();
    }
    if (query && typeof query === 'string' && query.trim()) {
      input.value = query.trim();
      handleSend();
    } else {
      input.focus();
    }
  }

  window.openRecruiterChat = openChat;

  document.addEventListener('click', function (e) {
    const trigger = e.target.closest('[data-chat-query], .open-chat-trigger');
    if (trigger) {
      e.preventDefault();
      const q = trigger.getAttribute('data-chat-query') || trigger.getAttribute('data-query') || '';
      openChat(q);
    }
  });

  btn.addEventListener('click', toggleChat);
  close.addEventListener('click', toggleChat);
  send.addEventListener('click', handleSend);
  input.addEventListener('keydown', e => { if (e.key === 'Enter') handleSend(); });

})();

