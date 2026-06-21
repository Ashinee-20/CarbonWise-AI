import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { ActivityForm } from "./ActivityForm";

describe("ActivityForm", () => {
  it("submits a strongly shaped activity payload", async () => {
    const user = userEvent.setup();
    const onSubmit = vi.fn();
    render(<ActivityForm onSubmit={onSubmit} />);

    await user.clear(screen.getByLabelText(/Distance km/i));
    await user.type(screen.getByLabelText(/Distance km/i), "5");
    await user.click(screen.getByRole("button", { name: /save activity/i }));

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        date: expect.stringMatching(/^\d{4}-\d{2}-\d{2}$/),
        transport: expect.objectContaining({ distanceKm: 5 })
      })
    );
  });
});
