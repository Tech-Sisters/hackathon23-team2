import "./HomeScreen.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
  let navigate = useNavigate();
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [selectedStrength, setSelectedStrength] = useState("All");
  const [surahsList, setSurahsList] = useState([
    {
      id: 1,
      surahName: "Almulk",
      numberOfAyah: 30,
      currentStrength: "Strong",
      lastTestedOn: "14/11/2023",
      ayahs: [
        "ayahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
        "ayah2",
      ],
    },
    {
      id: 2,
      surahName: "Abassa",
      numberOfAyah: 30,
      currentStrength: "Weak",
      lastTestedOn: "14/11/2023",
      ayahs: [
        "ayahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
        "ayah2",
        "ayah3",
      ],
    },
    {
      id: 3,
      surahName: "Abassa",
      numberOfAyah: 30,
      currentStrength: "Weak",
      lastTestedOn: "14/11/2023",
      ayahs: [
        "ayahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
        "ayah2",
        "ayah3",
      ],
    },
    {
      id: 4,
      surahName: "Abassa",
      numberOfAyah: 30,
      currentStrength: "Weak",
      lastTestedOn: "14/11/2023",
      ayahs: [
        "ayahaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1",
        "ayah2",
        "ayah3",
      ],
    },
  ]);
  useEffect(() => {
    setFilteredSurahs(surahsList);
  }, [surahsList]);

  const handleClickTestSurah = (surahId) => {
    let selectedTest = surahsList.filter((s) => s.id === surahId);
    navigate("/begin-test", { state: selectedTest });
  };
  const handleFilterSurahStrength = (strength) => {
    if (strength === "All") {
      setFilteredSurahs(surahsList);
      setSelectedStrength("All");
    } else {
      const filtered = surahsList.filter((s) => s.currentStrength === strength);
      setFilteredSurahs(filtered);
      setSelectedStrength(strength);
    }
  };
  return (
    <>
      <div className="container-fluid header">
        <div className="row p-3">
          <div className="col-12">
            <div className="row">
              <div className="col-12 headerTitle">
                <h3>Today's Practice</h3>
              </div>
            </div>
            {surahsList.map((surah) => (
              <div
                key={surah.id}
                className="row my-3 CategoryBorder WhiteBackground text p-3 d-flex justify-content-center"
              >
                <div className="col-8">
                  <div className="row">
                    <div className="col-12 text">
                      <h6 className="FontSize16">{surah.surahName}</h6>
                    </div>
                    <div className="col-12 text">
                      <h6 className="FontSize12">
                        Ayah 1 - {surah.numberOfAyah}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-4 d-flex justify-content-center">
                  <div className="align-self-center">
                    <button
                      className={`${surah.currentStrength}Color strengthBadge rounded-pill m-2`}
                      onClick={() => handleClickTestSurah(surah.id)}
                    >
                      Test
                    </button>
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
              <table className="table ">
                <tbody>
                  {filteredSurahs.map((surah, index) => (
                    <tr key={index}>
                      <td>
                        <span className="surahName">{surah.surahName}</span>
                      </td>
                      <td className="text-end">
                        <button
                          className={`${surah.currentStrength}Color strengthBadge rounded-pill m-2`}
                        >
                          {surah.currentStrength}
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
    </>
  );
};
export default HomeScreen;
