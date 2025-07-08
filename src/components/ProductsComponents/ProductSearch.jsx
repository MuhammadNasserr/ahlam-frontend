// ProductSearch.js
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
// تأكد أنك حذفت import SearchFunctionality هنا لو كان موجود

export function ProductSearch() {
  const { t } = useTranslation();

  // هذه الفانكشن ستقوم بالنقر برمجيًا على زر البحث في الـ Navbar
  const handleProductSearchClick = () => {
    const searchTriggerButton = document.querySelector(".search-container .btn");
    if (searchTriggerButton) {
      searchTriggerButton.click(); // قم بتنفيذ النقرة على الزرار
    }
  };

  return (
    <div style={{ color: "var(--heading-color)" }}>
      <div className="container">
        <div className="text-center mt-5">
          <div className="mb-5">
            <h3 className="fw-bold mb-3">{t("Ready_Buy", "Ready to Buy? Let’s Get Started")}</h3>
            <p style={{ width: "800px", maxWidth: "100%", margin: "0 auto" }}>
              {t(
                "submit_request",
                "Submit your request today and let us help you with productselection, pricing, and export logistics tailored to your market"
              )}
              <Link style={{ color: "var(--green-color)", padding: "0 4px" }} to={"/contact-us"}>
                {t("Contact_us", "Contact us")}
              </Link>
            </p>
          </div>

          <div className="mb-5">
            <h3 className="fw-bold mb-3">
              {t("find_product", "Find the Right Product for Your Market")}
            </h3>
            <p style={{ width: "800px", maxWidth: "100%", margin: "0 auto" }}>
              {t(
                "use_search",
                "Use our smart search tool to browse through fresh and frozenagricultural products. Search by product name, category, orcountry of origin and find what fits your export needs."
              )}
            </p>
          </div>
          {/* هنا إضافة onClick event للـ div بأكمله */}
          <div
            className="d-flex mb-5 w-50 mx-auto position-relative product-search-trigger"
            onClick={handleProductSearchClick} // استدعاء الفانكشن عند النقر
            style={{ cursor: "pointer" }} // لجعل العنصر يبدو قابلاً للنقر
          >
            <input
              style={{
                border: "none",
                outline: "none",
                width: "100%",
                pointerEvents: "none",
              }} // pointerEvents: "none" لمنع النقر المباشر على الـ input
              type="text"
              className="p-3 rounded-pill"
              placeholder={t("type_product_search", "Type a product to find it")}
              aria-label="Search product"
              readOnly // لجعل الـ input للقراءة فقط
            />
            <button className="search-btn" type="button">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
