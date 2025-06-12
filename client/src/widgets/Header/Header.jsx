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
        setUser({});
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
        to="/page"
        className={({ isActive }) =>
          `header__link ${isActive ? "header__link_active" : ""}`
        }
      >
        Заказы
      </NavLink>
      <NavLink
        to="/basket"
        className={({ isActive }) =>
          `header__link ${isActive ? "header__link_active" : ""}`
        }
      >
        Корзина
      </NavLink>
      {!user.user_name && (
        <NavLink
          to="/auth"
          className={({ isActive }) =>
            `header__link ${isActive ? "header__link_active" : ""}`
          }
        >
          Войти / Зарегистрироваться
        </NavLink>
      )}

      {user.user_name && <button onClick={handleSignOut}>Выход</button>}
    </header>
  );
}
