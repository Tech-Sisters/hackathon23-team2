import "./HomeScreen.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const HomeScreen = () => {
  let navigate = useNavigate();
  const surahsList = [
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
  ];
  const handleClickTestSurah = (surahId) => {
    let selectedTest = surahsList.filter((s) => s.id === surahId);
    navigate("/begin-test", { state: selectedTest });
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row header p-3 ">
          <div className="col-12">
            <div className="row mb-3">
              <div className="col-12 headerTitle">
                <h3>Today's Practice</h3>
              </div>
            </div>
            {surahsList.map((surah) => (
              <div
                key={surah.id}
                className="row my-3 WhiteBackground text p-2 d-flex align-items-center "
                style={{ borderRadius: "25px" }}
              >
                <div className="col-5">
                  <div className="row d-flex flex-column">
                    <div className="col-12 text">
                      <h6 style={{ fontSize: "16px" }}>{surah.surahName}</h6>
                    </div>
                    <div className="col-12 text">
                      <h6 style={{ fontSize: "12px" }}>
                        Ayah 1 - {surah.numberOfAyah}
                      </h6>
                    </div>
                  </div>
                </div>
                <div className="col-5">
                  <button
                    className={`${surah.currentStrength}Color strengthBadge rounded-pill p-2 m-2`}
                    onClick={() => handleClickTestSurah(surah.id)}
                  >
                    Test
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="row"></div>
        <div className="row"></div>
      </div>
    </>
  );
};
export default HomeScreen;
