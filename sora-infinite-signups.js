(() => {
  const config = window.NPG_SUPABASE_CONFIG || {};

  function isConfigured() {
    const key = String(config.publishableKey || "").trim();
    return Boolean(String(config.url || "").trim() && key.startsWith("sb_publishable_") && !key.includes("ADD_YOUR_") && window.NPGSoraAuth?.configured);
  }

  async function submitInfiniteInterest({ name, email, status, lifetimePoints, consent } = {}) {
    const fullName = String(name || "").trim().slice(0, 80);
    const contactEmail = String(email || "").trim().toLowerCase();
    const memberStatus = String(status || "");
    const points = Math.max(0, Math.floor(Number(lifetimePoints) || 0));

    if (!fullName) return { ok: false, message: "Enter your name." };
    if (contactEmail.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(contactEmail)) return { ok: false, message: "Enter a valid contact email." };
    if (memberStatus !== "Gold" && memberStatus !== "Platinum") return { ok: false, message: "Only Sora Gold or Platinum members can register interest." };
    if (!consent) return { ok: false, message: "Please agree before submitting your contact details." };

    const verified = await window.NPGSoraAuth?.getVerifiedUser?.();
    if (!verified?.user) return { ok: false, message: verified?.message || "Sign in with a verified Sora account before applying." };
    if (contactEmail !== String(verified.user.email || "").toLowerCase()) {
      return { ok: false, message: "Use the verified email address on your signed-in Sora account." };
    }

    const url = String(config.url || "").replace(/\/+$/, "");
    const key = String(config.publishableKey || "").trim();
    if (!url || !key.startsWith("sb_publishable_") || key.includes("ADD_YOUR_")) {
      return { ok: false, message: "The online interest list is not connected yet. Please try again later." };
    }
    const session = await window.NPGSoraAuth.getSession();
    if (!session?.access_token) return { ok: false, message: "Sign in again with your verified Sora account before applying." };

    try {
      const response = await fetch(`${url}/rest/v1/sora_infinite_interest_signups`, {
        method: "POST",
        headers: {
          apikey: key,
          Authorization: `Bearer ${session.access_token}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({
          full_name: fullName,
          contact_email: contactEmail,
          member_status_reported: memberStatus,
          lifetime_points_reported: points,
          consent_given: true,
        }),
        mode: "cors",
        credentials: "omit",
      });

      if (response.status === 409) return { ok: true, alreadyOnList: true };
      if (!response.ok) {
        console.error("Sora Infinite interest submission failed with status", response.status);
        return { ok: false, message: "We couldn’t submit your request just now. Please try again later." };
      }
      return { ok: true };
    } catch (error) {
      console.error("Sora Infinite interest submission could not reach the list.", error);
      return { ok: false, message: "We couldn’t reach the interest list. Check your connection and try again." };
    }
  }

  window.NPGInfiniteSignups = { isConfigured, submitInfiniteInterest };
})();
