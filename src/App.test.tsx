import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import App from "./App";

describe("desktop portfolio redesign", () => {
  it("renders the English-only seven-screen narrative without the strategic overview", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Xiaoyu Feng"
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

  it("guides visitors through an editorial hero with prioritized actions", () => {
    render(<App />);

    const hero = screen.getByRole("region", { name: "Xiaoyu Feng" });
    expect(
      within(hero).getByRole("heading", { level: 1, name: "Xiaoyu Feng" })
    ).toBeInTheDocument();
    expect(within(hero).queryByText(/justin/i)).not.toBeInTheDocument();
    expect(
      within(hero).getByText(
        "I turn market insight and technical capabilities into product strategies, customer solutions, and commercial growth across global technology markets."
      )
    ).toBeInTheDocument();

    expect(
      within(hero).getByText(
        "Product strategy, GTM launches, and AI research operations across global telecom markets."
      )
    ).toBeInTheDocument();

    for (const pillar of [
      "Product & GTM Strategy",
      "AI Transformation",
      "Strategic Operations"
    ]) {
      expect(within(hero).getByText(pillar)).toBeInTheDocument();
    }

    expect(within(hero).getByRole("link", { name: "Explore Projects" })).toHaveClass(
      "hero-action--primary"
    );
    expect(within(hero).getByRole("link", { name: "Experience" })).toHaveClass(
      "hero-action--secondary"
    );
    expect(
      within(hero).getByRole("link", { name: "LinkedIn (opens in a new tab)" })
    ).toBeInTheDocument();
    expect(
      within(hero).getByRole("link", { name: "GitHub (opens in a new tab)" })
    ).toBeInTheDocument();
    expect(within(hero).getByRole("link", { name: "Contact" })).toBeInTheDocument();

    expect(within(hero).queryByLabelText("Selected outcomes")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Resume — soon" })).toBeInTheDocument();
  });
});
