import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./FinalRankingTest.css";
import { BsArrowRightCircle } from "react-icons/bs";

const FinalRankingTest = () => {
  const [selectedStrength, setSelectedStrength] = useState("");
  const [nextIconVisible, setNextIconVisible] = useState(false);
  const [showConfirmationPage, setShowConfirmationPage] = useState(false);
  const location = useLocation();
  const { testObj, ayahHelpCounter } = location.state;
  const handleSelectedStrength = (strength) => {
    setSelectedStrength(strength);
    setNextIconVisible(true);
  };
  const handleNextButtonClick = () => {
    setShowConfirmationPage(true);
  };
  return (
    <>
      <div className="test-page vh-100 d-flex justify-content-center align-items-center">
        <div className="p-3 m-4 h-75 d-flex justify-content-center">
          <div className="container-fluid py-5 border rounded test-container d-flex flex-column justify-content-between">
            <div className="row my-3">
              <div className="col-12 d-flex flex-column align-items-center">
                <h2 className="surahName">{testObj.surahName}</h2>
                <h6 className="fw-normal text">Test Complete, Alhamdulillah</h6>
                <hr className="border border-dark border-top-2 opacity-25 w-100" />
              </div>
            </div>
            {showConfirmationPage ? (
              ""
            ) : (
              <div className="row my-3 justify-content-center">
                <div className="col-10 d-flex justify-content-center">
                  <h6 className={`fw-normal text text-wrap text-break  `}>
                    {ayahHelpCounter === 0
                      ? "You didn't require any help."
                      : ayahHelpCounter === 1
                      ? "You required help on 1 Ayah."
                      : `You required help on ${ayahHelpCounter} Ayat.`}
                  </h6>
                </div>
              </div>
            )}

            <div className="row  d-flex justify-content-center m-2">
              <div className="col-10 d-flex justify-content-center">
                <h6 className="fw-normal text">
                  How strong do you feel in this Surah?
                </h6>
              </div>
            </div>
            {showConfirmationPage ? (
              <div className="row d-flex justify-content-center m-2">
                <div className="col-12 d-flex justify-content-center">
                  <button
                    className={`${selectedStrength}Color strengthButton rounded-pill p-2 m-2`}
                  >
                    {selectedStrength}
                  </button>
                </div>
              </div>
            ) : (
              <div className="row d-flex justify-content-center m-2">
                <div className="col-12 d-flex flex-column align-items-center justify-content-center">
                  <button
                    className={`WeakColor strengthButton rounded-pill p-2 m-2 ${
                      selectedStrength === "Weak" ? "isClicked" : ""
                    }`}
                    onClick={() => handleSelectedStrength("Weak")}
                  >
                    Weak
                  </button>
                  <button
                    className={`MediumColor strengthButton rounded-pill p-2 m-2 ${
                      selectedStrength === "Medium" ? "isClicked" : ""
                    }`}
                    onClick={() => handleSelectedStrength("Medium")}
                  >
                    Medium
                  </button>
                  <button
                    className={`StrongColor strengthButton rounded-pill p-2 m-2 ${
                      selectedStrength === "Strong" ? "isClicked" : ""
                    }`}
                    onClick={() => handleSelectedStrength("Strong")}
                  >
                    Strong
                  </button>
                </div>
              </div>
            )}
            {showConfirmationPage ? (
              <div className="row d-flex justify-content-center m-2">
                <div className="col-12 d-flex justify-content-center">
                  <button className="submitButton rounded-pill p-2 w-75">
                    View Surah History
                  </button>
                </div>
              </div>
            ) : (
              <div className="row d-flex justify-content-center m-2">
                <div className="col-12 d-flex justify-content-end">
                  {nextIconVisible ? (
                    <BsArrowRightCircle
                      className="nextIcon"
                      onClick={handleNextButtonClick}
                    />
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
export default FinalRankingTest;