"use client";

import React from "react";
import {
  ThirdwebProvider,
  AccountProvider,
  ChainProvider,
} from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import "./globals.css";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID!,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThirdwebProvider>
          {/* ✅ Define which chain your app is on */}
          <ChainProvider chain={sepolia}>
            {/* ✅ Provide wallet/account context */}
            <AccountProvider
              client={client}
              address={process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!}
            >
              {children}
            </AccountProvider>
          </ChainProvider>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
