import { ThirdwebProvider } from "thirdweb/react";
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
        {/* ✅ New API: wrap with provider + manually pass client and chain */}
        <ThirdwebProvider>{children}</ThirdwebProvider>
      </body>
    </html>
  );
}
