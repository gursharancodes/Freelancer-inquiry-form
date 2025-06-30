import React from "react";
import InquiriesList from "../components/InquiriesList";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/login");
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <InquiriesList />
    </div>
  );
};

export default AdminPage;
