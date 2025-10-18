"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { sepolia } from "thirdweb/chains";
import { prepareContractCall, sendTransaction, getContract } from "thirdweb";
import { client } from "@/app/lib/thirdwebClient";

export default function HomePage() {
  const account = useActiveAccount();
  const [status, setStatus] = useState("");
  const router = useRouter();

  // ✅ Initialize contract
  const contract = getContract({
    client,
    chain: sepolia,
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
  });

  async function handleCreateFloodFund() {
    if (!account) return alert("Please connect your wallet first!");

    try {
      setStatus("⏳ Preparing transaction...");

      const tx = prepareContractCall({
        contract,
        method:
          "function createFloodFund(address _owner, string _title, string _description, uint256 _target, uint256 _deadline, string _image)",
        params: [
          account.address,
          "Barangay Ni Sebastian",
          "KOKORAKUTIN NAMIN",
          BigInt(1000),
          BigInt(Date.now() + 86400000),
          "https://scontent.fmnl4-4.fna.fbcdn.net/v/t39.30808-6/487128039_122293412222002882_7134716002870576836_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHMt7Xgg1L6YK8Hwn7jg6wuw44GoJLcO1LDjgagktw7UknQlG0yAzt254GZIY1ce0VPIic7-zOu0BkRjiASzTBs&_nc_ohc=USp8vXBS_9QQ7kNvwEqnvLW&_nc_oc=AdlJJ2Jr_qlthNRG9mKgFLqMYunVXRkK5AMTFJO2O5AK7SshSUxCcEOm789l_g8U6_6qqrn_IeBUWYmznYSzAFKX&_nc_zt=23&_nc_ht=scontent.fmnl4-4.fna&_nc_gid=ucG44At7EcrrZnexLKilvg&oh=00_AffBqB7vwzHN1mQGYWrjYJaZitC4onuYvJtMFQXtHyXRbA&oe=68F940AD",
        ],
      });

      setStatus("🚀 Sending transaction...");
      await sendTransaction({ transaction: tx, account });

      setStatus("✅ Transaction sent! Check Sepolia explorer.");
    } catch (err) {
      console.error("Transaction error:", err);
      setStatus("❌ Failed to send transaction. Check console for details.");
    }
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen gap-8 p-8 bg-gray-50">
      <h1 className="text-3xl font-bold text-blue-700">SmartFlood Web3</h1>

      <ConnectButton client={client} chain={sepolia} />

      {account && (
        <>
          <div className="flex flex-col md:flex-row gap-4">
            {/* ✅ Create Flood Fund */}
            <button
              onClick={handleCreateFloodFund}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              Create Flood Fund (Test)
            </button>

            {/* ✅ Redirect to Read Page */}
            <button
              onClick={() => router.push("/Read")}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all"
            >
              View Flood Funds
            </button>
          </div>

          <p className="text-gray-700 text-center">{status}</p>
        </>
      )}
    </main>
  );
}
