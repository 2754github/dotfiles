import vercel from '@vercel/style-guide/prettier';

const config = {
  ...vercel,
  plugins: [...vercel.plugins, 'prettier-plugin-tailwindcss'],
};

export default config;
