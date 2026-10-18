// One sign-up for every guide: the end-of-guide form and the locked prompts share it.
export const ACCESS_KEY = "shift-lead-guide-access";
export const READER_KEY = "shift-lead-guide-reader";
export const UNLOCK_EVENT = "sl-guide-unlock";
export const taggedKey = (slug: string) => `shift-lead-guide-tagged:${slug}`;

export function hasGuideAccess() {
  try {
    return window.localStorage.getItem(ACCESS_KEY) === "true";
  } catch {
    // Storage can be unavailable in privacy-restricted browsing modes.
    return false;
  }
}

type Tracker = (name: string, data?: Record<string, string>) => void;
export const track: Tracker = (name, data) => (window as Window & { slTrack?: Tracker }).slTrack?.(name, data);

// Sends the form to /api/guide-capture. Throws with a readable message on failure.
export async function submitGuideSignup(form: FormData, guideSlug: string) {
  track("guide_gate_submit", { guide_slug: guideSlug, source_page: window.location.pathname });
  let response: Response;
  try {
    response = await fetch("/api/guide-capture", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: form.get("email"),
        firstName: form.get("firstName"),
        website: form.get("website"),
        guideSlug,
        source: window.location.pathname,
        consent: true,
        marketingConsent: form.get("marketingConsent") === "on",
        timestamp: new Date().toISOString(),
      }),
    });
  } catch {
    throw new Error("That did not send. Please check your connection and try again.");
  }
  if (!response.ok) {
    // Show the server's reason (bad email, not configured, refused) so a failure can be diagnosed.
    const result = await response.json().catch(() => ({})) as { error?: string };
    throw new Error(result.error || `That did not send. Please try again. (${response.status})`);
  }
  try {
    window.localStorage.setItem(ACCESS_KEY, "true");
    window.localStorage.setItem(READER_KEY, String(form.get("email") || "").trim().toLowerCase());
    window.localStorage.setItem(taggedKey(guideSlug), "true");
  } catch {
    // The unlock still applies for this page view.
  }
  track("guide_unlock", { guide_slug: guideSlug, source_page: window.location.pathname });
  window.dispatchEvent(new Event(UNLOCK_EVENT));
}
