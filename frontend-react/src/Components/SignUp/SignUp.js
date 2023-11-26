import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import axios from "axios";
import { API_ENDPOINT } from "../../config";

const SignUp = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [formDataError, setFormDataError] = useState({
    usernameError: "",
    emailError: "",
    passwordError: "",
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    let isUsernameValid = validateUsername();
    let isPasswordValid = validatePassword();
    let isEmailValid = validateEmail(formData.email);
    if (isUsernameValid && isEmailValid && isPasswordValid) {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        const userData = {
          username: formData.username,
          email: formData.email,
          auth_id: userCredential.user.uid,
        };
        const response = await axios.post(
          `${API_ENDPOINT}/users/signup`,
          userData
        );
        setFormData((prevState) => ({
          username: userData.username,
          email: formData.email,
        }));
        navigate("/all-surahs", { state: userData.auth_id });
      } catch (error) {
        console.error("Error signing up:", error);
      }
    }
  };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(email)) {
      setFormDataError((prevFormDataError) => ({
        ...prevFormDataError,
        emailError: "Please enter a valid email address",
      }));
      return false;
    } else {
      setFormDataError((prevFormDataError) => ({
        ...prevFormDataError,
        emailError: "",
      }));
      return true;
    }
  };

  const validateUsername = () => {
    if (formData.username.trim().length < 5) {
      setFormDataError((prevFormDataError) => ({
        ...prevFormDataError,
        usernameError: "Name should be at least 5 characters long",
      }));
      return false;
    } else {
      setFormDataError((prevFormDataError) => ({
        ...prevFormDataError,
        usernameError: "",
      }));
      return true;
    }
  };
  const validatePassword = () => {
    if (formData.password.length < 6) {
      setFormDataError((prevFormDataError) => ({
        ...prevFormDataError,
        passwordError: "Password should be at least 6 characters long",
      }));
      return false;
    } else {
      setFormDataError((prevFormDataError) => ({
        ...prevFormDataError,
        passwordError: "",
      }));
      return true;
    }
  };
  return (
    <>
      <div className="container-fluid p-4 signupLoginBackgroundColor">
        <div className="row mb-3">
          <div className="col-10">
            <h3>Sign Up</h3>
          </div>
        </div>
        <div className="row m-3 justify-content-center">
          <div className="col-12">
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-12">
                  <label htmlFor="username" className="form-label text">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control inputBorder mb-3"
                    id="username"
                    value={formData.username}
                    onChange={handleInputChange}
                  />
                  {formDataError.nameError && (
                    <p className="text-danger mb-3">
                      {formDataError.nameError}
                    </p>
                  )}
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
                  {formDataError.emailError && (
                    <p className="text-danger mb-3">
                      {formDataError.emailError}
                    </p>
                  )}
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
                  {formDataError.passwordError && (
                    <p className="text-danger mb-3">
                      {formDataError.passwordError}
                    </p>
                  )}
                </div>
              </div>
              <div className="row justify-content-start mb-3">
                <div className="col-12">
                  <Link
                    to="/log-in"
                    className="text text-decoration-underline fw-bold"
                  >
                    Already have an account?
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
export default SignUp;
