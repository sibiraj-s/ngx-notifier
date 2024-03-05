import { Config } from 'tailwindcss';

const config: Config = {
  content: {
    relative: true,
    files: [
      './src/**/*.{html,ts}',
    ],
  },
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
