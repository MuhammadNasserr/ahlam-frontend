import { useEffect, useState } from "react";
import { useTranslation } from "../../../contexts/TranslationContext";
const ContactSection = ({
  currentProductName,
  closeModal,
  currentProductId,
  submittedForm,
  unSubmittedForm,
}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;

    const formData = {
      email: form.elements["email"].value,
      product: currentProductName,
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
        width: windowWidth <= 768 ? "90%" : "50%",
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
          <div className="w-100 w-md-50 py-3">
            <h2
              className="fw-bold mb-5 d-flex d-md-block justify-content-between text-center"
              style={{ fontSize: "40px" }}
            >
              {/* --- START: ترجمة "Quick Inquiry" --- */}
              {t("Request_Price", "Request Product Price")}
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
                {t("Submit_request", "Submit Request")}
                {/* --- END: ترجمة "Send Message" button --- */}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ContactSection;
