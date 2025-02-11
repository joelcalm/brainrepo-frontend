// tailwind.config.ts
import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
import animate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#9b87f5",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#7E69AB",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#D6BCFA",
          foreground: "#1A1F2C",
        },
        muted: {
          DEFAULT: "#F8F7FD",
          foreground: "#6E59A5",
        },
      },
      fontFamily: {
        sans: ["Outfit", "sans-serif"],
        heading: ["Outfit", "sans-serif"],
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        // Keyframes for the moving gradient
        gradient: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.5s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        // Moving gradient animation (15s duration, infinite loop)
        gradient: "gradient 15s ease infinite",
      },
      // Extend background size for the gradient animation
      backgroundSize: {
        '200': '200% 200%',
      },
    },
  },
  plugins: [
    // Import the tailwindcss-animate plugin via ES module
    animate,
    // Custom plugin to add a .title utility class
    plugin(function ({ addUtilities, theme }) {
      const sansFamily = theme("fontFamily.sans");
      const sansFont = Array.isArray(sansFamily)
        ? sansFamily.join(", ")
        : sansFamily;
      const newUtilities = {
        ".title": {
          fontFamily: sansFont,
          // Adjust the title size here.
          // To make the titles slightly smaller, change fontSize. For example, use theme("fontSize.4xl")
          fontSize: theme("fontSize.5xl") || "3rem",
          fontWeight: "600",
          lineHeight: "1.2",
          // Gradient text: from primary to secondary colors.
          backgroundImage: `linear-gradient(to right, ${theme("colors.primary.DEFAULT")}, ${theme("colors.secondary.DEFAULT")})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
        },
      };
      addUtilities(newUtilities, ["responsive", "hover"]);
    }),
  ],
} satisfies Config;
