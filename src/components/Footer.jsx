import { Link } from "react-router-dom";
import logo from "../../Public/images/logo.webp";
import darklogo from "../../Public/images/logodark.webp";
import React, { useState, Suspense, lazy } from "react";

import { useTranslation } from "../contexts/TranslationContext";
import SubscribeForm from "./SubscribeForm";
import Modal from "./Modal";

const LazySubescripe = lazy(() => import("./Subescripe"));

const Footer = ({ isDark }) => {
  const { t } = useTranslation();

  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <footer style={{ color: "var(--heading-color)" }}>
      {/* Grid container */}
      <div className="container py-5">
        {/* Grid row */}
        <div className="row justify-content-between grid-link">
          <div className="mb-4 mb-md-0 col-lg-6">
            {/* Logo */}
            <Link to="/">
              {isDark ? (
                <img src={darklogo} alt="logo-png" width="94" height="63" loading="lazy" />
              ) : (
                <img src={logo} alt="logo-png" width="94" height="63" loading="lazy" />
              )}
            </Link>
            {/* Form */}
            <SubscribeForm openModal={openModal} closeModal={closeModal} />
          </div>

          <div className="d-flex flex-wrap justify-content-between col-md-12 col-lg-5">
            <div className="m-3">
              <h5>{t("footer_products_heading", "Products")}</h5>
              <ul className="list-unstyled mt-3 footer-link">
                <li>
                  <Link to="/products?categoryName=Fresh Fruits" className="text-body">
                    {t("fresh_fruits_link", "Fresh Fruits")}
                  </Link>
                </li>
                <li>
                  <Link to="/products?categoryName=Frozen Fruits" className="text-body">
                    {t("frozen_fruits_link", "Frozen Fruits")}
                  </Link>
                </li>
                <li>
                  <Link to="/products?categoryName=Fresh Vegetables" className="text-body">
                    {t("fresh_vegetables_link", "Fresh Vegetables")}
                  </Link>
                </li>
                <li>
                  <Link to="/products?categoryName=Frozen Vegetables" className="text-body">
                    {t("frozen_vegetables_link", "Frozen Vegetables")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="m-3">
              <h5>{t("footer_links_heading", "Links")}</h5>
              <ul className="list-unstyled mt-3 footer-link">
                <li>
                  <Link to="/Supplier" className="text-body">
                    {t("supplier_link", "Supplier")}
                  </Link>
                </li>
                <li>
                  <Link to="/products" className="text-body">
                    {t("products_link", "Products")}
                  </Link>
                </li>
                <li>
                  <Link to="/faqs" className="text-body">
                    {t("faqs_link", "FAQs")}
                  </Link>
                </li>
                <li>
                  <Link to="/contact-us" className="text-body">
                    {t("contact_us_link", "Contact us")}
                  </Link>
                </li>
              </ul>
            </div>

            <div className="m-3">
              <h5>{t("follow_us_heading", "Follow us")}</h5>
              <ul className="list-unstyled mt-3 footer-link">
                <li>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/AhlamFoods22"
                    className="text-body"
                    rel="noreferrer"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.pinterest.com/ahlamfoods781/"
                    className="text-body"
                    rel="noreferrer"
                  >
                    Pinterest
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://www.instagram.com/ahlam_foods/"
                    className="text-body"
                    rel="noreferrer"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    target="_blank"
                    href="https://x.com/AhlamFoods"
                    className="text-body"
                    rel="noreferrer"
                  >
                    Twitter
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Grid row */}

        {/* Copyright */}
        <div className="d-flex justify-content-between mt-3 py-3 copy-right">
          <span>{t("copyright_text", "Copyright © 2025 AHLAM")}</span>
          <Link to="/privacy">{t("privacy_policy_link", "Privacy Policy")}</Link>
        </div>
        <div className="copy-right">
          {t("Design_contact", "Design your ideal website with us.")}{" "}
          <a
            style={{ textDecoration: "underline", color: "blue" }}
            href="mailto:betadevstudio1@gmail.com"
          >
            {t("our_link", "Get started today!")}
          </a>
        </div>
        {/* Copyright */}
      </div>

      {/* المودال الخاص بالاشتراك */}
      {/* استخدم Suspense حوالين المكون اللي بيتعمله lazy load */}
      <Modal isOpen={isOpen} openModal={openModal}>
        <Suspense fallback={null}>
          <LazySubescripe />
        </Suspense>
      </Modal>
    </footer>
  );
};

export default Footer;
