import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";

const submit = vi.hoisted(() => vi.fn());
vi.mock("@/lib/inquiry.functions", () => ({
  submitInquiry: submit,
  normalizeWebsite: (value: string) => value === "" ? "" : null,
}));
vi.mock("@/tanstack/react-router", () => ({}));
vi.mock("@tanstack/react-router", () => ({
  Link: ({ children, to, className }: { children: ReactNode; to: string; className?: string }) => <a href={to} className={className}>{children}</a>,
}));

import { ContactForm } from "@/components/site/ContactForm";

afterEach(() => { cleanup(); submit.mockClear(); });

describe("Inquiry validation without submission", () => {
  it("does not send a blank inquiry", () => {
    const { container } = render(<ContactForm />);
    const form = container.querySelector("form");
    if (!form) throw new Error("Missing inquiry form");
    fireEvent.submit(form);
    expect(submit).not.toHaveBeenCalled();
    expect(container.querySelectorAll('[aria-invalid="true"]')).toHaveLength(4);
  });

  it("does not send an invalid email even with the other mandatory details", () => {
    const { container } = render(<ContactForm preselectedService="Website Redesign" />);
    fireEvent.change(screen.getByRole("textbox", { name: /Name/ }), { target: { value: "Preview check" } });
    fireEvent.change(screen.getByRole("textbox", { name: /Email/ }), { target: { value: "invalid" } });
    fireEvent.change(screen.getByRole("textbox", { name: /Tell me about your project/ }), { target: { value: "A website redesign request." } });
    const form = container.querySelector("form");
    if (!form) throw new Error("Missing inquiry form");
    fireEvent.submit(form);
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: /Email/ })).toHaveAttribute("aria-invalid", "true");
  });
});