import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

const BestSellerSliderNav = ({ prevBtnRef, nextBtnRef, sliderRef, scrollAmount }) => {
  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true); // Default to true, assuming there might be more content

  useEffect(() => {
    const slider = sliderRef.current;
    const prevBtn = prevBtnRef.current;
    const nextBtn = nextBtnRef.current;

    if (!slider || !prevBtn || !nextBtn) {
      return;
    }

    const checkScrollPosition = () => {
      // زرار الشمال (Previous) يظهر لو الـ slider اتعمله scroll لاي مسافة يمين
      setShowPrev(slider.scrollLeft > 0);

      // زرار اليمين (Next) يظهر لو الـ scrollWidth الكلي اكبر من الـ clientWidth (العرض المرئي)
      // دا معناه ان فيه محتوى زيادة مش ظاهر لسه
      // بنستخدم tolerance بسيط عشان اختلافات الـ rendering
      const hasMoreContentToScroll = slider.scrollWidth > slider.clientWidth + 1; // +1 for a small tolerance
      const isAtEnd = slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 1; // -1 for tolerance
      setShowNext(hasMoreContentToScroll && !isAtEnd);
    };

    const handlePrevClick = () => {
      slider.scrollLeft -= scrollAmount;
      // بنستنى شوية عشان الـ scroll يخلص قبل ما نعمل check تاني
      setTimeout(checkScrollPosition, 100);
    };

    const handleNextClick = () => {
      slider.scrollLeft += scrollAmount;
      // بنستنى شوية عشان الـ scroll يخلص قبل ما نعمل check تاني
      setTimeout(checkScrollPosition, 100);
    };

    // أول check عند تحميل المكون
    checkScrollPosition();

    // إضافة event listener لـ scroll عشان نحدث حالة الزراير عند التحريك
    slider.addEventListener("scroll", checkScrollPosition);

    // إضافة event listener لـ resize عشان نحدث حالة الزراير عند تغيير حجم الشاشة
    // ده بيحل مشكلة الريسايز اللي ذكرتها
    window.addEventListener("resize", checkScrollPosition);

    prevBtn.addEventListener("click", handlePrevClick);
    nextBtn.addEventListener("click", handleNextClick);

    // cleanup function لإزالة الـ event listeners
    return () => {
      slider.removeEventListener("scroll", checkScrollPosition);
      window.removeEventListener("resize", checkScrollPosition); // إزالة listener الريسايز
      if (prevBtn) {
        prevBtn.removeEventListener("click", handlePrevClick);
      }
      if (nextBtn) {
        nextBtn.removeEventListener("click", handleNextClick);
      }
    };
  }, [prevBtnRef, nextBtnRef, sliderRef, scrollAmount]);

  return (
    <>
      <button
        ref={prevBtnRef}
        className="carousel-prev-btn"
        style={{
          backgroundColor: "#ccffd4",
          color: "var(--green-color)",
          display: showPrev ? "block" : "none", // يظهر أو يختفي بناءً على showPrev
        }}
      >
        <FontAwesomeIcon icon={faAngleLeft} className="fa-beat" />
        <span className="visually-hidden">Previous slide</span>
      </button>
      <button
        ref={nextBtnRef}
        className="carousel-next-btn"
        style={{
          backgroundColor: "var(--green-color)",
          color: "white",
          display: showNext ? "block" : "none", // يظهر أو يختفي بناءً على showNext
        }}
      >
        <FontAwesomeIcon icon={faAngleRight} className="fa-beat" />
        <span className="visually-hidden">Next slide</span>
      </button>
    </>
  );
};

export default BestSellerSliderNav;
