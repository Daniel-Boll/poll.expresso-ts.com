import { ThemeProvider } from "@/components/theme/provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Navbar } from "@/components/navbar";
import { SelectCampaign } from "@/components/select-campaign";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ExpressoTS Poll",
  description: "A poll app built with ExpressoTS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="flex flex-col items-center justify-between p-4 gap-10">
            <SelectCampaign />
            {children}
          </main>
          <footer className="bottom-0 w-full z-50 backdrop-blur-md bg-opacity-40">
            <div className="w-full flex flex-col items-center justify-between p-4 gap-10">
            <p className="text-center">
              Made with{" "}
              <span role="img" aria-label="love">
                ❤️
              </span>{" "}
              by ExpressoTS
            </p>
            </div>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
