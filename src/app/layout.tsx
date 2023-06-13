import { Navbar } from '~/components/layouts/navbar';
import { Footer } from '~/components/layouts/footer';

import "~/styles/globals.css";
import "react-awesome-slider/dist/styles.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // use a combination of slate colors to create a gradient
  const darkModeGradient = 'from-[#1e293b] to-[#0f172a]';
  // bg-gradient-to-b from-[#093679] to-[#00d4ff]
  const lightModeGradient = 'from-[#093679] to-[#00d4ff]';

  return (
    <html lang='EN'>
      <head />
      <body className={`flex min-h-screen flex-col bg-blue-900 dark:bg-gray-800 text-white`}>
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
