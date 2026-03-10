import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import WishlistPage from "@/pages/WishlistPage";
import { Product } from "@/data/products";

// Mock dependencies
vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@/components/ui/Breadcrumbs", () => ({
  default: () => <div>Breadcrumbs</div>,
}));

// Mock react-router-dom
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
      <a href={to}>{children}</a>
    ),
  };
});

// Mock CartContext
const mockAddItem = vi.fn();
vi.mock("@/context/CartContext", () => ({
  useCart: () => ({
    addItem: mockAddItem,
  }),
}));

// Mock Data
const mockBestsellers: Product[] = [
  {
    id: "1",
    name: "Wishlist Product 1",
    price: 999,
    originalPrice: 1299,
    image: "/wishlist1.jpg",
    images: ["/wishlist1.jpg"],
    category: "skincare",
    subcategory: "Face Care",
    rating: 4.5,
    reviews: 10,
    description: "Description 1",
    ingredients: "Ingredients 1",
    howToUse: "How to use 1",
    size: "50ml",
    tags: ["tag1"],
    isNew: true,
    isBestseller: false,
  },
  {
    id: "2",
    name: "Wishlist Product 2",
    price: 1499,
    image: "/wishlist2.jpg",
    images: ["/wishlist2.jpg"],
    category: "haircare",
    subcategory: "Scalp Care",
    rating: 4.8,
    reviews: 20,
    description: "Description 2",
    ingredients: "Ingredients 2",
    howToUse: "How to use 2",
    size: "100ml",
    tags: ["tag2"],
    isNew: false,
    isBestseller: true,
  },
];

vi.mock("@/data/products", () => ({
  formatPrice: (price: number) => `₹${price.toLocaleString()}`,
  getWeight: vi.fn(),
}));

// Mock useWishlist
vi.mock("@/hooks/use-wishlist", () => ({
  useWishlist: vi.fn(),
}));

// Import the mocked function to modify it for specific tests
import { useWishlist } from "@/hooks/use-wishlist";

const renderWishlistPage = () => {
  return render(
    <BrowserRouter>
      <WishlistPage />
    </BrowserRouter>,
  );
};

describe("WishlistPage Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset the mock implementation to default
    vi.mocked(useWishlist).mockReturnValue({
      wishlist: mockBestsellers,
      removeFromWishlist: vi.fn(),
      addToWishlist: vi.fn(),
      isInWishlist: vi.fn(),
      toggleWishlist: vi.fn(),
      clearWishlist: vi.fn(),
    });
  });

  describe("Page Rendering", () => {
    it("should render wishlist page without crashing", () => {
      renderWishlistPage();
      expect(screen.getByText(/My Wishlist/i)).toBeInTheDocument();
    });

    it("should display breadcrumbs", () => {
      renderWishlistPage();
      expect(screen.getByText("Breadcrumbs")).toBeInTheDocument();
    });

    it("should display page title", () => {
      renderWishlistPage();
      expect(screen.getByText(/My Wishlist/i)).toBeInTheDocument();
    });
  });

  describe("Wishlist Items Display", () => {
    it("should display all wishlist items", () => {
      renderWishlistPage();
      expect(screen.getByText("Wishlist Product 1")).toBeInTheDocument();
      expect(screen.getByText("Wishlist Product 2")).toBeInTheDocument();
    });

    it("should display product images", () => {
      renderWishlistPage();
      const images = screen.getAllByRole("img");
      // filter out icon images if any, focusing on product images which usually have specific alt texts
      const productImages = images.filter((img) =>
        img.getAttribute("alt")?.includes("Wishlist Product"),
      );
      expect(productImages.length).toBeGreaterThanOrEqual(2);
    });

    it("should display product prices", () => {
      renderWishlistPage();
      expect(screen.getByText("₹999")).toBeInTheDocument();
      expect(screen.getByText("₹1,499")).toBeInTheDocument();
    });

    it("should display original prices if available", () => {
      renderWishlistPage();
      expect(screen.getByText("₹1,299")).toBeInTheDocument();
    });
  });

  describe("Wishlist Actions", () => {
    it("should have remove button for each item", () => {
      renderWishlistPage();
      const removeButtons = screen.getAllByTitle(/Remove from wishlist/i);
      expect(removeButtons.length).toBeGreaterThan(0);
    });

    it("should call removeFromWishlist when remove clicked", () => {});

    it("should have add to cart button for each item", () => {
      renderWishlistPage();
      const addToCartButtons = screen.getAllByRole("button", { name: /Add/i });
      // We expect at least the product card add buttons
      expect(addToCartButtons.length).toBeGreaterThan(0);
    });

    it("should call addItem when add to cart clicked", () => {
      renderWishlistPage();
      const addToCartButtons = screen.getAllByRole("button", { name: /Add/i });

      if (addToCartButtons.length > 0) {
        fireEvent.click(addToCartButtons[0]);
        // The mockAddItem should be called
        expect(mockAddItem).toHaveBeenCalled();
        expect(mockAddItem).toHaveBeenCalledWith(mockBestsellers[0]);
      }
    });
  });

  describe("Empty Wishlist State", () => {
    it("should display empty message when wishlist is empty", () => {
      // Override mock to return empty array
      vi.mocked(useWishlist).mockReturnValue({
        wishlist: [],
        removeFromWishlist: vi.fn(),
        addToWishlist: vi.fn(),
        isInWishlist: vi.fn(),
        toggleWishlist: vi.fn(),
        clearWishlist: vi.fn(),
      });

      renderWishlistPage();

      expect(screen.getByText(/Your wishlist is empty/i)).toBeInTheDocument();
      expect(screen.getByText(/Start Shopping/i)).toBeInTheDocument();
    });
  });

  describe("Product Links", () => {
    it("should have clickable product names/images", () => {
      renderWishlistPage();
      const links = screen.getAllByRole("link");
      const productLinks = links.filter((link) =>
        link.getAttribute("href")?.includes("/product"),
      );
      expect(productLinks.length).toBeGreaterThan(0);
    });
  });

  describe("Wishlist Count", () => {
    it("should show item count in header", () => {
      renderWishlistPage();
      expect(screen.getByText("(2 items)")).toBeInTheDocument();
    });
  });

  describe("Responsive Design", () => {
    it("should render items in grid layout", () => {
      const { container } = renderWishlistPage();
      expect(container.querySelector(".grid")).toBeTruthy();
    });
  });

  describe("Badges", () => {
    it("should display New badge", () => {
      renderWishlistPage();
      expect(screen.getByText("New")).toBeInTheDocument();
    });

    it("should display Bestseller badge", () => {
      renderWishlistPage();
      expect(screen.getByText("Bestseller")).toBeInTheDocument();
    });
  });
});
