import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CurrentWeather from "../pages/CurrentWeather";
import HistoricalWeather from "../pages/Historical";
import Header from "../components/layout/Header";

import NotFound from "../pages/NotFound";

const AppRoutes = () => {
  return (
    <Router>
         <Header />
      <Routes>
     
        <Route path="/" element={<CurrentWeather />} />
        <Route path="/history" element={<HistoricalWeather />} />
       
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;