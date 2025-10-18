import { getContract } from "thirdweb";
import { client } from "./thirdwebClient";
import { sepolia } from "thirdweb/chains";

export const contract = getContract({
  client,
  chain: sepolia,
  address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS!,
});
