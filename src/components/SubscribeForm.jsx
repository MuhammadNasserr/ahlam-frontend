import React from "react";
import { useTranslation } from "../contexts/TranslationContext";

const SubscribeForm = ({ openModal, closeModal }) => {
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email: e.target.elements["email-subscribe"].value,
    };

    console.log("Collected Subscribe Form Data:", formData);

    openModal();

    try {
      const apiUrl = "YOUR_ACTUAL_SUBSCRIBE_API_URL_HERE";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Failed to subscribe, status: ${response.status}`);
      }

      const result = await response.json();
      console.log("Subscription successful:", result);

      e.target.reset();
    } catch (error) {
      console.error("Subscription API call failed:", error);
    } finally {
      setTimeout(() => closeModal(), 3000);
    }
  };

  return (
    <form className="mt-5" onSubmit={handleSubmit} aria-labelledby="newsletter-heading">
      <div className="mb-4 mb-md-0 subscribe">
        <p>
          <strong>{t("subscribe_newsletter_strong", "Subscribe to our newsletter")}</strong>
          {t(
            "newsletter_description",
            "The latest news, products, offers, and discounts, sent to your inbox."
          )}
        </p>
      </div>

      <div className="mb-4 mb-md-0">
        <div className="d-flex gap-2 mb-4">
          <input
            type="email"
            id="form5Example22"
            name="email-subscribe"
            className="form-control sub-input"
            placeholder={t("email_placeholder", "Email")}
            required
          />
          <button type="submit" className="btn sub-btn">
            {t("subscribe_button", "Subscribe")}
          </button>
        </div>
      </div>
    </form>
  );
};

export default SubscribeForm;
