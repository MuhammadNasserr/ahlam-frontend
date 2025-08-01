import React, { useState } from "react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTranslation } from "../contexts/TranslationContext";

const WhatsAppFloatingButton = ({
  position = "right",
  bottomOffset = "20px",
  sideOffset = "20px",
}) => {
  const { t } = useTranslation();

  const translatedMessage = t("whatsapp_default_message", "Hello! How can I help you?");
  const phoneNumber = "201100077016";

  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(translatedMessage)}`;

  const [isHovered, setIsHovered] = useState(false);

  const buttonStyle = {
    position: "fixed",
    bottom: bottomOffset,
    [position]: sideOffset,
    backgroundColor: isHovered ? "#1DA851" : "#25D366",
    color: "white",
    borderRadius: "50%",
    width: "60px",
    height: "60px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
    cursor: "pointer",
    zIndex: 1000,
    textDecoration: "none",
    transition: "background-color 0.3s ease",
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      style={buttonStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={t("whatsapp_button_title", "Contact us via WhatsApp")}
    >
      <FontAwesomeIcon icon={faWhatsapp} style={{ fontSize: "25px" }} />
    </a>
  );
};

export default WhatsAppFloatingButton;
