import React from "react";
import { useNavigate } from "react-router";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="banner">
      <div className="banner-content">
        <h1>Освойте Modern Stack</h1>
        <p>React + Vite + React Router</p>
        <button className="cta-button" onClick={() => navigate("/tasks")}>
          Написать задачу
        </button>
      </div>
      <div className="tech-logos">
        <img src="/react.svg" alt="React" />
        <img src="/vite.svg" alt="Vite" />
      </div>
    </div>
  );
}
