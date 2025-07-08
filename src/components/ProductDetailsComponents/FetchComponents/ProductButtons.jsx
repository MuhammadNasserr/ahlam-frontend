import { useState } from "react";
import { useTranslation } from "../../../contexts/TranslationContext";
import Confirm from "../../Confirm";
import ContactModel from "../../ContactModel";
import PriceRequest from "./PriceRequest";
import FreeSampleRequest from "./FreeSampleRequest"; // ⬅️ افترضنا وجود هذا المكون
import Modal from "../../Modal";

// تعريف أنواع المودالات لسهولة القراءة
const MODAL_TYPES = {
  NONE: null,
  PRICE_REQUEST: "PriceRequest",
  SAMPLE_REQUEST: "FreeSampleRequest",
};

export const ProductButtons = ({ productId, productName, productStatus }) => {
  const { t } = useTranslation();

  // حالة واحدة تحدد نوع المودال المفتوح حالياً
  const [activeModal, setActiveModal] = useState(MODAL_TYPES.NONE);
  const [isSubmitted, setIsSubmitted] = useState(false); // حالة الإرسال العامة

  const openModal = (type) => setActiveModal(type);
  const closeModal = () => setActiveModal(MODAL_TYPES.NONE);

  const submittedForm = () => setIsSubmitted(true);
  const unsubmittedForm = () => setIsSubmitted(false);

  // مكون النموذج الذي سيتم عرضه داخل ContactModel
  const renderActiveForm = () => {
    switch (activeModal) {
      case MODAL_TYPES.PRICE_REQUEST:
        return (
          <PriceRequest
            submittedForm={submittedForm}
            unSubmittedForm={unsubmittedForm}
            closeModal={closeModal}
            currentProductId={productId}
            currentProductName={productName}
          />
        );
      case MODAL_TYPES.SIMPLE_REQUEST:
        return (
          <FreeSampleRequest // ⬅️ ستحتاج لإنشاء هذا المكون لنموذج الطلب البسيط
            submittedForm={submittedForm}
            unSubmittedForm={unsubmittedForm}
            closeModal={closeModal}
            currentProductId={productId}
            currentProductName={productName}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <button
          onClick={() => openModal(MODAL_TYPES.PRICE_REQUEST)} // ⬅️ نحدد نوع المودال عند النقر
          className="py-2 rounded-3 px-2 w-100 mb-3"
          style={{
            backgroundColor: `${productStatus ? "var(--green-color)" : "#aaa"}`,
            color: `${productStatus ? "#fff" : "#000"}`,
          }}
          disabled={!productStatus}
        >
          {t("Quick_Price_Request", "Quick Price Request")}
        </button>

        <button
          onClick={() => openModal(MODAL_TYPES.SIMPLE_REQUEST)} // ⬅️ نحدد نوع المودال عند النقر
          className="py-2 rounded-3 px-2 w-100"
          style={{
            backgroundColor: `${productStatus ? "var(--bg-green)" : "#ddd"}`,
            color: `${productStatus ? "var(--green-color)" : "#000"}`,
          }}
          disabled={!productStatus}
        >
          {t("Free_Simple_Request", "Free Simple Request")}
        </button>
      </div>

      {/* ContactModel واحد يعرض المحتوى بناءً على حالة activeModal */}
      <ContactModel closeModal={closeModal} isOpen={activeModal !== MODAL_TYPES.NONE}>
        {renderActiveForm()}
      </ContactModel>

      {/* Modal لرسالة التأكيد (Confirm) */}
      <Modal isOpen={isSubmitted}>
        <Confirm />
      </Modal>
    </>
  );
};
