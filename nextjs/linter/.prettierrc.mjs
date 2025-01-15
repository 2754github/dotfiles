import vercel from '@vercel/style-guide/prettier';

const config = {
  ...vercel,
  plugins: [...vercel.plugins],
};

export default config;
