import { ethers } from "ethers";
import React, { useState } from "react";
// import { useWallet } from "../components/wallet";

function TransferToken() {
  const [walletAddress, setWalletAddress] = useState(""); // Connected wallet address
  const [recipientAddress, setRecipientAddress] = useState(""); // Recipient address
  const [tokenAddress, setTokenAddress] = useState(""); // ERC-20 token contract address
  const [amount, setAmount] = useState(""); // Amount to transfer
  const [transactionHash, setTransactionHash] = useState(""); // To store the transaction hash after successful transfer

  const transferToken = async () => {
    if (!walletAddress || !recipientAddress || !tokenAddress || !amount) {
      console.error("Please fill in all fields.");
      return;
    }

    try {
      // Connect to the Ethereum network
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      // Create a new instance of the ERC-20 token contract
      const tokenContract = new ethers.Contract(
        tokenAddress,
        [
          // ERC-20 Token ABI: Only including the `transfer` method
          "function transfer(address to, uint amount) returns (bool)",
        ],
        signer
      );

      // Convert amount to wei (if the token has 18 decimals)
      const amountInWei = ethers.utils.parseUnits(amount, 18);

      // Call the transfer function
      const transaction = await tokenContract.transfer(
        recipientAddress,
        amountInWei
      );

      // Wait for the transaction to be mined
      const receipt = await transaction.wait();

      setTransactionHash(receipt.transactionHash);
      console.log("Transaction successful with hash:", receipt.transactionHash);
    } catch (error) {
      console.error("Token transfer failed:", error.message);
    }
  };

  return (
    <div>
      <h2>Transfer ERC-20 Tokens</h2>
      <input
        type="text"
        placeholder="Token Contract Address"
        value={tokenAddress}
        onChange={(e) => setTokenAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Recipient Address"
        value={recipientAddress}
        onChange={(e) => setRecipientAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Amount to Transfer"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={transferToken}>Transfer Tokens</button>
      {transactionHash && (
        <p>Transaction successful! Hash: {transactionHash}</p>
      )}
    </div>
  );
}

export default TransferToken;
