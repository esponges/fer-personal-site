import { Navbar } from '~/components/layouts/navbar';
import { Footer } from '~/components/layouts/footer';

import "~/styles/globals.css";
import "react-awesome-slider/dist/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className="flex min-h-screen flex-col bg-gradient-to-b from-[#093679] to-[#00d4ff] text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
