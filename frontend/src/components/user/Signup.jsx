import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const { signupUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [signData, setSignData] = useState({
    userName: "",
    email: "",
    password: "",
    profilePic: "",
  });

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

  const { userName, email, password, profilePic } = signData;
  const onSubmitHandler = async (e) => {
    e.preventDefault();

    const result = await signupUser(userName, email, password, profilePic);

    if (result.success) {
      navigate("/login");
    }

    setSignData({
      userName: "",
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
          height: "540px",
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

          <div style={{ fontSize: "12px", fontWeight: "bold" }}>
            upload photo
          </div>
        </div>

        <div className="offset-1">
          <form className="needs-validation" onSubmit={onSubmitHandler}>
            <div className="mb-3 was-validated">
              <label htmlFor="username" className="form-label">
                <b>Username</b>
              </label>
              <input
                name="userName"
                value={signData.userName}
                onChange={onChangeHandler}
                id="username"
                type="text"
                className="form-control signsm"
                required
              />
              <div className="invalid-feedback">
                Please enter a valid username..
              </div>
              <div className="valid-feedback">Looks good!</div>
            </div>

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
                className="form-control  signsm"
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
                className="form-control  signsm"
                required
              />
              <div className="invalid-feedback">
                Please enter your password...
              </div>
            </div>
            <button
              className="submit-button mb-3 position-relative d-block mx-auto py-2 fw-bold text-uppercase overflow-hidden border-0 ms-2"
              type="submit"
              style={{
                padding: "0 0.8rem",
                transition: "0.5s",
                letterSpacing: "2px",
              }}
            >
              <b>Submit</b>
            </button>
          </form>
          <p>
            Already have account ?{" "}
            <Link style={{ textDecoration: "none" }} to={"/Login"}>
              <b>Login</b>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
