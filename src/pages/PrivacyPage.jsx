import React from "react";
import { useTranslation } from "../contexts/TranslationContext";

const PrivacyPage = () => {
  const { t } = useTranslation();

  return (
    <div className="container">
      <section className="mt-5 pb-5" style={{ color: "var(--heading-color)", fontSize: "18px" }}>
        <h1 className="font-bold mb-4">
          {t("privacy_policy_title", "Privacy Policy for Ahlam Foods")}
        </h1>
        <p className="mb-3">
          {t(
            "privacy_p1",
            "At Ahlam Foods, accessible from https://ahlamfoods.com, the privacy and protection of our visitors’ personal data is one of our top priorities. This Privacy Policy outlines the types of information that are collected and recorded by the Ahlam Foods website, and how we use this information to improve your experience and protect your data."
          )}
        </p>
        <p className="mb-3">
          {t(
            "privacy_p2",
            "If you have any questions or need more information about our Privacy Policy, please don’t hesitate to contact us."
          )}
        </p>
        <p className="mb-3">
          {t(
            "privacy_p3",
            "This Privacy Policy applies exclusively to our online services and is relevant to visitors interacting with information collected through the Ahlam Foods official website. This policy does not apply to any data collected offline or through channels other than our website."
          )}
        </p>

        <h2 className="mt-5">{t("consent_heading", "Consent")}</h2>
        <p className="mt-3">
          {t(
            "consent_p",
            "By using our website, you hereby consent to our Privacy Policy and agree to its terms and conditions."
          )}
        </p>

        <h2 className="mt-5">{t("info_collect_heading", "Information we collect")}</h2>
        <p className="mt-3">
          {t(
            "info_collect_p1",
            "When using the Ahlam Foods website, we may request personal information such as your name, company name, email address, phone number, and mailing address—particularly when:"
          )}
        </p>
        <ul style={{ padding: "0 30px", listStyleType: "disc" }}>
          <li className="mt-3">{t("info_collect_li1", "You register for an account")}</li>
          <li className="mt-3">
            {t("info_collect_li2", "You subscribe to our newsletter or updates")}
          </li>
          <li className="mt-3">{t("info_collect_li3", "You contact us via forms or email")}</li>
          <li className="mt-3">
            {t(
              "info_collect_li4",
              "We make it clear why this information is being requested at the point of collection."
            )}
          </li>
          <li className="mt-3">
            {t(
              "info_collect_li5",
              "If you contact us directly, we may also receive additional information such as the contents of your message, attachments, or other details you provide voluntarily."
            )}
          </li>
        </ul>

        <h2 className="mt-5">{t("how_we_use_info_heading", "How we use your information")}</h2>
        <p className="mt-3">{t("how_we_use_info_p1", "We use the collected information to:")}</p>
        <ul style={{ padding: "0 30px", listStyleType: "disc" }}>
          <li className="mb-3">
            {t("how_we_use_info_li1", "Provide, operate, and maintain the Ahlam Foods website")}
          </li>
          <li className="mb-3">
            {t("how_we_use_info_li2", "Improve and personalize your user experience")}
          </li>
          <li className="mb-3">
            {t("how_we_use_info_li3", "Analyze how users interact with our website")}
          </li>
          <li className="mb-3">
            {t("how_we_use_info_li4", "Develop new products, features, and services")}
          </li>
          <li className="mb-3">
            {t(
              "how_we_use_info_li5",
              "Communicate with you directly or through authorized partners for customer support, updates, or marketing"
            )}
          </li>
          <li className="mb-3">
            {t(
              "how_we_use_info_li6",
              "Send you emails and promotional content (only if subscribed)"
            )}
          </li>
          <li className="mb-3">
            {t("how_we_use_info_li7", "Detect and prevent fraudulent activities")}
          </li>
        </ul>

        <h2 className="mt-5">{t("log_files_heading", "Log Files")}</h2>
        <p className="mt-3">
          {t(
            "log_files_p1",
            "Like many websites, ahlamfoods.com uses standard log files. These log files may collect data such as:"
          )}
        </p>
        <ul style={{ padding: "0 30px", listStyleType: "disc" }}>
          <li className="mb-3">{t("log_files_li1", "IP address")}</li>
          <li className="mb-3">{t("log_files_li2", "Browser type")}</li>
          <li className="mb-3">{t("log_files_li3", "Internet Service Provider (ISP)")}</li>
          <li className="mb-3">{t("log_files_li4", "Date and time stamps")}</li>
          <li className="mb-3">{t("log_files_li5", "Referring/exit pages")}</li>
          <li className="mb-3">{t("log_files_li6", "Number of clicks")}</li>
        </ul>
        <p>
          {t(
            "log_files_p2",
            "This information is used for analytical purposes to understand user behavior and improve site performance. It is not linked to any personally identifiable information."
          )}
        </p>

        <h2 className="mt-5">{t("cookies_web_beacons_heading", "Cookies and Web Beacons")}</h2>
        <p className="mt-3">
          {t(
            "cookies_web_beacons_p1",
            "The Ahlam Foods website uses cookies to store user preferences and track pages visited to enhance and personalize your Browse experience. This helps us tailor content based on your browser and device behavior."
          )}
        </p>
        <p className="mt-3">
          {t(
            "cookies_web_beacons_p2",
            "You may choose to disable cookies via your browser settings."
          )}
        </p>

        <h2 className="mt-5">
          {t("advertising_partners_heading", "Advertising Partners Privacy Policies")}
        </h2>
        <p className="mt-3">
          {t(
            "advertising_partners_p1",
            "Third-party advertisers on our site may use cookies, JavaScript, or Web Beacons in their advertisements and links. These technologies allow them to collect your IP address to measure advertising performance and deliver targeted content."
          )}
        </p>
        <p className="mt-3">
          {t(
            "advertising_partners_p2",
            "Ahlam Foods has no access to or control over these third-party cookies."
          )}
        </p>
        <p className="mt-3">{t("third_party_privacy_p", "Third Party Privacy Policies")}</p>
        <p className="mt-3">
          {t(
            "advertising_partners_p3",
            "Our Privacy Policy does not apply to other websites or advertisers. Please consult the respective policies of any third-party ad servers or platforms you interact with through our website for detailed information on their practices."
          )}
        </p>
        <p className="mp-3">
          {t(
            "advertising_partners_p4",
            "You can manage your cookie settings via your individual browser preferences."
          )}
        </p>

        <h2 className="mt-5">
          {t("ccpa_rights_heading", "CCPA Privacy Rights (For California Consumers)")}
        </h2>
        <p className="mt-3">
          {t(
            "ccpa_p1",
            "Under the California Consumer Privacy Act (CCPA), California residents have the right to:"
          )}
        </p>
        <p className="mt-3">
          {t("ccpa_li1", "Request disclosure of what personal data we collect.")}
        </p>
        <p className="mt-3">{t("ccpa_li2", "Request deletion of personal data.")}</p>
        <p className="mt-3">{t("ccpa_li3", "Request that we do not sell their personal data")}</p>
        <p className="mt-3">
          {t(
            "ccpa_p2",
            "If you wish to exercise any of these rights, please contact us. We respond to verified requests within one month."
          )}
        </p>

        <h2 className="mt-5">
          {t("gdpr_rights_heading", "GDPR Data Protection Rights (For EU Residents)")}
        </h2>
        <p className="mt-3">
          {t(
            "gdpr_p1",
            "Under the General Data Protection Regulation (GDPR), users are entitled to:"
          )}
        </p>
        <ul style={{ padding: "0 30px", listStyleType: "disc" }}>
          <li className="mt-3">{t("gdpr_li1", "Access their personal data")}</li>
          <li className="mt-3">{t("gdpr_li2", "Request corrections or updates")}</li>
          <li className="mt-3">
            {t("gdpr_li3", "Request deletion of data under certain conditions")}
          </li>
          <li className="mt-3">
            {t("gdpr_li4", "Restrict or object to the processing of their data")}
          </li>
          <li className="mt-3">{t("gdpr_li5", "Request data transfer (portability)")}</li>
        </ul>
        <p className="mt-3">
          {t(
            "gdpr_p2",
            "To exercise any of these rights, please contact us. We respond within 30 days of receiving your request."
          )}
        </p>

        <h2 className="mt-5">{t("children_privacy_heading", "Children’s Privacy")}</h2>
        <p className="mt-3">
          {t(
            "children_privacy_p1",
            "Protecting children's privacy online is especially important. Ahlam Foods does not knowingly collect personally identifiable information from children under 13 years of age. If you believe your child has provided such information on our site, please contact us immediately so we can promptly remove it."
          )}
        </p>

        <h2 className="mt-5">{t("changes_policy_heading", "Changes to This Privacy Policy")}</h2>
        <p className="mt-3">
          {t(
            "changes_policy_p1",
            "We may update our Privacy Policy from time to time to reflect changes in our practices or for legal reasons. We encourage you to review this page periodically. Any changes will be effective immediately upon being posted."
          )}
        </p>
        <p className="mt-3">{t("contact_us_privacy_heading", "Contact Us")}</p>
        <p className="mt-3 mb-5">
          {t(
            "contact_us_privacy_p1",
            "If you have questions, comments, or concerns about this Privacy Policy, or if you wish to exercise your data rights, please reach out to us via the contact information available on https://ahlamfoods.com."
          )}
        </p>
      </section>
    </div>
  );
};
export default PrivacyPage;
