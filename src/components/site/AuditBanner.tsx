import { Button } from "@/components/ui/button";
import { websiteDiagnosis } from "@/data/site";

const dollars = (cents: number) => `$${Math.round(cents / 100)}`;

/** Immediately visible; the site owner controls launch by publishing. */
export function AuditBanner() {
  const banner = websiteDiagnosis.banner;
  return (
    <div className="audit-banner flex items-center justify-center bg-ink px-4 text-ink-foreground">
      <Button asChild variant="link" className="h-auto max-w-full whitespace-normal rounded-none px-0 py-2 text-center text-xs font-normal leading-5 text-ink-foreground">
        <a href={websiteDiagnosis.url} aria-label="Website Diagnosis: $125 through December, $175 in January">
          <span>
            {banner.introduction} — <strong className="font-medium">{dollars(banner.currentPriceCents)}</strong> through {banner.currentPriceThrough}, <strong className="font-medium">{dollars(banner.newPriceCents)}</strong> in {banner.newPriceFrom} <span aria-hidden="true">→</span>
          </span>
        </a>
      </Button>
    </div>
  );
}