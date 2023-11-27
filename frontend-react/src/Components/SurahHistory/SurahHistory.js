import { useState, useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
const SurahHistory = () => {
  let navigate = useNavigate();
  let location = useLocation();
  let auth_id = location.state;
  let surahId = location.state;
  const [surahHistory, setSurahHistory] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(location);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("in try block")
        const response = await axios.get(`http://localhost:3000/surahs/surahHistory?auth_id=123321&surahId=78`);
        //const response = await axios.get(`${API_ENDPOINT}/surahs/surahHistory/${auth_id}/${surahId}`);
        setSurahHistory(response.data);
        console.log(response.data)
        setIsLoading(false);
      } catch (error) {
        setError(error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  /*const surahHistory = {
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
  };*/
  const handleTestSurah = () => {
    // navigate("/begin-test", { state: { id: surahId } });
  };
  return (
    <>
      <div className="container-fluid ">
        {/* Check if surahHistory exists before accessing its properties */}
        {surahHistory && (
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
            {surahHistory.surahTestHistory.revisions.map((revision, index, revisions) => {
              const formattedDate = new Date(revision.date).toLocaleDateString('en-GB');
              let previousStrength = '';

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
                      className={`${previousStrength}Color strengthButton rounded-pill`}
                    >
                      {previousStrength}
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
              )
            })}
          </>
        )}
      </div>
    </>
  );
};
export default SurahHistory;