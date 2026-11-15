import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { ReactNode } from "react";
vi.mock("@tanstack/react-start", () => ({ useServerFn: (fn: unknown) => fn }));

const submit = vi.hoisted(() => vi.fn());
vi.mock("@/lib/inquiry.functions", () => ({
  submitInquiry: submit,
  normalizeWebsite: (value: string) => value === "" ? "" : null,
}));
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
    expect(container.querySelectorAll('[aria-invalid="true"]')).toHaveLength(3);
  });

  it("does not send an invalid email even with the other mandatory details", () => {
    const { container } = render(<ContactForm preselectedService="Website Redesign" />);
    fireEvent.change(screen.getByRole("textbox", { name: /Name/ }), { target: { value: "Preview check" } });
    fireEvent.change(screen.getByRole("textbox", { name: /Email/ }), { target: { value: "invalid" } });
    fireEvent.change(screen.getByRole("textbox", { name: /Tell me a little about your idea/ }), { target: { value: "A website redesign request." } });
    const form = container.querySelector("form");
    if (!form) throw new Error("Missing inquiry form");
    fireEvent.submit(form);
    expect(submit).not.toHaveBeenCalled();
    expect(screen.getByRole("textbox", { name: /Email/ })).toHaveAttribute("aria-invalid", "true");
  });
  it("submits without optional interest or removed intake fields and prevents duplicates", async () => {
    let finish: ((value: { ok: boolean }) => void) | undefined;
    submit.mockImplementation(() => new Promise((resolve) => { finish = resolve; }));
    const { container } = render(<ContactForm />);
    fireEvent.change(screen.getByRole("textbox", { name: /Your Name/ }), { target: { value: "Preview check" } });
    fireEvent.change(screen.getByRole("textbox", { name: /Email Address/ }), { target: { value: "preview@example.com" } });
    fireEvent.change(screen.getByRole("textbox", { name: /Tell me a little about your idea/ }), { target: { value: "I would like to improve my website." } });
    const form = container.querySelector("form");
    if (!form) throw new Error("Missing inquiry form");
    fireEvent.submit(form);
    fireEvent.submit(form);
    expect(submit).toHaveBeenCalledTimes(1);
    expect(submit.mock.calls[0]?.[0].data).toMatchObject({ service: "", name: "Preview check" });
    expect(submit.mock.calls[0]?.[0].data).not.toHaveProperty("budget");
    expect(submit.mock.calls[0]?.[0].data).not.toHaveProperty("timeline");
    expect(submit.mock.calls[0]?.[0].data).not.toHaveProperty("businessName");
    if (!finish) throw new Error("Missing pending submission");
    finish({ ok: true });
    expect(await screen.findByRole("status")).toBeInTheDocument();
  });
});