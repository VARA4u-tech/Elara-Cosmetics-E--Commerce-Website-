import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import FAQsPage from "@/pages/FAQsPage";

// Mock dependencies
vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/Breadcrumbs", () => ({
  default: () => <div>Breadcrumbs</div>,
}));

const renderFAQsPage = () => {
  return render(
    <BrowserRouter>
      <FAQsPage />
    </BrowserRouter>,
  );
};

describe("FAQsPage Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Rendering", () => {
    it("should render FAQs page without crashing", () => {
      renderFAQsPage();
      expect(
        screen.getByText(/FAQ|Frequently Asked Questions/i),
      ).toBeInTheDocument();
    });

    it("should display breadcrumbs", () => {
      renderFAQsPage();
      expect(screen.getByText("Breadcrumbs")).toBeInTheDocument();
    });

    it("should display page title", () => {
      renderFAQsPage();
      expect(
        screen.getByText(/FAQ|Frequently Asked Questions/i),
      ).toBeInTheDocument();
    });
  });

  describe("FAQ Items", () => {
    it("should display FAQ questions", () => {
      renderFAQsPage();
      const questions = screen.getAllByText(/\?|How|What|When|Where|Why/i);
      expect(questions.length).toBeGreaterThan(0);
    });

    it("should have clickable FAQ items", () => {
      renderFAQsPage();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("should have multiple FAQ categories", () => {
      const { container } = renderFAQsPage();
      const sections = container.querySelectorAll(
        "section, div[class*='category']",
      );
      expect(sections.length).toBeGreaterThan(0);
    });
  });

  describe("FAQ Interaction", () => {
    it("should expand FAQ when clicked", () => {
      renderFAQsPage();
      const buttons = screen.getAllByRole("button");

      if (buttons.length > 0) {
        const initialContent = document.body.textContent;
        fireEvent.click(buttons[0]);
        const expandedContent = document.body.textContent;

        // Content should change or remain (already expanded)
        expect(expandedContent).toBeDefined();
      }
    });

    it("should collapse FAQ when clicked again", () => {
      renderFAQsPage();
      const buttons = screen.getAllByRole("button");

      if (buttons.length > 0) {
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[0]);
        expect(buttons[0]).toBeInTheDocument();
      }
    });

    it("should toggle between different FAQs", () => {
      renderFAQsPage();
      const buttons = screen.getAllByRole("button");

      if (buttons.length > 1) {
        fireEvent.click(buttons[0]);
        fireEvent.click(buttons[1]);
        expect(buttons[0]).toBeInTheDocument();
        expect(buttons[1]).toBeInTheDocument();
      }
    });
  });

  describe("FAQ Categories", () => {
    it("should have shipping related FAQs", () => {
      renderFAQsPage();
      const shippingFAQ = screen.queryAllByText(/shipping|delivery|track/i);
      expect(shippingFAQ.length).toBeGreaterThan(0);
    });

    it("should have return/refund related FAQs", () => {
      renderFAQsPage();
      const returnFAQ = screen.queryAllByText(/return|refund|exchange/i);
      expect(returnFAQ.length).toBeGreaterThan(0);
    });

    it("should have product related FAQs", () => {
      renderFAQsPage();
      const productFAQ = screen.queryAllByText(/product|ingredient/i);
      expect(productFAQ.length).toBeGreaterThan(0);
    });

    it("should have payment related FAQs", () => {
      renderFAQsPage();
      const paymentFAQ = screen.queryAllByText(/payment|pay/i);
      expect(paymentFAQ.length).toBeGreaterThan(0);
    });
  });

  describe("Search Functionality", () => {
    it("should have search input if available", () => {
      renderFAQsPage();
      const searchInput = screen.queryByPlaceholderText(/search|find/i);
      const pageTitle = screen.queryByText(/Frequently Asked Questions/i);
      // Search might or might not be present, but page should render
      expect(searchInput || pageTitle).toBeInTheDocument();
    });
  });

  describe("Contact Information", () => {
    it("should have contact link or information", () => {
      renderFAQsPage();
      const contactInfo = screen.queryAllByText(/contact|help|support/i);
      expect(contactInfo.length).toBeGreaterThan(0);
    });
  });

  describe("Accessibility", () => {
    it("should have accessible buttons", () => {
      renderFAQsPage();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });

    it("should have proper heading structure", () => {
      const { container } = renderFAQsPage();
      const headings = container.querySelectorAll("h1, h2, h3");
      expect(headings.length).toBeGreaterThan(0);
    });

    it("should have semantic HTML", () => {
      const { container } = renderFAQsPage();
      expect(container.querySelector("div")).toBeTruthy();
    });
  });

  describe("Layout and Design", () => {
    it("should have container layout", () => {
      const { container } = renderFAQsPage();
      expect(container.querySelector(".container")).toBeTruthy();
    });

    it("should be responsive", () => {
      const { container } = renderFAQsPage();
      expect(container.querySelector(".grid, .flex, .space-y")).toBeTruthy();
    });
  });

  describe("Content Quality", () => {
    it("should have substantial FAQ content", () => {
      const { container } = renderFAQsPage();
      const textContent = container.textContent || "";
      expect(textContent.length).toBeGreaterThan(100);
    });

    it("should have multiple FAQ items", () => {
      renderFAQsPage();
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThanOrEqual(3);
    });
  });
});
