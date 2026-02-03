import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import CheckoutPage from "@/pages/CheckoutPage";

// Mock dependencies
vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock CartContext
const mockClearCart = vi.fn();
const mockUseCart = vi.fn();

const cartWithItems = {
  items: [
    {
      product: {
        id: "1",
        name: "Test Product",
        price: 999,
        image: "/test-image.jpg",
        size: "50ml",
      },
      quantity: 2,
    },
  ],
  totalPrice: 1998,
  clearCart: mockClearCart,
};

const emptyCart = {
  items: [],
  totalPrice: 0,
  clearCart: mockClearCart,
};

vi.mock("@/context/CartContext", () => ({
  useCart: () => mockUseCart(),
}));

const renderCheckoutPage = () => {
  return render(
    <BrowserRouter>
      <CheckoutPage />
    </BrowserRouter>,
  );
};

describe("CheckoutPage Form Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseCart.mockReturnValue(cartWithItems);
    // Reset window.open mock
    global.window.open = vi.fn();
  });

  describe("Form Rendering", () => {
    it("should render checkout page with shipping information form", () => {
      renderCheckoutPage();

      expect(screen.getByText("Checkout")).toBeInTheDocument();
      expect(screen.getByText("Shipping Information")).toBeInTheDocument();
    });

    it("should render all required form fields", () => {
      renderCheckoutPage();

      expect(screen.getByPlaceholderText(/First Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Last Name/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Phone/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/Address/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/City/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/State/i)).toBeInTheDocument();
      expect(screen.getByPlaceholderText(/PIN Code/i)).toBeInTheDocument();
    });

    it("should render order summary section", () => {
      renderCheckoutPage();

      expect(screen.getByText("Order Summary")).toBeInTheDocument();
      expect(screen.getByText("Test Product")).toBeInTheDocument();
      expect(screen.getByText("Qty: 2")).toBeInTheDocument();
    });

    it("should render WhatsApp checkout button", () => {
      renderCheckoutPage();

      expect(
        screen.getByRole("button", { name: /Complete Order via WhatsApp/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("should have required attribute on mandatory fields", () => {
      renderCheckoutPage();

      const firstNameInput = screen.getByPlaceholderText(/First Name/i);
      const phoneInput = screen.getByPlaceholderText(/Phone/i);
      const addressInput = screen.getByPlaceholderText(/Address/i);
      const cityInput = screen.getByPlaceholderText(/City/i);
      const pincodeInput = screen.getByPlaceholderText(/PIN Code/i);

      expect(firstNameInput).toBeRequired();
      expect(phoneInput).toBeRequired();
      expect(addressInput).toBeRequired();
      expect(cityInput).toBeRequired();
      expect(pincodeInput).toBeRequired();
    });
  });

  describe("Form Interaction", () => {
    it("should update form fields when user types", () => {
      renderCheckoutPage();

      const firstNameInput = screen.getByPlaceholderText(
        /First Name/i,
      ) as HTMLInputElement;
      const lastNameInput = screen.getByPlaceholderText(
        /Last Name/i,
      ) as HTMLInputElement;
      const emailInput = screen.getByPlaceholderText(
        /Email/i,
      ) as HTMLInputElement;
      const phoneInput = screen.getByPlaceholderText(
        /Phone/i,
      ) as HTMLInputElement;

      fireEvent.change(firstNameInput, { target: { value: "John" } });
      fireEvent.change(lastNameInput, { target: { value: "Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(phoneInput, { target: { value: "9876543210" } });

      expect(firstNameInput.value).toBe("John");
      expect(lastNameInput.value).toBe("Doe");
      expect(emailInput.value).toBe("john@example.com");
      expect(phoneInput.value).toBe("9876543210");
    });
  });

  describe("WhatsApp Checkout Functionality", () => {
    it("should open WhatsApp with correct message when form is valid", async () => {
      renderCheckoutPage();

      // Fill in required fields
      fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Phone/i), {
        target: { value: "9876543210" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Address/i), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByPlaceholderText(/City/i), {
        target: { value: "Mumbai" },
      });
      fireEvent.change(screen.getByPlaceholderText(/PIN Code/i), {
        target: { value: "400001" },
      });

      const checkoutButton = screen.getByRole("button", {
        name: /Complete Order via WhatsApp/i,
      });
      fireEvent.click(checkoutButton);

      await waitFor(() => {
        expect(window.open).toHaveBeenCalled();
        const callArgs = (window.open as any).mock.calls[0];
        expect(callArgs[0]).toContain("https://wa.me/918019156646");
      });
    });

    it("should clear cart after successful WhatsApp checkout", async () => {
      renderCheckoutPage();

      // Fill in required fields
      fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Phone/i), {
        target: { value: "9876543210" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Address/i), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByPlaceholderText(/City/i), {
        target: { value: "Mumbai" },
      });
      fireEvent.change(screen.getByPlaceholderText(/PIN Code/i), {
        target: { value: "400001" },
      });

      const checkoutButton = screen.getByRole("button", {
        name: /Complete Order via WhatsApp/i,
      });
      fireEvent.click(checkoutButton);

      await waitFor(() => {
        expect(mockClearCart).toHaveBeenCalled();
      });
    });
  });

  describe("Empty Cart Handling", () => {
    it("should show error when cart is empty", async () => {
      // Setup empty cart
      mockUseCart.mockReturnValue(emptyCart);

      const { toast } = await import("sonner");
      renderCheckoutPage();

      const checkoutButton = screen.getByRole("button", {
        name: /Complete Order via WhatsApp/i,
      });

      // Need to fill required fields first or it will fail on validation
      fireEvent.change(screen.getByPlaceholderText(/First Name/i), {
        target: { value: "John" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Phone/i), {
        target: { value: "9876543210" },
      });
      fireEvent.change(screen.getByPlaceholderText(/Address/i), {
        target: { value: "123 Main St" },
      });
      fireEvent.change(screen.getByPlaceholderText(/City/i), {
        target: { value: "Mumbai" },
      });
      fireEvent.change(screen.getByPlaceholderText(/PIN Code/i), {
        target: { value: "400001" },
      });

      fireEvent.click(checkoutButton);

      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith("Your cart is empty");
      });
    });
  });
});
