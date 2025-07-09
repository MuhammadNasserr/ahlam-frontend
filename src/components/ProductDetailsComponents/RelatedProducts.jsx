import { Link } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
import ContactModel from "../ContactModel";
import ContactSection from "../ContactSection";
import Modal from "../Modal";
import { useState } from "react";
import Confirm from "../Confirm";
export const RelatedProducts = (props) => {
  const { t } = useTranslation();
  const { relatedProducts } = props;

  const [isOpen, setIsOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentProductName, setCurrentProductName] = useState("");
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const [submitted, setSubmitted] = useState(false);
  const submittedForm = () => setSubmitted(true);
  const unSubmittedForm = () => setSubmitted(false);

  const baseImageUrl = "https://api.ahlamfoods.com/storage/";
  return (
    <>
      <h3 className="fw-bold mt-5" style={{ color: "var(--heading-color)" }}>
        {t("Related_Products", "Related Products")}
      </h3>
      <div className="row">
        {relatedProducts.map((product) => (
          <div
            className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
            key={product.id}
            style={{
              opacity: `${product.is_available ? "1" : "0.65"}`,
            }}
          >
            <div className=" product-card-fetch h-100 shadow-sm p-2" data-aos="fade-up">
              <Link to={`/products/${product.id}`} className="d-block text-decoration-none">
                <div className="position-relative mb-2">
                  <span
                    className={`badge text-white position-absolute ${
                      product.is_available === false ? "bg-danger" : "bg-success"
                    }`}
                    style={{
                      top: "10px",
                      right: "10px",
                      fontSize: "12px",
                      padding: "5px 15px",
                    }}
                  >
                    {product.is_available === false
                      ? `${t("Unavailable", "Unavailable")}`
                      : `${t("available", "available")}`}
                  </span>
                  <img
                    src={`${baseImageUrl}${product?.main_image}`}
                    alt={product.name}
                    className="img-fluid w-100"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "25px",
                    }}
                    loading="lazy"
                  />
                </div>
                <div>
                  <p
                    className="my-3"
                    style={{
                      color: "var(--sub-text)",
                      fontSize: "15px",
                    }}
                  >
                    {product.subdescription?.slice(0, 30)}...
                  </p>
                  <p className="fw-bold mb-2" style={{ fontSize: "18px" }}>
                    {product.name}
                  </p>
                </div>
              </Link>
              <button
                onClick={() => {
                  setCurrentProductName(product.name);
                  setCurrentProductId(product.id);
                  openModal();
                }}
                className="btn w-100 my-2"
                disabled={!product.is_available}
              >
                {t("Quick Inquire", "Quick Inquire")}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ContactModel closeModal={closeModal} isOpen={isOpen}>
        <ContactSection
          submittedForm={submittedForm}
          unSubmittedForm={unSubmittedForm}
          closeModal={closeModal}
          currentProductId={currentProductId}
          currentProductName={currentProductName}
        />
      </ContactModel>
      <Modal isOpen={submitted}>
        <Confirm />
      </Modal>
    </>
  );
};
