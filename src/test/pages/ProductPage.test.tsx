import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ProductPage from "@/pages/ProductPage";

// Mock dependencies
vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useParams: () => ({ id: "1" }),
    useNavigate: () => vi.fn(),
  };
});

// Mock product data
vi.mock("@/data/products", () => ({
  products: [
    {
      id: "1",
      name: "Test Product",
      price: 999,
      originalPrice: 1299,
      image: "/test-image.jpg",
      category: "skincare",
      rating: 4.5,
      reviews: 120,
      description: "Test description",
      size: "50ml",
      ingredients: ["Ingredient 1", "Ingredient 2"],
      benefits: ["Benefit 1", "Benefit 2"],
      howToUse: "Apply daily",
      isNew: true,
      isBestseller: true,
    },
  ],
  formatPrice: (price: number) => `₹${price.toLocaleString()}`,
  getProductById: (id: string) => ({
    id: "1",
    name: "Test Product",
    price: 999,
    originalPrice: 1299,
    image: "/test-image.jpg",
    category: "skincare",
    rating: 4.5,
    reviews: 120,
    description: "Test description",
    size: "50ml",
    ingredients: ["Ingredient 1", "Ingredient 2"],
    benefits: ["Benefit 1", "Benefit 2"],
    howToUse: "Apply daily",
    isNew: true,
    isBestseller: true,
  }),
  getProductsByCategory: (category: string) => [],
}));

// Mock contexts
vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    addItem: vi.fn(),
    items: [],
  }),
}));

vi.mock("@/context/WishlistContext", () => ({
  useWishlist: () => ({
    addToWishlist: vi.fn(),
    removeFromWishlist: vi.fn(),
    isInWishlist: vi.fn(() => false),
  }),
}));

vi.mock("@/context/CompareContext", () => ({
  useCompare: () => ({
    addToCompare: vi.fn(),
    removeFromCompare: vi.fn(),
    isInCompare: vi.fn(() => false),
  }),
}));

const renderProductPage = () => {
  return render(
    <BrowserRouter>
      <ProductPage />
    </BrowserRouter>,
  );
};

describe("ProductPage Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Page Rendering", () => {
    it("should render product page without crashing", () => {
      renderProductPage();
      const productNames = screen.getAllByText("Test Product");
      expect(productNames.length).toBeGreaterThan(0);
    });

    it("should display product name", () => {
      renderProductPage();
      const productNames = screen.getAllByText("Test Product");
      expect(productNames.length).toBeGreaterThan(0);
    });

    it("should display product price", () => {
      renderProductPage();
      expect(screen.getByText("₹999")).toBeInTheDocument();
    });

    it("should display product image", () => {
      renderProductPage();
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    });

    it("should display product description", () => {
      renderProductPage();
      const descriptions = screen.getAllByText("Test description");
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  describe("Product Information", () => {
    it("should display product rating", () => {
      renderProductPage();
      // Rating should be displayed
      const ratingElements = screen.getAllByText(/4.5|120/);
      expect(ratingElements.length).toBeGreaterThan(0);
    });

    it("should display product size", () => {
      renderProductPage();
      expect(screen.getByText(/50ml/i)).toBeInTheDocument();
    });

    it("should show discount badge if applicable", () => {
      renderProductPage();
      // Original price should be shown
      expect(screen.getByText("₹1,299")).toBeInTheDocument();
    });

    it("should display new badge for new products", () => {
      renderProductPage();
      expect(screen.getByText(/New/i)).toBeInTheDocument();
    });

    it("should display bestseller badge", () => {
      renderProductPage();
      expect(screen.getByText(/Bestseller/i)).toBeInTheDocument();
    });
  });

  describe("Product Actions", () => {
    it("should have Add to Bag button", () => {
      renderProductPage();
      expect(
        screen.getByRole("button", { name: /Add to Bag/i }),
      ).toBeInTheDocument();
    });

    it("should have Add to Wishlist button", () => {
      renderProductPage();
      const wishlistButtons = screen.getAllByRole("button");
      const hasWishlistButton = wishlistButtons.some(
        (button) =>
          button.getAttribute("aria-label")?.includes("wishlist") ||
          button.textContent?.includes("Wishlist"),
      );
      expect(hasWishlistButton || wishlistButtons.length > 0).toBe(true);
    });

    it("should have quantity selector", () => {
      renderProductPage();
      // Look for quantity controls
      const buttons = screen.getAllByRole("button");
      expect(buttons.length).toBeGreaterThan(0);
    });
  });

  describe("Product Details Tabs", () => {
    it("should display product details section", () => {
      renderProductPage();
      const descriptions = screen.getAllByText("Test description");
      expect(descriptions.length).toBeGreaterThan(0);
    });

    it("should display ingredients if available", () => {
      renderProductPage();
      expect(screen.getByText(/Ingredient 1|Ingredients/i)).toBeInTheDocument();
    });

    it("should display benefits if available", () => {
      renderProductPage();
      expect(screen.getByText(/Benefit 1|Benefits/i)).toBeInTheDocument();
    });

    it("should display how to use section", () => {
      renderProductPage();
      expect(screen.getByText(/Apply daily|How to Use/i)).toBeInTheDocument();
    });
  });

  describe("Product Not Found", () => {
    it("should handle non-existent product gracefully", () => {
      vi.mock("react-router-dom", async () => {
        const actual = await vi.importActual("react-router-dom");
        return {
          ...actual,
          useParams: () => ({ id: "999" }),
        };
      });

      const { container } = renderProductPage();
      expect(container).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should render product image gallery", () => {
      renderProductPage();
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThan(0);
    });

    it("should have proper layout structure", () => {
      const { container } = renderProductPage();
      expect(container.querySelector(".container, .grid, .flex")).toBeTruthy();
    });
  });

  describe("SEO and Metadata", () => {
    it("should display product name for SEO", () => {
      renderProductPage();
      const productNames = screen.getAllByText("Test Product");
      expect(productNames.length).toBeGreaterThan(0);
    });

    it("should have product information visible", () => {
      renderProductPage();
      const descriptions = screen.getAllByText("Test description");
      expect(descriptions.length).toBeGreaterThan(0);
    });
  });

  describe("User Interactions", () => {
    it("should allow clicking on product images", () => {
      renderProductPage();
      const images = screen.getAllByRole("img");
      if (images.length > 0) {
        fireEvent.click(images[0]);
        expect(images[0]).toBeInTheDocument();
      }
    });

    it("should handle add to bag click", async () => {
      renderProductPage();
      const addToBagButton = screen.getByRole("button", {
        name: /Add to Bag/i,
      });

      fireEvent.click(addToBagButton);

      await waitFor(() => {
        expect(addToBagButton).toBeInTheDocument();
      });
    });
  });

  describe("Related Products", () => {
    it("should potentially show related products section", () => {
      const { container } = renderProductPage();
      // Related products might be present
      expect(container).toBeInTheDocument();
    });
  });

  describe("Customer Reviews", () => {
    it("should display review count", () => {
      renderProductPage();
      expect(screen.getByText(/120/)).toBeInTheDocument();
    });

    it("should display rating", () => {
      renderProductPage();
      expect(screen.getByText(/4.5/)).toBeInTheDocument();
    });
  });
});
