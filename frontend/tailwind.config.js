/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#eef6fb",
        primary: "#0e3a55",
        "primary-foreground": "#ffffff",
        secondary: "#e9f2f8",
        border: "#e5e7eb",
        card: "#ffffff",
        muted: "#e5e7eb",
        accent: "#e15b64",
        foreground: "#0f172a",
        "muted-foreground": "#64748b",
      },
    },
  },
  plugins: [],
};
