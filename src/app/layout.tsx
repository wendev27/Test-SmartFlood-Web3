"use client";

import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

import { client } from "./lib/thirdwebClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Correct way for Thirdweb v5 */}
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
