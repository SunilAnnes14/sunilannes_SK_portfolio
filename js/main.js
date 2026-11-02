/**
 * ============================================================================
 * INSIDE THE MACHINE // MAIN APPLICATION CORE
 * ============================================================================
 * Sunil Annes S K - B.Tech Artificial Intelligence & Data Science Portfolio
 * Themed as retro amber CRT computer running "SK-Linux 1.0 LTS"
 */

// --- 1. WEB AUDIO SYNTHESIZER ENGINE (Zero External Audio Files) ---
class RetroAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // Off by default as required
  }

  ensureContext() {
    if (!this.ctx && typeof AudioContext !== "undefined") {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  setMute(muted) {
    this.isMuted = muted;
    const btn = document.getElementById("soundToggleBtn");
    if (btn) {
      btn.innerText = `[ SOUND: ${this.isMuted ? "OFF" : "ON"} ]`;
      btn.classList.toggle("active", !this.isMuted);
    }
  }

  toggleMute() {
    this.ensureContext();
    this.setMute(!this.isMuted);
  }

  // Classic BIOS Boot Beep (850Hz)
  playBootBeep() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "square";
    osc.frequency.setValueAtTime(850, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.25);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.25);
  }

  // Keycap Click Sound
  playKeyClick(freq = 600) {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.04);
  }

  // Mechanical Switch Click
  playMechanicalClick() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(220, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(80, this.ctx.currentTime + 0.06);
    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.06);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // Floppy / Cartridge Snap
  playFloppyClick() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(320, this.ctx.currentTime);
    osc.frequency.setValueAtTime(140, this.ctx.currentTime + 0.04);
    gain.gain.setValueAtTime(0.18, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.12);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.12);
  }

  // CRT Shutdown Pitch Fall
  playCRTShutdown() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sawtooth";
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, this.ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // CRT Power On Flyback Transformer Whine
  playCRTPowerOn() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(120, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.06, this.ctx.currentTime + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.35);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  // Tape Slide Whoosh
  playTapeSlide() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(180, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(450, this.ctx.currentTime + 0.15);
    osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.3);
  }

  // Scanline Wipe Laser
  playScanlineWipe() {
    if (this.isMuted) return;
    this.ensureContext();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = "sine";
    osc.frequency.setValueAtTime(1500, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(200, this.ctx.currentTime + 0.38);
    gain.gain.setValueAtTime(0.09, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.4);
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.4);
  }

  // Static Glitch Burst
  playGlitchNoise() {
    if (this.isMuted) return;
    this.ensureContext();
    const bufferSize = this.ctx.sampleRate * 0.15;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.1;
    }
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.value = 1200;
    noise.connect(filter);
    filter.connect(this.ctx.destination);
    noise.start();
  }

  // Modem Transmission Chirp Sequence
  playModemSequence() {
    if (this.isMuted) return;
    this.ensureContext();
    const notes = [900, 1200, 1500, 1800, 2400];
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = "square";
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      }, idx * 100);
    });
  }
}

// --- 2. MAIN APPLICATION CONTROLLER ---
class PortfolioApp {
  constructor() {
    this.data = window.PORTFOLIO_DATA || {};
    this.currentTheme = "amber";
    this.activePageId = "boot";

    // Subsystems
    this.audio = new RetroAudioEngine();
    this.transitions = new CRTTransitionManager(this.audio);
    this.buttons = null; // initialized after DOM population
    this.cartridges = null;
    this.terminal = null;

    this.init();
  }

  init() {
    this.applyContentData();
    this.setupNavigation();
    this.setupThemeSwitcher();
    this.setupPhosphorCursor();
    this.setupSystemClock();
    this.setupTrainingModelLossCurve();
    this.setupRFVisualizer();
    this.setupContactForm();

    // Init Cartridge Subsystem
    this.cartridges = new CartridgeSystem("cartridgeCanvasWrapper", this.data.projects, this.transitions, this.audio);

    // Init Terminal Subsystem
    this.terminal = new RetroTerminal(this);

    // Init Button Micro-Interactions Engine
    this.buttons = new RetroButtonEngine(this.audio);

    // Play Initial CRT Boot Sequence
    this.runInitialBootSequence();
  }

