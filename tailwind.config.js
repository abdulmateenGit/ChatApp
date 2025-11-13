/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.tsx",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
    },
  },
  plugins: [function ({ addUtilities }) {
    addUtilities({
      ".ch-container": {
        flex: 1,
        padding: 16,
        gap: 16,
        backgroundColor: "#fff",
      },
      ".ch-button": {
        alignItems: "center",
        padding: 16,
        borderRadius: 9999,
        backgroundColor: "#3B82F6",
      },
      ".ch-button-text": {
        color: "#fff",
        fontSize: 18,
        fontWeight: 600,
      },
      ".ch-input": {
        border: 1,
        padding: 16,
        borderRadius: 8,
        borderColor: "#A3A3A3",
      },
      ".ch-text": {
        color: "#2563EB",
        fontWeight: 600,
      },

    })
  }],
}