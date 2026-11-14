// Use the same Tailwind transform with both Next.js builders. CSS Modules retain
// their module identity instead of being aliased to ordinary global CSS.
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
