import { Config } from 'tailwindcss';

const config: Config = {
  content: [
    // @todo: tailwind resolves from the root, regardless of project location
    './projects/demo/src/**/*.{html,ts}',
  ],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};

export default config;
