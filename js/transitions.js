/**
 * ============================================================================
 * INSIDE THE MACHINE // GSAP CRT PAGE TRANSITIONS ENGINE
 * ============================================================================
 * Implements:
 * 1. CRT Shutdown (collapse to horizontal line, then dot, then power-on)
 * 2. Tape Slide with RGB-split / Chromatic Aberration
 * 3. Scanline Wipe (bright phosphor beam sweeps down)
 * 4. Rapid Navigation Glitch (200ms static burst)
 * 5. Config switcher ("crt" | "tape" | "scanline" | "glitch" | "random")
 */

class CRTTransitionManager {
  constructor(audioEngine) {
    this.audio = audioEngine;
    this.isTransitioning = false;
    this.lastNavTime = 0;

    // Transition Configuration Object - customizable by user
    this.config = {
      defaultMode: "crt", // Options: 'crt', 'tape', 'scanline', 'random'
      availableModes: ["crt", "tape", "scanline"],
      glitchDuration: 0.2, // 200ms rapid glitch
      crtSpeed: 0.45,
      soundSync: true
    };

    this.overlay = document.getElementById("transitionOverlay");
    this.shutdownLine = document.getElementById("shutdownLine");
    this.scanlineBeam = document.getElementById("scanlineBeam");
    this.noiseCanvas = document.getElementById("staticNoiseCanvas");

    this.initNoiseCanvas();
  }

  initNoiseCanvas() {
    if (!this.noiseCanvas) return;
    this.noiseCtx = this.noiseCanvas.getContext("2d");
    this.resizeNoiseCanvas();
    window.addEventListener("resize", () => this.resizeNoiseCanvas());
  }

  resizeNoiseCanvas() {
    if (!this.noiseCanvas) return;
    this.noiseCanvas.width = Math.min(window.innerWidth / 2, 600);
    this.noiseCanvas.height = Math.min(window.innerHeight / 2, 400);
  }

