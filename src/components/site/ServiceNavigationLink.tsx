import { Link } from "@tanstack/react-router";
import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { type ServiceDestination } from "@/data/site";

/** One destination definition is shared by desktop, mobile, and footer links. */
export const ServiceNavigationLink = forwardRef<HTMLAnchorElement, Omit<ComponentPropsWithoutRef<"a">, "href" | "target"> & { item: ServiceDestination }>(function ServiceNavigationLink({ item, ...props }, ref) {
  if (item.url !== undefined) {
    return <a {...props} ref={ref} href={item.url} target="_blank" rel="noopener noreferrer">{item.label}<span className="sr-only"> (opens in a new tab)</span></a>;
  }
  return <Link {...props} ref={ref} to={item.to} {...(item.hash ? { hash: item.hash } : {})}>{item.label}</Link>;
});