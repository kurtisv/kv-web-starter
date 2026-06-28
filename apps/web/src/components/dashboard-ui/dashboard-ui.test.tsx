import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ActivityFeed } from "./activity-feed";
import { AuditLogTimeline } from "./audit-log-timeline";
import {
  DashboardContent,
  DashboardHeader,
  DashboardPageHeader,
  DashboardShell,
} from "./dashboard-shell";
import { DataTableShell } from "./data-table-shell";
import { EmptyDashboardState } from "./empty-dashboard-state";
import { MetricCard, MetricGrid } from "./metric-card";

// ---------------------------------------------------------------------------
// MetricCard
// ---------------------------------------------------------------------------
describe("MetricCard", () => {
  it("renders label and value", () => {
    render(<MetricCard label="Revenue" value="$24,890" />);
    expect(screen.getByText("Revenue")).toBeTruthy();
    expect(screen.getByText("$24,890")).toBeTruthy();
  });

  it("renders description", () => {
    render(<MetricCard label="Revenue" value="$24,890" description="Monthly recurring" />);
    expect(screen.getByText("Monthly recurring")).toBeTruthy();
  });

  it("renders trend up", () => {
    render(
      <MetricCard
        label="MRR"
        value="$24,890"
        trend={{ value: "+12% this month", direction: "up" }}
      />,
    );
    expect(screen.getByText("+12% this month")).toBeTruthy();
  });

  it("renders trend down", () => {
    render(
      <MetricCard
        label="Churn"
        value="2.1%"
        trend={{ value: "+0.3% vs last month", direction: "down" }}
      />,
    );
    expect(screen.getByText("+0.3% vs last month")).toBeTruthy();
  });

  it("renders trend neutral", () => {
    render(
      <MetricCard label="Uptime" value="99.99%" trend={{ value: "Stable", direction: "neutral" }} />,
    );
    expect(screen.getByText("Stable")).toBeTruthy();
  });

  it("renders icon slot", () => {
    render(
      <MetricCard label="Users" value="1,247" icon={<span data-testid="metric-icon" />} />,
    );
    expect(screen.getByTestId("metric-icon")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// MetricGrid
// ---------------------------------------------------------------------------
describe("MetricGrid", () => {
  it("renders all children", () => {
    render(
      <MetricGrid>
        <MetricCard label="MRR" value="$24,890" />
        <MetricCard label="Users" value="1,247" />
        <MetricCard label="Churn" value="1.2%" />
        <MetricCard label="Uptime" value="99.99%" />
      </MetricGrid>,
    );
    expect(screen.getByText("MRR")).toBeTruthy();
    expect(screen.getByText("Users")).toBeTruthy();
    expect(screen.getByText("Churn")).toBeTruthy();
    expect(screen.getByText("Uptime")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// ActivityFeed
// ---------------------------------------------------------------------------
describe("ActivityFeed", () => {
  const items = [
    { id: "1", message: "User signed up", timestamp: "2 min ago", variant: "success" as const },
    { id: "2", message: "Payment failed", timestamp: "5 min ago", variant: "destructive" as const },
    { id: "3", message: "API key created", timestamp: "10 min ago" },
  ];

  it("renders all activity messages and timestamps", () => {
    render(<ActivityFeed items={items} />);
    expect(screen.getByText("User signed up")).toBeTruthy();
    expect(screen.getByText("2 min ago")).toBeTruthy();
    expect(screen.getByText("Payment failed")).toBeTruthy();
    expect(screen.getByText("API key created")).toBeTruthy();
  });

  it("renders optional title", () => {
    render(<ActivityFeed items={items} title="Recent activity" />);
    expect(screen.getByText("Recent activity")).toBeTruthy();
  });

  it("renders empty feed without crashing", () => {
    const { container } = render(<ActivityFeed items={[]} />);
    expect(container.querySelector("ol")).toBeTruthy();
  });

  it("renders all variant dot colors without error", () => {
    const variantItems = [
      { id: "a", message: "Default event", timestamp: "1s ago" },
      { id: "b", message: "Success event", timestamp: "2s ago", variant: "success" as const },
      { id: "c", message: "Warning event", timestamp: "3s ago", variant: "warning" as const },
      { id: "d", message: "Error event", timestamp: "4s ago", variant: "destructive" as const },
    ];
    render(<ActivityFeed items={variantItems} />);
    expect(screen.getByText("Warning event")).toBeTruthy();
    expect(screen.getByText("Error event")).toBeTruthy();
  });
});

// ---------------------------------------------------------------------------
// DashboardShell
// ---------------------------------------------------------------------------
describe("DashboardShell", () => {
  it("renders children in main content area", () => {
    render(<DashboardShell><p>Main content</p></DashboardShell>);
    expect(screen.getByText("Main content")).toBeTruthy();
  });

  it("renders sidebar when provided", () => {
    render(
      <DashboardShell sidebar={<nav>Sidebar nav</nav>}>
        <p>Content</p>
      </DashboardShell>,
    );
    expect(screen.getByText("Sidebar nav")).toBeTruthy();
    expect(screen.getByText("Content")).toBeTruthy();
  });

  it("renders without sidebar", () => {
    const { container } = render(<DashboardShell><p>No sidebar</p></DashboardShell>);
    expect(container.querySelector("aside")).toBeNull();
  });
});

describe("DashboardHeader", () => {
  it("renders children in a header element", () => {
    render(<DashboardHeader><span>Header content</span></DashboardHeader>);
    expect(screen.getByText("Header content")).toBeTruthy();
  });
});

describe("DashboardContent", () => {
  it("renders children in a main element", () => {
    render(<DashboardContent><p>Page body</p></DashboardContent>);
    expect(screen.getByText("Page body")).toBeTruthy();
  });
});

describe("DashboardPageHeader", () => {
  it("renders title as h1", () => {
    render(<DashboardPageHeader title="Overview" />);
    expect(screen.getByRole("heading", { level: 1, name: "Overview" })).toBeTruthy();
  });

  it("renders description when provided", () => {
    render(<DashboardPageHeader title="Settings" description="Manage your account settings." />);
    expect(screen.getByText("Manage your account settings.")).toBeTruthy();
  });

  it("renders actions slot", () => {
    render(<DashboardPageHeader title="Users" actions={<button>Invite user</button>} />);
    expect(screen.getByRole("button", { name: "Invite user" })).toBeTruthy();
  });

  it("does not render description element when omitted", () => {
    render(<DashboardPageHeader title="Clean" />);
    expect(screen.queryByRole("paragraph")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// DataTableShell
// ---------------------------------------------------------------------------
describe("DataTableShell", () => {
  type Row = { id: string; name: string; plan: string; status: string };

  const columns = [
    { key: "name", header: "Name", cell: (r: Row) => r.name },
    { key: "plan", header: "Plan", cell: (r: Row) => r.plan },
    { key: "status", header: "Status", cell: (r: Row) => r.status },
  ];

  const data: Row[] = [
    { id: "1", name: "Alice Martin", plan: "Pro", status: "Active" },
    { id: "2", name: "Bob Dupont", plan: "Free", status: "Inactive" },
  ];

  it("renders column headers", () => {
    render(<DataTableShell data={data} columns={columns} keyField="id" />);
    expect(screen.getByText("Name")).toBeTruthy();
    expect(screen.getByText("Plan")).toBeTruthy();
    expect(screen.getByText("Status")).toBeTruthy();
  });

  it("renders all row data", () => {
    render(<DataTableShell data={data} columns={columns} keyField="id" />);
    expect(screen.getByText("Alice Martin")).toBeTruthy();
    expect(screen.getByText("Pro")).toBeTruthy();
    expect(screen.getByText("Bob Dupont")).toBeTruthy();
    expect(screen.getByText("Free")).toBeTruthy();
  });

  it("renders empty state with custom title", () => {
    render(
      <DataTableShell
        data={[]}
        columns={columns}
        keyField="id"
        emptyTitle="No users found"
        emptyDescription="Invite someone to get started."
      />,
    );
    expect(screen.getByText("No users found")).toBeTruthy();
    expect(screen.getByText("Invite someone to get started.")).toBeTruthy();
  });

  it("renders loading state", () => {
    render(<DataTableShell data={[]} columns={columns} keyField="id" isLoading />);
    expect(screen.getByText("Loading...")).toBeTruthy();
  });

  it("renders correct row count", () => {
    render(<DataTableShell data={data} columns={columns} keyField="id" />);
    const rows = screen.getAllByRole("row");
    expect(rows.length).toBe(3); // 1 header + 2 data rows
  });
});

describe("roadmap dashboard components", () => {
  it("renders audit log entries", () => {
    render(
      <AuditLogTimeline
        items={[{ id: "1", action: "Client cree", actor: "Admin", createdAt: "now" }]}
      />,
    );
    expect(screen.getByText("Client cree")).toBeTruthy();
    expect(screen.getByText("Admin")).toBeTruthy();
  });

  it("renders standardized empty state", () => {
    render(<EmptyDashboardState title="No records" description="Create one to start." />);
    expect(screen.getByText("No records")).toBeTruthy();
    expect(screen.getByText("Create one to start.")).toBeTruthy();
  });
});
