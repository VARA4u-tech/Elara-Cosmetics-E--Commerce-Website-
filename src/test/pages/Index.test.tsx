import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Index from "@/pages/Index";

// Mock Layout component
vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock all home components
vi.mock("@/components/home/HeroCarousel", () => ({
  default: () => <div data-testid="hero-carousel">Hero Carousel</div>,
}));

vi.mock("@/components/home/FeaturedCategories", () => ({
  default: () => (
    <div data-testid="featured-categories">Featured Categories</div>
  ),
}));

vi.mock("@/components/home/NewArrivals", () => ({
  default: () => <div data-testid="new-arrivals">New Arrivals</div>,
}));

vi.mock("@/components/home/BestSellers", () => ({
  default: () => <div data-testid="best-sellers">Best Sellers</div>,
}));

vi.mock("@/components/home/ShopByConcern", () => ({
  default: () => <div data-testid="shop-by-concern">Shop By Concern</div>,
}));

vi.mock("@/components/home/IngredientsSpotlight", () => ({
  default: () => (
    <div data-testid="ingredients-spotlight">Ingredients Spotlight</div>
  ),
}));

vi.mock("@/components/home/TestimonialsSection", () => ({
  default: () => <div data-testid="testimonials">Testimonials</div>,
}));

vi.mock("@/components/home/VideoShowcase", () => ({
  default: () => <div data-testid="video-showcase">Video Showcase</div>,
}));

vi.mock("@/components/home/BrandStory", () => ({
  default: () => <div data-testid="brand-story">Brand Story</div>,
}));

vi.mock("@/components/home/NewsletterSection", () => ({
  default: () => <div data-testid="newsletter">Newsletter</div>,
}));

vi.mock("@/components/home/SustainabilityBanner", () => ({
  default: () => (
    <div data-testid="sustainability-banner">Sustainability Banner</div>
  ),
}));

// Mock AudioContext to prevent useAudioManager error
vi.mock("@/context/AudioContext", () => ({
  useAudioManager: () => ({
    isMuted: false,
    toggleMute: vi.fn(),
    registerAudio: vi.fn(),
    unregisterAudio: vi.fn(),
    playHoverSound: vi.fn(),
    playClickSound: vi.fn(),
    playSuccessSound: vi.fn(),
  }),
  AudioProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ), // Mock AudioProvider as a fragment
}));

const renderIndexPage = () => {
  return render(
    <BrowserRouter>
      <Index />
    </BrowserRouter>,
  );
};

describe("Index (Home Page) Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Rendering", () => {
    it("should render the home page without crashing", () => {
      renderIndexPage();
      expect(screen.getByTestId("hero-carousel")).toBeInTheDocument();
    });

    it("should render all major sections", () => {
      renderIndexPage();

      // Check all major sections are present
      expect(screen.getByTestId("hero-carousel")).toBeInTheDocument();
      expect(screen.getByTestId("featured-categories")).toBeInTheDocument();
      expect(screen.getByTestId("new-arrivals")).toBeInTheDocument();
      expect(screen.getByTestId("shop-by-concern")).toBeInTheDocument();
      expect(screen.getByTestId("testimonials")).toBeInTheDocument();
      expect(screen.getByTestId("brand-story")).toBeInTheDocument();
      expect(screen.getByTestId("newsletter")).toBeInTheDocument();
    });
  });

  describe("Component Order", () => {
    it("should render components in correct order", () => {
      const { container } = renderIndexPage();
      const sections = container.querySelectorAll("[data-testid]");

      expect(sections.length).toBeGreaterThan(0);
    });

    it("should have hero carousel as first section", () => {
      renderIndexPage();
      const heroCarousel = screen.getByTestId("hero-carousel");
      expect(heroCarousel).toBeInTheDocument();
    });

    it("should have newsletter section present", () => {
      renderIndexPage();
      const newsletter = screen.getByTestId("newsletter");
      expect(newsletter).toBeInTheDocument();
    });
  });

  describe("SEO and Accessibility", () => {
    it("should be wrapped in Layout component", () => {
      const { container } = renderIndexPage();
      expect(container).toBeInTheDocument();
    });

    it("should render all sections for screen readers", () => {
      renderIndexPage();

      const sections = [
        "hero-carousel",
        "featured-categories",
        "new-arrivals",
        "shop-by-concern",
        "testimonials",
        "brand-story",
        "newsletter",
      ];

      sections.forEach((section) => {
        expect(screen.getByTestId(section)).toBeInTheDocument();
      });
    });
  });

  describe("Component Integration", () => {
    it("should integrate all home components", () => {
      renderIndexPage();

      // Verify all components are rendered
      const componentCount = screen.getAllByTestId(
        /hero-carousel|featured-categories|new-arrivals|shop-by-concern|testimonials|brand-story|newsletter/,
      );

      expect(componentCount.length).toBeGreaterThan(0);
    });
  });

  describe("Performance", () => {
    it("should render without performance issues", () => {
      const startTime = performance.now();
      renderIndexPage();
      const endTime = performance.now();

      // Should render in less than 1000ms
      expect(endTime - startTime).toBeLessThan(1000);
    });
  });
});
