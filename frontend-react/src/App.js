import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllSurahs from "./Components/AllSurahs/AllSurahs";
import BeginTest from "./Components/BeginTest/BeginTest";
import Test from "./Components/Test/Test";
import FinalRankingTest from "./Components/FinalRankingTest/FinalRankingTest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AllSurahs />} />
        <Route path="/begin-test" element={<BeginTest />} />
        <Route path="/test" element={<Test />} />
        <Route path="/end-test" element={<FinalRankingTest />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
