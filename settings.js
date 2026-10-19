(() => {
  const root = document.documentElement;
  const trigger = document.querySelector("#settings-trigger");
  const dialog = document.querySelector("#site-settings-dialog");
  if (!trigger || !dialog) return;

  const darkModeToggle = document.querySelector("#setting-dark-mode");
  const animationsToggle = document.querySelector("#setting-animations");
  const stressButton = document.querySelector("#stress-relief-button");
  const stressMessage = document.querySelector("#stress-relief-message");
  const closeButton = dialog.querySelector(".settings-close");
  const themeColor = document.querySelector('meta[name="theme-color"]');
  const preference = (key, fallback) => {
    try {
      return localStorage.getItem(key) ?? fallback;
    } catch {
      return fallback;
    }
  };
  const savePreference = (key, value) => {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Keep the controls usable for this page even when browser storage is unavailable.
    }
  };

  let motionInitialized = false;
  function initializeScrollMotion() {
    if (motionInitialized) return;
    motionInitialized = true;
    const motionTargets = document.querySelectorAll([
      ".hero-copy", ".hero-art-wrap", ".booking-heading", ".search-card", ".results-head", ".section-topline", ".section-title-row", ".airline-card", ".destination-copy", ".route-visual", ".closing-note",
      ".journeys-hero-copy", ".journeys-hero-art", ".journeys-hero-index", ".journeys-section-heading", ".journey-destination-card", ".journeys-tiers", ".journey-tier-card", ".journey-planner", ".journey-itinerary", ".journey-booking-summary", ".journeys-closing", ".journeys-disclaimer", ".sora-tier-card",
      ".route-page-heading", ".network-map-card", ".fleet-panel", ".route-list-heading", ".route-page-tools", ".route-card", ".fleet-aircraft-type", ".footer-main", ".footer-bottom"
    ].join(","));

    motionTargets.forEach((element, index) => {
      element.dataset.motionReveal = "";
      element.style.setProperty("--motion-delay", `${Math.min(index % 5, 4) * 65}ms`);
    });

    root.classList.add("motion-ready");
    if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      motionTargets.forEach((element) => element.classList.add("is-in-view"));
      return;
    }

    const observer = new IntersectionObserver((entries, activeObserver) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in-view");
        activeObserver.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -6% 0px" });
    motionTargets.forEach((element) => observer.observe(element));
  }

  function setDarkMode(enabled) {
    if (enabled) root.dataset.theme = "dark";
    else delete root.dataset.theme;
    darkModeToggle.checked = enabled;
    if (themeColor) themeColor.content = enabled ? "#12191b" : "#f7f4ef";
  }

  function setAnimations(enabled) {
    root.classList.toggle("animations-off", !enabled);
    animationsToggle.checked = enabled;
    if (enabled) initializeScrollMotion();
    else root.querySelectorAll("[data-motion-reveal]").forEach((element) => element.classList.add("is-in-view"));
  }

  setDarkMode(preference("npg-dark-mode", "off") === "on");
  setAnimations(preference("npg-animations", "on") !== "off");

  trigger.addEventListener("click", () => {
    dialog.showModal();
    trigger.setAttribute("aria-expanded", "true");
  });
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => trigger.setAttribute("aria-expanded", "false"));
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  darkModeToggle.addEventListener("change", () => {
    setDarkMode(darkModeToggle.checked);
    savePreference("npg-dark-mode", darkModeToggle.checked ? "on" : "off");
  });
  animationsToggle.addEventListener("change", () => {
    setAnimations(animationsToggle.checked);
    savePreference("npg-animations", animationsToggle.checked ? "on" : "off");
  });

  const stressLines = [
    "Stress has been sent to lost baggage. No claim ticket needed.",
    "You pressed a button. You are doing amazing.",
    "Stress reduced by 0.0001%. We rounded up.",
    "Please unclench your jaw. This button is very wise.",
  ];
  let stressIndex = -1;
  let stressAudioContext;
  function playStressChime() {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    try {
      stressAudioContext ||= new AudioContextClass();
      if (stressAudioContext.state === "suspended") void stressAudioContext.resume();
      const startAt = stressAudioContext.currentTime + 0.02;
      [659.25, 783.99, 987.77].forEach((frequency, index) => {
        const start = startAt + index * 0.085;
        const tone = stressAudioContext.createOscillator();
        const volume = stressAudioContext.createGain();
        tone.type = "sine";
        tone.frequency.setValueAtTime(frequency, start);
        volume.gain.setValueAtTime(0.0001, start);
        volume.gain.exponentialRampToValueAtTime(0.065, start + 0.035);
        volume.gain.exponentialRampToValueAtTime(0.0001, start + 0.48);
        tone.connect(volume);
        volume.connect(stressAudioContext.destination);
        tone.start(start);
        tone.stop(start + 0.5);
      });
    } catch {
      // Keep the button useful when Web Audio is unavailable or blocked.
    }
  }
  stressButton.addEventListener("click", () => {
    stressIndex = (stressIndex + 1) % stressLines.length;
    stressMessage.textContent = stressLines[stressIndex];
    playStressChime();
  });
})();
