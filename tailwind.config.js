/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      boxShadow: {
        tableHead: "inset 0 0px 0px 2px hsla(162, 68%, 29%, 1)",
        tableBody: "0 1px 0 0 hsla(162, 68%, 29%, 1)",
        header: "0px 2px 7.1px 0px #00000040",
      },
      animation: {
        marquee: "marquee 80s linear infinite",
        "infinite-scroll": "infinite-scroll 35s linear infinite",
        "fade-in": "fade-in 0.5s ease-in forwards",
        "hamburger-menu": "hamburger-menu 0.5s ease-in forwards",
      },
      keyframes: {
        "hamburger-menu": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      gridTemplateColumns: {
        // Complex site-specific column configuration
        header: "300px 1fr 300px",
        footer: "auto 1fr auto",
        whyUs: "repeat(auto-fit, minmax(500px, 1fr))",
        teamMembers: "repeat(auto-fit, minmax(205px, 1fr))",
      },
      aspectRatio: {
        partnerCard: "20/13",
      },
      colors: {
        "kliv-sand": "hsla(0, 0%, 98%, 1)",
        "kliv-blue": "hsla(222, 45%, 42%, 1)",
        "kliv-blue-hover": "hsla(222, 65%, 42%, 1)",
        "kliv-primary": "#1E7A5E",
        "kliv-secondary": "#003629",
        "kliv-tertiary": "#3BB59E",
        "kliv-primary-hover": "hsla(162, 48%, 29%, 1)",
        "kliv-tertiary-hover": "#2F907E",
        "kliv-lightgreen": "hsla(163, 54%, 97%, 1)",

        "kliv-primary-hover-light": "hsla(162, 68%, 29%, .1)",

        "kliv-text-6": "hsla(213, 13%, 90%, 1)",
        "kliv-text-5": "hsla(213, 8%, 72%, 1)",
        "kliv-text-4": "hsla(220, 2%, 49%, 1)",
        "kliv-text-3": "hsla(0, 0%, 29%, 1)",
        "kliv-text-2": "hsla(210, 2%, 20%, 1)",
        "kliv-text-1": "hsla(0, 0%, 8%, 1)",

        "kliv-conciencia": "#3b579a",
        "kliv-consideracion": "#33b59e",
        "kliv-conversion": "#f7d355",
        "kliv-fidelizacion": "#e4793d",
        "kliv-recomendacion": "#e45b4a",
        "kliv-gradient-green":
          "linear-gradient(54.05deg, #2BA8C3 -30.22%, #219190 28.5%, #177B5D 87.22%)",
      },
      fontFamily: {
        "DM Sans": "DM Sans, sans-serif",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-radial-green":
          "linear-gradient(54.05deg, #2BA8C3 -30.22%, #219190 28.5%, #177B5D 87.22%)",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
