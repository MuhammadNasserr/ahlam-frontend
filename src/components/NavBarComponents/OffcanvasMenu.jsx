import React, { useEffect } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import SideHeaderLink from "../SideHeaderLink";

export const OffcanvasMenu = ({ isDark, logo, logodark, t, isMainProductsActive }) => {
  const location = useLocation();

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
    const handleShown = () => {
      window.history.pushState({ offcanvasOpen: true }, "");
    };

    const handleHidden = () => {
      if (window.history.state?.offcanvasOpen) {
        window.history.back();
      }
    };

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

  // Helper function to check if a category ID is active
  const isCategoryActive = (categoryId) => {
    const params = new URLSearchParams(location.search);
    return params.get("categoryId") === String(categoryId);
  };

  // Helper function to check if "isAllProducts=true" is active
  const isAllProductsActive = () => {
    const params = new URLSearchParams(location.search);
    return params.get("isAllProducts") === "true";
  };

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
              to="/products?isAllProducts=true&page=1"
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
                  to="/products?categoryId=2&page=1"
                  className={`dropdown-toggle d-flex gap-5 nav-link ${
                    isCategoryActive(2) || isCategoryActive(3) ? "side-active" : ""
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
                      className={`nav-link ${isCategoryActive(2) ? "side-active" : ""}`}
                      to="/products?categoryId=2&page=1"
                    >
                      {t("fruits", "Fruits")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${isCategoryActive(3) ? "side-active" : ""}`}
                      to="/products?categoryId=3&page=1"
                    >
                      {t("vegetables", "Vegetables")}
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="dropdown">
                <Link
                  to="/products?categoryId=4&page=1"
                  className={`dropdown-toggle d-flex gap-5 nav-link ${
                    isCategoryActive(4) || isCategoryActive(5) ? "side-active" : ""
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
                      className={`nav-link ${isCategoryActive(4) ? "side-active" : ""}`}
                      to="/products?categoryId=4&page=1"
                    >
                      {t("fruits", "Fruits")}
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`nav-link ${isCategoryActive(5) ? "side-active" : ""}`}
                      to="/products?categoryId=5&page=1"
                    >
                      {t("vegetables", "Vegetables")}
                    </Link>
                  </li>
                </ul>
              </li>

              {/* Others categories */}
              <li>
                <Link
                  className={`nav-link ${isCategoryActive(6) ? "side-active" : ""}`}
                  to="/products?categoryId=6&page=1"
                >
                  {t("spices_herbs", "Herbs")}
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${isCategoryActive(7) ? "side-active" : ""}`}
                  to="/products?categoryId=7&page=1"
                >
                  {t("pickles", "Pickles")}
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${isCategoryActive(8) ? "side-active" : ""}`}
                  to="/products?categoryId=8&page=1"
                >
                  {t("dates", "Dates")}
                </Link>
              </li>
              <li>
                <Link
                  className={`nav-link ${isAllProductsActive() ? "side-active" : ""}`}
                  to="/products?isAllProducts=true&page=1"
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
