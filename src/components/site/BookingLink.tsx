import { useEffect, useState, type ReactNode } from "react";
import { bookingLink, type BookingPlacement } from "@/data/site";
import { track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

export function BookingLink({ placement, className, children }: { placement: BookingPlacement; className?: string; children: ReactNode }) {
  // The first render is identical on server and browser; session context follows hydration.
  const [href, setHref] = useState(() => bookingLink(placement, false));
  useEffect(() => {
    // Capture before deriving the hydrated link, including on the first landing.
    captureAttribution();
    setHref(bookingLink(placement));
  }, [placement]);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      onClick={() => track("discovery_call_click", { placement })}
    >
      {children}
      <span className="sr-only"> (opens Calendly in a new tab)</span>
    </a>
  );
}
