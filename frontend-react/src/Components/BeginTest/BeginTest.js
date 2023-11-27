import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Test.css";
import ExitTest from "../ExitTest/ExitTest";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
import moment from "moment";
const BeginTest = () => {
  const [surah, setSurah] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  const location = useLocation();
  let { surahId, auth_id, surahIndex } = location.state;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_ENDPOINT}/users?auth_id=${auth_id}`);
        setSurah(res.data.juzzAmma.filter((surah) => surah.id === surahId)[0]);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const onBeginTestHandle = () => {
    navigate("/test", { state: { surahId, auth_id, surahIndex } });
  };
  return (
    <>
      <div className="test-page vh-100 d-flex flex-column justify-content-center align-items-center">
        <ExitTest />
        <div className="p-3 m-4 h-75 d-flex justify-content-center flex-grow-1">
          {isLoading ? (
            <div className="container-fluid py-5 border rounded test-container d-flex flex-column justify-content-between">
              <div className="row my-3">
                <div className="col-12 d-flex flex-column align-items-center ">
                  <LoadingSpinner />
                </div>
              </div>
            </div>
          ) : (
            <div className="container-fluid py-5 border rounded test-container d-flex flex-column justify-content-between">
              <div className="row my-3">
                <div className="col-12 d-flex flex-column align-items-center ">
                  <h2 className="surahName">{surah.name}</h2>
                  <hr className="border border-dark border-top-2 opacity-25 w-100" />
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12 d-flex flex-column align-items-center ">
                  <h6 className="text p-2">Current Strength:</h6>
                  <span
                    className={`badge rounded-pill p-2 ${surah.surahTestHistory.initialStrength}Color`}
                  >
                    {surah.surahTestHistory.currentStrength}
                  </span>
                  <h6 className="text p-2">Last Tested On:</h6>
                  <h6 className="fw-normal text ">
                    {surah.surahTestHistory.revisions[0].date
                      ? moment(surah.surahTestHistory.revisions[0].date).format(
                          "DD/MM/YYYY"
                        )
                      : "No Date"}
                  </h6>
                </div>
              </div>
              <div className="row my-3">
                <div className="col-12 d-flex flex-column align-items-center ">
                  <button
                    className="submitButton rounded-pill p-2"
                    onClick={onBeginTestHandle}
                  >
                    Begin Test
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default BeginTest;
