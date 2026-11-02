/**
 * ============================================================================
 * INSIDE THE MACHINE // THREE.JS 3D RETRO CARTRIDGES ENGINE
 * ============================================================================
 * Implements:
 * 1. Procedural 3D game cartridges with authentic retro styling & label textures
 * 2. Horizontal shelf layout with guide rails and console drive slot
 * 3. Mouse hover tilt (GSAP smooth rotation & lift)
 * 4. Click slot insertion animation with mechanical snap & 200ms screen glitch
 * 5. Project HUD details synchronization
 * 6. Quick slot switcher & touch fallback
 */

class CartridgeSystem {
  constructor(containerId, projectsData, transitionManager, audioEngine) {
    this.container = document.getElementById(containerId);
    this.projects = projectsData || [];
    this.transitions = transitionManager;
    this.audio = audioEngine;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cartridgeMeshes = [];
    this.activeSlotIndex = 0;
    this.isInserting = false;

    // Raycasting
    this.raycaster = null;
    this.mouse = null;
    this.hoveredIndex = -1;

    this.init();
  }

  init() {
    if (!this.container || typeof THREE === "undefined") {
      console.warn("Three.js or container not available, falling back to 2D slots.");
      this.init2DFallback();
      return;
    }

    this.setupThreeScene();
    this.createShelfAndDrive();
    this.createCartridges();
    this.setupEvents();
    this.animate();
    this.displayProjectHUD(0);
  }

