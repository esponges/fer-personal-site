import { Navbar } from "~/components/molecules/navbar";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#093679] to-[#00d4ff] text-white">
      <Navbar />
      <main className="flex-grow">{children}</main>
    </div>
  );
};
