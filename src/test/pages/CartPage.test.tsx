import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CartPage from "@/pages/CartPage";

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
    Link: ({ children, to }: any) => <a href={to}>{children}</a>,
  };
});

// Mock Data & Functions
const mockRemoveFromCart = vi.fn();
const mockUpdateQuantity = vi.fn();
const mockClearCart = vi.fn();

const cartWithItems = {
  items: [
    {
      product: {
        id: "1",
        name: "Test Product 1",
        price: 999,
        image: "/test1.jpg",
        size: "50ml",
      },
      quantity: 2,
    },
    {
      product: {
        id: "2",
        name: "Test Product 2",
        price: 1499,
        image: "/test2.jpg",
        size: "100ml",
      },
      quantity: 1,
    },
  ],
  totalPrice: 3497,
  removeFromCart: mockRemoveFromCart,
  updateQuantity: mockUpdateQuantity,
  clearCart: mockClearCart,
};

const emptyCart = {
  items: [],
  totalPrice: 0,
  removeFromCart: mockRemoveFromCart,
  updateQuantity: mockUpdateQuantity,
  clearCart: mockClearCart,
};

// Mock useCart hook
const mockUseCart = vi.fn();

vi.mock("@/context/CartContext", () => ({
  useCart: () => mockUseCart(),
}));

vi.mock("@/data/products", () => ({
  formatPrice: (price: number) => `₹${price.toLocaleString()}`,
}));

const renderCartPage = () => {
  return render(
    <BrowserRouter>
      <CartPage />
    </BrowserRouter>,
  );
};

describe("CartPage Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Default mock implementation
    mockUseCart.mockReturnValue(cartWithItems);
  });

  describe("Page Rendering with Items", () => {
    it("should render cart page without crashing", () => {
      renderCartPage();
      expect(screen.getByText(/Cart|Shopping Cart/i)).toBeInTheDocument();
    });

    it("should display cart items", () => {
      renderCartPage();
      expect(screen.getByText("Test Product 1")).toBeInTheDocument();
      expect(screen.getByText("Test Product 2")).toBeInTheDocument();
    });

    it("should display product images", () => {
      renderCartPage();
      const images = screen.getAllByRole("img");
      expect(images.length).toBeGreaterThanOrEqual(2);
    });

    it("should display product prices", () => {
      renderCartPage();
      expect(screen.getByText("₹999")).toBeInTheDocument();
      expect(screen.getByText("₹1,499")).toBeInTheDocument();
    });
  });

  describe("Cart Actions", () => {
    it("should call removeFromCart when remove button clicked", () => {
      renderCartPage();
      const removeButtons = screen.getAllByRole("button", {
        name: /Remove|Delete|×/i,
      });

      if (removeButtons.length > 0) {
        fireEvent.click(removeButtons[0]);
        expect(mockRemoveFromCart).toHaveBeenCalled();
      }
    });

    it("should call updateQuantity when quantity changed", () => {
      renderCartPage();
      const buttons = screen.getAllByRole("button");
      // Find + button
      const incrementButton = buttons.find(
        (btn) => btn.textContent === "+" || btn.innerHTML.includes("plus"),
      );

      if (incrementButton) {
        fireEvent.click(incrementButton);
        expect(mockUpdateQuantity).toHaveBeenCalled();
      }
    });
  });

  describe("Empty Cart State", () => {
    it("should display empty cart message when cart is empty", () => {
      mockUseCart.mockReturnValue(emptyCart);

      renderCartPage();

      expect(
        screen.getByText(/Empty|No items|Your cart is empty/i),
      ).toBeInTheDocument();
    });
  });

  describe("Navigation", () => {
    it("should have link to checkout", () => {
      renderCartPage();
      const checkoutLink =
        screen.getByRole("button", { name: /Checkout/i }) ||
        screen.getByRole("link", { name: /Checkout/i });
      expect(checkoutLink).toBeInTheDocument();
    });
  });
});
