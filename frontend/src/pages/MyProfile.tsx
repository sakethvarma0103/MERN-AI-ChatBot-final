import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./MyProfile.css";

const MyProfile: React.FC = () => {
  const auth = useAuth();
  const user = auth?.user;
  const [booksCount, setBooksCount] = useState(0);

  useEffect(() => {
    axios
      .get("/books/", { withCredentials: true })
      .then((res) => setBooksCount(res.data.length))
      .catch(console.error);
  }, []);

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const handleDeleteUser = async () => {
    const confirmDelete = window.confirm("Are you sure you want to delete your account?");
    if (!confirmDelete) return;
    try {
      await axios.delete("/auth/delete", { withCredentials: true });
      window.location.href = "/login";
    } catch (err) {
      console.error("Failed to delete user", err);
    }
  };

  return (
    <div className="profile-wrapper">
      <div className="profile-box">
        <div className="profile-left">
          <div className="avatar">
            {user?.name ? getInitials(user.name) : "U"}
          </div>
        </div>
        <div className="profile-right">
          <h2>Name: {user?.name}</h2>
          <p>Email: {user?.email}</p>
          <p>Total Books: {booksCount}</p>

        </div>
      </div>
    </div>
  );
};

export default MyProfile;
