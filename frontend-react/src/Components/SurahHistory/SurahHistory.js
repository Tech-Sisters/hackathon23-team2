import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const SurahHistory = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let { surahId, auth_id } = location.state;
  const [surahHistory, setSurahHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      }
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/surahs/surahHistory?auth_id=${auth_id}&surahId=${surahId}`
        );
        setSurahHistory(response.data);
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleTestSurah = (surahId) => {
    navigate("/begin-test", {
      state: { surahId, auth_id, updateStrengthOnly: true },
    });
  };
  return (
    <>
      <div className="container-fluid ">
        {isLoading ? (
          <div className="row justify-content-center p-3">
            <div className="col-3">
              <LoadingSpinner />
            </div>
          </div>
        ) : (
          <>
            <div className="row p-3 header mb-4">
              <div className="col-10 headerTitle py-4">
                <h3>{surahHistory.name}</h3>
              </div>
            </div>
            <div className="row p-3 mb-4">
              <div className="col-12 text-end">
                <button
                  className="submitButton rounded-pill p-2"
                  onClick={() => handleTestSurah(surahId)}
                >
                  Test Surah
                </button>
              </div>
            </div>
            <div className="row p-3 mb-4">
              <div className="col-10">
                <h3>Revision History</h3>
              </div>
            </div>
            {surahHistory.surahTestHistory.revisions.map(
              (revision, index, revisions) => {
                const formattedDate = new Date(
                  revision.date
                ).toLocaleDateString("en-GB");
                let previousStrength = "";

                if (index < revisions.length - 1) {
                  previousStrength = revisions[index + 1].strength;
                }
                return (
                  <div key={index} className="row align-items-center px-3">
                    <div className="col-12">
                      <h6>{formattedDate}</h6>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-between">
                      <button
                        className={`${
                          previousStrength
                            ? previousStrength
                            : surahHistory.surahTestHistory.initialStrength
                        }Color strengthButton rounded-pill`}
                      >
                        {previousStrength
                          ? previousStrength
                          : surahHistory.surahTestHistory.initialStrength}
                      </button>
                      <BsArrowRight />
                      <button
                        className={`${revision.strength}Color strengthButton rounded-pill`}
                      >
                        {revision.strength}
                      </button>
                    </div>
                    <div className="col-12">
                      <hr className="border border-dark border-top-2 opacity-25 w-100" />
                    </div>
                  </div>
                );
              }
            )}
          </>
        )}
      </div>
    </>
  );
};
export default SurahHistory;
