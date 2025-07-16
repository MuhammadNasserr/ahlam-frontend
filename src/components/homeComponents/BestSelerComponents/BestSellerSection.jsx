import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "../../../contexts/TranslationContext";
import { fetchData } from "../../../utilis/fetch";

// استيراد المكونات الفرعية الجديدة
import ContactModel from "../../ContactModel";
import ContactSection from "../../ContactSection";
import Modal from "../../Modal";
import Confirm from "../../Confirm";
import BestSellerHeader from "./BestSellerHeader";
import BestSellerSliderNav from "./BestSellerSliderNav";
import BestSellerContent from "./BestSellerContent";

const BestSellerSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [submitted, setSubmitted] = useState(false);
  const submittedForm = () => setSubmitted(true);
  const unSubmittedForm = () => setSubmitted(false);

  const [currentProductName, setCurrentProductName] = useState("");
  const [currentProductId, setCurrentProductId] = useState(null);

  const { t, locale } = useTranslation();

  const sliderRef = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);

  const isDownRef = useRef(false);
  const startXRef = useRef(0);
  const startYRef = useRef(0);
  const scrollLeftRef = useRef(0);
  const isDraggingRef = useRef(false);
  const clickStartTimeRef = useRef(0);

  const scrollAmount = 200;
  const dragMovementThreshold = 5;
  const scrollThreshold = 10;
  const DRAG_SPEED_MULTIPLIER = 3;

  const fetchBestSellers = async () => {
    return await fetchData("/products/bestsellers");
  };

  const {
    data = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["best-sellers", locale],
    queryFn: fetchBestSellers,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    const slider = sliderRef.current;

    if (!slider) {
      return;
    }

    const handleMouseDown = (e) => {
      isDownRef.current = true;
      isDraggingRef.current = false;
      clickStartTimeRef.current = Date.now();
      slider.classList.add("grabbing");
      startXRef.current = e.pageX - slider.offsetLeft;
      scrollLeftRef.current = slider.scrollLeft;
      e.preventDefault();
    };

    const handleMouseLeave = () => {
      isDownRef.current = false;
      slider.classList.remove("grabbing");
      isDraggingRef.current = false;
    };

    const handleMouseUp = () => {
      isDownRef.current = false;
      slider.classList.remove("grabbing");
      // لا نغير isDraggingRef.current هنا بشكل مباشر للسماح بـ onClick بالعمل بشكل صحيح
    };

    const handleMouseMove = (e) => {
      if (!isDownRef.current) return;
      e.preventDefault();

      const walk = (e.pageX - slider.offsetLeft - startXRef.current) * DRAG_SPEED_MULTIPLIER;

      if (Math.abs(walk) > dragMovementThreshold) {
        isDraggingRef.current = true;
      }
      slider.scrollLeft = scrollLeftRef.current - walk;
    };

    const handleTouchStart = (e) => {
      isDownRef.current = true;
      isDraggingRef.current = false;
      clickStartTimeRef.current = Date.now();
      const touch = e.touches[0];
      startXRef.current = touch.pageX - slider.offsetLeft;
      startYRef.current = touch.pageY;
      scrollLeftRef.current = slider.scrollLeft;
    };

    const handleTouchEnd = () => {
      isDownRef.current = false;
      isDraggingRef.current = false; // Reset dragging flag on touch end
    };

    const handleTouchMove = (e) => {
      if (!isDownRef.current) return;

      const touch = e.touches[0];
      const x = touch.pageX - slider.offsetLeft;
      const y = touch.pageY;

      const walkX = (x - startXRef.current) * DRAG_SPEED_MULTIPLIER;
      const walkY = y - startYRef.current;

      // Determine if it's a drag or a scroll
      if (Math.abs(walkX) > Math.abs(walkY) && Math.abs(walkX) > dragMovementThreshold) {
        isDraggingRef.current = true;
        slider.scrollLeft = scrollLeftRef.current - walkX;
        e.preventDefault(); // Prevent vertical scrolling if horizontal drag is dominant
      } else if (Math.abs(walkY) > scrollThreshold && !isDraggingRef.current) {
        // If vertical scroll is dominant and not yet dragging horizontally
        isDownRef.current = false;
        slider.classList.remove("grabbing");
        isDraggingRef.current = false;
        return;
      }
    };

    slider.addEventListener("mousedown", handleMouseDown);
    slider.addEventListener("mouseleave", handleMouseLeave);
    slider.addEventListener("mouseup", handleMouseUp);
    slider.addEventListener("mousemove", handleMouseMove);

    slider.addEventListener("touchstart", handleTouchStart, { passive: false });
    slider.addEventListener("touchend", handleTouchEnd);
    slider.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      slider.removeEventListener("mousedown", handleMouseDown);
      slider.removeEventListener("mouseleave", handleMouseLeave);
      slider.removeEventListener("mouseup", handleMouseUp);
      slider.removeEventListener("mousemove", handleMouseMove);
      slider.removeEventListener("touchstart", handleTouchStart);
      slider.removeEventListener("touchend", handleTouchEnd);
      slider.removeEventListener("touchmove", handleTouchMove);
    };
  }, [DRAG_SPEED_MULTIPLIER, dragMovementThreshold, scrollThreshold]);

  const numberOfSkeletonCards = 4;

  return (
    <section className="best-seller pt-5">
      <ContactModel isOpen={isOpen} closeModal={closeModal}>
        <ContactSection
          submittedForm={submittedForm}
          unSubmittedForm={unSubmittedForm}
          closeModal={closeModal}
          currentProductId={currentProductId}
          currentProductName={currentProductName}
        />
      </ContactModel>
      <div className="container position-relative">
        {/* رأس القسم */}
        <BestSellerHeader t={t} isError={isError} isLoading={isLoading} refetch={refetch} />

        {/* حاوية جديدة للأزرار والكاروسيل لوضع الأزرار على الجانبين */}
        <div className="carousel-wrapper" data-aos="fade-up">
          {" "}
          {/* أضفنا هذا الـ div الجديد */}
          {/* أزرار التنقل (الأسهم) - سيتم وضعها بشكل مطلق داخل carousel-wrapper */}
          {!isLoading && !isError && data.length > 0 && (
            <BestSellerSliderNav
              prevBtnRef={prevBtnRef}
              nextBtnRef={nextBtnRef}
              sliderRef={sliderRef}
              scrollAmount={scrollAmount}
            />
          )}
          {/* حاوية الكاروسيل (السلايدر) */}
          <div className="carousel-container" ref={sliderRef}>
            <BestSellerContent
              isLoading={isLoading}
              isError={isError}
              data={data}
              numberOfSkeletonCards={numberOfSkeletonCards}
              isDraggingRef={isDraggingRef}
              openModal={openModal}
              setCurrentProductName={setCurrentProductName}
              setCurrentProductId={setCurrentProductId}
            />
          </div>
        </div>
      </div>
      <Modal isOpen={submitted}>
        <Confirm />
      </Modal>
    </section>
  );
};

export default BestSellerSection;
