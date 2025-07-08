import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SideHeaderLink from "../SideHeaderLink"; // هذا المكون موجود بالفعل لديك

export const OffcanvasMenu = ({
  isDark,
  logo,
  logodark,
  t,
  isMainProductsActive, // لا تزال بحاجة إلى هذه الوظيفة
  isSideLinkActive, // لا تزال بحاجة إلى هذه الوظيفة
}) => {
  useEffect(() => {
    const offcanvasElement = document.getElementById("offcanvasMenu");

    if (!offcanvasElement || typeof window.bootstrap === "undefined") return;

    const bsOffcanvas = window.bootstrap.Offcanvas.getOrCreateInstance(offcanvasElement);

    const handleNavLinkClick = (link) => {
      if (!link.hasAttribute("data-bs-toggle")) {
        const handleClick = () => {
          bsOffcanvas.hide();
        };
        link.addEventListener("click", handleClick);
        return () => link.removeEventListener("click", handleClick);
      }
      return () => {};
    };

    const cleanupFunctions = [];
    offcanvasElement.querySelectorAll("a.nav-link").forEach((link) => {
      cleanupFunctions.push(handleNavLinkClick(link));
    });

    // ✅ 1. لما يتفتح المينيو نحط حالة وهمية في الـ history
    const handleShown = () => {
      window.history.pushState({ offcanvasOpen: true }, ""); // push fake state
    };

    // ✅ 2. لما يتقفل نحذف الـ state الوهمية
    const handleHidden = () => {
      // لما يتقفل المينيو نرجع خطوة واحدة في الـ history
      if (window.history.state?.offcanvasOpen) {
        window.history.back();
      }
    };

    // ✅ 3. زر الرجوع
    const handlePopState = () => {
      if (offcanvasElement.classList.contains("show")) {
        bsOffcanvas.hide();
      }
    };

    offcanvasElement.addEventListener("shown.bs.offcanvas", handleShown);
    offcanvasElement.addEventListener("hidden.bs.offcanvas", handleHidden);
    window.addEventListener("popstate", handlePopState);

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
      offcanvasElement.removeEventListener("shown.bs.offcanvas", handleShown);
      offcanvasElement.removeEventListener("hidden.bs.offcanvas", handleHidden);
      window.removeEventListener("popstate", handlePopState);
    };
  }, [t]);

  return (
    <div
      className="offcanvas side-menu offcanvas-end"
      tabIndex="-1"
      id="offcanvasMenu"
      aria-labelledby="offcanvasMenuLabel"
      style={{ backgroundColor: "var(--bg-color)" }}
    >
      <div className="offcanvas-header">
        <NavLink className="offcanvas-name nav-link" id="offcanvasMenuLabel" to="/">
          {isDark ? (
            <img width="70" height="50" src={logodark} alt="logo" />
          ) : (
            <img width="70" height="50" src={logo} alt="logo" />
          )}
        </NavLink>
        <button
          type="button"
          className="btn-close text-reset"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <FontAwesomeIcon
            icon={faXmark}
            style={{ color: "var(--heading-color)", fontSize: "25px" }}
          />
        </button>
      </div>
      <div className="offcanvas-body ps-5">
        <ul className="list-unstyled">
          <li className="nav-item">
            <SideHeaderLink path={"/"} content={t("home", "Home")} />
          </li>
          <li className="dropdown nav-item">
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `nav-link dropdown-toggle d-flex gap-5 ${
                  isActive || isMainProductsActive() ? "side-active" : ""
                }`
              }
              data-bs-toggle="collapse"
              data-bs-target="#dropdown1"
              aria-expanded="false"
            >
              {t("products", "Products")}
            </NavLink>
            <ul className="collapse list-unstyled ps-5" id="dropdown1">
              <li className="dropdown">
                <Link
                  to="/products?categoryName=Frozen"
                  className={`dropdown-toggle d-flex gap-5 nav-link ${
                    isSideLinkActive("Frozen") ||
                    isSideLinkActive("Frozen Fruits") ||
                    isSideLinkActive("Frozen Vegetables")
                      ? "side-active"
                      : ""
                  }`}
                  data-bs-toggle="collapse"
                  data-bs-target="#dropdown1-1"
                  aria-expanded="false"
                >
                  {t("frozen", "Frozen")}
                </Link>
                <ul className="collapse list-unstyled ps-4" id="dropdown1-1">
                  <li>
                    <Link
                      className={`nav-link ${
                        isSideLinkActive("Frozen Fruits") ? "side-active" : ""
                      }`}
                      to="/products?categoryName=Frozen Fruits"
                    >
                      {t("fruits", "Fruits")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${
                        isSideLinkActive("Frozen Vegetables") ? "side-active" : ""
                      }`}
                      to="/products?categoryName=Frozen Vegetables"
                    >
                      {t("vegetables", "Vegetables")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <Link
                  to="/products?categoryName=Fresh"
                  className={`dropdown-toggle d-flex gap-5 nav-link ${
                    isSideLinkActive("Fresh") ||
                    isSideLinkActive("Fresh Fruits") ||
                    isSideLinkActive("Fresh Vegetables")
                      ? "side-active"
                      : ""
                  }`}
                  data-bs-toggle="collapse"
                  data-bs-target="#dropdown1-2"
                  aria-expanded="false"
                >
                  {t("fresh", "Fresh")}
                </Link>
                <ul className="collapse list-unstyled ps-4" id="dropdown1-2">
                  <li>
                    <Link
                      className={`nav-link ${
                        isSideLinkActive("Fresh Fruits") ? "side-active" : ""
                      }`}
                      to="/products?categoryName=Fresh Fruits"
                    >
                      {t("fruits", "Fruits")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${
                        isSideLinkActive("Fresh Vegetables") ? "side-active" : ""
                      }`}
                      to="/products?categoryName=Fresh Vegetables"
                    >
                      {t("vegetables", "Vegetables")}
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Others categories */}
              <li>
                <Link
                  className={`nav-link ${isSideLinkActive("Citrus") ? "side-active" : ""}`}
                  to="/products?categoryName=Citrus"
                >
                  {t("citrus", "Citrus")}
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${isSideLinkActive("Spices & Herbs") ? "side-active" : ""}`}
                  to={`/products?categoryName=${encodeURIComponent("Spices & Herbs")}`}
                >
                  {t("spices_herbs", "Spices & Herbs")}
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${isSideLinkActive("Pickles") ? "side-active" : ""}`}
                  to="/products?categoryName=Pickles"
                >
                  {t("pickles", "Pickles")}
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${isSideLinkActive("isAllProducts") ? "side-active" : ""}`}
                  to="/products?categoryName=isAllProducts"
                >
                  {t("others_category", "Others")}
                </Link>
              </li>
            </ul>
          </li>

          <li className="nav-item">
            <SideHeaderLink path="/faqs" content={t("faqs", "FAQs")} />
          </li>
          <li className="nav-item">
            <SideHeaderLink path="/contact-us" content={t("contact_us", "Contact us")} />
          </li>
        </ul>
      </div>
    </div>
  );
};
