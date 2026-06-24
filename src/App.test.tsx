import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("desktop portfolio redesign", () => {
  it("renders the English-only seven-screen narrative without the strategic overview", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: /turning technology opportunities into market outcomes/i
      })
    ).toBeInTheDocument();

    const main = screen.getByRole("main");
    expect(within(main).getAllByRole("region")).toHaveLength(7);
    expect(screen.queryByText("Work that moves from insight to execution.")).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "中文" })).not.toBeInTheDocument();
  });

  it("renders six vertical experience entries in one experience section", () => {
    render(<App />);

    const experience = screen.getByRole("region", {
      name: /a career built across data, technology, markets, and organizations/i
    });
    expect(within(experience).getAllByRole("article")).toHaveLength(6);
    expect(within(experience).getByText("University of Toronto")).toBeInTheDocument();
    expect(within(experience).getByText("Huawei Canada · Waterloo Research Center")).toBeInTheDocument();
  });

  it("uses three image-led cards in every project screen", () => {
    render(<App />);

    for (const sectionName of [
      "Strategic Business & GTM Projects",
      "Building the operating system for AI research execution.",
      "Creating the connections that allow technology, business, and research to move together.",
      "Small experiments for exploring better products and better ways of working."
    ]) {
      const section = screen.getByRole("region", { name: sectionName });
      expect(within(section).getAllByRole("article")).toHaveLength(3);
      expect(within(section).getAllByRole("img")).toHaveLength(3);
    }
  });

  it("keeps cases informational with no detail-page links", () => {
    render(<App />);

    expect(screen.queryByText(/view case study/i)).not.toBeInTheDocument();
    expect(screen.getByText("NOVA 5G FWA Commercial Launch")).toBeInTheDocument();
    expect(screen.getByText("Waterloo Research Center Operations")).toBeInTheDocument();
  });
});
