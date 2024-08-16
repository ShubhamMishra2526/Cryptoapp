import React, { useEffect, useState } from "react";
import Header from "../components/common/header";
import TabsComponent from "../components/dashboard/Tabs";
import axios from "axios";
import Search from "../components/dashboard/search";

function DashboardPage() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");
  /*making onSeatchchange and search a global */
  const onSearchChange = (e) => {
    setSearch(e.target.value);
  };

  /*making filter function*/
  var filteredCoins = coins.filter((item) => item.name.includes(search));

  useEffect(() => {
    // fetch(); /* using axios to request url as it is http library which makes our code simpler otherwise on using fetch we need do .then((res)=> res.json()) .then((data)=> {}); */

    /*axios simply gets the url you get the response now do whatever you want to do */

    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((response) => {
        console.log("RESPONSE>>>", response);
        setCoins(response.data);
      })
      .catch((error) => {
        console.log("ERROR>>>", error);
      });
  }, []);

  return (
    <div>
      <Header />
      <Search search={search} onSearchChange={onSearchChange} />
      <TabsComponent coins={filteredCoins} />
    </div>
  );
}

export default DashboardPage;
