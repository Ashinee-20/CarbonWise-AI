import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { runCoachAgents } from "@/lib/carbon/agents";
import { compareHistory } from "@/lib/carbon/analytics";
import { sampleActivities } from "@/lib/data/sample-activities";
import { AgentInsights, ComparisonPanel } from "./AgentInsights";

describe("AgentInsights", () => {
  it("renders specialist agent analysis", () => {
    render(<AgentInsights agents={runCoachAgents(sampleActivities)} />);

    expect(screen.getByRole("heading", { name: /specialist agents/i })).toBeInTheDocument();
    expect(screen.getByText(/Mobility Agent/i)).toBeInTheDocument();
  });

  it("renders historical comparison metrics", () => {
    render(<ComparisonPanel {...compareHistory(sampleActivities)} />);

    expect(screen.getByRole("heading", { name: /historical comparison/i })).toBeInTheDocument();
    expect(screen.getByText(/This week/i)).toBeInTheDocument();
  });
});
