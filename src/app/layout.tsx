import { Navbar } from '~/components/layouts/navbar';
import { Footer } from '~/components/layouts/footer';

import "~/styles/globals.css";
import "react-awesome-slider/dist/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='EN'>
      <head />
      <body className="flex min-h-screen flex-col bg-blue-900 dark:bg-gray-800 font-color--primary">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
