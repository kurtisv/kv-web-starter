import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ApiUsageChart } from "./api-usage-chart";
import { RateLimitMeter } from "./rate-limit-meter";
import { RequestLogViewer } from "./request-log-viewer";

describe("api portal components", () => {
  it("renders usage chart totals", () => {
    render(<ApiUsageChart data={[{ label: "Lun", calls: 10 }, { label: "Mar", calls: 15 }]} />);
    expect(screen.getByText("25 appels")).toBeTruthy();
  });

  it("renders rate limit usage", () => {
    render(<RateLimitMeter used={50} limit={100} />);
    expect(screen.getByText("50%")).toBeTruthy();
    expect(screen.getByText(/50 \/ 100 appels/)).toBeTruthy();
  });

  it("renders request logs", () => {
    render(
      <RequestLogViewer
        entries={[{ id: "1", method: "GET", path: "/api/v1/demo", status: 200, durationMs: 42, createdAt: "now" }]}
      />,
    );
    expect(screen.getByText("/api/v1/demo")).toBeTruthy();
    expect(screen.getByText("42ms")).toBeTruthy();
  });
});
