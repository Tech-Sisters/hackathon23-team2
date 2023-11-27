import { BsXLg } from "react-icons/bs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExitTest = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleConfirmExitTest = () => {
    navigate("/home-screen");
  };

  return (
    <div className="container p-4">
      <div className="row justify-content-end">
        <div className="col-auto">
          <button
            type="button"
            className="btn"
            onClick={() => setShowModal(true)}
          >
            <BsXLg
              style={{
                fontSize: "1.7em",
                fontWeight: "bold",
                color: "white",
              }}
            />
          </button>
        </div>
      </div>
      {showModal && (
        <div className="row">
          <div className="col-10">
            <div
              className="modal"
              style={{
                display: "block",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
              }}
            >
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="row mb-3">
                    <div className="col-12 p-4">
                      <div className="modal-body text-center">
                        <h6 className="text">
                          Are you sure you want to exit this test?
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-evenly">
                    <div className="col-4">
                      <button
                        type="button"
                        className="confirmButton rounded-pill p-2"
                        onClick={handleConfirmExitTest}
                      >
                        Confirm
                      </button>
                    </div>
                    <div className="col-4">
                      <button
                        type="button"
                        className="submitButton rounded-pill p-2"
                        onClick={() => setShowModal(false)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExitTest;
