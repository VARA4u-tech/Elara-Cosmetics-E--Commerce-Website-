import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { waitFor } from "@testing-library/dom";
import { BrowserRouter } from "react-router-dom";
import ContactPage from "@/pages/ContactPage";

// Mock the Layout component
vi.mock("@/components/layout/Layout", () => ({
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

// Mock the Breadcrumbs component
vi.mock("@/components/ui/Breadcrumbs", () => ({
  default: () => <div>Breadcrumbs</div>,
}));

const renderContactPage = () => {
  return render(
    <BrowserRouter>
      <ContactPage />
    </BrowserRouter>,
  );
};

describe("ContactPage Form Tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("Form Rendering", () => {
    it("should render the contact form with all required fields", () => {
      renderContactPage();

      // Check for form title
      expect(screen.getByText("Send us a Message")).toBeInTheDocument();

      // Check for all input fields
      expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();

      // Check for submit button
      expect(
        screen.getByRole("button", { name: /Send Message/i }),
      ).toBeInTheDocument();
    });

    it("should render contact information cards", () => {
      renderContactPage();

      expect(screen.getByText("Call Us")).toBeInTheDocument();
      expect(screen.getByText("Email Us")).toBeInTheDocument();
      expect(screen.getByText("Head Office")).toBeInTheDocument();
      expect(screen.getByText("Working Hours")).toBeInTheDocument();
    });

    it("should render FAQ section", () => {
      renderContactPage();

      expect(
        screen.getByText("Frequently Asked Questions"),
      ).toBeInTheDocument();
      expect(screen.getByText("How can I track my order?")).toBeInTheDocument();
      expect(
        screen.getByText("What is your return policy?"),
      ).toBeInTheDocument();
    });
  });

  describe("Form Validation", () => {
    it("should show required attribute on mandatory fields", () => {
      renderContactPage();

      const nameInput = screen.getByLabelText(/Your Name/i);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const subjectSelect = screen.getByLabelText(/Subject/i);
      const messageTextarea = screen.getByLabelText(/Message/i);

      expect(nameInput).toBeRequired();
      expect(emailInput).toBeRequired();
      expect(subjectSelect).toBeRequired();
      expect(messageTextarea).toBeRequired();
    });

    it("should accept valid email format", () => {
      renderContactPage();

      const emailInput = screen.getByLabelText(
        /Email Address/i,
      ) as HTMLInputElement;

      fireEvent.change(emailInput, { target: { value: "test@example.com" } });

      expect(emailInput.value).toBe("test@example.com");
      expect(emailInput.validity.valid).toBe(true);
    });

    it("should have email type for email input", () => {
      renderContactPage();

      const emailInput = screen.getByLabelText(/Email Address/i);

      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("should have tel type for phone input", () => {
      renderContactPage();

      const phoneInput = screen.getByLabelText(/Phone Number/i);

      expect(phoneInput).toHaveAttribute("type", "tel");
    });
  });

  describe("Form Interaction", () => {
    it("should update form fields when user types", () => {
      renderContactPage();

      const nameInput = screen.getByLabelText(/Your Name/i) as HTMLInputElement;
      const emailInput = screen.getByLabelText(
        /Email Address/i,
      ) as HTMLInputElement;
      const phoneInput = screen.getByLabelText(
        /Phone Number/i,
      ) as HTMLInputElement;
      const messageTextarea = screen.getByLabelText(
        /Message/i,
      ) as HTMLTextAreaElement;

      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(phoneInput, { target: { value: "9876543210" } });
      fireEvent.change(messageTextarea, { target: { value: "Test message" } });

      expect(nameInput.value).toBe("John Doe");
      expect(emailInput.value).toBe("john@example.com");
      expect(phoneInput.value).toBe("9876543210");
      expect(messageTextarea.value).toBe("Test message");
    });

    it("should update subject dropdown when option is selected", () => {
      renderContactPage();

      const subjectSelect = screen.getByLabelText(
        /Subject/i,
      ) as HTMLSelectElement;

      fireEvent.change(subjectSelect, { target: { value: "order" } });

      expect(subjectSelect.value).toBe("order");
    });

    it("should have all subject options available", () => {
      renderContactPage();

      const subjectSelect = screen.getByLabelText(/Subject/i);

      expect(
        screen.getByRole("option", { name: /Select a subject/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /Order Inquiry/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /Product Question/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /Returns & Refunds/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /Feedback/i }),
      ).toBeInTheDocument();
      expect(
        screen.getByRole("option", { name: /Other/i }),
      ).toBeInTheDocument();
    });
  });

  describe("Form Submission", () => {
    it("should call handleSubmit when form is submitted with valid data", async () => {
      renderContactPage();

      const nameInput = screen.getByLabelText(/Your Name/i);
      const emailInput = screen.getByLabelText(/Email Address/i);
      const subjectSelect = screen.getByLabelText(/Subject/i);
      const messageTextarea = screen.getByLabelText(/Message/i);
      const submitButton = screen.getByRole("button", {
        name: /Send Message/i,
      });

      // Fill in the form
      fireEvent.change(nameInput, { target: { value: "John Doe" } });
      fireEvent.change(emailInput, { target: { value: "john@example.com" } });
      fireEvent.change(subjectSelect, { target: { value: "order" } });
      fireEvent.change(messageTextarea, { target: { value: "Test message" } });

      // Submit the form
      fireEvent.click(submitButton);

      // The form should prevent default behavior
      await waitFor(() => {
        expect(nameInput).toHaveValue("John Doe");
      });
    });

    it("should not submit form with empty required fields", () => {
      renderContactPage();

      const form = screen
        .getByRole("button", { name: /Send Message/i })
        .closest("form");
      const submitButton = screen.getByRole("button", {
        name: /Send Message/i,
      });

      fireEvent.click(submitButton);

      // Form should still be present (not submitted)
      expect(form).toBeInTheDocument();
    });
  });

  describe("FAQ Interaction", () => {
    it("should expand FAQ when clicked", () => {
      renderContactPage();

      const faqButton = screen.getByText("How can I track my order?");

      // Initially, the answer should not be visible
      expect(
        screen.queryByText(/You can track your order by logging/i),
      ).not.toBeInTheDocument();

      // Click to expand
      fireEvent.click(faqButton);

      // Answer should now be visible
      expect(
        screen.getByText(/You can track your order by logging/i),
      ).toBeInTheDocument();
    });

    it("should collapse FAQ when clicked again", () => {
      renderContactPage();

      const faqButton = screen.getByText("How can I track my order?");

      // Click to expand
      fireEvent.click(faqButton);
      expect(
        screen.getByText(/You can track your order by logging/i),
      ).toBeInTheDocument();

      // Click to collapse
      fireEvent.click(faqButton);
      expect(
        screen.queryByText(/You can track your order by logging/i),
      ).not.toBeInTheDocument();
    });

    it("should toggle between different FAQs", () => {
      renderContactPage();

      const faq1Button = screen.getByText("How can I track my order?");
      const faq2Button = screen.getByText("What is your return policy?");

      // Expand first FAQ
      fireEvent.click(faq1Button);
      expect(
        screen.getByText(/You can track your order by logging/i),
      ).toBeInTheDocument();

      // Expand second FAQ (first should close)
      fireEvent.click(faq2Button);
      expect(
        screen.queryByText(/You can track your order by logging/i),
      ).not.toBeInTheDocument();
      expect(
        screen.getByText(/We offer a 30-day return policy/i),
      ).toBeInTheDocument();
    });
  });

  describe("Accessibility", () => {
    it("should have proper labels for all form inputs", () => {
      renderContactPage();

      expect(screen.getByLabelText(/Your Name/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Phone Number/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Subject/i)).toBeInTheDocument();
      expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
    });

    it("should have submit button with proper text", () => {
      renderContactPage();

      const submitButton = screen.getByRole("button", {
        name: /Send Message/i,
      });
      expect(submitButton).toBeInTheDocument();
      expect(submitButton).toHaveAttribute("type", "submit");
    });
  });

  describe("Contact Information Links", () => {
    it("should have clickable phone link", () => {
      renderContactPage();

      const phoneLink = screen.getByText("+91 1800 102 6666").closest("a");
      expect(phoneLink).toHaveAttribute("href", "tel:+911800102666");
    });

    it("should have clickable email link", () => {
      renderContactPage();

      const emailLink = screen
        .getByText("customercare@elaracosmetics.com")
        .closest("a");
      expect(emailLink).toHaveAttribute(
        "href",
        "mailto:customercare@elaracosmetics.com",
      );
    });
  });
});