  // Populate dynamic content from PORTFOLIO_DATA
  applyContentData() {
    const id = this.data.identity || {};

    // 1. Boot Page Hero
    const heroName = document.getElementById("heroName");
    const heroBio = document.getElementById("heroBio");
    const portraitImg = document.getElementById("portraitImg");

    if (heroName) heroName.innerText = id.name || "Sunil Annes S K";
    if (heroBio) heroBio.innerText = `Hi there, I'm ${id.name.split(" ")[0] || "Sunil"}`;
    if (portraitImg && id.portraitPath) portraitImg.src = id.portraitPath;

    // Bullets
    const bulletsContainer = document.getElementById("heroBullets");
    if (bulletsContainer && id.roles) {
      bulletsContainer.innerHTML = id.roles
        .map(role => `<li class="hero-bullet-item"><span class="bullet-bracket">[+]</span> ${role}</li>`)
        .join("");
    }

    // 2. Whoami Page
    const whoamiCommand = document.getElementById("whoamiBioText");
    if (whoamiCommand && id.bioTerminal) {
      whoamiCommand.innerText = id.bioTerminal;
    }

    // Neofetch fields
    const neoDetails = document.getElementById("neofetchDetails");
    if (neoDetails && this.data.neofetch) {
      neoDetails.innerHTML = this.data.neofetch.fields
        .map(f => `
          <div class="neo-row">
            <span class="neo-label">${f.label}:</span>
            <span class="neo-val ${f.badge ? 'neo-badge' : ''}">${f.value}</span>
          </div>
        `).join("");
    }

    // Skills progress bars
    const skillsList = document.getElementById("skillsList");
    if (skillsList && this.data.skills) {
      skillsList.innerHTML = this.data.skills
        .map(s => {
          const filled = Math.round(s.percentage / 10);
          const empty = 10 - filled;
          const bar = "█".repeat(filled) + "░".repeat(empty);
          return `
            <div class="skill-item">
              <div class="skill-info">
                <span>${s.name}</span>
                <span class="dim-text">[${s.category}]</span>
              </div>
              <div class="skill-progress-bar" data-percentage="${s.percentage}">
                [${bar}] ${s.percentage}%
              </div>
            </div>
          `;
        }).join("");
    }

    // Timeline nodes
    const timelineTree = document.getElementById("timelineTree");
    if (timelineTree && this.data.timeline) {
      timelineTree.innerHTML = this.data.timeline
        .map(node => `
          <div class="timeline-node">
            <div class="node-period">${node.period}</div>
            <div class="node-title">${node.title}</div>
            <div class="node-inst">${node.institution}</div>
            <div class="node-desc">${node.description}</div>
          </div>
        `).join("");
    }

    // 3. Transmit Ports (Social Links)
    const portsList = document.getElementById("portsList");
    if (portsList && this.data.socialPorts) {
      portsList.innerHTML = this.data.socialPorts
        .map(port => `
          <a href="${port.url}" target="_blank" rel="noopener noreferrer" class="port-cable-item magnetic-btn">
            <div class="port-info-left">
              <span class="port-code">[ ${port.portNumber} // ${port.protocol} ]</span>
              <span class="port-name">${port.label}</span>
              <span class="dim-text" style="font-size:14px; font-family:var(--font-mono);">${port.displayHost}</span>
            </div>
            <div class="port-conn-right">
              <span class="cable-jack">${port.indicator}</span>
              <span class="dim-text">=&gt;</span>
            </div>
          </a>
        `).join("");
    }
  }

  // Initial CRT Power-On Sequence
  runInitialBootSequence() {
    const biosCard = document.getElementById("biosPostCard");
    const biosLines = (this.data.biosLines || []);

    if (biosCard && biosLines.length > 0) {
      biosCard.innerHTML = "";
      biosLines.forEach((line, index) => {
        setTimeout(() => {
          const div = document.createElement("div");
          div.className = "bios-line";
          div.innerHTML = `<span>${line}</span>`;
          biosCard.appendChild(div);
          if (index === biosLines.length - 1) {
            this.audio.playBootBeep();
          }
        }, index * 120);
      });
    }
  }

