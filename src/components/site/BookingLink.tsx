import type { ReactNode } from "react";
import { bookingLink, type BookingPlacement } from "@/data/site";
import { track } from "@/lib/analytics";

export function BookingLink({ placement, className, children }: { placement: BookingPlacement; className?: string; children: ReactNode }) {
  const href = bookingLink(placement);
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
