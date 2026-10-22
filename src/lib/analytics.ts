// GA4 helpers. Never pass names, emails, phone numbers or form text in params.
type Params = Record<string, string | number | boolean>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let started = false;
const fired = new Set<string>();

// CTA anchors we track, from both in-page (#contact) and cross-page (/#contact) links.
const CTA_TARGETS: Record<string, string> = {
  "#contact": "contact",
  "/#contact": "contact",
  "#work": "work",
  "/#work": "work",
};

// Only known CTA labels are sent; anything else falls back to the target name.
const KNOWN_CTA_LABELS = new Set([
  "Request a Quote",
  "Let's Talk",
  "Explore My Work",
  "Let's Talk About Automation",
  "Schedule a Free 15-Minute Chat",
]);

function knownCtaLabel(label: string): string {
  return KNOWN_CTA_LABELS.has(label) ? label : "cta";
}

export function track(event: string, params: Params = {}) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag("event", event, params);
}

export function trackOnce(key: string, event: string, params: Params = {}) {
  if (fired.has(key)) return;
  // Don't mark as fired when gtag isn't available — allow a later retry.
  if (typeof window === "undefined" || !window.gtag) return;
  fired.add(key);
  track(event, params);
}

export function initAnalytics(id: string) {
  if (started || typeof window === "undefined") return;
  if (document.querySelector('script[src*="googletagmanager.com/gtag/js"]')) return;
  started = true;

  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
  document.head.appendChild(s);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params -- gtag.js needs the Arguments object
    window.dataLayer!.push(arguments);
  };
  window.gtag("set", "developer_id.dZjgwMW", true);
  window.gtag("js", new Date());
  // Initial page view (UTMs captured from the landing URL). SPA page changes are
  // measured automatically by GA4's enhanced measurement ("Page changes based on
  // browser history events"), so no manual page_view is sent on navigation.
  window.gtag("config", id, { allow_google_signals: false, allow_ad_personalization_signals: false });

  // Delegated click tracking: CTAs, email/phone, project links.
  document.addEventListener("click", (e) => {
    const a = (e.target as HTMLElement | null)?.closest?.("a");
    if (!a) return;
    const href = a.getAttribute("href") ?? "";
    const label = (a.textContent ?? "").replace(/[→↓]/g, "").trim().slice(0, 60);
    if (href.startsWith("mailto:")) track("email_click", { link_location: a.closest("footer") ? "footer" : "page" });
    else if (href.startsWith("tel:")) track("phone_click");
    else if (CTA_TARGETS[href]) track("cta_click", { cta_text: knownCtaLabel(label), cta_target: CTA_TARGETS[href] });
    else if (a.closest("#work") && /^https?:/.test(href)) track("portfolio_click", { project_url: href });
  });

  // Section views, once per page load.
  const io = new IntersectionObserver(
    (entries) => {
      for (const en of entries) {
        if (!en.isIntersecting) continue;
        const id = (en.target as HTMLElement).id;
        if (id === "work") trackOnce("pv", "portfolio_view");
        if (id === "services") trackOnce("sv", "service_view");
        io.unobserve(en.target);
      }
    },
    { threshold: 0.25 },
  );
  ["work", "services"].forEach((sid) => {
    const el = document.getElementById(sid);
    if (el) io.observe(el);
  });
}
