"use client";

import { prepareContractCall, toWei } from "thirdweb";
import { useSendTransaction } from "thirdweb/react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "@/app/lib/thirdwebClient";

export default function DonateButton({ fundId }: { fundId: number }) {
  const {
    mutate: sendTransaction,
    isLoading,
    isSuccess,
    error,
  } = useSendTransaction();

  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  });

  const handleDonate = async () => {
    try {
      // Example: donating 0.01 ETH
      const valueInEth = "0.01";

      const transaction = prepareContractCall({
        contract,
        method: "function donateToFloodFund(uint256 _id) payable",
        params: [fundId],
        value: toWei(valueInEth), // 👈 sends ETH with the transaction
      });

      await sendTransaction(transaction);
      alert("Transaction sent!");
    } catch (err) {
      console.error("Donation failed:", err);
      alert("Transaction failed: " + (err as Error).message);
    }
  };

  return (
    <button
      onClick={handleDonate}
      disabled={isLoading}
      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
    >
      {isLoading ? "Processing..." : "Donate 0.01 ETH"}
    </button>
  );
}
