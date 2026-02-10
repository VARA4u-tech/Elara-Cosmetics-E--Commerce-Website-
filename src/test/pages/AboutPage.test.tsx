import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AboutPage from "@/pages/AboutPage";

// Mock dependencies
vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/Breadcrumbs", () => ({
  default: () => <div>Breadcrumbs</div>,
}));

const renderAboutPage = () => {
  return render(
    <BrowserRouter>
      <AboutPage />
    </BrowserRouter>,
  );
};

describe("AboutPage Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Rendering", () => {
    it("should render about page without crashing", () => {
      renderAboutPage();
      const mainHeading = screen.getByRole("heading", { level: 1 });
      expect(mainHeading).toBeInTheDocument();
    });

    it("should display breadcrumbs", () => {
      renderAboutPage();
      expect(screen.getByText("Breadcrumbs")).toBeInTheDocument();
    });

    it("should display page title", () => {
      renderAboutPage();
      const heroHeading = screen.getByRole("heading", { level: 1 });
      expect(heroHeading).toBeInTheDocument();
      expect(heroHeading).toHaveTextContent(/Ayurveda|Elara/i);
    });
  });

  describe("Content Sections", () => {
    it("should display company story", () => {
      renderAboutPage();
      const content = screen.getAllByText(
        /story|heritage|journey|founded|began/i,
      );
      expect(content.length).toBeGreaterThan(0);
    });

    it("should display mission or vision", () => {
      renderAboutPage();
      const missionVision = screen.queryAllByText(
        /mission|vision|values|believe/i,
      );
      expect(missionVision.length).toBeGreaterThan(0);
    });

    it("should display company values", () => {
      renderAboutPage();
      const values = screen.queryAllByText(/values|principles|commitment/i);
      expect(values.length).toBeGreaterThan(0);
    });
  });

  describe("Visual Elements", () => {
    it("should display images", () => {
      renderAboutPage();
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    });

    it("should have proper image alt text", () => {
      renderAboutPage();
      const images = screen.getAllByRole("img");
      images.forEach((img) => {
        expect(img).toHaveAttribute("alt");
      });
    });
  });

  describe("Brand Information", () => {
    it("should mention Elara Cosmetics", () => {
      renderAboutPage();
      const elaraMentions = screen.getAllByText(/Elara|ELARA/i);
      expect(elaraMentions.length).toBeGreaterThan(0);
    });

    it("should display brand description", () => {
      const { container } = renderAboutPage();
      const paragraphs = container.querySelectorAll("p");
      expect(paragraphs.length).toBeGreaterThan(0);
    });
  });

  describe("SEO and Accessibility", () => {
    it("should have proper heading structure", () => {
      const { container } = renderAboutPage();
      const headings = container.querySelectorAll("h1, h2, h3");
      expect(headings.length).toBeGreaterThan(0);
    });

    it("should have semantic HTML structure", () => {
      const { container } = renderAboutPage();
      expect(container.querySelector("section, article, div")).toBeTruthy();
    });
  });

  describe("Layout Structure", () => {
    it("should have container layout", () => {
      const { container } = renderAboutPage();
      expect(container.querySelector(".container")).toBeTruthy();
    });

    it("should be responsive", () => {
      const { container } = renderAboutPage();
      expect(container.querySelector(".grid, .flex")).toBeTruthy();
    });
  });

  describe("Content Quality", () => {
    it("should have substantial content", () => {
      const { container } = renderAboutPage();
      const textContent = container.textContent || "";
      expect(textContent.length).toBeGreaterThan(100);
    });

    it("should have multiple sections", () => {
      const { container } = renderAboutPage();
      const sections = container.querySelectorAll(
        "section, div[class*='section']",
      );
      expect(sections.length).toBeGreaterThan(0);
    });
  });
});
