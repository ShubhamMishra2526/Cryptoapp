import React from "react";
import "./styles.css";
import TrendingDownRoundedIcon from "@mui/icons-material/TrendingDownRounded";
import TrendingUpRoundedIcon from "@mui/icons-material/TrendingUpRounded";
import { Tooltip } from "@mui/material";
import { convertNumber } from "../../../functions/convertNumber";
import { Link } from "react-router-dom";
// import { motion } from "framer-motion";

function List({ coin }) {
  // const watchlist = JSON.parse(localStorage.getItem("watchlist"));
  // const [isCoinAdded, setIsCoinAdded] = useState(watchlist?.includes(coin.id))
  return (
    <Link to={`/coin/${coin.id}`}>
      <tr className={"list-container"}>
        <Tooltip title="Coin Logo">
          <td className="td-img">
            <img src={coin.image} className="coin-logo" />
          </td>
        </Tooltip>
        <Tooltip title="Coin Info">
          <td>
            <div className="name-col">
              <p className="coin-symbol">{coin.symbol}</p>
              <p className="coin-name">{coin.name}</p>
            </div>
          </td>
        </Tooltip>
        <Tooltip title="Price Change">
          {coin.price_change_percentage_24h > 0 ? (
            <td className="chip-flex">
              <div className="price-chip td-price-chip mob-td-pc">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip td-icon">
                <TrendingUpRoundedIcon />
              </div>
            </td>
          ) : (
            <td className="chip-flex">
              <div className="price-chip td-price-chip chip-red mob-td-pc">
                {coin.price_change_percentage_24h.toFixed(2)}%
              </div>
              <div className="icon-chip td-icon chip-red">
                <TrendingDownRoundedIcon />
              </div>
            </td>
          )}
        </Tooltip>
        <Tooltip title="Current Price">
          <td>
            <h3
              className="coin-price td-center-align"
              style={{
                color:
                  coin.price_change_percentage_24h < 0
                    ? "var(--red)"
                    : "var(--green)",
              }}
            >
              ${coin.current_price.toLocaleString()}
            </h3>
          </td>
        </Tooltip>
        <div className="market-data">
          <Tooltip title="Total Volume">
            <td>
              <p className="list-total-volume td_right-align td-total-volume">
                {coin.total_volume.toLocaleString()}
              </p>
            </td>
          </Tooltip>
          <Tooltip title="Market Cap">
            <td className="desktop-td-mkt">
              <p className="list-total-volume td_right-align ">
                ${coin.market_cap.toLocaleString()}
              </p>
            </td>
          </Tooltip>
          <Tooltip title="Market Cap">
            <td className="mobile-td-mkt">
              <p className="list-total-volume td_right-align ">
                ${convertNumber(coin.market_cap)}
              </p>
            </td>
          </Tooltip>
        </div>
      </tr>
    </Link>
  );
}

export default List;
