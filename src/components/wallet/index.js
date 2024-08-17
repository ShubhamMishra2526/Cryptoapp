import React, { useEffect, useState } from "react";
import Web3 from "web3";
import { ethers } from "ethers";

const ERC20_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function",
  },
  {
    constant: true,
    inputs: [],
    name: "decimals",
    outputs: [{ name: "", type: "uint8" }],
    type: "function",
  },
];

export const useWallet = () => {
  const [walletAddress, setWalletAddress] = useState("");
  const [ethBalance, setEthBalance] = useState("0");
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    getCurrentWalletConnected();
    addWalletListener();
  });

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setWalletAddress(accounts[0]);
        await fetchEthBalance(accounts[0]);
        await fetchTokens(accounts[0]);
        console.log(accounts[0]);
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  const disconnectWallet = () => {
    setWalletAddress("");
    setEthBalance("0");
    setTokens([]);
    alert(
      "Please disconnect your wallet from the MetaMask extension by clicking on the top right corner icon and selecting 'Disconnect'."
    );
  };

  const getCurrentWalletConnected = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
          await fetchEthBalance(accounts[0]);
          await fetchTokens(accounts[0]);
          console.log(accounts[0]);
        } else {
          console.log("Connect to Metamask using connect button");
        }
      } catch (err) {
        console.error(err.message);
      }
    } else {
      console.log("Please install Metamask");
    }
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length > 0) {
      setWalletAddress(accounts[0]);
      fetchEthBalance(accounts[0]);
      fetchTokens(accounts[0]);
    }
  };

  const addWalletListener = () => {
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged);
    } else {
      setWalletAddress("");
      console.log("Please install Metamask");
    }
  };

  const fetchEthBalance = async (address) => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        const balanceWei = await web3.eth.getBalance(address);
        setEthBalance(web3.utils.fromWei(balanceWei, "ether"));
      } catch (err) {
        console.error("Failed to fetch ETH balance:", err.message);
      }
    }
  };

  const fetchTokens = async (address) => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const tokensToFetch = [
      {
        name: "DAI",
        address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
      },
      {
        name: "USDT",
        address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      },
      // Add more tokens here
    ];

    const balances = await Promise.all(
      tokensToFetch.map(async (token) => {
        const tokenContract = new ethers.Contract(
          token.address,
          ERC20_ABI,
          provider
        );
        const balance = await tokenContract.balanceOf(address);
        const decimals = await tokenContract.decimals();
        return {
          name: token.name,
          balance: ethers.utils.formatUnits(balance, decimals),
        };
      })
    );

    setTokens(balances);
  };

  return { walletAddress, ethBalance, tokens, connectWallet, disconnectWallet };
};
