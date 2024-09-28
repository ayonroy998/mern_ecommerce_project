import React, { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { FaHandPointer } from "react-icons/fa";

const Address = () => {
  const { addAddress, userAddress } = useContext(AppContext);
  const navigate = useNavigate();
  const [signData, setSignData] = useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    phoneNo: "",
  });

  const onChangeHandler = (e) => {
    setSignData({ ...signData, [e.target.name]: e.target.value });
  };

  const { fullName, address, city, state, country, pincode, phoneNo } =
    signData;
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(signData);

    const result = await addAddress(
      fullName,
      address,
      city,
      state,
      country,
      pincode,
      phoneNo
    );

    if (result.success) {
      navigate("/Checkout");
    }

    setSignData({
      fullName: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      phoneNo: "",
    });
  };
  return (
    <>
      <div className="container" style={{ marginTop: "90px" }}>
        <form className="row g-3 p-3 offset-1" onSubmit={onSubmitHandler}>
          <div className="mb-3 col-md-4 was-validated">
            <label htmlFor="fullName" className="form-label">
              <b>Full Name</b>
            </label>
            <input
              name="fullName"
              value={signData.fullName}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="fullName"
              required
            />
            <div className="invalid-feedback">Please enter your fullname..</div>
            <div className="valid-feedback">Looks good now!!</div>
          </div>

          <div className="mb-3 col-md-4 was-validated">
            <label htmlFor="countryName" className="form-label">
              <b>Country Name</b>
            </label>
            <input
              name="country"
              value={signData.country}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="countryName"
              required
            />
            <div className="invalid-feedback">
              Please enter your countryname..
            </div>
          </div>

          <div className="mb-3 col-md-4  was-validated">
            <label htmlFor="phoneNumber" className="form-label">
              <b>Phone No</b>
            </label>
            <input
              name="phoneNo"
              value={signData.phoneNo}
              onChange={onChangeHandler}
              type="number"
              className="form-control"
              id="phoneNumber"
              maxLength={10}
              required
            />
            <div className="invalid-feedback">
              Phonenumber must be 10 digits..
            </div>
          </div>

          <div className="mb-3 col-md-4  was-validated">
            <label htmlFor="cityName" className="form-label">
              <b>City</b>
            </label>
            <input
              name="city"
              value={signData.city}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="cityName"
              required
            />
            <div className="invalid-feedback">Please enter your city</div>
          </div>

          <div className="mb-3 col-md-4  was-validated">
            <label htmlFor="stateName" className="form-label">
              <b>State</b>
            </label>
            <input
              name="state"
              value={signData.state}
              onChange={onChangeHandler}
              type="text"
              className="form-control"
              id="stateName"
              required
            />
            <div className="invalid-feedback">Please select your state..</div>
          </div>

          <div className="mb-3 col-md-4  was-validated">
            <label htmlFor="pinNumber" className="form-label">
              <b>Pin Code</b>
            </label>
            <input
              name="pincode"
              value={signData.pincode}
              onChange={onChangeHandler}
              type="number"
              className="form-control"
              id="pinNumber"
              required
            />
            <div className="invalid-feedback">
              Please enter your pin code digits..
            </div>
          </div>

          <div className="row">
            <div className="mb-3  was-validated">
              <label htmlFor="Textarea1" className="form-label">
                <b>Address/Nearby</b>
              </label>
              <textarea
                name="address"
                value={signData.address}
                onChange={onChangeHandler}
                className="form-control w-50 add-address-sm"
                id="Textarea1"
                required
              ></textarea>
            </div>
          </div>

          <div className="mb-3 col-12">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="invalidCheck2"
                required
              />
              <label className="form-check-label" for="invalidCheck2">
                <b>Agree to terms and conditions</b>
              </label>
            </div>
          </div>
          <div className="mb-2 text-center">
            <button
              className="address-btn border-0 text-white address-sm-btn"
              type="submit"
              style={{
                width: "10%",
                height: "30px",
                backgroundColor: "#2c892c",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <FaHandPointer
                style={{ marginRight: "10px", marginBottom: "5px" }}
              />{" "}
              <b>Submit</b>
            </button>
          </div>
        </form>

        {userAddress && (
          <div className="mb-5 offset-6">
            <button
              className="btn fs-7 border-0 address-sm-oldbtn"
              type="submit"
              style={{
                width: "20%",
                height: "30px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
              onClick={() => navigate("/Checkout")}
            >
              <b>use old address</b>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Address;
