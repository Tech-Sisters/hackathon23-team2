import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import {
  getAccessToken,
  loginFirebaseUser,
} from "../../Redux/Actions/userActions";
import { useDispatch } from "react-redux";

const LogIn = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userCredentials = await signInWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );

    const firebaseUser = userCredentials.user;
    const firebaseUid = firebaseUser.uid;
    const idToken = await firebaseUser.getIdToken();

    try {
      const foundUser = await dispatch(loginFirebaseUser(idToken, firebaseUid));

      if (foundUser) {
        // Navigate only if foundUser is successfully returned

        navigate("/home-screen", { state: formData.password });
      }
    } catch (error) {
      console.error("Error in getting access token:", error);
      alert("error with login");
    }
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
