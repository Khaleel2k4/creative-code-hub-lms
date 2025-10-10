import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="home-container">
      {loading && <div className="loader"></div>}

      {!loading && (
        <div className="welcome-box">
          <h1>Welcome to CCHub</h1>
          <p className="tagline">Creative Code Learning Platform</p>
          <div className="button-group">
            <button className="btn team" onClick={() => navigate("/login/team")}>
              Team
            </button>
            <button
              className="btn student"
              onClick={() => navigate("/login/student")}
            >
              Student
            </button>
          </div>
        </div>
      )}
    </div>
  );
}