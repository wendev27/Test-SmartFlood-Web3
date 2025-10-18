"use client";

import {
  useReadContract,
  ConnectButton,
  useActiveAccount,
} from "thirdweb/react";
import { getContract } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { client } from "@/app/lib/thirdwebClient";
import DonateModal from "../Donate/page";

import { useState } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { contract } from "@/app/lib/contract";

export default function FundsPage() {
  const account = useActiveAccount();

  interface FloodFund {
    owner: string;
    title: string;
    description: string;
    target: bigint;
    deadline: bigint;
    amountCollected: bigint;
    image: string;
    donators: readonly string[];
    donations: readonly bigint[];
  }

  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  });

  const { data, isLoading, error } = useReadContract({
    contract,
    method:
      "function getFloodFunds() view returns ((address owner, string title, string description, uint256 target, uint256 deadline, uint256 amountCollected, string image, address[] donators, uint256[] donations)[])",
    params: [],
  });

  if (isLoading)
    return <p className="text-center p-10">Loading flood funds...</p>;
  if (error)
    return <p className="text-center text-red-500">Error: {String(error)}</p>;

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold text-blue-700">SmartFlood Web3</h1>
      <ConnectButton client={client} chain={sepolia} />
      {account && (
        <>
          <p>{status}</p>
          {console
            .log
            // ethers.getAddress("0x83A97B2f9E281E924Dfc9a17A0C9323B9B7bF4eA")
            ()}
        </>
      )}
      <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">
        Available Flood Funds
      </h1>

      {data && data.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((fund: FloodFund, idx: number) => (
            <div
              key={idx}
              className="bg-white shadow-md p-4 rounded-xl border border-gray-200"
            >
              <img
                src={fund.image}
                alt={fund.title}
                className="w-full h-48 object-cover rounded-lg mb-3"
              />
              <h2 className="text-xl font-semibold">{fund.title}</h2>
              <p className="text-gray-600 text-sm mb-2">{fund.description}</p>

              <p className="text-blue-700 text-sm font-medium">
                🎯 Target: {Number(fund.target) / 1e18} ETH
              </p>
              <p className="text-green-700 text-sm font-medium">
                💰 Raised: {Number(fund.amountCollected) / 1e18} ETH
              </p>

              <p className="text-gray-500 text-xs">
                Deadline:{" "}
                {new Date(Number(fund.deadline) * 1000).toLocaleDateString()}
              </p>
              <p className="text-gray-500 text-xs mt-2">
                Owner: {fund.owner.slice(0, 6)}...{fund.owner.slice(-4)}
              </p>
              {/* 🌊 Donate Modal Button */}
              <div className="mt-3">
                <DonateModal fundId={idx} />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-8">No flood funds found.</p>
      )}
    </main>
  );
}
