import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "../../../contexts/TranslationContext";
import { fetchData } from "../../../utilis/fetch";
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

  const scrollAmount = 300;

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
  }, []); // Dependencies can be empty as we are relying on native scroll

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
          {!isLoading && !isError && data.length > 0 && (
            <BestSellerSliderNav
              prevBtnRef={prevBtnRef}
              nextBtnRef={nextBtnRef}
              sliderRef={sliderRef}
              scrollAmount={scrollAmount}
            />
          )}
          {/* حاوية الكاروسيل (السلايدر) */}
          <div
            className="carousel-container"
            ref={sliderRef}
            // Add CSS for native horizontal scrolling
            style={{
              overflowX: "auto",
              WebkitOverflowScrolling: "touch",
              scrollSnapType: "x mandatory",
            }}
          >
            <BestSellerContent
              isLoading={isLoading}
              isError={isError}
              data={data}
              numberOfSkeletonCards={numberOfSkeletonCards}
              // isDraggingRef is no longer needed if not implementing custom drag logic
              // You might need to adjust BestSellerContent if it relied on isDraggingRef
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
