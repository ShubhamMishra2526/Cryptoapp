import axios from "axios";

export const getCoinData = (id) => {
  const myData = axios
    .get(`https://api.coingecko.com/api/v3/coins/${id}`)
    .then((response) => {
      console.log("RESPONSE>>>", response);
      // setCoins(response.data);
      // setPaginatedCoins(response.data.slice(0, 10));
      /* using coinObject inorder to get the required data only in setCoinData array */
      return response.data;
    })
    .catch((error) => {
      console.log("ERROR>>>", error);
    });
  return myData;
};
