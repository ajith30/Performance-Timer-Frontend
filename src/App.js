import Navbar from "./components/Navbar";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ShowPerformance from "./components/ShowPerformance";
import MeasurePerformance from "./components/MeasurePerformance";
import { PerformanceProvider } from "./context/PerformanceContext";
import AllPerformance from "./components/AllPerformance";
import NotFound from "./components/NotFound";


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <PerformanceProvider>
          <Routes>
            <Route path="/" element={<MeasurePerformance />}/>
            <Route path="/show-performance" element={<ShowPerformance />} />
            <Route path="/all-performance" element={<AllPerformance />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PerformanceProvider>
      </Router>
    </div>
  );
}

export default App;
