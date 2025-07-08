import { useLocation } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";
export const HeroSection = () => {
  const { t } = useTranslation();

  const location = useLocation();
  let paths = location.pathname.split("/") || [];
  paths[0] = "Home";

  return (
    <div className="products-hero-section">
      <img
        src="/images/productsHeroSection.webp"
        width="100%"
        height="100%"
        loading="eager"
        decoding="async"
        fetchPriority="high"
        alt="product-cover"
        style={{
          position: "absolute",
          objectFit: "cover",
          objectPosition: "center",
          zIndex: "-10",
        }}
      />
      <div className="container">
        <div className="content text-center">
          <h1 className="mb-3 fw-bold">{t("Products", "Products")}</h1>
          <p>
            {t(
              "product-hero-section",
              " Explore our premium selection of fresh and frozen fruits andvegetables — export-grade quality you can trust."
            )}
          </p>
        </div>
      </div>
    </div>
  );
};
