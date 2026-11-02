/**
 * ============================================================================
 * INSIDE THE MACHINE // HIDDEN COMMAND LINE TERMINAL ENGINE
 * ============================================================================
 * Implements:
 * 1. Global keystroke listener (typing 'help' anywhere opens terminal)
 * 2. Hotkeys: `~` (backtick) or Esc to toggle
 * 3. Commands: help, about, projects, skills, contact, theme, clear, matrix, sudo hire sunil
 * 4. Command history navigation (Up/Down arrow keys)
 */

class RetroTerminal {
  constructor(appInstance) {
    this.app = appInstance;
    this.modal = document.getElementById("terminalModal");
    this.output = document.getElementById("terminalOutput");
    this.input = document.getElementById("terminalInput");
    this.closeBtn = document.getElementById("terminalCloseBtn");

    this.isOpen = false;
    this.commandHistory = [];
    this.historyIndex = -1;
    this.keyBuffer = "";
    this.isMatrixRunning = false;

    this.init();
  }

  init() {
    if (!this.modal || !this.input) return;

    // Global keystroke listener: typing "help" anywhere
    window.addEventListener("keydown", (e) => {
      // Toggle on backtick `~` or F1
      if (e.key === "`" || e.key === "~" || e.key === "F1") {
        e.preventDefault();
        this.toggle();
        return;
      }

      if (e.key === "Escape" && this.isOpen) {
        this.close();
        return;
      }

      // Check if user is typing "help" in global scope
      if (!this.isOpen && document.activeElement.tagName !== "INPUT" && document.activeElement.tagName !== "TEXTAREA") {
        this.keyBuffer += e.key.toLowerCase();
        if (this.keyBuffer.length > 10) {
          this.keyBuffer = this.keyBuffer.slice(-10);
        }
        if (this.keyBuffer.endsWith("help")) {
          this.keyBuffer = "";
          this.open();
          this.printWelcome();
        }
      }
    });

    // Close button
    if (this.closeBtn) {
      this.closeBtn.addEventListener("click", () => this.close());
    }

    // Input command execution
    this.input.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const cmd = this.input.value.trim();
        if (cmd) {
          this.commandHistory.push(cmd);
          this.historyIndex = this.commandHistory.length;
          this.execute(cmd);
          this.input.value = "";
        }
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.input.value = this.commandHistory[this.historyIndex] || "";
        }
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (this.historyIndex < this.commandHistory.length - 1) {
          this.historyIndex++;
          this.input.value = this.commandHistory[this.historyIndex] || "";
        } else {
          this.historyIndex = this.commandHistory.length;
          this.input.value = "";
        }
      }
    });

    // CLI button in topbar
    const cliBtn = document.getElementById("topbarCliBtn");
    if (cliBtn) {
      cliBtn.addEventListener("click", () => {
        this.toggle();
        if (this.isOpen) this.printWelcome();
      });
    }
  }

  toggle() {
    if (this.isOpen) {
      this.close();
    } else {
      this.open();
    }
  }

  open() {
    this.isOpen = true;
    this.modal.classList.add("open");
    setTimeout(() => this.input.focus(), 50);
    if (this.app && this.app.audio) this.app.audio.playKeyClick(850);
  }

  close() {
    this.isOpen = false;
    this.modal.classList.remove("open");
    if (this.isMatrixRunning) this.stopMatrix();
  }

  printWelcome() {
    if (this.output.innerText.trim().length === 0) {
      this.print(
        `SK-LINUX 1.0 LTS // SHELL CONSOLE [sksh v4.2]\n` +
        `Type 'help' to inspect available system commands.\n` +
        `Type 'exit' to return to graphical workspace.\n------------------------------------------------`
      );
    }
  }

  print(text, isError = false) {
    const line = document.createElement("div");
    line.className = isError ? "term-line dim-text" : "term-line";
    line.innerText = text;
    this.output.appendChild(line);
    this.output.scrollTop = this.output.scrollHeight;
  }

  execute(rawCmd) {
    // Print command line
    this.print(`sunil@sk-linux:~$ ${rawCmd}`);
    const parts = rawCmd.trim().split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (this.app && this.app.audio) this.app.audio.playMechanicalClick();

    // Check Easter Egg "sudo hire sunil"
    if (rawCmd.toLowerCase() === "sudo hire sunil") {
      this.print(
        `[!] AUTHENTICATING ROOT CREDENTIALS...\n` +
        `[✓] PASSWORD ACCEPTED: MATCH 100% IDENTIFIED.\n` +
        `==================================================\n` +
        `*** HIRING PROTOCOL INITIATED FOR SUNIL ANNES S K ***\n` +
        `ROLE: AI / Machine Learning Engineer\n` +
        `SKILLS: Python, PyTorch, Deep Learning, SQL, CV & NLP\n` +
        `STATUS: CANDIDATE QUEUED AS TOP PRIORITY.\n` +
        `-> Initiating direct transmission uplink to Sunil...\n` +
        `==================================================`
      );
      setTimeout(() => {
        this.close();
        this.app.navigateTo("transmit");
      }, 1800);
      return;
    }

    switch (cmd) {
      case "help":
        this.print(
          `AVAILABLE COMMANDS:\n` +
          `  about       - Read Sunil's biography & academic background\n` +
          `  projects    - Browse 3D AI cartridges & open source projects\n` +
          `  skills      - Inspect verified technical proficiencies\n` +
          `  contact     - Open modem transmission interface\n` +
          `  boot        - Return to boot / home screen\n` +
          `  theme       - Change phosphor tint (theme amber | green | white)\n` +
          `  transition  - Change page transition (transition crt | tape | scanline)\n` +
          `  sound       - Toggle system audio (sound on | sound off)\n` +
          `  train       - Run simulated neural model training\n` +
          `  matrix      - Trigger phosphor digital stream rain\n` +
          `  clear       - Clear console buffer\n` +
          `  exit / quit - Close console window\n` +
          `  sudo hire sunil - Special evaluation easter egg!`
        );
        break;

      case "about":
      case "whoami":
        this.print("Navigating to [WHOAMI] section...");
        this.app.navigateTo("whoami");
        this.close();
        break;

      case "projects":
      case "cartridges":
        this.print("Navigating to [CARTRIDGES] section...");
        this.app.navigateTo("cartridges");
        this.close();
        break;

      case "skills":
        this.print("FETCHING SKILL REGISTRY FROM KERNEL...");
        if (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.skills) {
          window.PORTFOLIO_DATA.skills.forEach(s => {
            const filled = Math.round(s.percentage / 10);
            const empty = 10 - filled;
            const bar = "█".repeat(filled) + "░".repeat(empty);
            this.print(`  [${bar}] ${s.name.padEnd(26)} ${s.percentage}%`);
          });
        }
        break;

      case "contact":
      case "transmit":
        this.print("Navigating to [TRANSMIT] section...");
        this.app.navigateTo("transmit");
        this.close();
        break;

      case "boot":
      case "home":
        this.print("Navigating to [BOOT] section...");
        this.app.navigateTo("boot");
        this.close();
        break;

      case "theme":
        if (args.length > 0 && ["amber", "green", "white"].includes(args[0].toLowerCase())) {
          this.app.setTheme(args[0].toLowerCase());
          this.print(`Phosphor theme switched to: ${args[0].toUpperCase()}`);
        } else {
          this.print(`Usage: theme [amber | green | white]`);
        }
        break;

      case "transition":
        if (args.length > 0 && ["crt", "tape", "scanline", "random"].includes(args[0].toLowerCase())) {
          this.app.transitions.setMode(args[0].toLowerCase());
          this.print(`Page transition mode set to: ${args[0].toUpperCase()}`);
        } else {
          this.print(`Usage: transition [crt | tape | scanline | random]`);
        }
        break;

      case "sound":
        if (args[0] === "on") {
          this.app.audio.setMute(false);
          this.print("System sound effects: ENABLED");
        } else if (args[0] === "off") {
          this.app.audio.setMute(true);
          this.print("System sound effects: MUTED");
        } else {
          this.print(`Usage: sound [on | off] (Currently: ${this.app.audio.isMuted ? 'OFF' : 'ON'})`);
        }
        break;

      case "train":
        this.runSimulatedTraining();
        break;

      case "matrix":
        this.print("Initializing Phosphor Digital Rain... Press ESC to stop.");
        this.startMatrix();
        break;

      case "clear":
      case "cls":
        this.output.innerHTML = "";
        break;

      case "exit":
      case "quit":
        this.close();
        break;

      case "date":
        this.print(new Date().toString());
        break;

      case "echo":
        this.print(args.join(" "));
        break;

      default:
        this.print(`sksh: command not found: '${cmd}'. Type 'help' for command list.`, true);
        break;
    }
  }

  runSimulatedTraining() {
    this.print("Starting Model Training Simulation [Epoch 1/5]...");
    let ep = 1;
    const interval = setInterval(() => {
      const loss = (1.8 / (ep * 1.5) + Math.random() * 0.05).toFixed(4);
      const acc = (80 + ep * 3.8 + Math.random() * 0.5).toFixed(2);
      this.print(`Epoch ${ep}/5 [=======>] loss: ${loss} - val_loss: ${(loss*1.1).toFixed(4)} - acc: ${acc}%`);
      ep++;
      if (ep > 5) {
        clearInterval(interval);
        this.print("Training complete! Model weights converged.");
      }
    }, 350);
  }

  startMatrix() {
    this.isMatrixRunning = true;
    let count = 0;
    const matrixChars = "0101010101SUNILAI2026PYTHONPYTORCH";
    this.matrixTimer = setInterval(() => {
      let line = "";
      for (let i = 0; i < 40; i++) {
        line += matrixChars[Math.floor(Math.random() * matrixChars.length)] + " ";
      }
      this.print(line);
      count++;
      if (count > 25) {
        this.stopMatrix();
      }
    }, 70);
  }

  stopMatrix() {
    clearInterval(this.matrixTimer);
    this.isMatrixRunning = false;
  }
}

window.RetroTerminal = RetroTerminal;
