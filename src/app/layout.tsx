import "./globals.css";
import type { Metadata } from "next";
import { ThirdwebProvider } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";

export const metadata: Metadata = {
  title: "SmartFlood Web3",
  description: "Blockchain Flood Fund Management",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider
          activeChain={sepolia}
          clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!}
        >
          {children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
