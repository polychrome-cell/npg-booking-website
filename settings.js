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
      ".journeys-hero-copy", ".journeys-hero-art", ".journeys-hero-index", ".journeys-section-heading", ".journey-destination-card", ".journeys-tiers", ".journey-tier-card", ".journey-planner", ".journey-itinerary", ".journey-booking-summary", ".journeys-closing", ".journeys-disclaimer",
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

  function initializeAdminAccess() {
    const adminEmail = "srianshsaprathasbehera@gmail.com";
    const section = document.createElement("section");
    section.className = "admin-access";
    section.setAttribute("aria-labelledby", "admin-access-title");
    section.innerHTML = `
      <div class="admin-access-heading">
        <span class="settings-kicker">PRIVATE AREA</span>
        <h3 id="admin-access-title">Admin access</h3>
        <p>Sign in with the verified administrator email.</p>
      </div>
      <p class="admin-access-status" id="admin-access-status" role="status" aria-live="polite"></p>
      <form class="admin-access-form" id="admin-password-login">
        <label class="admin-access-label">Administrator email
          <input type="email" value="${adminEmail}" readonly autocomplete="username" />
        </label>
        <label class="admin-access-label">Password
          <input id="admin-login-password" type="password" autocomplete="current-password" minlength="10" placeholder="Your admin password" required />
        </label>
        <div class="admin-access-actions">
          <button class="admin-access-button admin-access-button-primary" type="submit">Sign in</button>
          <button class="admin-access-button" id="admin-send-code" type="button">Email me a verification code</button>
        </div>
      </form>
      <form class="admin-access-form" id="admin-code-form" hidden>
        <label class="admin-access-label">6-digit email code
          <input id="admin-email-code" type="text" inputmode="numeric" autocomplete="one-time-code" pattern="[0-9]{6}" maxlength="6" placeholder="Enter the code from your email" required />
        </label>
        <div class="admin-access-actions">
          <button class="admin-access-button admin-access-button-primary" type="submit">Verify code</button>
          <button class="admin-access-button" id="admin-resend-code" type="button">Send another code</button>
        </div>
      </form>
      <form class="admin-access-form" id="admin-password-setup" hidden>
        <p class="admin-access-note">Email verified. Choose a password for future sign-ins. Use at least 10 characters.</p>
        <label class="admin-access-label">Create password
          <input id="admin-new-password" type="password" autocomplete="new-password" minlength="10" required />
        </label>
        <label class="admin-access-label">Confirm password
          <input id="admin-confirm-password" type="password" autocomplete="new-password" minlength="10" required />
        </label>
        <div class="admin-access-actions"><button class="admin-access-button admin-access-button-primary" type="submit">Save password</button></div>
      </form>
      <div class="admin-access-form" id="admin-signed-in" hidden>
        <p class="admin-access-note">Signed in as the verified administrator. Admin-only site controls can be added here.</p>
        <div class="admin-access-actions"><button class="admin-access-button" id="admin-sign-out" type="button">Sign out</button></div>
      </div>
      <p class="admin-access-note">Verification codes are sent by Supabase. Never share your password or code.</p>
    `;
    const stressRelief = dialog.querySelector(".stress-relief");
    dialog.insertBefore(section, stressRelief);

    const status = section.querySelector("#admin-access-status");
    const loginForm = section.querySelector("#admin-password-login");
    const codeForm = section.querySelector("#admin-code-form");
    const setupForm = section.querySelector("#admin-password-setup");
    const signedInBox = section.querySelector("#admin-signed-in");
    const passwordInput = section.querySelector("#admin-login-password");
    const codeInput = section.querySelector("#admin-email-code");
    const sendCodeButton = section.querySelector("#admin-send-code");
    let client;
    let otpVerified = false;

    const setStatus = (message, state = "") => {
      status.textContent = message;
      status.dataset.state = state;
    };
    const getClient = () => {
      if (client) return client;
      const config = window.NPG_SUPABASE_CONFIG;
      const createClient = window.supabase?.createClient;
      if (!config?.url || !config?.publishableKey || !createClient) return null;
      client = createClient(config.url, config.publishableKey, {
        auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
      });
      return client;
    };
    const setBusy = (form, busy) => {
      form.querySelectorAll("button").forEach((button) => {
        button.disabled = busy;
        if (busy) button.dataset.originalText ||= button.textContent;
        button.textContent = busy ? "Please wait…" : (button.dataset.originalText || button.textContent);
      });
    };
    const showLogin = () => {
      loginForm.hidden = false;
      codeForm.hidden = true;
      setupForm.hidden = true;
      signedInBox.hidden = true;
    };
    const showOtp = () => {
      loginForm.hidden = true;
      codeForm.hidden = false;
      setupForm.hidden = true;
      signedInBox.hidden = true;
      codeInput.focus();
    };
    const showPasswordSetup = () => {
      loginForm.hidden = true;
      codeForm.hidden = true;
      setupForm.hidden = false;
      signedInBox.hidden = true;
      section.querySelector("#admin-new-password").focus();
    };
    const showSignedIn = () => {
      loginForm.hidden = true;
      codeForm.hidden = true;
      setupForm.hidden = true;
      signedInBox.hidden = false;
    };
    const friendlyError = (error) => {
      const message = error?.message || "Supabase could not complete that request.";
      if (/invalid login credentials/i.test(message)) return "That password did not match. Try again or request a verification code.";
      if (/email not confirmed/i.test(message)) return "Verify the email address with the code we sent, then try signing in.";
      if (/hook|before user created/i.test(message)) return "Supabase blocked account creation. Check the administrator allowlist hook setup.";
      return message;
    };

    async function refreshSession() {
      const supabaseClient = getClient();
      if (!supabaseClient) {
        showLogin();
        const config = window.NPG_SUPABASE_CONFIG;
        setStatus(config?.url && config?.publishableKey
          ? "Supabase could not load. Check your connection and refresh this page."
          : "Connect Supabase by adding your Project URL and publishable key to supabase-config.js.");
        sendCodeButton.disabled = true;
        loginForm.querySelector('button[type="submit"]').disabled = true;
        return;
      }
      sendCodeButton.disabled = false;
      loginForm.querySelector('button[type="submit"]').disabled = false;
      const { data, error } = await supabaseClient.auth.getSession();
      if (error) {
        showLogin();
        setStatus(friendlyError(error), "error");
        return;
      }
      const email = data.session?.user?.email?.toLowerCase();
      if (email === adminEmail) {
        showSignedIn();
        setStatus(`Verified: ${adminEmail}`, "success");
      } else {
        showLogin();
        setStatus("Only the verified administrator account is allowed.");
      }
    }

    async function sendVerificationCode() {
      const supabaseClient = getClient();
      if (!supabaseClient) {
        await refreshSession();
        return;
      }
      setStatus("Sending a code to the approved email address…");
      sendCodeButton.disabled = true;
      try {
        const { error } = await supabaseClient.auth.signInWithOtp({
          email: adminEmail,
          options: { shouldCreateUser: true },
        });
        if (error) throw error;
        showOtp();
        setStatus(`Check ${adminEmail} for a verification code. You may need to add the address to your email provider’s allowed recipients.`);
      } catch (error) {
        setStatus(friendlyError(error), "error");
      } finally {
        sendCodeButton.disabled = false;
      }
    }

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const supabaseClient = getClient();
      if (!supabaseClient) return refreshSession();
      setBusy(loginForm, true);
      setStatus("Signing in…");
      try {
        const { data, error } = await supabaseClient.auth.signInWithPassword({ email: adminEmail, password: passwordInput.value });
        if (error) throw error;
        if (data.user?.email?.toLowerCase() !== adminEmail) throw new Error("This account is not approved for admin access.");
        passwordInput.value = "";
        showSignedIn();
        setStatus(`Verified: ${adminEmail}`, "success");
      } catch (error) {
        setStatus(friendlyError(error), "error");
      } finally {
        setBusy(loginForm, false);
      }
    });

    sendCodeButton.addEventListener("click", sendVerificationCode);
    section.querySelector("#admin-resend-code").addEventListener("click", sendVerificationCode);
    codeForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const supabaseClient = getClient();
      if (!supabaseClient) return refreshSession();
      setBusy(codeForm, true);
      setStatus("Checking the verification code…");
      try {
        const { data, error } = await supabaseClient.auth.verifyOtp({ email: adminEmail, token: codeInput.value.trim(), type: "email" });
        if (error) throw error;
        if (data.user?.email?.toLowerCase() !== adminEmail) throw new Error("That email is not approved for admin access.");
        otpVerified = true;
        codeInput.value = "";
        showPasswordSetup();
        setStatus(`Email verified: ${adminEmail}`, "success");
      } catch (error) {
        setStatus(friendlyError(error), "error");
      } finally {
        setBusy(codeForm, false);
      }
    });

    setupForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (!otpVerified) {
        setStatus("Verify the email code before choosing a password.", "error");
        return;
      }
      const newPassword = section.querySelector("#admin-new-password").value;
      const confirmation = section.querySelector("#admin-confirm-password").value;
      if (newPassword.length < 10) {
        setStatus("Choose a password with at least 10 characters.", "error");
        return;
      }
      if (newPassword !== confirmation) {
        setStatus("Those passwords do not match.", "error");
        return;
      }
      const supabaseClient = getClient();
      setBusy(setupForm, true);
      setStatus("Saving your password…");
      try {
        const { data, error } = await supabaseClient.auth.updateUser({ password: newPassword });
        if (error) throw error;
        if (data.user?.email?.toLowerCase() !== adminEmail) throw new Error("The verified admin session could not be confirmed.");
        section.querySelector("#admin-new-password").value = "";
        section.querySelector("#admin-confirm-password").value = "";
        otpVerified = false;
        showSignedIn();
        setStatus("Password saved. You’re signed in as the administrator.", "success");
      } catch (error) {
        setStatus(friendlyError(error), "error");
      } finally {
        setBusy(setupForm, false);
      }
    });

    section.querySelector("#admin-sign-out").addEventListener("click", async () => {
      const supabaseClient = getClient();
      if (!supabaseClient) return;
      const { error } = await supabaseClient.auth.signOut();
      if (error) setStatus(friendlyError(error), "error");
      else {
        otpVerified = false;
        showLogin();
        setStatus("You are signed out.");
      }
    });

    void refreshSession();
  }

  initializeAdminAccess();

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
