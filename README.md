# 🌿 Elara Cosmetics - Premium Ayurvedic Skincare

Welcome to the **Elara Cosmetics** e-commerce platform. This project is a modern, responsive web application built for a premium skincare brand, blending ancient Ayurvedic wisdom with contemporary beauty solutions.

![WhatsApp Image 2026-02-07 at 8 12 19 PM](https://github.com/user-attachments/assets/48935aa5-b57a-48c0-8a7e-fc01a8b0fde6)


## 🚀 Project Overview

Elara Cosmetics is a fully functional front-end e-commerce website designed to provide a luxurious shopping experience. It features a complete user journey from product discovery to checkout via WhatsApp.

### ✨ Key Features

- **Premium UI/UX**: Elegant design using **Tailwind CSS** and **Shadcn UI** with glassmorphism effects and smooth animations.
- **E-Commerce Core**:
  - Product Browsing & Filtering
  - **Shopping Cart** & **Wishlist** management
  - Dynamic Search & Navigation
- **WhatsApp Checkout**: Unique direct-to-WhatsApp order completion flow for personalized service.
- **Robust Forms**:
  - Strict validation for Contact and Checkout forms.
  - **Input Restrictions**: Name/City/State fields accept only alphabets; Phone fields accept only numbers (max 10 digits) with automatic `+91` prefix visualization.
- **Accessibility**: Optimized form fields with proper labels (`aria-label`, `htmlFor`) for better accessibility.

## 🛠️ Technology Stack

This project is built with a modern frontend stack:

- **Framework**: [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **Testing**: [Vitest](https://vitest.dev/) + [React Testing Library](https://testing-library.com/)

## 🏃‍♂️ Getting Started

Follow these steps to set up the project locally:

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1.  **Clone the repository**

    ```bash
    git clone <repository-url>
    cd Elara-Cosmetics-E--Commerce-Website-
    ```

2.  **Install dependencies**

    ```bash
    npm install
    ```

3.  **Run the development server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:8080](http://localhost:8080) to view it in the browser.

## 🧪 Testing

The application is covered by a comprehensive test suite ensuring reliability across critical pages.

**Run All Tests:**

```bash
npm test
```

**Test Coverage Highlights:**

- **Core Pages**: Index, Product, Cart, Checkout, Wishlist.
- **Information Pages**: Contact, About, FAQs.
- **Features**: Form validation, Cart logic, Navigation.

## 📂 Project Structure

```
src/
├── components/     # Reusable UI components (Layout, UI kit, Features)
├── context/        # React Context (Cart, Wishlist, Audio)
├── data/           # Static product and content data
├── pages/          # Main route pages (Home, Shop, Contact, etc.)
├── test/           # Test files (*.test.tsx) and setup
├── App.tsx         # Main application entry
└── main.tsx        # DOM entry point
```

## 🔐 Form Validation Details

To ensure high data quality, the following restrictions are implemented:

- **Name Fields**: Allow only alphabets and spaces.
- **City/State**: Allow only alphabets and spaces.
- **Phone Number**: Allows only digits, limited to 10 characters, displayed with `+91` prefix.

---

Built with ❤️ for Elara Cosmetics.
