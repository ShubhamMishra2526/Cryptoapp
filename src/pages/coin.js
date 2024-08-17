import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import Loader from "../components/common/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/dashboard/list";
import CoinInfo from "../components/coin/CoinInfo";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [CoinData, setCoinData] = useState();
  useEffect(() => {
    if (id) {
      axios
        .get(`https://api.coingecko.com/api/v3/coins/${id}`)
        .then((response) => {
          console.log("RESPONSE>>>", response);
          // setCoins(response.data);
          // setPaginatedCoins(response.data.slice(0, 10));
          /* using coinObject inorder to get the required data only in setCoinData array */
          coinObject(setCoinData, response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("ERROR>>>", error);
          setIsLoading(false);
        });
    }
  }, [id]);
  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper">
            <List coin={CoinData} />
          </div>
          <CoinInfo heading={CoinData.name} description={CoinData.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
