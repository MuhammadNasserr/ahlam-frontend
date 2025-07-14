import React, { lazy, Suspense, useState } from "react";
import { GetInTouch } from "../components/contactCompoennts";
import SendMessage from "../components/SendMessage";
import Modal from "../components/Modal";
import { useTranslation } from "../contexts/TranslationContext";
import map from "../../Public/images/map.webp";
const Confirm = lazy(() => import("../components/Confirm"));
const ContactUs = () => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      <GetInTouch />
      <div className="position-relative" style={{ marginBottom: "-150px" }}>
        <SendMessage
          openModal={openModal}
          closeModal={closeModal}
          // --- START: Translate the message prop ---
          message={t(
            "contact_us_send_message_title",
            "Start the conversation today — we're ready to support you!"
          )}
          // --- END: Translate the message prop ---
        />
      </div>
      <Modal isOpen={isOpen} openModal={openModal}>
        <Suspense fallback={null}>
          <Confirm />
        </Suspense>
      </Modal>
      <div style={{ zIndex: -10 }}>
        <a href="#location">
          <img
            style={{
              width: "100%",
              height: "300px",
            }}
            src={map}
            alt="map-img"
          />
        </a>
      </div>
    </div>
  );
};
export default ContactUs;
