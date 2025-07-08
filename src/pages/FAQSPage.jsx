import React, { lazy, Suspense, useState } from "react"; // تأكد من استيراد React و useState
import { FAQS } from "../components/faqsComponents";
import SendMessage from "../components/SendMessage";
import Modal from "../components/Modal";
const Confirm = lazy(() => import("../components/Confirm"));

// --- START: إضافة كود الترجمة ---
import { useTranslation } from "../contexts/TranslationContext";
// --- END: إضافة كود الترجمة ---

const FAQSPage = () => {
  // --- START: استخدام useTranslation Hook ---
  const { t } = useTranslation();
  // --- END: استخدام useTranslation Hook ---

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <>
      <FAQS />
      <SendMessage
        openModal={openModal}
        closeModal={closeModal}
        // --- START: ترجمة الـ message prop ---
        message={t(
          "faqs_send_message_title",
          "Start the conversation today — we're ready to support you!"
        )}
        // --- END: ترجمة الـ message prop ---
      />
      <Modal isOpen={isOpen} openModal={openModal}>
        <Suspense fallback={null}>
          <Confirm />
        </Suspense>
      </Modal>
      <div style={{ marginBottom: "100px" }}></div>
    </>
  );
};
export default FAQSPage;
