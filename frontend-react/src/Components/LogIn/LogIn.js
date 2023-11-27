import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { API_ENDPOINT } from "../../config";
const LogIn = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  // useEffect(() => {
  //   const fetchData = async (auth_id) => {
  //     const response = await axios.get(
  //       `${API_ENDPOINT}/users?auth_id=${auth_id}`
  //     );
  //     console.log(response.data);
  //     // if (response.data.)
  //   };
  //   fetchData();
  // }, []);

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let auth_id = "";
    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        auth_id = userCredential.user.uid;
        const response = await axios.get(
          `${API_ENDPOINT}/users?auth_id=${auth_id}`
        );
        if (response.data.revisionSurahs.length === 0) {
          navigate("/all-surahs", { state: auth_id });
        } else {
          navigate("/home-screen", { state: { auth_id } });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  return (
    <>
      <div className="container-fluid p-4 signupBackgroundColor">
        <div className="row mb-3">
          <div className="col-10">
            <h3>Log In</h3>
          </div>
        </div>
        <div className="row m-3 justify-content-center">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="email" className="form-label text">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control inputBorder mb-3"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="password" className="form-label text">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control inputBorder mb-3"
                    id="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="row justify-content-start mb-3">
                <div className="col-12">
                  <Link
                    to="/sign-up"
                    className="text text-decoration-underline fw-bold"
                  >
                    Or create your account here
                  </Link>
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-6">
                  <button
                    type="submit"
                    className="submitButton rounded-pill p-2"
                  >
                    Submit
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default LogIn;
