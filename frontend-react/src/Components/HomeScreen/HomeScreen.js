import "./HomeScreen.css";
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase";
const HomeScreen = () => {
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [selectedStrengthSurahs, setSelectedStrengthSurahs] = useState([]);
  const [selectedStrength, setSelectedStrength] = useState("All");
  const [numberOfAyahs, setNumberOfAyahs] = useState([]);
  const [revisionSurahs, setRevisionSurahs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [auth_id, setAuthId] = useState(null);
  let navigate = useNavigate();
  useEffect(() => {
    const fetchData = async (auth_id) => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/users?auth_id=${auth_id}`
        );
        setAuthId(auth_id);
        setUserData(response.data);
        setSelectedStrengthSurahs(
          response.data.juzzAmma.filter(
            (surah) => surah.surahTestHistory.initialStrength !== null
          )
        );
        setFilteredSurahs(
          response.data.juzzAmma.filter(
            (surah) => surah.surahTestHistory.initialStrength !== null
          )
        );
        const revisionSurahsIDs = Object.entries(
          response.data.revisionSurahs
        ).map(([_, value]) => value.id);
        setRevisionSurahs(
          response.data.juzzAmma.filter((surah) =>
            revisionSurahsIDs.includes(surah.id)
          )
        );

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user.uid);
      }
    });
  }, []);

  // const surahsID = selectedStrengthSurahs.map((obj) => obj.id);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       for (const id of surahsID) {
  //         const response = await axios.get(
  //           `${API_ENDPOINT}/surahs/ayat?surahId=${id}`
  //         );
  //         console.log(response.data.length);
  //         setNumberOfAyahs((prevAyahs) => [...prevAyahs, response.data.length]);
  //         //console.log("Her", numberOfAyahs);
  //       }
  //     } catch (error) {}
  //   };
  //   fetchData();
  //   setFilteredSurahs(selectedStrengthSurahs);
  // }, []);

  const handleClickTestSurah = (surahId, surahIndex) => {
    navigate("/begin-test", { state: { surahId, auth_id, surahIndex } });
  };
  const handleFilterSurahStrength = (strength) => {
    if (strength === "All") {
      setFilteredSurahs(selectedStrengthSurahs);
      setSelectedStrength("All");
    } else {
      const filtered = selectedStrengthSurahs.filter(
        (s) => s.surahTestHistory.currentStrength === strength
      );
      setFilteredSurahs(filtered);
      setSelectedStrength(strength);
    }
  };
  const handleNavigateSurahHistory = (surahId) => {
    navigate("/surah-history", { state: { surahId, auth_id } });
  };
  return (
    <>
      {isLoading ? (
        <div className="container-fluid">
          <div className="row justify-content-center p-3">
            <div className="col-3">
              <LoadingSpinner />
            </div>
          </div>
        </div>
      ) : (
        <div className="container-fluid header">
          <div className="row p-3">
            <div className="col-12">
              <div className="row">
                <div className="col-12 headerTitle">
                  <h3>Today's Practice</h3>
                </div>
              </div>
              {revisionSurahs.map((surah, index) => (
                <div
                  className="row my-3 CategoryBorder WhiteBackground text p-3 d-flex justify-content-center"
                  onClick={() => handleClickTestSurah(surah.id, index)}
                  key={surah.id}
                >
                  <div className="col-8">
                    <div className="row">
                      <div className="col-12 text">
                        <h6 className="FontSize16">{surah.name}</h6>
                      </div>
                      <div className="col-12 text">
                        <h6 className="FontSize12">
                          {/* Ayah 1 - {numberOfAyahs[index]} */}
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="col-4 d-flex justify-content-center">
                    <div className="align-self-center">
                      <div
                        className={`${surah.surahTestHistory.currentStrength}Color strengthBadge rounded-pill m-2 text-center`}
                      >
                        Test
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="row p-3">
            <div className="col-12">
              <div className="row">
                <div className="col-12 headerTitle">
                  <h3>Surah Category</h3>
                </div>
              </div>
              <div className="row CategoryBorder my-3 WhiteBackground text p-3">
                <div className="col-lg-12 d-flex flex-lg-wrap justify-content-around">
                  <button
                    className={`strengthBadge rounded-pill AllFilter m-2 ${
                      selectedStrength === "All" ? "isClicked" : ""
                    }`}
                    onClick={() => handleFilterSurahStrength("All")}
                  >
                    All
                  </button>
                  <button
                    className={`WeakColor strengthBadge rounded-pill m-2 ${
                      selectedStrength === "Weak" ? "isClicked" : ""
                    }`}
                    onClick={() => handleFilterSurahStrength("Weak")}
                  >
                    Weak
                  </button>
                  <button
                    className={`MediumColor strengthBadge rounded-pill m-2 ${
                      selectedStrength === "Medium" ? "isClicked" : ""
                    }`}
                    onClick={() => handleFilterSurahStrength("Medium")}
                  >
                    Medium
                  </button>
                  <button
                    className={`StrongColor strengthBadge rounded-pill m-2 ${
                      selectedStrength === "Strong" ? "isClicked" : ""
                    }`}
                    onClick={() => handleFilterSurahStrength("Strong")}
                  >
                    Strong
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="row p-3 WhiteBackground">
            <div className="col-12">
              <div className="ScrollTable">
                <table className="table">
                  <tbody>
                    {filteredSurahs.map((surah) => (
                      <tr
                        key={surah.id}
                        onClick={() => handleNavigateSurahHistory(surah.id)}
                      >
                        <td>
                          <span className="surahName">{surah.name}</span>
                        </td>
                        <td className="text-end">
                          <button
                            className={`${surah.surahTestHistory.currentStrength}Color strengthBadge rounded-pill m-2`}
                          >
                            {surah.surahTestHistory.currentStrength}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default HomeScreen;
