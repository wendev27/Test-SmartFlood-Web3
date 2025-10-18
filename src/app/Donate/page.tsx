"use client";

import { useState } from "react";
import {
  prepareContractCall,
  toWei,
  getContract,
  sendTransaction,
} from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { client } from "@/app/lib/thirdwebClient";

export default function DonateButton({ fundId }: { fundId: number }) {
  const account = useActiveAccount();
  const [isLoading, setIsLoading] = useState(false);

  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  });

  const handleDonate = async () => {
    if (!account) return alert("Please connect your wallet first!");

    try {
      setIsLoading(true);

      const valueInEth = "0.01";

      const transaction = prepareContractCall({
        contract,
        method: "function donateToFloodFund(uint256 _id) payable",
        params: [fundId],
        value: toWei(valueInEth),
      });

      // ✅ sendTransaction now needs { transaction, account }
      await sendTransaction({ transaction, account });

      alert("✅ Donation successful! Check Sepolia explorer.");
    } catch (err) {
      console.error("Donation failed:", err);
      alert("❌ Transaction failed: " + (err as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDonate}
      disabled={isLoading}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
    >
      {isLoading ? "Processing..." : "Donate 0.01 ETH"}
    </button>
  );
}
