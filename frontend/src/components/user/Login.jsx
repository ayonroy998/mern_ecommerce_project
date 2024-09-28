import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const { loginUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [signData, setSignData] = useState({
    email: "",
    password: "",
    profilePic: "",
  });
  const [error, setError] = useState(null);

  const onChangeHandler = (e) => {
    setSignData({ ...signData, [e.target.name]: e.target.value });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertToBase64(file);
    setSignData({ ...signData, profilePic: base64 });
    console.log("file", file);
  };

  const { email, password, profilePic } = signData;

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const result = await loginUser(email, password, profilePic);

      if (result.success) {
        navigate("/");
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
    }

    setSignData({
      email: "",
      password: "",
      profilePic: "",
    });
  };

  return (
    <>
      <div
        className="container bg-white pt-2 pr-2 pb-3 pl-4"
        style={{
          width: "500px",
          height: "510px",
          borderRadius: "30px",
          marginTop: "120px",
        }}
      >
        <div className="login_img text-center">
          <form>
            <label>
              <div style={{ marginTop: "10px" }}>
                <img
                  src={
                    signData.profilePic
                      ? signData.profilePic
                      : "https://cdn.pixabay.com/animation/2022/12/01/17/03/17-03-11-60_512.gif"
                  }
                  alt="loginimg"
                  style={{
                    width: "80px",
                    height: "80px",
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                />
              </div>
              <input
                type="file"
                style={{ display: "none" }}
                onChange={handleUploadPic}
              />
            </label>
          </form>

          <div className="fw-bold fs-7">upload photo</div>
        </div>

        <div className="offset-1">
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="mb-3 was-validated">
              <label htmlFor="email" className="form-label">
                <b>Email</b>
              </label>
              <input
                name="email"
                value={signData.email}
                onChange={onChangeHandler}
                id="email"
                type="email"
                className="form-control logsm"
                required
              />
              <div className="invalid-feedback">Please enter your email...</div>
            </div>
            <div className="mb-3 was-validated">
              <label htmlFor="password" className="form-label">
                <b>Password</b>
              </label>
              <input
                name="password"
                value={signData.password}
                onChange={onChangeHandler}
                id="password"
                type="password"
                className="form-control logsm"
                required
              />

              <div className="invalid-feedback">
                Please enter your password...
              </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}

            <button
              className="submit-button mb-4 position-relative d-block mx-auto py-2 fw-bold text-uppercase overflow-hidden border-0 ms-2"
              type="submit"
              style={{
                padding: "0 0.8rem",
                transition: "0.5s",
                letterSpacing: "2px",
              }}
            >
              <b>Login</b>
            </button>
          </form>

          <p>
            Don't have account?{" "}
            <Link style={{ textDecoration: "none" }} to={"/signup"}>
              <b>Sign Up</b>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
