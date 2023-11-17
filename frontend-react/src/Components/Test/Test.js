import { useState } from "react";
import "../BeginTest/Test.css";
import "./Test.css";
import { useLocation } from "react-router-dom";
const Test = () => {
  const location = useLocation();
  const testObj = location.state;
  const [ayahIndex, setAyaIndex] = useState(0);
  const [hideAyah, setHideAyah] = useState(true);
  const [completeAyah, setCompleteAyah] = useState(false);
  const handleClickComplete = () => {
    setHideAyah(false);
    setCompleteAyah(true);
  };
  const handleClickNext = () => {
    setCompleteAyah(false);
    if (ayahIndex + 1 < testObj.ayahs.length) {
      setAyaIndex(ayahIndex + 1);
      setHideAyah(true);
    } else alert("test finished");
  };
  const handleClickUnhide = () => {
    setHideAyah(!hideAyah);
  };
  return (
    <>
      <div className="test-page vh-100 d-flex justify-content-center align-items-center">
        <div className="p-3 m-4 h-75 d-flex justify-content-center">
          <div className="container-fluid py-5 border rounded test-container d-flex flex-column justify-content-between">
            <div className="row my-3">
              <div className="col-12 d-flex flex-column align-items-center">
                <h2 className="surahName">{testObj.surahName}</h2>
                <h6 className="text">{`Ayah ${ayahIndex + 1}`}</h6>
              </div>
            </div>
            <div className="row my-3 justify-content-center">
              <div className="col-10 d-flex justify-content-center">
                <div className="border p-4">
                  <h6
                    className={`fw-normal text text-wrap text-break ${
                      hideAyah ? "blurred-rectangle" : ""
                    } `}
                  >
                    {testObj.ayahs[ayahIndex]}
                  </h6>
                </div>
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
        </div>
      </div>
    </>
  );
};
export default Test;
