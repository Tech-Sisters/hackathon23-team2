import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Test.css";
import ExitTest from "../ExitTest/ExitTest";

const BeginTest = () => {
  const [surah, setSurah] = useState({});
  let navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    setSurah(location.state[0]);
  }, [surah]);

  const onBeginTestHandle = () => {
    navigate("/test", { state: surah });
  };
  return (
    <>
      <div className="test-page vh-100 d-flex flex-column justify-content-center align-items-center">
        <ExitTest />
        <div className="p-3 m-4 h-75 d-flex justify-content-center flex-grow-1">
          <div className="container-fluid py-5 border rounded test-container d-flex flex-column justify-content-between">
            <div className="row my-3">
              <div className="col-12 d-flex flex-column align-items-center ">
                <h2 className="surahName">{surah.surahName}</h2>
                <hr className="border border-dark border-top-2 opacity-25 w-100" />
              </div>
            </div>
            <div className="row my-3">
              <div className="col-12 d-flex flex-column align-items-center ">
                <h6 className="text p-2">Current Strength:</h6>
                <span
                  className={`badge rounded-pill p-2 ${surah.currentStrength}Color`}
                >
                  {surah.currentStrength}
                </span>
                <h6 className="text p-2">Last Tested On:</h6>
                <h6 className="fw-normal text ">{surah.lastTestedOn}</h6>
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
        </div>
      </div>
    </>
  );
};
export default BeginTest;
