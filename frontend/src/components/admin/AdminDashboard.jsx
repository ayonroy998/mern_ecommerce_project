import React from "react";
import { NavLink } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard admins" style={{ marginBottom: "170px" }}>
      <h1>Admin Dashboard</h1>
      <nav>
        <ul style={{ marginTop: "100px" }}>
          <li>
            <NavLink to="/admin/products">Manage Products</NavLink>
          </li>
          <li>
            <NavLink to="/admin/users">Manage Users</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
