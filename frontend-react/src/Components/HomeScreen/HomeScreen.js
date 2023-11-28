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
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/users?auth_id=${auth_id}`
        );
        setAuthId(auth_id);
        setUserData(response.data);
        let selectedSurahs = response.data.juzzAmma.filter(
          (surah) => surah.surahTestHistory.initialStrength !== null
        );
        setSelectedStrengthSurahs(selectedSurahs);
        setFilteredSurahs(selectedSurahs);

        // Extract IDs from revisionSurahs
        const revisionSurahsIDs = Object.values(
          response.data.revisionSurahs
        ).map((value) => value.id);

        // Set revisionSurahs based on the filter condition
        const revisionSurahsFiltered = response.data.juzzAmma.filter((surah) =>
          revisionSurahsIDs.includes(surah.id)
        );

        // Fetch and update the length for each revisionSurah
        const lengthPromises = revisionSurahsFiltered.map(async (surah) => {
          try {
            const lengthResponse = await axios.get(
              `${API_ENDPOINT}/surahs/ayat?surahId=${surah.id}`
            );
            return { id: surah.id, length: lengthResponse.data.length };
          } catch (error) {
            console.error(error);
            return null;
          }
        });
        Promise.all(lengthPromises)
          .then((lengths) => {
            // Update revisionSurahs with the obtained lengths
            const updatedRevisionSurahs = revisionSurahsFiltered.map(
              (surah) => {
                const lengthData = lengths.find(
                  (item) => item && item.id === surah.id
                );
                if (lengthData) {
                  return { ...surah, length: lengthData.length };
                }
                return surah;
              }
            );
            const transformedData = Object.entries(
              response.data.revisionSurahs
            ).map((item) => {
              let key = item[0];
              let value = item[1].id;
              return { revisedSurahParam: key, surahId: value };
            });
            const revisedParamrsRevisionSurahs = updatedRevisionSurahs.map(
              (surah) => {
                const foundData = transformedData.find(
                  (d) => d.surahId === surah.id
                );
                if (foundData) {
                  return {
                    ...surah,
                    revisedParam: foundData.revisedSurahParam,
                  };
                } else {
                  return { ...surah };
                }
              }
            );
            setRevisionSurahs(revisedParamrsRevisionSurahs);
          })
          .catch((error) => {
            console.error(error);
          });
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
                  onClick={() =>
                    handleClickTestSurah(surah.id, surah.revisedParam)
                  }
                  key={surah.id}
                >
                  <div className="col-8">
                    <div className="row">
                      <div className="col-12 text">
                        <h6 className="FontSize16">{surah.name}</h6>
                      </div>
                      <div className="col-12 text">
                        <h6 className="FontSize12">Ayah 1 - {surah.length}</h6>
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
