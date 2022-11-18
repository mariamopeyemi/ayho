/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      borderRadius: {
        primary: "var(--border-radius-primary)",
        secondary: "var(--border-radius-secondary)",
      },
      fontFamily: {
        // Add your custom fonts and enjoy.
        sans: ["'Plus Jakarta Sans'", "sans-serif"],
        rubik: ["'Rubik'", "sans-serif"],
      },
      colors: {
        pv_primary: "var(--color-primary-main)",
        pv_primary_light: "var(--color-primary-light)",
        pv_bg: "var(--color-bg)",
        pv_dark: "var(--color-primary-dark)",
        error: "var(--color-error)",
        error_light: "var(--color-error-light)",
        warn: "var(--color-warn)",
        warn_light: "var( --color-warn-light)",
        label: "var(--color-label)",
        text: "var(--color-text)",
        input: "var(--color-input)",
        border: "var(--color-border)",
        shadow: "var(--shadow-primary)",
      },
      boxShadow: {
        DEFAULT: "8px 20px 30px rgba(26, 142, 240, 0.05)",
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
};
