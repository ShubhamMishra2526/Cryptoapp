import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import TabsComponent from "../components/dashboard/Tabs";
import axios from "axios";
import Search from "../components/dashboard/search";
import PaginationComponent from "../components/dashboard/pagination";
import Loader from "../components/common/Loader";
import BackToTop from "../components/common/BackToTop";
import { useWallet } from "../components/wallet";
// Importing TransferToken component
import "./styles.css";
import Button from "../components/common/button";
import TransferToken from "../components/dashboard/tokentransfer/tokentransfer";

function DashboardPage() {
  const { walletAddress, ethBalance, tokens, connectWallet, disconnectWallet } =
    useWallet();
  const [coins, setCoins] = useState([]);
  const [paginatedCoins, setPaginatedCoins] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const handlePageChange = (event, value) => {
    setPage(value);
    var previousIndex = (value - 1) * 10;
    setPaginatedCoins(coins.slice(previousIndex, previousIndex + 10));
  };

  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  var filteredCoins = coins.filter((item) => item.name.includes(search));

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log("RESPONSE>>>", response);
        setCoins(response.data);
        setPaginatedCoins(response.data.slice(0, 10));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <Header />
      <div style={{ padding: "20px" }} className="grey-wrapper">
        <h1 className="wallet-db">Your Wallet</h1>
        {walletAddress ? (
          <>
            <h2 className="bal grey-wrapper">
              <span className="eth-bal">Ethereum Balance:</span> {ethBalance}
              ETH
            </h2>
            <h3 className="token-bal">Token Balances:</h3>
            <ol className="token-list">
              {tokens.map((token) => (
                <li key={token.name}>
                  {token.name}: {token.balance}
                </li>
              ))}
            </ol>
            <Button
              text={"Disconnect Wallet"}
              onClick={disconnectWallet}
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                marginTop: "20px",
                backgroundColor: "#f44336",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            />
            <TransferToken /> {/* Adding TransferToken component here */}
          </>
        ) : (
          <Button
            text={"Connect Wallet"}
            outlined={true}
            onClick={connectWallet}
            style={{
              color: "var(--purple)",
              padding: "10px 20px",
              fontSize: "16px",
              width: "20%",
            }}
          />
        )}
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Search search={search} onSearchChange={onSearchChange} />
          <TabsComponent coins={search ? filteredCoins : paginatedCoins} />
          {!search && (
            <PaginationComponent
              page={page}
              handlePageChange={handlePageChange}
            />
          )}
        </div>
      )}
      <BackToTop />
    </>
  );
}

export default DashboardPage;
