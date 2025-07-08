import React from "react";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const CornsImage = "/images/corns.webp";
const GetInTouchImage = "/images/get_in_touch.webp";
const PappersImage = "/images/peppers.webp";
const SparksImage = "/images/sparks.webp";
import { useTranslation } from "../../contexts/TranslationContext";

export const GetInTouch = () => {
  const { t } = useTranslation();
  return (
    <div className="position-relative">
      <div className="position-absolute">
        <img className="trend-icon" style={{ width: "150px" }} src={CornsImage} alt="CornsImage" />
      </div>
      <div className="container">
        <div className="content pt-5 d-flex align-items-center flex-column flex-md-row gap-4">
          {/* Left Side */}
          <div className="info flex-fill">
            <div className="w-fit-content">
              <h2
                className="fs-1 fw-bold w-lg-100 position-relative"
                style={{
                  width: "fit-content",
                  maxWidth: "100%",
                  color: "var(--heading-color)",
                }}
              >
                {t("get_in_touch_heading", "Get In Touch")}
                <img
                  src={SparksImage}
                  className="position-absolute d-sm-inline-block"
                  style={{ width: "40px", right: "-50px", top: "-20px" }}
                  alt=""
                />
              </h2>
            </div>

            <p
              className=""
              style={{
                maxWidth: "500px",
                fontSize: "18px",
                color: "var(--gray-color)",
              }}
            >
              {t(
                "get_in_touch_description",
                "We are always happy to hear from you! Whether you’re looking for a trusted export partner or have inquiries about our products, our team is ready to respond and assist you promptly. Feel free to fill out the form below or reach out to us through the provided contact details."
              )}
            </p>

            {/*Contact Info */}
            <ul className="contact-info">
              <li className="mb-5">
                <div
                  className="p-2 border border-light-subtle rounded-4 d-flex gap-2 align-items-center"
                  style={{ width: "200px", maxWidth: "100%" }}
                >
                  <FontAwesomeIcon
                    size="xl"
                    style={{ color: "var(--green-color)" }}
                    icon={faLocationDot}
                  />
                  <span className="fs-4 fw-medium" style={{ color: "var(--heading-color)" }}>
                    {t("location_heading", "Location")}
                  </span>
                </div>
                <a
                  href=""
                  className="text-decoration-underline d-inline-block mt-3"
                  style={{ color: "var(--gray-color)" }}
                >
                  {t("address_text", "Banha, Qalyubia, Egypt")}
                </a>
              </li>

              <li className="mb-5">
                <div
                  className="p-2 border border-light-subtle rounded-4 d-flex gap-2 align-items-center"
                  style={{ width: "200px", maxWidth: "100%" }}
                >
                  <FontAwesomeIcon
                    size="xl"
                    style={{ color: "var(--green-color)" }}
                    icon={faEnvelope}
                  />
                  <span className="fs-4 fw-medium" style={{ color: "var(--heading-color)" }}>
                    {t("email_heading", "Email")}
                  </span>
                </div>
                <a
                  className="text-decoration-underline d-inline-block mt-3"
                  style={{ color: "var(--gray-color)" }}
                  href="mailto:info@elahlam.com"
                >
                  info@elahlam.com
                </a>
              </li>

              <li className="mb-5">
                <div
                  className="p-2 border border-light-subtle rounded-4 d-flex gap-2 align-items-center"
                  style={{ width: "200px", maxWidth: "100%" }}
                >
                  <FontAwesomeIcon
                    size="xl"
                    style={{ color: "var(--green-color)" }}
                    icon={faPhone}
                  />
                  <span className="fs-4 fw-medium" style={{ color: "var(--heading-color)" }}>
                    {t("phone_heading", "Phone")}
                  </span>
                </div>
                <a
                  className="text-decoration-underline d-inline-block mt-3"
                  style={{ color: "var(--gray-color)" }}
                  href="tel:+201100077016"
                >
                  01100077016
                </a>
              </li>
            </ul>
          </div>

          {/* Rigt Side */}
          <div className="image flex-fill">
            <img
              className=""
              style={{ width: "700px", maxWidth: "100%" }}
              src={GetInTouchImage}
              alt="GetInTouchImage"
            />
          </div>

          {/* Centered Pappers Image */}
          <img
            className="trend-icon position-absolute start-50"
            style={{
              width: "150px",
              maxWidth: "100%",
              zIndex: "-10",
              bottom: "100px",
              transform: "translateX(-170px)",
            }}
            src={PappersImage}
            alt="GetInTouchImage"
          />
        </div>
      </div>
    </div>
  );
};
