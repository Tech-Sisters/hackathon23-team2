import React, { useState, useEffect } from "react";
import { BsCircleFill } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import "./AllSurahs.css";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const AllSurahs = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth_id = location.state;
  const [juzzamma, setJuzzamma] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_ENDPOINT}/surahs/getJuzzamma`);
        setJuzzamma(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);
  const handleClickedIcons = (index, strength) => {
    setJuzzamma((prevItems) =>
      prevItems.map((item) =>
        item.id === index + 78
          ? {
            ...item,
            surahTestHistory: {
              initialStrength: strength,
              currentStrength: strength,
            },
          }
          : item
      )
    );
  };

  const handleClickSubmit = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    const res = await axios.post(
      `${API_ENDPOINT}/surahs/initialiseSurah?auth_id=${auth_id}`,
      {
        juzzAmma: juzzamma,
      }
    );
    navigate("/home-screen", { state: { auth_id } });
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
        {isLoading ? (
          <div className="row p-3 justify-content-center">
            <div className="col-3">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            <div className="row p-3">
              <div className="col-12 justify-content-center">
                <table className="table">
                  <tbody>
                    {juzzamma.map((surah, index) => (
                      <tr key={surah.id}>
                        <td>
                          <span className="surahName">{surah.name}</span>
                        </td>
                        <td>
                          <BsCircleFill
                            className={`weakStrengthCircle strengthIcon ${surah.surahTestHistory.initialStrength === "Weak"
                              ? "clicked"
                              : ""
                              }`}
                            onClick={() => handleClickedIcons(index, "Weak")}
                          />
                        </td>
                        <td>
                          <BsCircleFill
                            className={`mediumStrengthCircle strengthIcon ${surah.surahTestHistory.initialStrength ===
                              "Medium"
                              ? "clicked"
                              : ""
                              }`}
                            onClick={() => handleClickedIcons(index, "Medium")}
                          />
                        </td>
                        <td>
                          <BsCircleFill
                            className={`strongStrengthCircle strengthIcon ${surah.surahTestHistory.initialStrength ===
                              "Strong"
                              ? "clicked"
                              : ""
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
                  className="submitButton rounded-pill p-2 mb-3"
                  onClick={handleClickSubmit}
                >
                  Submit
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};
export default AllSurahs;
