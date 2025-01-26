import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        system: {
          error: {
            100: "##FAC2C2",
            200: "#F47777",
            300: "#EE2828",
            400: "#B90F0F",
            500: "#6F0909"
          },
          warning: {
            100: "#FFE7B9",
            200: "#FFC862",
            300: "#FFAB08",
            400: "#D08700",
            500: "#855600"
          },
          success: {
            100: "#BAF0CF",
            200: "#63DD94",
            300: "#26AF5D",
            400: "#1C7D43",
            500: "#114B28"
          }
        },
        background: {
          light: "#F8FDFF",
          dark: "#FDFDFD"
        },
        typography: {
          light: {
            title: "#161A1B",
            body: "#505151",
            subtitle: {
              1: "#1B3037",
              2: "#FEFFFF"
            }
          }
        },
        neutral: {
          1: "#0F1112",
          2: "#1C1E20",
          3: "#2B2F32",
          4: "#4D5255",
          5: "#7D8183",
          6: "#ACAFB0",
          7: "#DCDDDE",
          8: "#ECEDED",
          9: "#F5F5F5",
          10: "#FDFDFD"

        },
      },
      fontFamily: {
        sans: ['var(--font-inter)'],
      },
    },
  },
  plugins: [],
} satisfies Config;