  // Setup Navigation via Topbar & Keyboard
  setupNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const target = btn.getAttribute("data-page");
        this.navigateTo(target);
      });
    });

    // Keyboard Shortcuts: 1-4, Arrows
    window.addEventListener("keydown", (e) => {
      if (document.activeElement.tagName === "INPUT" || document.activeElement.tagName === "TEXTAREA") return;
      if (this.terminal && this.terminal.isOpen) return;

      const pageMap = {
        "1": "boot",
        "2": "whoami",
        "3": "cartridges",
        "4": "transmit"
      };

      if (pageMap[e.key]) {
        this.navigateTo(pageMap[e.key]);
      } else if (e.key === "ArrowRight") {
        this.navStep(1);
      } else if (e.key === "ArrowLeft") {
        this.navStep(-1);
      }
    });

    // Sound toggle button in topbar
    const soundBtn = document.getElementById("soundToggleBtn");
    if (soundBtn) {
      soundBtn.addEventListener("click", () => this.audio.toggleMute());
    }

    // Transition Mode Selector button
    const transBtn = document.getElementById("transitionToggleBtn");
    if (transBtn) {
      const modes = ["crt", "tape", "scanline", "random"];
      let curIdx = 0;
      transBtn.addEventListener("click", () => {
        curIdx = (curIdx + 1) % modes.length;
        this.transitions.setMode(modes[curIdx]);
        transBtn.innerText = `[ FX: ${modes[curIdx].toUpperCase()} ]`;
        this.audio.playKeyClick(650);
      });
    }
  }

  navStep(delta) {
    const order = ["boot", "whoami", "cartridges", "transmit"];
    let idx = order.indexOf(this.activePageId);
    idx = (idx + delta + order.length) % order.length;
    this.navigateTo(order[idx]);
  }

  navigateTo(pageId) {
    if (pageId === this.activePageId) return;

    const currentEl = document.getElementById(`page-${this.activePageId}`);
    const targetEl = document.getElementById(`page-${pageId}`);
    if (!targetEl) return;

    // Update active nav button state
    const navButtons = document.querySelectorAll(".nav-btn");
    navButtons.forEach(btn => {
      if (btn.getAttribute("data-page") === pageId) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });

    // Run transition
    this.transitions.navigate(currentEl, targetEl, null, () => {
      this.activePageId = pageId;

      // When arriving at CARTRIDGES, trigger Three.js resize
      if (pageId === "cartridges" && this.cartridges) {
        this.cartridges.onResize();
      }
    });
  }

  // Setup Theme Switcher: Amber / Green / White
  setupThemeSwitcher() {
    const themeButtons = document.querySelectorAll(".theme-btn");
    themeButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        const theme = btn.getAttribute("data-theme");
        this.setTheme(theme);
      });
    });
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    document.documentElement.setAttribute("data-theme", themeName);

    const themeButtons = document.querySelectorAll(".theme-btn");
    themeButtons.forEach(b => {
      if (b.getAttribute("data-theme") === themeName) {
        b.classList.add("active");
      } else {
        b.classList.remove("active");
      }
    });

    if (this.audio) this.audio.playMechanicalClick();
  }

  // Custom Phosphor Cursor Following Mouse
  setupPhosphorCursor() {
    const cursor = document.getElementById("phosphorCursor");
    if (!cursor) return;

    window.addEventListener("mousemove", (e) => {
      cursor.style.left = `${e.clientX + 2}px`;
      cursor.style.top = `${e.clientY + 2}px`;
    });
  }

  // Topbar / Footer Live System Clock & Uptime
  setupSystemClock() {
    const clockEl = document.getElementById("systemClock");
    const memEl = document.getElementById("systemMemUsage");

    setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().split(" ")[0];
      if (clockEl) clockEl.innerText = `${timeStr} UTC`;

      // Subtle fluctuation in simulated neural co-processor RAM
      if (memEl && Math.random() < 0.2) {
        const base = 42.4 + (Math.sin(Date.now() * 0.001) * 3.2);
        memEl.innerText = `RAM: ${base.toFixed(1)}%`;
      }
    }, 1000);
  }

  // Tiny "Training Model" Loss Curve on Boot Page
  setupTrainingModelLossCurve() {
    const canvas = document.getElementById("trainingCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let points = [];
    let epoch = 1;
    let maxEpochs = 100;
    let currentLoss = 2.45;

    function resize() {
      canvas.width = canvas.parentElement.clientWidth || 400;
      canvas.height = canvas.parentElement.clientHeight || 80;
    }
    resize();
    window.addEventListener("resize", resize);

    const epochEl = document.getElementById("trainEpoch");
    const lossEl = document.getElementById("trainLoss");
    const accEl = document.getElementById("trainAcc");

    setInterval(() => {
      if (epoch <= maxEpochs) {
        // Gradient descent simulated curve: exponential decay + slight stochastic noise
        currentLoss = Math.max(0.024, (2.45 * Math.exp(-epoch * 0.055)) + (Math.random() * 0.02 - 0.01));
        const acc = Math.min(98.9, 65 + (33 * (1 - Math.exp(-epoch * 0.06))) + (Math.random() * 0.4)).toFixed(1);

        points.push({ epoch, loss: currentLoss });
        if (points.length > 80) points.shift();

        if (epochEl) epochEl.innerText = `${epoch}/${maxEpochs}`;
        if (lossEl) lossEl.innerText = currentLoss.toFixed(4);
        if (accEl) accEl.innerText = `${acc}%`;

        epoch++;
      } else {
        // Loop back smoothly
        epoch = 1;
        points = [];
      }

      // Draw curve on canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;

      // Draw faint grid lines
      ctx.strokeStyle = "rgba(255, 176, 0, 0.12)";
      ctx.lineWidth = 1;
      for (let y = 15; y < h; y += 20) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(w, y);
        ctx.stroke();
      }

      if (points.length < 2) return;

      // Draw loss curve
      ctx.beginPath();
      ctx.strokeStyle = "var(--p-primary)";
      ctx.lineWidth = 2;
      ctx.shadowBlur = 8;
      ctx.shadowColor = "rgba(255, 176, 0, 0.8)";

      points.forEach((pt, i) => {
        const x = (i / (points.length - 1)) * (w - 10) + 5;
        // Normalize loss: 2.5 is top, 0 is bottom
        const y = Math.min(h - 5, Math.max(5, (pt.loss / 2.5) * (h - 20) + 10));
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0;
    }, 180);
  }

  // RF Frequency Visualizer Canvas on Transmit Page
  setupRFVisualizer() {
    const canvas = document.getElementById("rfCanvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let phase = 0;

    function resize() {
      canvas.width = canvas.parentElement.clientWidth || 300;
      canvas.height = canvas.parentElement.clientHeight || 60;
    }
    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const w = canvas.width;
      const h = canvas.height;
      const mid = h / 2;

      ctx.strokeStyle = "rgba(255, 176, 0, 0.75)";
      ctx.lineWidth = 1.5;
      ctx.beginPath();

      for (let x = 0; x < w; x++) {
        const freq1 = Math.sin((x * 0.05) + phase);
        const freq2 = Math.sin((x * 0.12) - phase * 1.5) * 0.4;
        const noise = (Math.random() - 0.5) * 2;
        const y = mid + (freq1 + freq2) * (h * 0.3) + noise;

        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();

      phase += 0.08;
      requestAnimationFrame(draw);
    }
    draw();
  }

  // Contact Form Submission with Packet Animation
  setupContactForm() {
    const form = document.getElementById("terminalContactForm");
    const statusBox = document.getElementById("transmissionStatusBox");
    const logEl = document.getElementById("packetLog");
    const fillEl = document.getElementById("signalFill");
    const submitBtn = document.getElementById("submitTransmissionBtn");

    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const name = document.getElementById("contactName").value.trim();
      const email = document.getElementById("contactEmail").value.trim();
      const message = document.getElementById("contactMsg").value.trim();

      if (!name || !email || !message) return;

      submitBtn.disabled = true;
      submitBtn.innerText = "[ ENCRYPTING... ]";
      statusBox.classList.add("show");
      logEl.innerHTML = "";
      fillEl.style.width = "0%";

      this.audio.playModemSequence();

      const packets = [
        "PACKET 0x01: SYN -> Establishing carrier link @ 14400 baud...",
        "PACKET 0x02: SYN-ACK -> Handshake verified with Sunil's neural terminal...",
        "PACKET 0x03: ENCRYPT -> Wrapping payload in AES-256 cipher block...",
        "PACKET 0x04: UPLINK -> Streaming 1024 bytes payload data...",
        "PACKET 0x05: ACK -> Checksum verified (0x9AF2). Transmission received!"
      ];

      packets.forEach((pkt, idx) => {
        setTimeout(() => {
          const p = document.createElement("div");
          p.innerText = pkt;
          logEl.appendChild(p);
          logEl.scrollTop = logEl.scrollHeight;

          const progress = Math.min(100, (idx + 1) * 20);
          fillEl.style.width = `${progress}%`;

          if (idx === packets.length - 1) {
            submitBtn.innerText = "[ TRANSMISSION COMPLETE ]";
            this.transitions.triggerGlitchBurst(0.18);
            setTimeout(() => {
              alert(`[ TRANSMISSION COMPLETE ]\n\nThank you, ${name}!\nYour message has been securely relayed to Sunil Annes S K.\nUplink confirmed.`);
              form.reset();
              submitBtn.disabled = false;
              submitBtn.innerText = "[ TRANSMIT PACKET ]";
              statusBox.classList.remove("show");
            }, 800);
          }
        }, idx * 600);
      });
    });
  }
}

// Instantiate on DOMContentLoaded
window.addEventListener("DOMContentLoaded", () => {
  window.app = new PortfolioApp();
});
