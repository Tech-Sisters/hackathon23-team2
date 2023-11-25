import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AllSurahs from "./Components/AllSurahs/AllSurahs";
import BeginTest from "./Components/BeginTest/BeginTest";
import Test from "./Components/Test/Test";
import HomeScreen from "./Components/HomeScreen/HomeScreen";
import FinalRankingTest from "./Components/FinalRankingTest/FinalRankingTest";
import SignUp from "./Components/SignUp/SignUp";
import LogIn from "./Components/LogIn/LogIn";
import SurahHistory from "./Components/SurahHistory/SurahHistory";
import Profile from "./Components/Profile/Profile";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AllSurahs />} />
          <Route path="/home-screen" element={<HomeScreen />} />
          <Route path="/begin-test" element={<BeginTest />} />
          <Route path="/test" element={<Test />} />
          <Route path="/end-test" element={<FinalRankingTest />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-in" element={<LogIn />} />
          <Route path="/surah-history" element={<SurahHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
