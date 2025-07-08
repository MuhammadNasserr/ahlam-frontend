import { useState, lazy, Suspense } from "react";
import Modal from "../components/Modal";
import { HeaderSection, OurNumbersSection } from "../components/homeComponents";

// ✅ Lazy load للمكونات الثقيلة
const BestSellerSection = lazy(
  () => import("../components/homeComponents/BestSelerComponents/BestSellerSection")
);
const OurProductsSection = lazy(() => import("../components/homeComponents/OurProductsSection"));
const WhyChooseAhlam = lazy(() => import("../components/homeComponents/WhyChooseAhlam"));
const AboutSection = lazy(() => import("../components/homeComponents/AboutSection"));
const RolesSection = lazy(() => import("../components/homeComponents/RolesSection"));
const ConnectSection = lazy(() => import("../components/homeComponents/ConnectSection"));

const Confirm = lazy(() => import("../components/Confirm")); // اختياري: Lazy للـ Confirm

export const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <HeaderSection />
      <OurNumbersSection />

      <Suspense fallback={null}>
        <BestSellerSection />
        <OurProductsSection />
        <WhyChooseAhlam />
        <AboutSection />
        <RolesSection />
        <ConnectSection openModal={openModal} closeModal={closeModal} />
      </Suspense>
      <Modal isOpen={isOpen} openModal={openModal}>
        <Suspense fallback={null}>
          <Confirm />
        </Suspense>
      </Modal>
    </>
  );
};
