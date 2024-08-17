import { createTheme, Tab, ThemeProvider } from "@mui/material";
import React, { useState } from "react";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import "./styles.css";
import Grid from "../Grid";
import List from "../list";
export default function TabsComponent({ coins }) {
  /* using material ui creating tabscomponent*/
  const [value, setValue] = useState("grid");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /* creating a style variable for styling the grid and list component */
  const style = {
    color: "var(--grey)",
    Width: "50vw",
    fontSize: "1.2rem",
    fontWeight: 600,
    fontFamily: "Inter",
    textTransform: "capitalize",
  };

  /* creating a theme variable so that we can change the color of the features wrapped inside the component using this theme */

  const theme = createTheme({
    palette: {
      primary: {
        main: "#3a80e9",
      },
    },
  });

  return (
    /* wrapping the tabcontext with the ThemeProvider using the theme variable as its theme */
    <ThemeProvider theme={theme}>
      <TabContext value={value}>
        <TabList onChange={handleChange} variant="fullWidth">
          {/* using fullwidth material ui feature to make our tabs comprising whole page */}
          <Tab label="Grid" value="grid" sx={style} />
          <Tab label="List" value="list" sx={style} />
        </TabList>
        <TabPanel value="grid">
          <div className="grid-flex">
            {/* coins array is a list of 100 coins that we fetched using the api in the dashboard page */}
            {coins.map((coin, i) => {
              return <Grid coin={coin} key={i} />;
            })}
          </div>
        </TabPanel>
        <TabPanel value="list">
          <table className="list-table">
            {coins.map((coin, i) => {
              return <List coin={coin} key={i} />;
            })}
          </table>
        </TabPanel>
      </TabContext>
    </ThemeProvider>
  );
}
