import lineClamp from "@tailwindcss/line-clamp";

export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: { extend: {} },
  plugins: [lineClamp],
};