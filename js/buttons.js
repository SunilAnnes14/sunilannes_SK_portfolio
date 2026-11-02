/**
 * ============================================================================
 * INSIDE THE MACHINE // BUTTON ANIMATION & MICRO-INTERACTIONS ENGINE
 * ============================================================================
 * Implements:
 * 1. Mechanical keycap press (translateY + shadow + audio click)
 * 2. Bracket expand on hover: [ CONTACT ] -> [ > CONTACT < ]
 * 3. Text scramble on hover (resolves into real label)
 * 4. Phosphor fill from left to right with glow
 * 5. Magnetic cursor pull & snap back
 */

class RetroButtonEngine {
  constructor(audioEngine) {
    this.audio = audioEngine;
    this.scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*<>[]/{}+=";
    this.init();
  }

  init() {
    this.setupBracketExpansions();
    this.setupScrambleButtons();
    this.setupMechanicalClicks();
    this.setupMagneticButtons();
    this.setupPhosphorButtons();
  }

  // 1. Bracket Expand on Hover: [ ABOUT ] -> [ > ABOUT < ]
  setupBracketExpansions() {
    const bracketBtns = document.querySelectorAll('.btn-bracket, .nav-btn');
    bracketBtns.forEach(btn => {
      const origText = btn.getAttribute('data-label') || btn.innerText.trim();
      btn.setAttribute('data-original', origText);

      btn.addEventListener('mouseenter', () => {
        if (!btn.classList.contains('active')) {
          btn.innerHTML = `<span class="bracket">&gt;</span> ${origText} <span class="bracket">&lt;</span>`;
          if (this.audio) this.audio.playKeyClick(600);
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (!btn.classList.contains('active')) {
          btn.innerHTML = origText;
        }
      });
    });
  }

  // 2. Text Scramble on Hover
  setupScrambleButtons() {
    const scrambleElements = document.querySelectorAll('.btn-scramble, .scramble-target');
    scrambleElements.forEach(el => {
      const originalText = el.getAttribute('data-text') || el.innerText;
      el.setAttribute('data-orig-scramble', originalText);

      el.addEventListener('mouseenter', () => {
        this.runScramble(el, originalText);
        if (this.audio) this.audio.playKeyClick(750);
      });
    });
  }

  runScramble(element, targetText) {
    let iteration = 0;
    const maxIterations = targetText.length;
    clearInterval(element._scrambleTimer);

    element._scrambleTimer = setInterval(() => {
      element.innerText = targetText
        .split("")
        .map((char, index) => {
          if (index < iteration) {
            return targetText[index];
          }
          if (char === " ") return " ";
          return this.scrambleChars[Math.floor(Math.random() * this.scrambleChars.length)];
        })
        .join("");

      if (iteration >= maxIterations) {
        clearInterval(element._scrambleTimer);
        element.innerText = targetText;
      }
      iteration += 1 / 2;
    }, 28);
  }

  // 3. Mechanical Keycap Press with Audio Click
  setupMechanicalClicks() {
    const allClickables = document.querySelectorAll(
      '.btn-mechanical, .nav-btn, .ctrl-btn, .slot-chip, .theme-btn, .crt-btn, button, input[type="submit"]'
    );
    allClickables.forEach(btn => {
      btn.addEventListener('mousedown', () => {
        if (this.audio) this.audio.playMechanicalClick();
      });
    });
  }

  // 4. Magnetic Cursor Pull on Ports/Links
  setupMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn, .port-cable-item');
    if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch screens

    magneticBtns.forEach(btn => {
      const strength = 18; // px pull distance

      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const deltaX = (e.clientX - centerX) / (rect.width / 2);
        const deltaY = (e.clientY - centerY) / (rect.height / 2);

        if (window.gsap) {
          gsap.to(btn, {
            x: deltaX * strength,
            y: deltaY * (strength * 0.5),
            duration: 0.2,
            ease: "power2.out"
          });
        }
      });

      btn.addEventListener('mouseleave', () => {
        if (window.gsap) {
          gsap.to(btn, {
            x: 0,
            y: 0,
            duration: 0.4,
            ease: "elastic.out(1, 0.4)"
          });
        }
      });
    });
  }

  // 5. Phosphor Fill Glow Button Hover
  setupPhosphorButtons() {
    const phosphorBtns = document.querySelectorAll('.btn-phosphor-fill');
    phosphorBtns.forEach(btn => {
      btn.addEventListener('mouseenter', () => {
        if (this.audio) this.audio.playKeyClick(450);
      });
    });
  }

  // Refresh dynamic elements
  refresh() {
    this.setupBracketExpansions();
    this.setupScrambleButtons();
    this.setupMechanicalClicks();
    this.setupMagneticButtons();
    this.setupPhosphorButtons();
  }
}

window.RetroButtonEngine = RetroButtonEngine;