  setupThreeScene() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 300;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x050402);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    this.camera.position.set(0, 3.2, 9.5);
    this.camera.lookAt(0, 0.4, 0);

    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // Replace canvas if exists
    const oldCanvas = document.getElementById("cartridgeCanvas");
    if (oldCanvas) {
      this.renderer.domElement.id = "cartridgeCanvas";
      this.container.replaceChild(this.renderer.domElement, oldCanvas);
    } else {
      this.renderer.domElement.id = "cartridgeCanvas";
      this.container.appendChild(this.renderer.domElement);
    }

    // Ambient & Directional Phosphor Lights
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.55);
    this.scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.9);
    dirLight.position.set(5, 10, 7);
    dirLight.castShadow = true;
    this.scene.add(dirLight);

    // Front soft amber rim light
    this.rimLight = new THREE.PointLight(0xffb000, 1.2, 18);
    this.rimLight.position.set(0, 1.5, 4);
    this.scene.add(this.rimLight);

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2(-999, -999);
  }

  // Create Shelf and Console Drive Slot
  createShelfAndDrive() {
    // Horizontal shelf base
    const shelfGeo = new THREE.BoxGeometry(14, 0.3, 4);
    const shelfMat = new THREE.MeshStandardMaterial({
      color: 0x141008,
      roughness: 0.8,
      metalness: 0.2
    });
    const shelf = new THREE.Mesh(shelfGeo, shelfMat);
    shelf.position.set(0, -0.65, 0);
    shelf.receiveShadow = true;
    this.scene.add(shelf);

    // Drive Slot / Bezel at center front
    const driveGeo = new THREE.BoxGeometry(4.2, 0.6, 2.2);
    const driveMat = new THREE.MeshStandardMaterial({
      color: 0x0c0903,
      roughness: 0.6,
      metalness: 0.4
    });
    const driveSlot = new THREE.Mesh(driveGeo, driveMat);
    driveSlot.position.set(0, -0.4, 2.2);
    driveSlot.receiveShadow = true;
    this.scene.add(driveSlot);

    // Drive Slot Opening (dark recess)
    const recessGeo = new THREE.BoxGeometry(2.6, 0.15, 1.2);
    const recessMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const recess = new THREE.Mesh(recessGeo, recessMat);
    recess.position.set(0, -0.1, 2.2);
    this.scene.add(recess);

    // LED Status Indicator on Drive
    const ledGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.08, 16);
    this.driveLedMat = new THREE.MeshBasicMaterial({ color: 0x33ff33 });
    const led = new THREE.Mesh(ledGeo, this.driveLedMat);
    led.rotation.x = Math.PI / 2;
    led.position.set(1.6, -0.25, 3.32);
    this.scene.add(led);
  }

  // Create Label Canvas Texture for each Cartridge
  createLabelTexture(project, index) {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d");

    // Background color based on project accent
    const accentColors = {
      amber: { bg: "#241800", border: "#ffb000", bar: "#ffb000", text: "#ffd269" },
      green: { bg: "#002408", border: "#33ff33", bar: "#33ff33", text: "#88ff88" },
      cyan: { bg: "#001e28", border: "#00f0ff", bar: "#00f0ff", text: "#d6faff" },
      magenta: { bg: "#28001e", border: "#ff33bb", bar: "#ff33bb", text: "#ffc2f0" }
    };
    const c = accentColors[project.accent] || accentColors.amber;

    // Fill background
    ctx.fillStyle = c.bg;
    ctx.fillRect(0, 0, 512, 512);

    // Decorative cyber grid
    ctx.strokeStyle = "rgba(255,255,255,0.08)";
    ctx.lineWidth = 2;
    for (let i = 0; i < 512; i += 32) {
      ctx.beginPath();
      ctx.moveTo(0, i); ctx.lineTo(512, i);
      ctx.moveTo(i, 0); ctx.lineTo(i, 512);
      ctx.stroke();
    }

    // Outer double border
    ctx.strokeStyle = c.border;
    ctx.lineWidth = 8;
    ctx.strokeRect(16, 16, 480, 480);
    ctx.lineWidth = 2;
    ctx.strokeRect(28, 28, 456, 456);

    // Top Header Banner
    ctx.fillStyle = c.bar;
    ctx.fillRect(32, 32, 448, 64);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 26px monospace";
    ctx.fillText(`SK-LINUX // ${project.slotNumber || 'ROM-' + (index + 1)}`, 44, 74);

    // Chip Icon / Neural Net ASCII
    ctx.fillStyle = c.border;
    ctx.fillRect(196, 120, 120, 100);
    ctx.fillStyle = "#000";
    ctx.font = "bold 48px monospace";
    ctx.textAlign = "center";
    ctx.fillText("AI", 256, 185);

    // Title
    ctx.fillStyle = c.text;
    ctx.textAlign = "center";
    ctx.font = "bold 28px monospace";
    
    // Wrap title if needed
    const words = project.title.split(" ");
    let line1 = words.slice(0, 3).join(" ");
    let line2 = words.slice(3).join(" ");
    ctx.fillText(line1, 256, 270);
    if (line2) {
      ctx.font = "22px monospace";
      ctx.fillText(line2, 256, 305);
    }

    // Subtitle / Category
    ctx.font = "18px monospace";
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    ctx.fillText(project.subtitle || "Neural Architecture", 256, 350);

    // Tech stack badges at bottom
    ctx.fillStyle = c.bar;
    ctx.fillRect(40, 400, 432, 40);
    ctx.fillStyle = "#000000";
    ctx.font = "bold 18px monospace";
    ctx.fillText(project.tech.slice(0, 3).join(" • "), 256, 426);

    // Bottom warning
    ctx.font = "12px monospace";
    ctx.fillStyle = c.text;
    ctx.fillText("HIGH-DENSITY NEURAL ROM // INSERT CAREFULLY", 256, 470);

    const texture = new THREE.CanvasTexture(canvas);
    texture.anisotropy = 4;
    return texture;
  }

  // Create 3D Cartridge Models
  createCartridges() {
    const total = this.projects.length;
    const spacing = 2.4;
    const startX = -((total - 1) * spacing) / 2;

    this.projects.forEach((proj, i) => {
      const group = new THREE.Group();

      // Main Cartridge Body (Retro Game Cartridge Shape)
      const bodyGeo = new THREE.BoxGeometry(2.1, 2.7, 0.45);
      const bodyMat = new THREE.MeshStandardMaterial({
        color: 0x1a1610,
        roughness: 0.7,
        metalness: 0.15
      });
      const body = new THREE.Mesh(bodyGeo, bodyMat);
      body.castShadow = true;
      body.receiveShadow = true;
      group.add(body);

      // Top Grip Ridges
      for (let r = 0; r < 4; r++) {
        const ridgeGeo = new THREE.BoxGeometry(1.6, 0.06, 0.08);
        const ridgeMat = new THREE.MeshStandardMaterial({ color: 0x100e0a, roughness: 0.9 });
        const ridge = new THREE.Mesh(ridgeGeo, ridgeMat);
        ridge.position.set(0, 1.05 - (r * 0.12), 0.23);
        group.add(ridge);
      }

      // Front Label Sticker
      const labelGeo = new THREE.PlaneGeometry(1.8, 1.7);
      const labelMat = new THREE.MeshBasicMaterial({
        map: this.createLabelTexture(proj, i)
      });
      const label = new THREE.Mesh(labelGeo, labelMat);
      label.position.set(0, -0.15, 0.23);
      group.add(label);

      // Bottom Gold Connector Pins
      const pinGeo = new THREE.BoxGeometry(1.7, 0.15, 0.15);
      const pinMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        metalness: 0.9,
        roughness: 0.3
      });
      const pins = new THREE.Mesh(pinGeo, pinMat);
      pins.position.set(0, -1.35, 0);
      group.add(pins);

      // Position on shelf
      const posX = startX + (i * spacing);
      group.position.set(posX, 0.8, 0);
      group.userData = {
        index: i,
        defaultX: posX,
        defaultY: 0.8,
        defaultZ: 0,
        defaultRotX: 0,
        defaultRotY: 0,
        isHovered: false
      };

      this.scene.add(group);
      this.cartridgeMeshes.push(group);
    });

    // Automatically insert the first cartridge on load
    setTimeout(() => {
      this.insertCartridge(0, false);
    }, 400);
  }

  // Mouse Raycasting & Hover Handlers
  setupEvents() {
    const dom = this.renderer.domElement;

    dom.addEventListener("mousemove", (e) => {
      const rect = dom.getBoundingClientRect();
      this.mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      this.mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      this.handleHover();
    });

    dom.addEventListener("mouseleave", () => {
      this.mouse.x = -999;
      this.mouse.y = -999;
      this.clearHover();
    });

    dom.addEventListener("click", () => {
      if (this.hoveredIndex !== -1 && !this.isInserting) {
        this.insertCartridge(this.hoveredIndex, true);
      }
    });

    window.addEventListener("resize", () => this.onResize());

    // Setup 2D Fallback Quick Slot Switcher Buttons
    this.init2DFallback();
  }

  handleHover() {
    if (this.isInserting) return;
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

    if (intersects.length > 0) {
      let hitCartridge = null;
      let curr = intersects[0].object;
      while (curr && curr.parent) {
        if (curr.userData && typeof curr.userData.index !== "undefined") {
          hitCartridge = curr;
          break;
        }
        curr = curr.parent;
      }

      if (hitCartridge) {
        const idx = hitCartridge.userData.index;
        if (this.hoveredIndex !== idx) {
          this.clearHover();
          this.hoveredIndex = idx;
          document.body.style.cursor = "pointer";

          // Hover tilt up and forward
          if (idx !== this.activeSlotIndex) {
            gsap.to(hitCartridge.position, {
              y: hitCartridge.userData.defaultY + 0.35,
              z: hitCartridge.userData.defaultZ + 0.3,
              duration: 0.25,
              ease: "power2.out"
            });
            gsap.to(hitCartridge.rotation, {
              x: -0.25,
              y: 0.1,
              duration: 0.25,
              ease: "power2.out"
            });
            if (this.audio) this.audio.playKeyClick(700);
          }
        }
        return;
      }
    }
    this.clearHover();
  }

  clearHover() {
    if (this.hoveredIndex !== -1) {
      const prev = this.cartridgeMeshes[this.hoveredIndex];
      if (prev && this.hoveredIndex !== this.activeSlotIndex) {
        gsap.to(prev.position, {
          y: prev.userData.defaultY,
          z: prev.userData.defaultZ,
          duration: 0.25,
          ease: "power2.out"
        });
        gsap.to(prev.rotation, {
          x: 0,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        });
      }
      this.hoveredIndex = -1;
      document.body.style.cursor = "default";
    }
  }

  // Insert Cartridge into Drive Slot with Animation & Sound
  insertCartridge(index, triggerGlitch = true) {
    if (index < 0 || index >= this.cartridgeMeshes.length) return;
    this.isInserting = true;

    const prevIndex = this.activeSlotIndex;
    const prevCartridge = this.cartridgeMeshes[prevIndex];
    const newCartridge = this.cartridgeMeshes[index];

    // Eject previous cartridge if it was in the slot
    if (prevCartridge && prevIndex !== index) {
      gsap.to(prevCartridge.position, {
        x: prevCartridge.userData.defaultX,
        y: prevCartridge.userData.defaultY,
        z: prevCartridge.userData.defaultZ,
        duration: 0.35,
        ease: "power2.inOut"
      });
      gsap.to(prevCartridge.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 0.35
      });
    }

    // Play mechanical sound
    if (this.audio) this.audio.playFloppyClick();

    // Slide new cartridge into the drive slot (center front)
    gsap.timeline({
      onComplete: () => {
        this.activeSlotIndex = index;
        this.isInserting = false;

        // Flash drive LED
        if (this.driveLedMat) {
          this.driveLedMat.color.setHex(0xffffff);
          setTimeout(() => {
            this.driveLedMat.color.setHex(0x33ff33);
          }, 150);
        }

        // Trigger CRT screen glitch burst
        if (triggerGlitch && this.transitions) {
          this.transitions.triggerGlitchBurst(0.2);
        }

        // Update Project HUD
        this.displayProjectHUD(index);
        this.update2DChips(index);
      }
    })
    // 1. Lift and move towards center
    .to(newCartridge.position, {
      x: 0,
      y: 1.8,
      z: 1.2,
      duration: 0.35,
      ease: "power2.out"
    })
    .to(newCartridge.rotation, {
      x: -0.15,
      y: 0,
      z: 0,
      duration: 0.25
    }, 0)
    // 2. Drop into drive slot
    .to(newCartridge.position, {
      y: 0.25,
      z: 2.2,
      duration: 0.28,
      ease: "power3.in"
    });
  }

  // Display Project HUD Details on Screen
  displayProjectHUD(index) {
    const proj = this.projects[index];
    if (!proj) return;

    const titleEl = document.getElementById("hudProjectTitle");
    const accentEl = document.getElementById("hudAccentTag");
    const descEl = document.getElementById("hudProjectDesc");
    const techEl = document.getElementById("hudTechTags");
    const metricsEl = document.getElementById("hudMetrics");
    const repoBtn = document.getElementById("hudRepoBtn");
    const demoBtn = document.getElementById("hudDemoBtn");
    const hudContainer = document.getElementById("projectHudDisplay");

    if (titleEl) titleEl.innerText = proj.title;
    if (accentEl) {
      accentEl.innerText = `${proj.slotNumber} // ${proj.accent.toUpperCase()}`;
      accentEl.style.color = proj.accentHex;
      accentEl.style.borderColor = proj.accentHex;
    }
    if (descEl) descEl.innerText = proj.description;

    if (techEl) {
      techEl.innerHTML = proj.tech
        .map(t => `<span class="tech-pill">${t}</span>`)
        .join("");
    }

    if (metricsEl) {
      metricsEl.innerHTML = `PERFORMANCE TELEMETRY: <b>${proj.metrics}</b>`;
    }

    if (repoBtn) repoBtn.href = proj.repoLink || "#";
    if (demoBtn) demoBtn.href = proj.demoLink || "#";

    if (hudContainer) {
      hudContainer.style.borderColor = proj.accentHex;
    }
  }

  // Fallback 2D Quick Slot Switcher (for Mobile & Direct Clicks)
  init2DFallback() {
    const container = document.getElementById("quickSlotBar");
    if (!container) return;

    container.innerHTML = "";
    this.projects.forEach((proj, idx) => {
      const chip = document.createElement("button");
      chip.className = `slot-chip ${idx === 0 ? 'active' : ''}`;
      chip.setAttribute("data-index", idx);
      chip.innerHTML = `<span style="color:${proj.accentHex}">■</span> [${proj.slotNumber}] ${proj.title.split(':')[0]}`;
      chip.addEventListener("click", () => {
        this.insertCartridge(idx, true);
      });
      container.appendChild(chip);
    });

    // Prev / Next Shelf Buttons
    const prevBtn = document.getElementById("shelfPrevBtn");
    const nextBtn = document.getElementById("shelfNextBtn");
    const ejectBtn = document.getElementById("shelfEjectBtn");

    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        const nextIdx = (this.activeSlotIndex - 1 + this.projects.length) % this.projects.length;
        this.insertCartridge(nextIdx, true);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        const nextIdx = (this.activeSlotIndex + 1) % this.projects.length;
        this.insertCartridge(nextIdx, true);
      });
    }

    if (ejectBtn) {
      ejectBtn.addEventListener("click", () => {
        if (this.audio) this.audio.playFloppyClick();
        if (this.transitions) this.transitions.triggerGlitchBurst(0.15);
      });
    }
  }

  update2DChips(activeIndex) {
    const chips = document.querySelectorAll(".slot-chip");
    chips.forEach((c, i) => {
      if (i === activeIndex) {
        c.classList.add("active");
      } else {
        c.classList.remove("active");
      }
    });
  }

  onResize() {
    if (!this.renderer || !this.camera || !this.container) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Subtle idle float on cartridges not in slot
    const time = Date.now() * 0.0015;
    this.cartridgeMeshes.forEach((mesh, i) => {
      if (i !== this.activeSlotIndex && i !== this.hoveredIndex) {
        mesh.position.y = mesh.userData.defaultY + Math.sin(time + i * 1.2) * 0.04;
      }
    });

    if (this.renderer && this.scene && this.camera) {
      this.renderer.render(this.scene, this.camera);
    }
  }
}

window.CartridgeSystem = CartridgeSystem;
