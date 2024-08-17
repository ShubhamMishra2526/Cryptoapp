import React from "react";
import { useWallet } from "../components/wallet";
import DashboardPage from "./dashboard";

const MyDashboardPage = () => {
  const { walletAddress, ethBalance, tokens, connectWallet } = useWallet();

  return (
    <div style={{ padding: "20px" }}>
      <h1>Wallet Dashboard</h1>
      {walletAddress ? (
        <>
          <h2>Connected Wallet: {walletAddress}</h2>
          <h2>Ethereum Balance: {ethBalance} ETH</h2>
          <h3>Token Balances:</h3>
          <ul>
            {tokens.map((token) => (
              <li key={token.name}>
                {token.name}: {token.balance}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <button
          onClick={connectWallet}
          style={{ padding: "10px 20px", fontSize: "16px" }}
        >
          Connect Wallet
        </button>
      )}
      <DashboardPage />
    </div>
  );
};

export default MyDashboardPage;
