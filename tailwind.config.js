/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      sm: { max: "600px" },
      // md: '768px',
      md: { max: "768px" },
      lg: { max: "1024px" },
      xl: { max: "1280px" },
      // lg: '976px',
    },  
    colors: {
      pink: "#f6f1fb",
      white: "#FFFFFF",
      darkGrey: "#b1b4c4",
      gray: "#757575",
      blue: "#384dff",
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
