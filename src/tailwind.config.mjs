// tailwind.config.js
import withMT from "@material-tailwind/react/utils/withMT";

module.exports = withMT({
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // For Next.js App Router
    "./pages/**/*.{js,ts,jsx,tsx}", // For Next.js Pages Router
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
});
