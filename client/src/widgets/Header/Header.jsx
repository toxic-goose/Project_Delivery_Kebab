import React from "react";
import { NavLink, useNavigate } from "react-router";
import "./Header.css";

import { setAccessToken } from "../../shared/lib/axiosInstance";
import UserApi from "../../entities/UserApi";

export default function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      const response = await UserApi.logout();
      if (response.statusCode === 200) {
        setUser(null);
        setAccessToken("");
        navigate("/");
      } else {
        alert(response.error || "Ошибка при выходе");
      }
    } catch (error) {
      alert(error.message || "Ошибка при выходе");
    }
  };
  return (
    <header className="header">
      <NavLink
        to="/"
        className={({ isActive }) =>
          `header__link ${isActive ? "header__link_active" : ""}`
        }
      >
        Главная
      </NavLink>
      <NavLink
        to="/counter"
        className={({ isActive }) =>
          `header__link ${isActive ? "header__link_active" : ""}`
        }
      >
        Счетчики
      </NavLink>
      <NavLink
        to="/tasks"
        className={({ isActive }) =>
          `header__link ${isActive ? "header__link_active" : ""}`
        }
      >
        Задачи
      </NavLink>

      {!user && (
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link_active" : ""}`
          }
        >
          Войти
        </NavLink>
      )}

      {user && <button onClick={handleSignOut}>Выход</button>}
    </header>
  );
}
