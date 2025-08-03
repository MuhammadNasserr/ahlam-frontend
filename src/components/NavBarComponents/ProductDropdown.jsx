import React, { useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";

export const ProductDropdown = ({ t, isMainProductsActive }) => {
  // The useEffect for closing dropdowns on outside clicks is still necessary
  // as pure CSS hover doesn't manage global global clicks.
  useEffect(() => {
    const handleDocumentClick = (event) => {
      const dropdownContainer = document.getElementById("productsDropdownContainer");
      if (dropdownContainer && !dropdownContainer.contains(event.target)) {
        // Find any 'show' classes on dropdown menus within this container and remove them
        dropdownContainer.querySelectorAll(".dropdown-menu.show").forEach((menu) => {
          menu.classList.remove("show");
        });
      }
    };

    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []); // Empty dependency array means this runs once on mount

  return (
    <li
      className="nav-item dropdownn"
      id="productsDropdownContainer" // Important for the click-outside logic
    >
      <NavLink
        className={({ isActive }) =>
          `nav-link dropdown-toggle d-flex align-items-center ${
            isActive || isMainProductsActive() ? "active" : ""
          }`
        }
        to="/products?isAllProducts=true" // Clicking "Products" now navigates to show all products
        id="productsDropdown"
        role="button"
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
        className="dropdown-menu" // CSS will add/remove 'show'
        aria-labelledby="productsDropdown"
        style={{ backgroundColor: "var(--bg-color)", width: "200px" }}
      >
        {/* Frozen dropdown */}
        <li className="dropend">
          <Link
            className="dropdown-item d-flex align-items-center justify-content-between"
            to="/products?categoryId=2&page=1"
          >
            {t("frozen", "Frozen")}
            <FontAwesomeIcon icon={faAngleDown} rotation={270} />
          </Link>
          <ul
            className="dropdown-menu dropdown-submenu"
            style={{
              backgroundColor: "var(--bg-color)",
            }}
          >
            <li>
              <Link className="dropdown-item" to="/products?categoryId=2&page=1">
                {t("fruits", "Fruits")}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/products?categoryId=3&page=1">
                {t("vegetables", "Vegetables")}
              </Link>
            </li>
          </ul>
        </li>

        {/* Fresh dropdown */}
        <li className="dropend">
          <Link
            className="dropdown-item d-flex align-items-center justify-content-between"
            to="/products?categoryId=4&page=1"
          >
            {t("fresh", "Fresh")}
            <FontAwesomeIcon icon={faAngleDown} rotation={270} />
          </Link>
          <ul
            className="dropdown-menu dropdown-submenu"
            style={{
              backgroundColor: "var(--bg-color)",
            }}
          >
            <li>
              <Link className="dropdown-item" to="/products?categoryId=4&page=1">
                {t("fruits", "Fruits")}
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to="/products?categoryId=5&page=1">
                {t("vegetables", "Vegetables")}
              </Link>
            </li>
          </ul>
        </li>

        {/* Other categories */}
        <li>
          <Link className="dropdown-item" to="/products?categoryId=6&page=1">
            {t("spices_herbs", "Herbs")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/products?categoryId=7&page=1">
            {t("pickles", "Pickles")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/products?categoryId=8&page=1">
            {t("dates", "Dates")}
          </Link>
        </li>
        <li>
          <Link className="dropdown-item" to="/products?isAllProducts=true&page=1">
            {t("others_category", "Others")}
          </Link>
        </li>
      </ul>
    </li>
  );
};
