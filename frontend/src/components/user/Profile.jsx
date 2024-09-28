import React, { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const Profile = () => {
  const { user } = useContext(AppContext);

  return (
    <div
      className="containers text-center"
      style={{ marginTop: "100px", marginBottom: "220px" }}
    >
      <h2 className="profile-user-name">Welcome, {user?.userName}</h2>
      <h3 className="profile-user-email">{user?.email}</h3>
    </div>
  );
};

export default Profile;
