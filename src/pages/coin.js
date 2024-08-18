import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../components/common/header";
import Loader from "../components/common/Loader";
import { coinObject } from "../functions/convertObject";
import List from "../components/dashboard/list";
import CoinInfo from "../components/coin/CoinInfo";
import { getCoinData } from "../functions/getCoinData";
import { getCoinPrices } from "../functions/getCoinPrices";
import LineChart from "../components/coin/LineChart";
import SelectDays from "../components/coin/selectdays";
import { settingChartData } from "../functions/setChartData";
import TogglePriceType from "../components/coin/pricetype";

function CoinPage() {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [CoinData, setCoinData] = useState();
  const [days, setDays] = useState(30);
  const [chartData, setChartData] = useState({});
  const [PriceType, setPriceType] = useState("prices");
  useEffect(() => {
    if (id) {
      getData();
    }
  }, [id]);

  async function getData() {
    const data = await getCoinData(id);
    if (data) {
      coinObject(setCoinData, data);
      const prices = await getCoinPrices(id, days, PriceType);
      if (prices) {
        settingChartData(setChartData, prices);
        setIsLoading(false);
      }
    }
  }

  const handleDaysChange = async (event) => {
    setIsLoading(true);
    setDays(event.target.value);
    const prices = await getCoinPrices(id, event.target.value, PriceType);
    if (prices) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  const handlePriceTypeChange = async (event, newType) => {
    setIsLoading(true);
    setPriceType(newType);
    const prices = await getCoinPrices(id, days, newType);
    if (prices) {
      settingChartData(setChartData, prices);
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Header />
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="grey-wrapper" style={{ padding: "0rem 1rem" }}>
            <List coin={CoinData} />
          </div>
          <div
            className="grey-wrapper"
            style={{ backgroundColor: "var(--darkgrey) !important" }}
          >
            <SelectDays days={days} handleDaysChange={handleDaysChange} />
            <TogglePriceType
              PriceType={PriceType}
              handlePriceTypeChange={handlePriceTypeChange}
            />
            <LineChart chartData={chartData} PriceType={PriceType} />
          </div>
          <CoinInfo heading={CoinData.name} description={CoinData.desc} />
        </>
      )}
    </div>
  );
}

export default CoinPage;
