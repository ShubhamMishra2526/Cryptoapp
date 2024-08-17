import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import CoinPage from "./pages/coin";

function App() {
  return (
    <div className="App">
      {/* defining out routes basically using react router dom */}
      <BrowserRouter>
        {/* it enables us to define our routes*/}
        <Routes>
          {/* it means we have multiple routes */}
          <Route path="/" element={<HomePage />} />
          {/* route means specific route with path */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          {/* <Route path="/wallet" element={connectWallet} /> */}
          {/* <Route path="/watchlist" element={<WatchlistPage />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
