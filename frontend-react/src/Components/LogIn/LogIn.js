import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
const LogIn = () => {
  let navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [formDataError, setFormDataError] = useState({
    nameError: "",
    emailError: "",
    passwordError: "",
  });
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let isPasswordValid = validatePassword();
    let isEmailValid = validateEmail(formData.email);
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    navigate("/");
    console.log(formData);
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

  const validatePassword = () => {
    if (formData.password.length < 5) {
      setFormDataError((prevFormDataError) => ({
        ...prevFormDataError,
        passwordError: "Password should be at least 5 characters long",
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
