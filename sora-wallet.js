(() => {
  // Clear legacy browser-only Sora progress once when the account-enabled release
  // is first opened from a hosted site. Keep this out of file:// previews.
  const RELEASE_RESET_KEY = "npg-sora-release-reset";
  const RELEASE_RESET_VERSION = "account-rollout-2026-10";
  try {
    if (/^https?:$/.test(window.location.protocol) && window.localStorage.getItem(RELEASE_RESET_KEY) !== RELEASE_RESET_VERSION) {
      window.localStorage.removeItem("npg-sora-demo-profiles-v1");
      window.localStorage.removeItem("npg-sora-demo-wallet-v1");
      window.localStorage.setItem(RELEASE_RESET_KEY, RELEASE_RESET_VERSION);
    }
  } catch {
    // Storage may be unavailable; continue without blocking the Sora page.
  }
  const STORAGE_KEY = "npg-sora-demo-profiles-v1";
  const LEGACY_WALLET_KEY = "npg-sora-demo-wallet-v1";
  const POINTS_PER_DOLLAR = 100;
  const allowedTiers = { access: { name: "Sora Access", price: 20 }, plus: { name: "Sora Plus", price: 35 } };
  const statusPointTiers = { gold: { name: "Sora Gold", points: 10000, rank: 1 }, platinum: { name: "Sora Platinum", points: 100000, rank: 2 } };
  const cabinKeys = ["economy", "premium", "silver", "gold"];
  const cabinEarnRates = { economy: 0.35, premium: 0.51, silver: 0.75, gold: 1 };
  const annualBonusPerFlight = 0.05;
  const maxAnnualBonus = 0.5;
  let storageAvailable = true;
  let db = readDatabase();
  let pendingAction = null;
  let authUser = null;
  let infiniteApplicationStatus = "SignedOut";

  function emptyWallet() {
    return { balance: 0, activity: [] };
  }

  function readLegacyWallet() {
    try {
      const legacy = JSON.parse(window.localStorage.getItem(LEGACY_WALLET_KEY) || "null");
      return {
        balance: Number.isFinite(legacy?.balance) && legacy.balance > 0 ? Math.floor(legacy.balance) : 0,
        activity: Array.isArray(legacy?.activity) ? legacy.activity.slice(0, 12).map((entry) => ({ ...entry, delta: Number(entry.delta ?? entry.points ?? 0) })) : [],
      };
    } catch {
      storageAvailable = false;
      return emptyWallet();
    }
  }

  function readDatabase() {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          profiles: Array.isArray(parsed.profiles) ? parsed.profiles.filter((profile) => profile && typeof profile.id === "string" && typeof profile.email === "string").map((profile) => ({
            ...profile,
            balance: Number.isFinite(profile.balance) && profile.balance > 0 ? Math.floor(profile.balance) : 0,
            activity: Array.isArray(profile.activity) ? profile.activity : [],
            lifetimePoints: Number.isFinite(profile.lifetimePoints) ? Math.max(0, Math.floor(profile.lifetimePoints)) : Math.max(
              0,
              Math.floor(profile.balance || 0),
              Array.isArray(profile.activity) ? profile.activity.reduce((sum, entry) => sum + Math.max(0, Number(entry.delta ?? entry.points) || 0), 0) : 0,
            ),
            loyaltyYear: Number.isInteger(profile.loyaltyYear) ? profile.loyaltyYear : new Date().getFullYear(),
            cabinBookingsYear: profile.cabinBookingsYear && typeof profile.cabinBookingsYear === "object" ? profile.cabinBookingsYear : {},
            purchasedStatusTier: ["gold", "platinum"].includes(profile.purchasedStatusTier) ? profile.purchasedStatusTier : null,
          })) : [],
          activeProfileId: typeof parsed.activeProfileId === "string" ? parsed.activeProfileId : null,
          guest: parsed.guest && Number.isFinite(parsed.guest.balance) ? parsed.guest : emptyWallet(),
        };
      }
    } catch {
      storageAvailable = false;
    }
    return { profiles: [], activeProfileId: null, guest: readLegacyWallet() };
  }

  function saveDatabase() {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
      storageAvailable = true;
      return true;
    } catch {
      storageAvailable = false;
      return false;
    }
  }

  function refreshDatabase() {
    if (!storageAvailable) return;
    const previous = db;
    const latest = readDatabase();
    db = storageAvailable ? latest : previous;
  }

  function randomHex(byteCount = 16) {
    try {
      const bytes = new Uint8Array(byteCount);
      window.crypto.getRandomValues(bytes);
      return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
    } catch {
      return `${Date.now().toString(16)}${Math.random().toString(16).slice(2)}`;
    }
  }

  async function passwordDigest(password, salt) {
    const input = `${salt}:${password}`;
    if (window.crypto?.subtle && window.TextEncoder) {
      const bytes = new TextEncoder().encode(input);
      const digest = await window.crypto.subtle.digest("SHA-256", bytes);
      return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
    }
    // A low-stakes fallback for local pages where Web Crypto may be unavailable.
    let hash = 2166136261;
    for (let index = 0; index < input.length; index += 1) {
      hash ^= input.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }
    return `local-${(hash >>> 0).toString(16)}`;
  }

  function activeProfileRecord() {
    if (!authUser?.email) return null;
    const profile = db.profiles.find((item) => item.id === db.activeProfileId) || null;
    return profile && profile.email.toLowerCase() === authUser.email.toLowerCase() ? profile : null;
  }

  function publicProfile(profile) {
    if (!profile) return null;
    ensureAnnualBookings(profile);
    const earnedRank = profile.lifetimePoints >= 100000 ? 2 : profile.lifetimePoints >= 10000 ? 1 : 0;
    const redeemedRank = statusPointTiers[profile.purchasedStatusTier]?.rank || 0;
    const statusRank = Math.max(earnedRank, redeemedRank);
    const isApprovedInfinite = Boolean(
      authUser?.email
      && authUser.email.toLowerCase() === profile.email.toLowerCase()
      && infiniteApplicationStatus === "Approved"
    );
    const status = isApprovedInfinite ? "Infinite" : statusRank >= 2 ? "Platinum" : statusRank === 1 ? "Gold" : "Member";
    return {
      id: profile.id,
      name: profile.name,
      email: profile.email,
      tier: profile.tier || null,
      status,
      lifetimePoints: profile.lifetimePoints || 0,
      cabinBookingsYear: { ...(profile.cabinBookingsYear || {}) },
      infiniteInterestRequestedAt: profile.infiniteInterestRequestedAt || null,
      infiniteInterestSubmittedAt: profile.infiniteInterestSubmittedAt || null,
    };
  }

  function normalizeCabinKey(cabin) {
    const value = String(cabin || "").toLowerCase();
    if (value.includes("premium")) return "premium";
    if (value.includes("silver") || value.includes("business")) return "silver";
    if (value.includes("gold") || value.includes("first")) return "gold";
    return "economy";
  }

  function ensureAnnualBookings(profile) {
    const year = new Date().getFullYear();
    if (profile.loyaltyYear !== year) {
      profile.loyaltyYear = year;
      profile.cabinBookingsYear = {};
    }
    if (!profile.cabinBookingsYear || typeof profile.cabinBookingsYear !== "object") profile.cabinBookingsYear = {};
    cabinKeys.forEach((key) => {
      if (!Number.isFinite(profile.cabinBookingsYear[key]) || profile.cabinBookingsYear[key] < 0) profile.cabinBookingsYear[key] = 0;
      profile.cabinBookingsYear[key] = Math.floor(profile.cabinBookingsYear[key]);
    });
  }

  function getActiveProfile() {
    return publicProfile(activeProfileRecord());
  }

  function getWallet() {
    const profile = activeProfileRecord();
    const wallet = profile || db.guest || emptyWallet();
    return {
      balance: Number.isFinite(wallet.balance) && wallet.balance > 0 ? Math.floor(wallet.balance) : 0,
      activity: Array.isArray(wallet.activity) ? wallet.activity.slice(0, 12) : [],
      profile: publicProfile(profile),
      storageAvailable,
    };
  }

  function listProfiles() {
    return db.profiles.map(publicProfile);
  }

  async function createProfile({ name, email, password } = {}) {
    const cleanName = String(name || "").trim().slice(0, 40);
    const cleanEmail = String(email || "").trim().toLowerCase();
    if (!cleanName) return { ok: false, message: "Enter your name." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(cleanEmail)) return { ok: false, message: "Enter a valid email address." };
    if (String(password || "").length < 8) return { ok: false, message: "Use a password with at least 8 characters." };
    if (!window.NPGSoraAuth?.signUp) return { ok: false, message: "Account sign-in is not connected yet." };
    const result = await window.NPGSoraAuth.signUp({ name: cleanName, email: cleanEmail, password });
    if (!result.ok || result.needsEmailConfirmation) return result;
    const profile = await adoptAuthenticatedUser(result.user);
    return { ok: true, profile, saved: true };
  }

  async function signIn({ email, password } = {}) {
    if (!window.NPGSoraAuth?.signIn) return { ok: false, message: "Account sign-in is not connected yet." };
    const result = await window.NPGSoraAuth.signIn({ email, password });
    if (!result.ok) return result;
    const profile = await adoptAuthenticatedUser(result.user);
    return { ok: true, profile, saved: true };
  }

  async function signOut() {
    if (!window.NPGSoraAuth?.signOut) return { ok: false, message: "Account sign-in is not connected yet." };
    const result = await window.NPGSoraAuth.signOut();
    if (!result.ok) return result;
    clearAuthenticatedUser();
    return { ok: true };
  }

  function ensureLocalProfile(user) {
    const email = String(user?.email || "").trim().toLowerCase();
    if (!email || !user?.id || !user.email_confirmed_at) return null;
    refreshDatabase();
    let profile = db.profiles.find((item) => item.email.toLowerCase() === email);
    if (profile) {
      profile.authUserId = user.id;
      if (!profile.name && user.user_metadata?.full_name) profile.name = String(user.user_metadata.full_name).slice(0, 40);
    } else {
      const name = String(user.user_metadata?.full_name || email.split("@")[0] || "Sora member").slice(0, 40);
      profile = {
        id: user.id,
        authUserId: user.id,
        name,
        email,
        balance: db.profiles.length === 0 ? db.guest.balance : 0,
        activity: db.profiles.length === 0 ? db.guest.activity : [],
        lifetimePoints: db.profiles.length === 0 ? Math.max(db.guest.balance, db.guest.activity.reduce((sum, entry) => sum + Math.max(0, Number(entry.delta) || 0), 0)) : 0,
        loyaltyYear: new Date().getFullYear(),
        cabinBookingsYear: Object.fromEntries(cabinKeys.map((key) => [key, 0])),
        tier: null,
        tierActivatedAt: null,
        purchasedStatusTier: null,
        infiniteInterestRequestedAt: null,
      };
      db.profiles.push(profile);
      if (db.profiles.length === 1) db.guest = emptyWallet();
    }
    db.activeProfileId = profile.id;
    saveDatabase();
    return profile;
  }

  function clearAuthenticatedUser() {
    authUser = null;
    infiniteApplicationStatus = "SignedOut";
    db.activeProfileId = null;
    saveDatabase();
    notifyChange();
  }

  async function refreshInfiniteApplicationStatus() {
    const userId = authUser?.id;
    if (!userId || !window.NPGSoraAuth?.getInfiniteStatus) return;
    const decision = await window.NPGSoraAuth.getInfiniteStatus();
    if (authUser?.id !== userId) return;
    infiniteApplicationStatus = decision.ok ? decision.status : "Unavailable";
    notifyChange();
  }

  async function adoptAuthenticatedUser(user) {
    if (!user?.email_confirmed_at) return null;
    authUser = user;
    infiniteApplicationStatus = "Checking";
    const profile = ensureLocalProfile(user);
    if (!profile) {
      clearAuthenticatedUser();
      return null;
    }
    await refreshInfiniteApplicationStatus();
    return publicProfile(profile);
  }

  async function restoreAuthentication() {
    if (!window.NPGSoraAuth?.configured) {
      infiniteApplicationStatus = "Unavailable";
      notifyChange();
      return;
    }
    window.NPGSoraAuth.onAuthStateChange((event, user) => {
      if (event === "SIGNED_OUT" || !user) {
        clearAuthenticatedUser();
        return;
      }
      void adoptAuthenticatedUser(user);
    });
    const current = await window.NPGSoraAuth.getVerifiedUser();
    if (current.user) await adoptAuthenticatedUser(current.user);
    else {
      authUser = null;
      infiniteApplicationStatus = "SignedOut";
      notifyChange();
    }
  }

  function activateTier(tier) {
    const plan = allowedTiers[tier];
    const profile = activeProfileRecord();
    if (!plan || !profile) return { ok: false, message: "Create an account or sign in first." };
    if (profile.tier === tier) return { ok: true, alreadyActive: true, plan };
    profile.tier = tier;
    profile.tierActivatedAt = new Date().toISOString();
    const saved = saveDatabase();
    notifyChange();
    return { ok: true, plan, saved };
  }

  function purchaseStatusTier(tier) {
    const offer = statusPointTiers[tier];
    const profile = activeProfileRecord();
    if (!offer || !profile) return { ok: false, message: "Create an account or sign in first." };
    const currentStatus = publicProfile(profile).status;
    const currentRank = currentStatus === "Infinite" ? 3 : currentStatus === "Platinum" ? 2 : currentStatus === "Gold" ? 1 : 0;
    if (currentRank >= offer.rank) return { ok: true, alreadyActive: true, offer };
    if (profile.balance < offer.points) {
      return { ok: false, message: `You need ${(offer.points - profile.balance).toLocaleString("en-US")} more Sora Points to redeem ${offer.name}.` };
    }
    profile.balance -= offer.points;
    profile.purchasedStatusTier = tier;
    profile.activity.unshift({ delta: -offer.points, type: "redeemed", description: `${offer.name} status`, date: new Date().toISOString() });
    profile.activity = profile.activity.slice(0, 30);
    const saved = saveDatabase();
    notifyChange();
    return { ok: true, offer, balance: profile.balance, saved };
  }

  async function requestInfiniteInterest({ name, email, consent } = {}) {
    const profile = activeProfileRecord();
    if (!profile || !authUser?.email) return { ok: false, message: "Create an account or sign in with a verified email first." };
    if (infiniteApplicationStatus === "Approved") return { ok: false, message: "Sora Infinite is already active on this account." };
    if (String(email || "").trim().toLowerCase() !== authUser.email.toLowerCase()) return { ok: false, message: "Use the verified email address on your signed-in Sora account." };
    const status = publicProfile(profile).status;
    if (status !== "Gold" && status !== "Platinum") return { ok: false, message: "Sora Infinite consideration is for Gold or Platinum members. Earn 10,000 lifetime Sora Points to reach Gold." };
    if (profile.infiniteInterestSubmittedAt) return { ok: true, alreadyRequested: true };
    if (!window.NPGInfiniteSignups?.submitInfiniteInterest) return { ok: false, message: "The online interest list is not connected yet. Please try again later." };
    const submission = await window.NPGInfiniteSignups.submitInfiniteInterest({
      name,
      email,
      status,
      lifetimePoints: profile.lifetimePoints,
      consent,
    });
    if (!submission.ok) return submission;
    profile.infiniteInterestSubmittedAt = new Date().toISOString();
    profile.infiniteInterestRequestedAt = profile.infiniteInterestRequestedAt || profile.infiniteInterestSubmittedAt;
    const decision = await window.NPGSoraAuth.getInfiniteStatus();
    if (decision.ok) infiniteApplicationStatus = decision.status;
    const saved = saveDatabase();
    notifyChange();
    return { ok: true, saved, alreadyOnList: submission.alreadyOnList };
  }

  function completeBooking({ fareAmount, pointsUsed = 0, cabin, airline, from, to, reference, seatSegments = [] } = {}) {
    refreshDatabase();
    const profile = activeProfileRecord();
    if (!profile) return { ok: false, message: "Sign in before adding this flight to your profile." };
    const fare = Number(fareAmount);
    const redeem = Math.floor(Number(pointsUsed) || 0);
    if (!Number.isFinite(fare) || fare < 0 || redeem < 0 || redeem % POINTS_PER_DOLLAR !== 0) {
      return { ok: false, message: "Check the fare and points amount, then try again." };
    }
    if (redeem > profile.balance || redeem / POINTS_PER_DOLLAR > fare) {
      return { ok: false, message: "Your profile does not have enough points for that redemption. Return to payment to adjust it." };
    }
    if (reference && profile.activity.some((entry) => entry.reference === reference)) {
      return { ok: false, message: "This itinerary has already been added to your profile." };
    }
    const description = from && to ? `${from} → ${to}` : "Flight booking";
    const discount = redeem / POINTS_PER_DOLLAR;
    const eligibleFare = Math.max(0, Math.floor(fare - discount));
    ensureAnnualBookings(profile);
    const cabinKey = normalizeCabinKey(cabin);
    const flightCountBefore = profile.cabinBookingsYear[cabinKey] || 0;
    const loyaltyMultiplier = 1 + Math.min(maxAnnualBonus, flightCountBefore * annualBonusPerFlight);
    const subscriptionMultiplier = profile.tier === "plus" ? 1.25 : 1;
    const segmentCount = Math.max(1, Array.isArray(seatSegments) && seatSegments.length ? seatSegments.length : 1);
    const cabinEarnRate = cabinEarnRates[cabinKey];
    const earned = Math.floor(eligibleFare * cabinEarnRate * loyaltyMultiplier * subscriptionMultiplier);
    profile.balance -= redeem;
    profile.cabinBookingsYear[cabinKey] += segmentCount;
    profile.lifetimePoints = (profile.lifetimePoints || 0) + earned;
    if (redeem) profile.activity.unshift({ delta: -redeem, type: "redeemed", description, airline, cabin, reference, seatSegments, date: new Date().toISOString() });
    if (earned) {
      profile.balance += earned;
      profile.activity.unshift({ delta: earned, type: "flight", description, airline, cabin, reference, loyaltyMultiplier, subscriptionMultiplier, date: new Date().toISOString() });
    }
    profile.activity = profile.activity.slice(0, 30);
    const saved = saveDatabase();
    notifyChange();
    return { ok: true, fare, pointsUsed: redeem, discount, amountDue: Math.max(0, fare - discount), pointsEarned: earned, balance: profile.balance, lifetimePoints: profile.lifetimePoints, cabinEarnRate, loyaltyMultiplier, subscriptionMultiplier, cabinBookingsThisYear: profile.cabinBookingsYear[cabinKey], status: publicProfile(profile).status, saved };
  }

  function notifyChange() {
    window.dispatchEvent(new CustomEvent("sora-profile-updated"));
  }

  function renderSoraWallet() {
    const balanceOutput = document.querySelector("#sora-wallet-balance");
    const activityList = document.querySelector("#sora-wallet-activity");
    const emptyMessage = document.querySelector("#sora-wallet-empty");
    const disclaimer = document.querySelector(".sora-wallet-disclaimer");
    const accountSummary = document.querySelector("#sora-account-summary");
    const wallet = getWallet();
    const profile = wallet.profile;
    if (balanceOutput) balanceOutput.textContent = wallet.balance.toLocaleString("en-US");
    if (accountSummary) accountSummary.textContent = profile
      ? `Verified account · ${profile.name} (${profile.email}) · ${profile.status} · ${profile.lifetimePoints.toLocaleString("en-US")} lifetime points${profile.tier ? ` · ${allowedTiers[profile.tier]?.name || profile.tier}` : ""}`
      : "Create an account or sign in to keep your Sora profile on this device.";
    const loyaltyOutput = document.querySelector("#sora-wallet-loyalty");
    if (loyaltyOutput) {
      if (!profile) loyaltyOutput.textContent = "Each cabin has its own yearly flight count and bonus. Sign in to track them.";
      else {
        const counts = profile.cabinBookingsYear || {};
        const currentYear = new Date().getFullYear();
        loyaltyOutput.textContent = `${currentYear} cabin loyalty · ${[
          ["Economy", "economy"], ["Premium Economy", "premium"], ["Business", "silver"], ["First Class", "gold"],
        ].map(([label, key]) => {
          const count = Number(counts[key]) || 0;
          const nextBonus = Math.round(Math.min(maxAnnualBonus, count * annualBonusPerFlight) * 100);
          return `${label}: ${count} flights · next +${nextBonus}%`;
        }).join(" · ")}. The bonus resets each calendar year.`;
      }
    }
    if (activityList) {
      activityList.replaceChildren();
      const entries = wallet.activity.slice(0, 5);
      if (emptyMessage) emptyMessage.hidden = entries.length > 0;
      entries.forEach((entry) => {
        const item = document.createElement("li");
        const summary = document.createElement("span");
        const label = document.createElement("strong");
        const details = document.createElement("small");
        const points = document.createElement("b");
        const delta = Number(entry.delta ?? entry.points ?? 0);
        const date = entry.date ? new Date(entry.date) : null;
        label.textContent = entry.type === "redeemed" || delta < 0 ? `Used on ${entry.description || "reward"}` : entry.description || "Flight booking";
        details.textContent = [entry.airline, entry.cabin, date && !Number.isNaN(date.valueOf()) ? date.toLocaleDateString() : ""].filter(Boolean).join(" · ");
        points.textContent = `${delta < 0 ? "−" : "+"}${Math.abs(delta).toLocaleString("en-US")}`;
        if (delta < 0) points.classList.add("is-debit");
        summary.append(label, details);
        item.append(summary, points);
        activityList.append(item);
      });
    }
    if (disclaimer) {
      disclaimer.textContent = storageAvailable
        ? "Your account uses verified email sign-in. Points and flight activity are stored in this browser and do not sync to other devices."
        : "Browser storage is unavailable. Profile and points changes may not persist after this page is closed.";
    }
    const currentCopy = document.querySelector("#sora-profile-current-copy");
    const continueButton = document.querySelector("#sora-profile-continue");
    const currentBox = document.querySelector("#sora-profile-current");
    if (currentCopy && profile) currentCopy.textContent = `Signed in as ${profile.name} (${profile.email}). Account status: ${profile.status}${infiniteApplicationStatus === "Pending" ? " · Infinite application pending" : ""}.`;
    if (continueButton) continueButton.textContent = pendingAction ? "Continue" : "Keep using this profile";
    if (currentBox) currentBox.hidden = !profile;
    document.querySelectorAll("[data-sora-tier-purchase]").forEach((button) => {
      const tier = button.dataset.soraTierPurchase;
      button.textContent = profile?.tier === tier ? "Active on this profile" : tier === "access" ? "Purchase · $20/month" : "Purchase · $35/month";
      button.disabled = profile?.tier === tier;
    });
    document.querySelectorAll("[data-sora-status-purchase]").forEach((button) => {
      const tier = button.dataset.soraStatusPurchase;
      const offer = statusPointTiers[tier];
      const rank = profile?.status === "Infinite" ? 3 : profile?.status === "Platinum" ? 2 : profile?.status === "Gold" ? 1 : 0;
      if (!profile) {
        button.textContent = `Sign in to buy · ${offer.points.toLocaleString("en-US")} points`;
        button.disabled = false;
      } else if (rank >= offer.rank) {
        button.textContent = `${offer.name} active`;
        button.disabled = true;
      } else if (wallet.balance >= offer.points) {
        button.textContent = `Buy · ${offer.points.toLocaleString("en-US")} points`;
        button.disabled = false;
      } else {
        button.textContent = `Earn ${(offer.points - wallet.balance).toLocaleString("en-US")} more points`;
        button.disabled = true;
      }
    });
    const infiniteButton = document.querySelector("[data-sora-infinite-interest]");
    const infiniteEligibility = document.querySelector("#sora-infinite-eligibility");
    if (infiniteButton && infiniteApplicationStatus === "Approved") {
      infiniteButton.textContent = "Sora Infinite active";
      infiniteButton.disabled = true;
      if (infiniteEligibility) infiniteEligibility.textContent = "Your application is approved. Sora Infinite is active on this verified account.";
    } else if (infiniteButton && infiniteApplicationStatus === "Pending") {
      infiniteButton.textContent = "Application pending";
      infiniteButton.disabled = true;
      if (infiniteEligibility) infiniteEligibility.textContent = "NPG has received your application and is reviewing it.";
    } else if (infiniteButton && infiniteApplicationStatus === "Declined") {
      infiniteButton.textContent = "Application reviewed";
      infiniteButton.disabled = true;
      if (infiniteEligibility) infiniteEligibility.textContent = "Your application has been reviewed. Contact NPG if you have questions.";
    } else if (infiniteButton && infiniteApplicationStatus === "Unavailable") {
      infiniteButton.textContent = "Status check unavailable";
      infiniteButton.disabled = true;
      if (infiniteEligibility) infiniteEligibility.textContent = "The Sora account database update is needed before status can be checked.";
    } else if (infiniteButton && !authUser) {
      const listConnected = window.NPGInfiniteSignups?.isConfigured() === true;
      infiniteButton.textContent = "Sign in to check eligibility";
      infiniteButton.disabled = !listConnected;
      if (infiniteEligibility) infiniteEligibility.textContent = "Create or sign in to a verified Sora account to apply and check your decision.";
    } else if (infiniteButton && profile && profile.status !== "Gold" && profile.status !== "Platinum") {
      infiniteButton.textContent = "Reach Sora Gold to be eligible";
      infiniteButton.disabled = true;
      if (infiniteEligibility) infiniteEligibility.textContent = `${profile.lifetimePoints.toLocaleString("en-US")} lifetime points · Gold starts at 10,000.`;
    } else if (infiniteButton) {
      const listConnected = window.NPGInfiniteSignups?.isConfigured() === true;
      infiniteButton.textContent = listConnected ? "Sign up for consideration" : "Registration opening soon";
      infiniteButton.disabled = !listConnected;
      if (infiniteEligibility) infiniteEligibility.textContent = listConnected
        ? `${profile?.status || "Gold or Platinum"} status · applications use your verified account email.`
        : "Interest registration is not connected yet.";
    }
  }

  function showProfileDialog(action = null) {
    const dialog = document.querySelector("#sora-account-dialog");
    if (!dialog) return;
    pendingAction = action;
    const status = document.querySelector("#sora-profile-message");
    if (status) status.textContent = "";
    const active = getActiveProfile();
    const currentBox = document.querySelector("#sora-profile-current");
    if (currentBox) currentBox.hidden = !active;
    document.querySelector("#sora-profile-forms")?.classList.toggle("is-open", !active);
    if (!dialog.open) dialog.showModal();
  }

  function runPendingAction() {
    const action = pendingAction;
    pendingAction = null;
    const profileDialog = document.querySelector("#sora-account-dialog");
    if (profileDialog?.open) profileDialog.close();
    renderSoraWallet();
    if (!action) return;
    const dialog = document.querySelector("#sora-action-dialog");
    const title = document.querySelector("#sora-action-title");
    const copy = document.querySelector("#sora-action-copy");
    const confirm = document.querySelector("#sora-action-confirm");
    const infiniteFields = document.querySelector("#sora-infinite-fields");
    if (infiniteFields) infiniteFields.hidden = true;
    confirm.disabled = false;
    if (action.type === "tier") {
      const plan = allowedTiers[action.tier];
      title.textContent = `Purchase ${plan.name}?`;
      copy.textContent = `${plan.name} is listed at $${plan.price}/month. This page records your selection in this browser; it does not process payment.`;
      confirm.textContent = `Activate ${plan.name}`;
      confirm.dataset.action = `tier:${action.tier}`;
    } else if (action.type === "status") {
      const offer = statusPointTiers[action.tier];
      title.textContent = `Buy ${offer.name} with points?`;
      copy.textContent = `${offer.points.toLocaleString("en-US")} Sora Points will be deducted from your available balance. Your status selection will be saved to this browser profile.`;
      confirm.textContent = `Buy with ${offer.points.toLocaleString("en-US")} points`;
      confirm.dataset.action = `status:${action.tier}`;
    } else {
      const profile = getActiveProfile();
      title.textContent = "Sora Infinite invitation interest";
      if (!authUser) {
        copy.textContent = "Sign in with a verified Sora account to apply. If NPG approves your application, Infinite status will appear on this account.";
        confirm.textContent = "Sign in required";
        confirm.disabled = true;
        confirm.dataset.action = "";
      } else if (infiniteApplicationStatus === "Approved") {
        copy.textContent = "Sora Infinite is already active on this verified account.";
        confirm.textContent = "Infinite active";
        confirm.disabled = true;
        confirm.dataset.action = "";
      } else if (profile && profile.status !== "Gold" && profile.status !== "Platinum") {
        copy.textContent = `This profile has ${profile.lifetimePoints.toLocaleString("en-US")} lifetime points and is currently ${profile.status}. Reach 10,000 lifetime points for Gold before signing up for consideration.`;
        confirm.textContent = "Gold or Platinum required";
        confirm.disabled = true;
        confirm.dataset.action = "";
      } else {
        copy.textContent = "Submit your details using the verified email on your account. NPG reviews the application; approval activates Infinite on this account.";
        confirm.textContent = "Sign up for consideration";
        confirm.dataset.action = "infinite";
        if (infiniteFields) infiniteFields.hidden = false;
        const nameInput = document.querySelector("#sora-infinite-name");
        if (nameInput && !nameInput.value) nameInput.value = profile?.name || "";
        const emailInput = document.querySelector("#sora-infinite-email");
        if (emailInput) emailInput.value = authUser.email || "";
      }
    }
    const actionStatus = document.querySelector("#sora-action-message");
    if (actionStatus) actionStatus.textContent = "";
    if (dialog && !dialog.open) dialog.showModal();
  }

  function wireSoraControls() {
    const profileDialog = document.querySelector("#sora-account-dialog");
    if (!profileDialog) return;
    document.querySelector("#sora-account-manage")?.addEventListener("click", () => showProfileDialog());
    document.querySelector("#sora-profile-continue")?.addEventListener("click", runPendingAction);
    document.querySelector("#sora-profile-more")?.addEventListener("click", async () => {
      const result = await signOut();
      if (!result.ok) {
        const status = document.querySelector("#sora-profile-message");
        if (status) status.textContent = result.message;
        return;
      }
      document.querySelector("#sora-profile-forms")?.classList.add("is-open");
      document.querySelector("#sora-profile-create")?.toggleAttribute("hidden", false);
      document.querySelector("#sora-profile-signin")?.toggleAttribute("hidden", true);
      document.querySelectorAll("[data-sora-profile-mode]").forEach((item) => item.setAttribute("aria-pressed", String(item.dataset.soraProfileMode === "create")));
      const status = document.querySelector("#sora-profile-message");
      if (status) status.textContent = "Signed out. Sign in to another account or create a new one.";
    });
    document.querySelectorAll("[data-sora-profile-mode]").forEach((button) => button.addEventListener("click", () => {
      document.querySelector("#sora-profile-forms")?.classList.add("is-open");
      document.querySelectorAll("[data-sora-profile-mode]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      const create = button.dataset.soraProfileMode === "create";
      document.querySelector("#sora-profile-create")?.toggleAttribute("hidden", !create);
      document.querySelector("#sora-profile-signin")?.toggleAttribute("hidden", create);
      document.querySelector("#sora-profile-message").textContent = "";
    }));
    document.querySelectorAll("[data-sora-tier-purchase]").forEach((button) => button.addEventListener("click", () => {
      const action = { type: "tier", tier: button.dataset.soraTierPurchase };
      if (getActiveProfile()) { pendingAction = action; runPendingAction(); }
      else showProfileDialog(action);
    }));
    document.querySelectorAll("[data-sora-status-purchase]").forEach((button) => button.addEventListener("click", () => {
      const action = { type: "status", tier: button.dataset.soraStatusPurchase };
      if (getActiveProfile()) { pendingAction = action; runPendingAction(); }
      else showProfileDialog(action);
    }));
    document.querySelector("[data-sora-infinite-interest]")?.addEventListener("click", () => {
      const action = { type: "infinite" };
      if (getActiveProfile()) { pendingAction = action; runPendingAction(); }
      else showProfileDialog(action);
    });
    document.querySelector("#sora-action-confirm")?.addEventListener("click", async (event) => {
      const confirmButton = event.currentTarget;
      const status = document.querySelector("#sora-action-message");
      const action = confirmButton.dataset.action || "";
      let result;
      if (action === "infinite") {
        const nameInput = document.querySelector("#sora-infinite-name");
        const emailInput = document.querySelector("#sora-infinite-email");
        const consentInput = document.querySelector("#sora-infinite-consent");
        if (!nameInput.reportValidity() || !emailInput.reportValidity() || !consentInput.reportValidity()) return;
        confirmButton.disabled = true;
        status.textContent = "Sending your request…";
        result = await requestInfiniteInterest({ name: nameInput.value, email: emailInput.value, consent: consentInput.checked });
      } else {
        result = action.startsWith("tier:")
          ? activateTier(action.split(":")[1])
          : purchaseStatusTier(action.split(":")[1]);
      }
      if (!result.ok) {
        status.textContent = result.message || "Please try again.";
        confirmButton.disabled = false;
        return;
      }
      if (result.alreadyActive) status.textContent = `${result.offer?.name || "This membership"} is already active on this profile.`;
      else if (result.alreadyRequested) status.textContent = "Your interest is already recorded for this profile.";
      else if (action === "infinite") status.textContent = result.alreadyOnList
        ? "An application for this verified email is already on file."
        : "Application submitted. You can check the decision here after NPG reviews it.";
      else if (action.startsWith("tier:")) status.textContent = "Membership selection saved to this browser profile. No payment was processed.";
      else if (action.startsWith("status:")) status.textContent = `${result.offer.name} purchased. ${result.offer.points.toLocaleString("en-US")} Sora Points were used from your balance.`;
      else status.textContent = "Please try again.";
      renderSoraWallet();
      window.setTimeout(() => document.querySelector("#sora-action-dialog")?.close(), 900);
    });
    document.querySelector("#sora-profile-create")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const result = await createProfile({
        name: form.querySelector("[name=name]").value,
        email: form.querySelector("[name=email]").value,
        password: form.querySelector("[name=password]").value,
      });
      const status = document.querySelector("#sora-profile-message");
      if (!result.ok) { status.textContent = result.message; return; }
      form.reset();
      if (result.needsEmailConfirmation) {
        status.textContent = result.message;
        return;
      }
      runPendingAction();
    });
    document.querySelector("#sora-profile-signin")?.addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const result = await signIn({ email: form.querySelector("[name=email]").value, password: form.querySelector("[name=password]").value });
      const status = document.querySelector("#sora-profile-message");
      if (!result.ok) { status.textContent = result.message; return; }
      form.reset();
      runPendingAction();
    });
    document.querySelectorAll("[data-close-sora-dialog]").forEach((button) => button.addEventListener("click", () => button.closest("dialog")?.close()));
    document.querySelectorAll("dialog.sora-action-dialog").forEach((dialog) => dialog.addEventListener("click", (event) => { if (event.target === dialog) dialog.close(); }));
  }

  window.SoraWallet = {
    pointsPerDollar: POINTS_PER_DOLLAR,
    getActiveProfile,
    getWallet,
    listProfiles,
    createProfile,
    signIn,
    signOut,
    activateTier,
    purchaseStatusTier,
    requestInfiniteInterest,
    completeBooking,
  };
  renderSoraWallet();
  wireSoraControls();
  void restoreAuthentication();
  window.addEventListener("sora-profile-updated", renderSoraWallet);
  window.addEventListener("storage", (event) => {
    if (event.key === STORAGE_KEY) {
      refreshDatabase();
      renderSoraWallet();
    }
  });
  window.addEventListener("focus", () => { void refreshInfiniteApplicationStatus(); });
})();
