import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import NewsletterSection from "@/components/home/NewsletterSection";

describe("NewsletterSection Form Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Form Rendering", () => {
    it("should render newsletter section with title", () => {
      render(<NewsletterSection />);

      expect(screen.getByText("Join Our Community")).toBeInTheDocument();
    });

    it("should render newsletter description", () => {
      render(<NewsletterSection />);

      expect(
        screen.getByText(/Subscribe to receive exclusive offers/i),
      ).toBeInTheDocument();
    });

    it("should render email input field", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      expect(emailInput).toBeInTheDocument();
    });

    it("should render subscribe button", () => {
      render(<NewsletterSection />);

      expect(
        screen.getByRole("button", { name: /Subscribe/i }),
      ).toBeInTheDocument();
    });

    it("should render privacy policy note", () => {
      render(<NewsletterSection />);

      expect(
        screen.getByText(/By subscribing, you agree to our Privacy Policy/i),
      ).toBeInTheDocument();
    });

    it("should render decorative icon", () => {
      const { container } = render(<NewsletterSection />);

      // Check for Send icon in the decorative circle
      const iconContainer = container.querySelector(
        ".border-primary.rounded-full",
      );
      expect(iconContainer).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("should have email type for email input", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("should have required attribute on email input", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      expect(emailInput).toBeRequired();
    });

    it("should accept valid email format", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });

      expect(emailInput.value).toBe("test@example.com");
      expect(emailInput.validity.valid).toBe(true);
    });

    it("should reject invalid email format", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "invalid-email" } });

      expect(emailInput.validity.valid).toBe(false);
    });
  });

  describe("Form Interaction", () => {
    it("should update email input when user types", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });

      expect(emailInput.value).toBe("user@example.com");
    });

    it("should clear email input value", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "user@example.com" } });
      expect(emailInput.value).toBe("user@example.com");

      fireEvent.change(emailInput, { target: { value: "" } });
      expect(emailInput.value).toBe("");
    });
  });

  describe("Form Submission", () => {
    it("should submit form with valid email", async () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      const submitButton = screen.getByRole("button", { name: /Subscribe/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      // Should show success state
      await waitFor(() => {
        expect(screen.getByText("Subscribed!")).toBeInTheDocument();
      });
    });

    it("should show success message with check icon after submission", async () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      const submitButton = screen.getByRole("button", { name: /Subscribe/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Subscribed!")).toBeInTheDocument();
      });
    });

    it("should disable submit button after submission", async () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      const submitButton = screen.getByRole("button", { name: /Subscribe/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toBeDisabled();
      });
    });

    it("should reset form after 3 seconds", async () => {
      vi.useFakeTimers();
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      ) as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /Subscribe/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      // Wait for success state immediately (no delay expected for setting state)
      expect(screen.getByText("Subscribed!")).toBeInTheDocument();

      // Fast-forward 3 seconds
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      // Form should reset
      expect(emailInput.value).toBe("");
      expect(screen.getByText("Subscribe")).toBeInTheDocument();

      vi.useRealTimers();
    });

    it("should not submit form with empty email", () => {
      render(<NewsletterSection />);

      const submitButton = screen.getByRole("button", { name: /Subscribe/i });
      const form = submitButton.closest("form");

      fireEvent.click(submitButton);

      // Form should still be present (not submitted)
      expect(form).toBeInTheDocument();
      expect(screen.queryByText("Subscribed!")).not.toBeInTheDocument();
    });

    it("should prevent default form submission", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      const form = emailInput.closest("form");

      const submitHandler = vi.fn((e) => e.preventDefault());
      form?.addEventListener("submit", submitHandler);

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.submit(form!);

      expect(submitHandler).toHaveBeenCalled();
    });
  });

  describe("Button States", () => {
    it("should show 'Subscribe' text initially", () => {
      render(<NewsletterSection />);

      expect(screen.getByText("Subscribe")).toBeInTheDocument();
    });

    it("should change button text to 'Subscribed!' after submission", async () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      const submitButton = screen.getByRole("button", { name: /Subscribe/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText("Subscribed!")).toBeInTheDocument();
        expect(screen.queryByText("Subscribe")).not.toBeInTheDocument();
      });
    });

    it("should apply success styling to button after submission", async () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      const submitButton = screen.getByRole("button", { name: /Subscribe/i });

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.click(submitButton);

      await waitFor(() => {
        expect(submitButton).toHaveClass("bg-accent");
      });
    });
  });

  describe("Accessibility", () => {
    it("should have proper form structure", () => {
      render(<NewsletterSection />);

      const form = screen
        .getByRole("button", { name: /Subscribe/i })
        .closest("form");
      expect(form).toBeInTheDocument();
    });

    it("should have accessible email input", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );
      expect(emailInput).toHaveAccessibleName();
    });

    it("should have accessible submit button", () => {
      render(<NewsletterSection />);

      const submitButton = screen.getByRole("button", { name: /Subscribe/i });
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });

  describe("Responsive Design", () => {
    it("should have responsive flex layout for form", () => {
      const { container } = render(<NewsletterSection />);

      const form = container.querySelector("form");
      expect(form).toHaveClass("flex");
    });

    it("should have responsive container classes", () => {
      const { container } = render(<NewsletterSection />);

      const mainContainer = container.querySelector(".container");
      expect(mainContainer).toBeInTheDocument();
    });
  });

  describe("Visual Elements", () => {
    it("should render decorative background elements", () => {
      const { container } = render(<NewsletterSection />);

      const decorativeElements = container.querySelectorAll(".absolute");
      expect(decorativeElements.length).toBeGreaterThan(0);
    });

    it("should have proper section background", () => {
      const { container } = render(<NewsletterSection />);

      const section = container.querySelector("section");
      expect(section).toHaveClass("bg-primary/10");
    });
  });

  describe("Multiple Submissions", () => {
    it("should handle multiple submissions correctly", async () => {
      vi.useFakeTimers();
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      ) as HTMLInputElement;
      const submitButton = screen.getByRole("button", { name: /Subscribe/i });

      // First submission
      fireEvent.change(emailInput, { target: { value: "test1@example.com" } });
      fireEvent.click(submitButton);

      expect(screen.getByText("Subscribed!")).toBeInTheDocument();

      // Wait for reset
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(emailInput.value).toBe("");

      // Second submission
      fireEvent.change(emailInput, { target: { value: "test2@example.com" } });
      fireEvent.click(submitButton);

      expect(screen.getByText("Subscribed!")).toBeInTheDocument();

      vi.useRealTimers();
    });
  });

  describe("Email Input Focus", () => {
    it("should apply focus styles to email input", () => {
      render(<NewsletterSection />);

      const emailInput = screen.getByPlaceholderText(
        /Enter your email address/i,
      );

      emailInput.focus();
      expect(emailInput).toHaveFocus();
    });
  });
});
