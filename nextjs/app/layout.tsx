import type { Children } from '@/lib/util/type';
import './globals.css';

const RootLayout = ({ children }: Children) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
};

export default RootLayout;
