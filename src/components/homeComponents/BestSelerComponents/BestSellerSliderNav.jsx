import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const BestSellerSliderNav = ({ prevBtnRef, nextBtnRef, sliderRef, scrollAmount }) => {
  useEffect(() => {
    const slider = sliderRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!slider || !prevBtn || !nextBtn) {
      return;
    }

    const handlePrevClick = () => {
      slider.scrollLeft -= scrollAmount;
    };

    const handleNextClick = () => {
      slider.scrollLeft += scrollAmount;
    };

    prevBtn.addEventListener("click", handlePrevClick);
    nextBtn.addEventListener("click", handleNextClick);

    return () => {
      if (prevBtn) {
        prevBtn.removeEventListener("click", handlePrevClick);
      }
      if (nextBtn) {
        nextBtn.removeEventListener("click", handleNextClick);
      }
    };
  }, [prevBtnRef, nextBtnRef, sliderRef, scrollAmount]);

  return (
    // أضفنا فئة منفصلة لكل زر لتسهيل تحديد المواقع في CSS
    <>
      <button
        ref={prevBtnRef}
        className="carousel-prev-btn" // فئة جديدة
        style={{
          backgroundColor: "#ccffd4",
          color: "var(--green-color)",
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="fa-beat" />
        <span className="visually-hidden">Previous slide</span>
      </button>
      <button
        ref={nextBtnRef}
        className="carousel-next-btn" // فئة جديدة
        style={{
          backgroundColor: "var(--green-color)",
          color: "white",
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} className="fa-beat" />
        <span className="visually-hidden">Next slide</span>
      </button>
    </>
  );
};

export default BestSellerSliderNav;
