import * as AccordionPrimitive from "@radix-ui/react-accordion";

export type FaqItem = { q: string; a: string | string[] };

/** Shared two-column FAQ accordion used on the homepage and every service page. */
export function FaqAccordion({ items, idPrefix = "faq" }: { items: FaqItem[]; idPrefix?: string }) {
  const half = Math.ceil(items.length / 2);
  const cols = [items.slice(0, half), items.slice(half)];
  return (
    <div className="mt-16 grid gap-x-16 md:grid-cols-2">
      {cols.map((col, c) => (
        <AccordionPrimitive.Root key={c} type="multiple" className="border-t border-foreground/20">
          {col.map((f, i) => (
            <AccordionPrimitive.Item key={f.q} value={`${idPrefix}-${c}-${i}`} className="border-b border-foreground/20">
              <AccordionPrimitive.Header asChild>
                <h3>
                  <AccordionPrimitive.Trigger className="group flex w-full items-start justify-between gap-6 py-6 text-left font-serif text-2xl leading-snug">
                    {f.q}
                    <span aria-hidden="true" className="mt-1 font-sans text-xl text-terracotta">
                      <span className="group-data-[state=open]:hidden">+</span>
                      <span className="hidden group-data-[state=open]:inline">−</span>
                    </span>
                  </AccordionPrimitive.Trigger>
                </h3>
              </AccordionPrimitive.Header>
              <AccordionPrimitive.Content forceMount className="max-w-prose space-y-3 pb-6 leading-relaxed text-muted-foreground data-[state=closed]:hidden">
                {(Array.isArray(f.a) ? f.a : [f.a]).map((p) => <p key={p}>{p}</p>)}
              </AccordionPrimitive.Content>
            </AccordionPrimitive.Item>
          ))}
        </AccordionPrimitive.Root>
      ))}
    </div>
  );
}
