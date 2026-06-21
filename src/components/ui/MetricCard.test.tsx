import React from "react";
import { Gauge } from "lucide-react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MetricCard } from "./MetricCard";

describe("MetricCard", () => {
  it("renders accessible metric text", () => {
    render(<MetricCard icon={Gauge} label="Total tracked" value="42 kg" helper="Across all logs" />);

    expect(screen.getByRole("region", { name: /total tracked/i })).toHaveTextContent("42 kg");
  });
});
