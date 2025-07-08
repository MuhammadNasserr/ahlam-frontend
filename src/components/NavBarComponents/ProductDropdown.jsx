import React, { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom"; // استيراد useLocation
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const ProductDropdown = ({ t, isMainProductsActive }) => {
  // تم نقل هذه الحالات إلى هنا
  const [showFrozenDropdown, setShowFrozenDropdown] = useState(false);
  const [showFreshDropdown, setShowFreshDropdown] = useState(false);

  const handleFrozenDropdownToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowFrozenDropdown((prev) => !prev);
    setShowFreshDropdown(false);
  };

  const handleFreshDropdownToggle = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setShowFreshDropdown((prev) => !prev);
    setShowFrozenDropdown(false);
  };

  // التأكد من إغلاق القوائم المنسدلة عند النقر خارجها
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const productsDropdown = document.getElementById("productsDropdown");
      const frozenDropdownLink = document.getElementById("frozenDropdownLink");
      const freshDropdownLink = document.getElementById("freshDropdownLink");

      if (
        productsDropdown &&
        !productsDropdown.contains(event.target) &&
        frozenDropdownLink &&
        !frozenDropdownLink.contains(event.target) &&
        freshDropdownLink &&
        !freshDropdownLink.contains(event.target)
      ) {
        setShowFrozenDropdown(false);
        setShowFreshDropdown(false);
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  // وظيفة لتحديد إذا ما كان الرابط نشطًا، ويمكن استخدامها هنا مباشرة أو تمريرها

  return (
    <li className="nav-item dropdown">
      <NavLink
        className={({ isActive }) =>
          `nav-link dropdown-toggle d-flex align-items-center ${
            isActive || isMainProductsActive() ? "active" : ""
          }`
        }
        to="/products"
        id="productsDropdown"
        role="button"
        data-bs-toggle="dropdown"
        end
      >
        {t("products", "Products")}
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{
            marginLeft: "10px",
          }}
        />
      </NavLink>
      <ul
        className="dropdown-menu"
        aria-labelledby="productsDropdown"
        style={{ backgroundColor: "var(--bg-color)", width: "200px" }}
      >
        {/* Frozen */}
        <li className={`dropend ${showFrozenDropdown ? "show" : ""}`}>
          <button
            className="dropdown-item has-submenu"
            onClick={handleFrozenDropdownToggle}
            id="frozenDropdownLink"
            style={{
              cursor: "pointer",
              border: "none",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {t("frozen", "Frozen")}
          </button>
          <ul
            className={`dropdown-menu dropdown-submenu ${showFrozenDropdown ? "show" : ""}`}
            style={{
              display: showFrozenDropdown ? "block" : "none",
              backgroundColor: "var(--bg-color)",
            }}
          >
            <li>
              <Link className="dropdown-item" to="/products?categoryName=Frozen Fruits">
                {t("fruits", "Fruits")}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/products?categoryName=Frozen Vegetables">
                {t("vegetables", "Vegetables")}
              </Link>
            </li>
          </ul>
        </li>

        {/* Fresh */}
        <li className={`dropend ${showFreshDropdown ? "show" : ""}`}>
          <button
            className="dropdown-item has-submenu"
            onClick={handleFreshDropdownToggle}
            id="freshDropdownLink"
            style={{
              cursor: "pointer",
              border: "none",
              background: "none",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            {t("fresh", "Fresh")}
          </button>
          <ul
            className={`dropdown-menu dropdown-submenu ${showFreshDropdown ? "show" : ""}`}
            style={{
              display: showFreshDropdown ? "block" : "none",
              backgroundColor: "var(--bg-color)",
            }}
          >
            <li>
              <Link className="dropdown-item" to="/products?categoryName=Fresh Fruits">
                {t("fruits", "Fruits")}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/products?categoryName=Fresh Vegetables">
                {t("vegetables", "Vegetables")}
              </Link>
            </li>
          </ul>
        </li>

        {/* Others categories */}
        <li>
          <Link className="dropdown-item" to="/products?categoryName=Citrus">
            {t("citrus", "Citrus")}
          </Link>
        </li>
        <li>
          <Link
            className="dropdown-item"
            to={`/products?categoryName=${encodeURIComponent("Spices & Herbs")}`}
          >
            {t("spices_herbs", "Spices & Herbs")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/products?categoryName=Pickles">
            {t("pickles", "Pickles")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/products?categoryName=isAllProducts">
            {t("others_category", "Others")}
          </Link>
        </li>
      </ul>
    </li>
  );
};
