import React from "react";
import { useNavigate } from "react-router";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  // Пример массива с URL изображений с сервера
  const images = [
    "http://localhost:3000/uploads/Devchata.jpg",
    "http://localhost:3000/uploads/test.png",

  ];
  return (
    <div className="banner">
      {images.map((url, index) => (
        <div key={index} className="banner-image-wrapper" onClick={() => {
          // При клике, например, можно перейти на страницу с подробностями
          navigate(`/image/${index}`);
        }}>
          <img src={url} alt={`Uploaded #${index + 1}`} className="banner-image" />
        </div>
      ))}
    </div>
  );
}