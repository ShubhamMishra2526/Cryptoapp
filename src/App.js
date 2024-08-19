import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import DashboardPage from "./pages/dashboard";
import CoinPage from "./pages/coin";
import Watchlist from "./pages/Watchlist";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./components/common/Footer/footer";

function App() {
  return (
    <div className="App">
      {/* defining out routes basically using react router dom */}
      <ToastContainer />
      <BrowserRouter>
        {/* it enables us to define our routes*/}
        <Routes>
          {/* it means we have multiple routes */}
          <Route path="/" element={<HomePage />} />
          {/* route means specific route with path */}
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/coin/:id" element={<CoinPage />} />
          {/* <Route path="/wallet" element={connectWallet} /> */}
          <Route path="/watchlist" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
