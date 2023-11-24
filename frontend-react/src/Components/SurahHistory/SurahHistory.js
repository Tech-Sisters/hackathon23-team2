import { BsArrowRight } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
const SurahHistory = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let surahId = location.state;
  console.log(location);
  const surahHistory = {
    surahName: "AlMulk",
    surahHistory: [
      {
        date: "23/10/2023",
        strength: "Weak",
      },
      {
        date: "24/10/2023",
        strength: "Medium",
      },
      {
        date: "25/10/2023",
        strength: "Strong",
      },
    ],
  };
  const handleTestSurah = () => {
    // navigate("/begin-test", { state: { id: surahId } });
  };
  return (
    <>
      <div className="container-fluid ">
        <div className="row p-3 header mb-4">
          <div className="col-10 headerTitle py-4">
            <h3>{surahHistory.surahName}</h3>
          </div>
        </div>
        <div className="row p-3 mb-4">
          <div className="col-12 text-end">
            <button
              className="submitButton rounded-pill p-2"
              onClick={handleTestSurah}
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
        {surahHistory.surahHistory.map((surah, index) => (
          <div key={index} className="row align-items-center px-3">
            <div className="col-12">
              <h6>{surah.date}</h6>
            </div>
            <div className="col-12 d-flex align-items-center justify-content-between">
              <button
                className={`${surah.strength}Color strengthButton rounded-pill`}
              >
                {surah.strength}
              </button>
              <BsArrowRight />
              <button
                className={`${surah.strength}Color strengthButton rounded-pill`}
              >
                {surah.strength}
              </button>
            </div>
            <div className="col-12">
              <hr className="border border-dark border-top-2 opacity-25 w-100" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
export default SurahHistory;
