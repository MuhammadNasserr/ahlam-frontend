import { useRef, useEffect } from "react";
import { useTranslation } from "../contexts/TranslationContext";
const ContactModel = ({ isOpen, closeModal, children }) => {
  const overlayRef = useRef();
  const locale = useTranslation();
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";

      const handleKeyDown = (e) => {
        if (e.key === "Escape") {
          closeModal();
        }
      };

      document.addEventListener("keydown", handleKeyDown);

      // Cleanup function
      return () => {
        document.body.style.overflow = "unset";
        document.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, [isOpen, closeModal]);

  useEffect(() => {
    closeModal();
  }, [locale]);

  const handleOverlay = (e) => {
    const isOverlay = e.target === overlayRef.current;
    if (isOverlay) closeModal();
  };

  return (
    <div style={{ display: isOpen ? "block" : "none" }}>
      <div
        ref={overlayRef}
        onClick={handleOverlay}
        className="overlay"
        style={{
          backgroundColor: "#222831c7",
          position: "fixed",
          top: "40px",
          left: "0",
          width: "100%",
          height: "100%",
          zIndex: "100",
          overflowY: "auto",
        }}
      >
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default ContactModel;
