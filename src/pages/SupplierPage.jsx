import SupplierForm from "../components/SupplierForm";
import SupplierSection from "../components/SupplierSection";
import React, { lazy, Suspense, useState } from "react";
import Modal from "../components/Modal";
const Confirm = lazy(() => import("../components/Confirm"));
const SupplierPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  return (
    <>
      <SupplierSection />
      <SupplierForm openModal={openModal} closeModal={closeModal} />
      <Modal isOpen={isOpen} openModal={openModal}>
        <Suspense fallback={null}>
          <Confirm />
        </Suspense>
      </Modal>
    </>
  );
};
export default SupplierPage;
