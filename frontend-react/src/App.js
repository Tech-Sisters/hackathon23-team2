import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllSurahs from "./Components/AllSurahs/AllSurahs";
import BeginTest from "./Components/BeginTest/BeginTest";
import Test from "./Components/Test/Test";
import HomeScreen from "./Components/HomeScreen/HomeScreen";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/all-surahs" element={<AllSurahs />} />
        <Route path="/begin-test" element={<BeginTest />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