  renderNoiseBurst() {
    if (!this.noiseCtx || !this.noiseCanvas) return;
    const w = this.noiseCanvas.width;
    const h = this.noiseCanvas.height;
    const imgData = this.noiseCtx.createImageData(w, h);
    const buffer = new Uint32Array(imgData.data.buffer);
    const len = buffer.length;

    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.25) {
        buffer[i] = 0xff00b0ff; // Amber phosphor noise pixel
      } else if (Math.random() < 0.1) {
        buffer[i] = 0xffffffff; // White spark
      } else {
        buffer[i] = 0xff000000; // Black
      }
    }
    this.noiseCtx.putImageData(imgData, 0, 0);
  }

  // Set transition mode dynamically
  setMode(mode) {
    if (this.config.availableModes.includes(mode) || mode === "random") {
      this.config.defaultMode = mode;
      return true;
    }
    return false;
  }

  // Trigger rapid 200ms glitch / static burst
  triggerGlitchBurst(duration = 0.2) {
    if (!this.noiseCanvas) return;
    if (this.audio) this.audio.playGlitchNoise();

    this.noiseCanvas.style.opacity = "0.75";
    this.noiseCanvas.style.display = "block";

    let elapsed = 0;
    const interval = setInterval(() => {
      this.renderNoiseBurst();
      elapsed += 0.04;
      if (elapsed >= duration) {
        clearInterval(interval);
        this.noiseCanvas.style.opacity = "0";
        this.noiseCanvas.style.display = "none";
      }
    }, 40);
  }

  // Main Page Transition Execution
  navigate(currentPageEl, targetPageEl, modeOverride = null, onComplete = null) {
    if (this.isTransitioning || currentPageEl === targetPageEl) return;
    this.isTransitioning = true;

    // Check rapid navigation (< 600ms apart) -> add glitch burst
    const now = Date.now();
    const isRapid = (now - this.lastNavTime) < 600;
    this.lastNavTime = now;

    if (isRapid) {
      this.triggerGlitchBurst(0.18);
    }

    // Determine mode
    let selectedMode = modeOverride || this.config.defaultMode;
    if (selectedMode === "random") {
      const modes = this.config.availableModes;
      selectedMode = modes[Math.floor(Math.random() * modes.length)];
    }

    // Honor prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      this.instantTransition(currentPageEl, targetPageEl, onComplete);
      return;
    }

    switch (selectedMode) {
      case "tape":
        this.runTapeSlide(currentPageEl, targetPageEl, onComplete);
        break;
      case "scanline":
        this.runScanlineWipe(currentPageEl, targetPageEl, onComplete);
        break;
      case "crt":
      default:
        this.runCRTShutdown(currentPageEl, targetPageEl, onComplete);
        break;
    }
  }

  // Fallback instant transition
  instantTransition(currentEl, targetEl, onComplete) {
    if (currentEl) currentEl.classList.remove("active-page");
    if (targetEl) targetEl.classList.add("active-page");
    this.isTransitioning = false;
    if (onComplete) onComplete();
  }

  // 1. CRT Shutdown & Power On Transition
  runCRTShutdown(currentEl, targetEl, onComplete) {
    if (!window.gsap) {
      this.instantTransition(currentEl, targetEl, onComplete);
      return;
    }

    if (this.audio) this.audio.playCRTShutdown();
    this.overlay.style.display = "block";

    const tl = gsap.timeline({
      onComplete: () => {
        this.overlay.style.display = "none";
        this.isTransitioning = false;
        if (onComplete) onComplete();
      }
    });

    // Step 1: Screen collapses vertically into a thin horizontal line
    tl.to(currentEl, {
      scaleY: 0.002,
      filter: "brightness(2.5) contrast(150%)",
      duration: 0.18,
      ease: "power3.in"
    })
    // Step 2: Bright shutdown line shines
    .set(this.shutdownLine, {
      opacity: 1,
      scaleX: 1,
      scaleY: 1
    })
    // Step 3: Line collapses horizontally to a center dot
    .to(this.shutdownLine, {
      scaleX: 0.005,
      duration: 0.12,
      ease: "power4.in"
    })
    // Step 4: Dot flashes out
    .to(this.shutdownLine, {
      scaleY: 0,
      opacity: 0,
      duration: 0.06
    })
    // Step 5: Switch active page while screen is dark
    .add(() => {
      currentEl.classList.remove("active-page");
      gsap.set(currentEl, { scaleY: 1, filter: "none" });

      targetEl.classList.add("active-page");
      gsap.set(targetEl, {
        scaleY: 0.003,
        scaleX: 0.1,
        opacity: 1,
        filter: "brightness(3) blur(1px)"
      });
      if (this.audio) this.audio.playCRTPowerOn();
    })
    // Step 6: Power on - horizontal line expands, then vertical opens
    .to(targetEl, {
      scaleX: 1,
      duration: 0.14,
      ease: "power2.out"
    })
    .to(targetEl, {
      scaleY: 1,
      filter: "brightness(1) blur(0px)",
      duration: 0.2,
      ease: "power3.out"
    });
  }

  // 2. Tape Slide with RGB Split / Chromatic Aberration
  runTapeSlide(currentEl, targetEl, onComplete) {
    if (!window.gsap) {
      this.instantTransition(currentEl, targetEl, onComplete);
      return;
    }

    if (this.audio) this.audio.playTapeSlide();

    const tl = gsap.timeline({
      onComplete: () => {
        currentEl.classList.remove("active-page");
        gsap.set(currentEl, { x: 0, opacity: 1, filter: "none" });
        gsap.set(targetEl, { x: 0, opacity: 1, filter: "none" });
        this.isTransitioning = false;
        if (onComplete) onComplete();
      }
    });

    targetEl.classList.add("active-page");
    gsap.set(targetEl, {
      x: "100%",
      opacity: 0.8,
      filter: "drop-shadow(-8px 0px 0px rgba(255,0,0,0.7)) drop-shadow(8px 0px 0px rgba(0,255,255,0.7))"
    });

    tl.to(currentEl, {
      x: "-100%",
      opacity: 0.3,
      duration: 0.35,
      ease: "power2.inOut"
    }, 0)
    .to(targetEl, {
      x: "0%",
      opacity: 1,
      filter: "none",
      duration: 0.35,
      ease: "power2.inOut"
    }, 0);
  }

  // 3. Scanline Wipe Transition
  runScanlineWipe(currentEl, targetEl, onComplete) {
    if (!window.gsap) {
      this.instantTransition(currentEl, targetEl, onComplete);
      return;
    }

    if (this.audio) this.audio.playScanlineWipe();
    this.overlay.style.display = "block";

    const tl = gsap.timeline({
      onComplete: () => {
        this.overlay.style.display = "none";
        this.isTransitioning = false;
        if (onComplete) onComplete();
      }
    });

    targetEl.classList.add("active-page");
    gsap.set(targetEl, {
      clipPath: "inset(0% 0% 100% 0%)",
      opacity: 1
    });

    tl.set(this.scanlineBeam, {
      top: "0%",
      opacity: 1
    })
    .to(this.scanlineBeam, {
      top: "100%",
      duration: 0.45,
      ease: "power1.inOut"
    }, 0)
    .to(targetEl, {
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.45,
      ease: "power1.inOut"
    }, 0)
    .add(() => {
      currentEl.classList.remove("active-page");
      gsap.set(targetEl, { clipPath: "none" });
      gsap.set(this.scanlineBeam, { opacity: 0 });
    });
  }
}

window.CRTTransitionManager = CRTTransitionManager;
