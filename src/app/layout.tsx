import type { Metadata } from "next";
import "./globals.css";
import CustomReduxProvider from "../components/layout/CustomReduxProvider";
import CustomPrivyProvider from '@/components/layout/CustomPrivyProvider'

export const metadata: Metadata = {
  title: "Trenzora",
  description: "Discover and trade trending tokens on Zora",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomReduxProvider>
          <CustomPrivyProvider>
            {children}
          </CustomPrivyProvider>
        </CustomReduxProvider>
      </body>
    </html>
  );
}
