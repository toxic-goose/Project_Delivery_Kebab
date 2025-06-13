import React, { useState } from "react";
import { useNavigate } from "react-router";
import "./MainPage.css";

export default function MainPage() {
  const navigate = useNavigate();
  const images = [
    "http://localhost:3000/uploads/hinkali.jpg",
    "http://localhost:3000/uploads/plov.png",
    "http://localhost:3000/uploads/Headliners_20252615527.jpg",
    "http://localhost:3000/uploads/spaghetti.jpg",
    "http://localhost:3000/uploads/wok.jpg",
    "http://localhost:3000/uploads/IMG_20200619_112457.jpg",
    "http://localhost:3000/uploads/IMG_20200508_201150.jpg",
    "http://localhost:3000/uploads/IMG_20200208_091506.jpg",
    "http://localhost:3000/uploads/IMG_20191109_112514.jpg",
  ];

  const itemsToShow = 3;
  const [currentIndex, setCurrentIndex] = useState(0);
  const maxIndex = images.length - itemsToShow;
  const nextImage = () => {
    setCurrentIndex((prev) => (prev < maxIndex ? prev + 1 : prev));
  };
  const prevImage = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0));
  };
  
  return (
<div className="banner">
      <button className="banner-arrow left" onClick={prevImage} aria-label="Previous Image" disabled={currentIndex === 0}>
        ❮
      </button>
      <div
        className="banner-slider"
        style={{
          transform: `translateX(-${(currentIndex * 100) / itemsToShow}%)`,
        }}
      >
        {images.map((url, index) => (
          <div key={index} className="banner-image-wrapper">
            <img
              src={url}
              alt={`Uploaded #${index + 1}`}
              className="banner-image"
              onClick={() => navigate(`/image/${index}`)}
            />
          </div>
          ))}
      </div>
      <button
        className="banner-arrow right"
        onClick={nextImage}
        aria-label="Next Image"
        disabled={currentIndex === maxIndex}
      >
        ❯
      </button>
    </div>
  );
}
