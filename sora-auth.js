(() => {
  const config = window.NPG_SUPABASE_CONFIG || {};
  const configured = Boolean(
    String(config.url || "").trim()
    && String(config.publishableKey || "").trim().startsWith("sb_publishable_")
    && !String(config.publishableKey || "").includes("ADD_YOUR_")
    && window.supabase?.createClient
  );

  const client = configured
    ? window.supabase.createClient(config.url, config.publishableKey, {
      auth: {
        autoRefreshToken: true,
        detectSessionInUrl: true,
        flowType: "pkce",
        persistSession: true,
      },
    })
    : null;

  function redirectUrl() {
    if (!/^https?:$/.test(window.location.protocol)) return null;
    const url = new URL(window.location.href);
    url.hash = "";
    url.search = "";
    return url.toString();
  }

  function authUnavailable() {
    if (!configured) return "Account sign-in is not connected. Refresh the page or contact NPG support.";
    if (!redirectUrl()) return "Open the published website or a local web server to create an account. Email confirmation cannot return to a file:// page.";
    return "";
  }

  function friendlyError(error) {
    const message = String(error?.message || "");
    if (/invalid login credentials/i.test(message)) return "That email or password is incorrect.";
    if (/email not confirmed/i.test(message)) return "Confirm your email from the message we sent, then sign in.";
    if (/password should be at least/i.test(message)) return "Choose a longer password that meets the account security requirements.";
    if (/redirect.*not allowed|url.*not allowed/i.test(message)) return "Supabase blocked the confirmation link. Add this website address to Authentication → URL Configuration → Redirect URLs.";
    if (/user already registered/i.test(message)) return "An account may already exist for that email. Try signing in instead.";
    return message || "Supabase could not complete that request. Please try again.";
  }

  async function signUp({ name, email, password } = {}) {
    const unavailable = authUnavailable();
    if (unavailable) return { ok: false, message: unavailable };
    const fullName = String(name || "").trim().slice(0, 80);
    const contactEmail = String(email || "").trim().toLowerCase();
    if (!fullName) return { ok: false, message: "Enter your name." };
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactEmail)) return { ok: false, message: "Enter a valid email address." };
    if (String(password || "").length < 8) return { ok: false, message: "Use a password with at least 8 characters." };

    const { data, error } = await client.auth.signUp({
      email: contactEmail,
      password: String(password),
      options: {
        data: { full_name: fullName },
        emailRedirectTo: redirectUrl(),
      },
    });
    if (error) return { ok: false, message: friendlyError(error) };

    if (!data.session) {
      return {
        ok: true,
        needsEmailConfirmation: true,
        message: `Account created. Check ${contactEmail} for the confirmation link, then return here and sign in.`,
      };
    }

    const verified = await getVerifiedUser();
    if (!verified.user) {
      return {
        ok: true,
        needsEmailConfirmation: true,
        message: `Account created. Check ${contactEmail} for the confirmation link, then return here and sign in.`,
      };
    }
    return { ok: true, user: verified.user };
  }

  async function signIn({ email, password } = {}) {
    const unavailable = authUnavailable();
    if (unavailable) return { ok: false, message: unavailable };
    const contactEmail = String(email || "").trim().toLowerCase();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactEmail)) return { ok: false, message: "Enter a valid email address." };
    if (!String(password || "")) return { ok: false, message: "Enter your password." };

    const { error } = await client.auth.signInWithPassword({ email: contactEmail, password: String(password) });
    if (error) return { ok: false, message: friendlyError(error) };
    const verified = await getVerifiedUser();
    if (!verified.user) {
      await client.auth.signOut();
      return { ok: false, message: "Confirm this email address before signing in." };
    }
    return { ok: true, user: verified.user };
  }

  async function getVerifiedUser() {
    if (!client) return { ok: false, user: null, message: "Account sign-in is not connected." };
    const { data, error } = await client.auth.getUser();
    if (error || !data.user) return { ok: true, user: null };
    if (!data.user.email_confirmed_at) return { ok: false, user: null, message: "Confirm your email before using your Sora account." };
    return { ok: true, user: data.user };
  }

  async function getInfiniteStatus() {
    const verified = await getVerifiedUser();
    if (!verified.user) return { ok: false, status: "SignedOut", message: verified.message || "Sign in with your verified email to check Sora Infinite status." };
    const { data, error } = await client.rpc("get_my_sora_infinite_status");
    if (error) {
      console.error("Could not read the signed-in member's Sora Infinite decision.", error);
      return { ok: false, status: "Unavailable", message: "The Sora account migration has not been applied yet." };
    }
    return { ok: true, status: String(data || "NotApplied") };
  }

  async function getSession() {
    if (!client) return null;
    const { data, error } = await client.auth.getSession();
    return error ? null : data.session;
  }

  async function signOut() {
    if (!client) return { ok: false, message: "Account sign-in is not connected." };
    const { error } = await client.auth.signOut();
    return error ? { ok: false, message: friendlyError(error) } : { ok: true };
  }

  function onAuthStateChange(callback) {
    if (!client || typeof callback !== "function") return;
    client.auth.onAuthStateChange((event, session) => {
      window.setTimeout(() => callback(event, session?.user || null), 0);
    });
  }

  window.NPGSoraAuth = {
    configured,
    getVerifiedUser,
    getInfiniteStatus,
    getSession,
    onAuthStateChange,
    signIn,
    signOut,
    signUp,
  };
})();
