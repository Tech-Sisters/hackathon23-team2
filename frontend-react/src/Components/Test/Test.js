import { useState, useEffect } from "react";
import "../BeginTest/Test.css";
import "./Test.css";
import { useLocation, useNavigate } from "react-router-dom";
import ExitTest from "../ExitTest/ExitTest";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
const Test = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const surah = location.state;
  const [ayahIndex, setAyaIndex] = useState(0);
  const [hideAyah, setHideAyah] = useState(true);
  const [completeAyah, setCompleteAyah] = useState(false);
  const [ayahHelpCounter, setAyahHelpCounter] = useState(0);
  const [ayahCounterFlag, setAyahCounterFlag] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [ayahs, setAyahs] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${API_ENDPOINT}/surahs/ayat?surahId=${surah.id}`
        );
        setAyahs(response.data);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleClickComplete = () => {
    setHideAyah(false);
    setCompleteAyah(true);
  };
  const handleClickNext = () => {
    setCompleteAyah(false);
    if (ayahIndex + 1 < ayahs.length) {
      setAyaIndex(ayahIndex + 1);
      setHideAyah(true);
      setAyahCounterFlag(true);
    } else {
      navigate("/end-test", {
        // state: {
        //   testObj,
        //   ayahHelpCounter,
        // },
      });
    }
  };
  const handleClickUnhide = () => {
    setHideAyah(!hideAyah);
    if (ayahCounterFlag && hideAyah) {
      setAyahHelpCounter(ayahHelpCounter + 1);
      setAyahCounterFlag(false);
    }
  };
  return (
    <>
      <div className="test-page vh-100 d-flex flex-column justify-content-center align-items-center">
        <ExitTest />
        <div className="p-3 m-4 h-75 d-flex justify-content-center">
          {isLoading ? (
            <div className="container-fluid py-5 border rounded test-container d-flex flex-column justify-content-between">
              <div className="row my-3">
                <div className="col-12 d-flex flex-column align-items-center">
                  <LoadingSpinner />
                </div>
              </div>
            </div>
          ) : (
            <div className="container-fluid py-5 border rounded test-container d-flex flex-column justify-content-between">
              <div className="row my-3">
                <div className="col-12 d-flex flex-column align-items-center">
                  <h2 className="surahName">{surah.name}</h2>
                  <h6 className="text">{`Ayah ${ayahIndex + 1}`}</h6>
                </div>
              </div>
              <div className="row my-3 justify-content-center">
                <div className="col-10 d-flex justify-content-center">
                  <h6
                    className={`fw-normal text text-wrap text-break ${
                      hideAyah ? "hidden" : "visible"
                    } `}
                  >
                    {ayahs[ayahIndex].text_imlaei}
                  </h6>
                </div>
              </div>
              <div className="row my-3 d-flex justify-content-center m-2">
                <div className="col-10 d-flex justify-content-center">
                  {completeAyah ? (
                    ""
                  ) : (
                    <button
                      className="hideButton rounded-pill p-2 mx-2"
                      onClick={handleClickUnhide}
                    >
                      {hideAyah ? "Unhide" : "Hide"}
                    </button>
                  )}
                  {completeAyah ? (
                    <button
                      className="completeButton rounded-pill p-2 mx-2"
                      onClick={handleClickNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      className="completeButton rounded-pill p-2 mx-2"
                      onClick={handleClickComplete}
                    >
                      Complete
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Test;
