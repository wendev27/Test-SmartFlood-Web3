"use client";

import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* ✅ Correct modern Thirdweb setup */}
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
