import { NavLink, useLocation } from "react-router-dom";
import { useEffect } from "react";
const logo = "/images/logo.webp";
const logodark = "/images/logodark.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../contexts/TranslationContext";

// استيراد المكونات الفرعية
import {
  SearchOverlay,
  LanguageSwitcher,
  OffcanvasMenu,
  ProductDropdown,
  ThemeSwitcher,
} from "../components/NavBarComponents";
import HeaderLink from "./HeaderLink"; // هذا المكون موجود بالفعل لديك

const Navbar = ({ isDark, setIsDark }) => {
  const { t, locale } = useTranslation(); // لم نعد نحتاج changeLanguage هنا
  const location = useLocation();

  // Helper functions for active links (لا تزال هنا لأنها تعتمد على location في Navbar الرئيسي)
  const isMainProductsActive = () => {
    return location.pathname.startsWith("/products");
  };

  const isSideLinkActive = (categoryName) => {
    const params = new URLSearchParams(location.search);
    return location.pathname === "/products" && params.get("categoryName") === categoryName;
  };

  // Effect بسيط للـ scrolling
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light sticky-top"
      style={{
        backgroundColor: "var(--white-color)",
        color: "var(--heading-color)",
      }}
    >
      <div className="container flex-nowrap">
        <NavLink className="navbar-brand" to="/">
          {isDark ? (
            <img src={logodark} alt="ahlam-logo" width="94" height="63" />
          ) : (
            <img src={logo} alt="ahlam-logo" width="94" height="63" />
          )}
        </NavLink>

        <ul className="navbar-nav m-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <HeaderLink path={"/"} content={t("home", "Home")} />
          </li>
          {/* ProductDropdown لم يعد يتطلب الكثير من الـ props من Navbar */}
          <ProductDropdown t={t} isMainProductsActive={isMainProductsActive} />
          <li className="nav-item">
            <HeaderLink path="/faqs" content={t("faqs", "FAQs")} />
          </li>
          <li className="nav-item">
            <HeaderLink path="/contact-us" content={t("contact_us", "Contact us")} />
          </li>
        </ul>

        <div className="d-flex align-items-center">
          {/* SearchOverlay يستخدم الآن حالته ووظائفه الداخلية */}
          <SearchOverlay t={t} />

          {/* ThemeSwitcher */}
          <ThemeSwitcher isDark={isDark} setIsDark={setIsDark} />

          {/* LanguageSwitcher يستخدم الآن حالته ووظائفه الداخلية */}
          <LanguageSwitcher t={t} locale={locale} />

          <button
            className="navbar-toggler ms-2 side-btn"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasMenu"
            style={{
              color: "var(--heading-color)",
              height: "43px",
              border: "none",
            }}
          >
            <FontAwesomeIcon icon={faBars} />
            <span className="visually-hidden">Toggle navigation</span>
          </button>
        </div>

        {/* OffcanvasMenu */}
        <OffcanvasMenu
          isDark={isDark}
          logo={logo}
          logodark={logodark}
          t={t}
          location={location}
          isMainProductsActive={isMainProductsActive}
          isSideLinkActive={isSideLinkActive}
        />
      </div>
    </nav>
  );
};

export default Navbar;
