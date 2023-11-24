import React, { useState } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./AllSurahs.css";
const AllSurahs = () => {
  let navigate = useNavigate();
  const [surahsList, setSurahsList] = useState([
    {
      id: 0,
      name: "Amma",
      strength: null,
    },
    {
      id: 1,
      name: "ElNaziaat",
      strength: null,
    },
    {
      id: 2,
      name: "Absa",
      strength: null,
      clicked: false,
    },
    {
      id: 3,
      name: "AlTakwir",
      strength: null,
    },
  ]);
  const handleClickedIcons = (index, strength) => {
    setSurahsList((prevItems) =>
      prevItems.map((item) =>
        item.id === index ? { ...item, strength } : item
      )
    );
  };
  const handleClickSubmit = () => {
    navigate("/home-screen");
  };
  return (
    <>
      <div className="container-fluid">
        <div className="row header p-3">
          <div className="col-12">
            <div className="row  mb-3">
              <div className="col-12 headerTitle">
                <h3>Please select your strength in each Surah</h3>
              </div>
            </div>
            <div className="row  mb-3">
              <div className="col-12">
                <h6 className="headerText">
                  You <b>do not</b> need to select your strength on the Surahs
                  you haven't memorised.
                </h6>
              </div>
            </div>
            <div className="row justify-content-center  mb-3">
              <div className="col-10">
                <div className="row text-center">
                  <span className="col-4 strengthHeaderText">Weak</span>
                  <span className="col-4 strengthHeaderText">Medium</span>
                  <span className="col-4 strengthHeaderText">Strong</span>
                </div>
                <div className="row text-center">
                  <span className="col-4">
                    <BsCircleFill className="weakStrengthCircle" />
                  </span>
                  <span className="col-4">
                    <BsCircleFill className="mediumStrengthCircle" />
                  </span>
                  <span className="col-4">
                    <BsCircleFill className="strongStrengthCircle" />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row p-3">
          <div className="col-12 justify-content-center">
            <table className="table">
              <tbody>
                {surahsList.map((surah, index) => (
                  <tr key={index}>
                    <td>
                      <span className="surahName">{surah.name}</span>
                    </td>
                    <td>
                      <BsCircleFill
                        className={`weakStrengthCircle strengthIcon ${
                          surah.strength === "Weak" ? "clicked" : ""
                        }`}
                        onClick={() => handleClickedIcons(index, "Weak")}
                      />
                    </td>
                    <td>
                      <BsCircleFill
                        className={`mediumStrengthCircle strengthIcon ${
                          surah.strength === "Medium" ? "clicked" : ""
                        }`}
                        onClick={() => handleClickedIcons(index, "Medium")}
                      />
                    </td>
                    <td>
                      <BsCircleFill
                        className={`strongStrengthCircle strengthIcon ${
                          surah.strength === "Strong" ? "clicked" : ""
                        }`}
                        onClick={() => handleClickedIcons(index, "Strong")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="row justify-content-center justify-content-lg-end">
          <div className="col-4">
            <button
              className="submitButton rounded-pill p-2"
              onClick={handleClickSubmit}
            >
              Sumbit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};
export default AllSurahs;
