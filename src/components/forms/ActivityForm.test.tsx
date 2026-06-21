import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { ActivityForm } from "./ActivityForm";

describe("ActivityForm", () => {
  it("renders the activity form with all field categories", () => {
    const onSubmit = vi.fn();
    render(<ActivityForm onSubmit={onSubmit} />);

    expect(screen.getByText(/Log Today/i)).toBeDefined();
    expect(screen.getByText(/Transportation/i)).toBeDefined();
    expect(screen.getByText(/Food/i)).toBeDefined();
    expect(screen.getByText(/Electricity/i)).toBeDefined();
    expect(screen.getByText(/Shopping/i)).toBeDefined();
  });
});
