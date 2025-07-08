import { lazy, Suspense, useState } from "react";
import Modal from "../components/Modal";
import { useTranslation } from "../contexts/TranslationContext";
import { HeroSection, AllProducts, ProductSearch } from "../components/ProductsComponents";
import SendMessage from "../components/SendMessage";
const Confirm = lazy(() => import("../components/Confirm"));

const ProductsPage = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <HeroSection />
      <AllProducts />

      <ProductSearch />
      <SendMessage
        openModal={openModal}
        closeModal={closeModal}
        message={t("Request_Ask_About_Product", " Request a Quote or Ask About a Product")}
      />
      <Modal isOpen={isOpen} openModal={openModal}>
        <Suspense fallback={null}>
          <Confirm />
        </Suspense>
      </Modal>
    </>
  );
};
export default ProductsPage;
