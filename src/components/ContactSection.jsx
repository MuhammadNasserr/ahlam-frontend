import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

// --- START: إضافة كود الترجمة ---
import { useTranslation } from "../contexts/TranslationContext";
// --- END: إضافة كود الترجمة ---

const ContactSection = ({
  currentProductName,
  closeModal,
  currentProductId,
  submittedForm,
  unSubmittedForm,
}) => {
  const { t } = useTranslation();
  const benefits = [
    {
      title_key: "newsletter_title",
      title_default: "Newsletter",
      desc_key: "newsletter_desc",
      desc_default:
        "Stay updated with our latest offers, products, and company news directly to your inbox.",
    },
    {
      title_key: "direct_support_title",
      title_default: "Direct Support",
      desc_key: "direct_support_desc",
      desc_default:
        "Reach out to our team for fast, friendly, and reliable support with any inquiries.",
    },
    {
      title_key: "tailored_products_title",
      title_default: "Tailored Products",
      desc_key: "tailored_products_desc",
      desc_default:
        "Get custom product options suited to your market needs and packaging preferences.",
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      email: form.elements["email"].value,
      product: form.elements["product"].value,
      message: form.elements["message"].value,
    };

    try {
      const apiUrl = "https://api.ahlamfoods.com/api/product"; // ← ضع رابط الـ API الفعلي هنا

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      // const result = await response.json();
      // console.log("Message sent successfully:", result);

      form.reset(); // تفريغ النموذج
    } catch (error) {
      console.error("Error sending message:", error);
    }
    closeModal();
    submittedForm();
    setTimeout(() => {
      unSubmittedForm();
    }, 3000);
  };

  return (
    <div
      style={{
        position: "absolute",
        width: "85%",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        maxHeight: "calc(100% - 80px)",
        overflowY: "auto",
      }}
    >
      <div className="container p-0 contact-section">
        <div
          className="d-flex flex-column flex-md-row justify-content-between align-items-center rounded p-3 p-md-5 shadow-sm"
          style={{ backgroundColor: "var(--bg-color)" }}
        >
          {/* Left: Inquiry Form */}
          <div className="w-100 w-md-50 pe-md-4 mb-5 mb-md-0">
            <h2
              className="fw-bold mb-5 d-flex justify-content-between"
              style={{ fontSize: "40px" }}
            >
              {/* --- START: ترجمة "Quick Inquiry" --- */}
              {t("Quick Inquire", "Quick Inquiry")}
              {/* --- END: ترجمة "Quick Inquiry" --- */}
              <span
                onClick={closeModal}
                className="d-flex d-md-none pointer"
                style={{
                  border: "4px solid var(--border)",
                  borderRadius: "50%",
                  fontSize: "17px",
                  width: "35px",
                  height: "35px",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                x
              </span>
            </h2>
            <form onSubmit={handleSubmit}>
              <input
                name="email"
                type="email"
                placeholder={t("email_address_placeholder", "Email Address")}
                required
                className="form-control mb-3"
              />
              <input
                disabled
                name="product"
                type="text"
                defaultValue={currentProductName}
                required
                className="form-control mb-3 fw-bold"
                style={{ color: "var(--green-color)" }}
              />
              <textarea
                name="message"
                placeholder={t("message_placeholder", "Message")}
                required
                className="form-control mb-3"
                rows="2"
              ></textarea>
              <button
                type="submit"
                className="btn w-100 mb-2 text-white"
                style={{ backgroundColor: "var(--green-color)" }}
              >
                {/* --- START: ترجمة "Send Message" button --- */}
                {t("send_message_button", "Send Message")}
                {/* --- END: ترجمة "Send Message" button --- */}
              </button>
              <Link
                to={`/products/${currentProductId}`}
                type="button"
                className="btn btn-light w-100 shadow-sm"
                style={{ padding: "15px", borderRadius: "12px" }}
              >
                {/* --- START: ترجمة "View Product" button --- */}
                {t("view_product_button", "View Product")}
                {/* --- END: ترجمة "View Product" button --- */}
                <FontAwesomeIcon icon={faEye} className="ms-2" />
              </Link>
            </form>
          </div>

          {/* Right: Benefits */}
          <div className="w-100 w-md-50 ps-md-4 mb-3" style={{ color: "var(--heading-color)" }}>
            <h5 className="fw-bold">
              {/* --- START: ترجمة "Benefit Of Contact Us" heading --- */}
              {t("benefit_contact_us_heading", "Benefit Of Contact Us")}
              {/* --- END: ترجمة "Benefit Of Contact Us" heading --- */}
            </h5>

            {benefits.map((item, index) => (
              <div
                key={index}
                className="border-start border-2 ps-3 mt-5 mt-md-3 mt-lg-5"
                style={{ borderColor: "#28a745" }}
              >
                <h6 className="fw-bold mb-3">{t(item.title_key, item.title_default)}</h6>
                <p className="mb-0">{t(item.desc_key, item.desc_default)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactSection;
