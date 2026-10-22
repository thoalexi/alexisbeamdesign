import { useEffect, useState, type ReactNode } from "react";
import { bookingLink, type BookingPlacement } from "@/data/site";
import { track } from "@/lib/analytics";
import { captureAttribution } from "@/lib/attribution";

export function BookingLink({ placement, className, children }: { placement: BookingPlacement; className?: string; children: ReactNode }) {
  const [href, setHref] = useState<string | null>(null);
  useEffect(() => {
    // Capture before deriving the hydrated link, including on the first landing.
    captureAttribution();
    setHref(bookingLink(placement));
  }, [placement]);
  const destination = href ?? bookingLink(placement);
  if (!destination) return null;
  return (
    <a
      href={destination}
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
