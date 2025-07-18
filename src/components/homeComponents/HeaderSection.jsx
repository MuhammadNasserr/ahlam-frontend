import { Link } from "react-router-dom";
import img1320 from "../../../Public/images/img1-320.webp";
import img1480 from "../../../Public/images/img1-480.webp";
import img1768 from "../../../Public/images/img1-768.webp";
import img11024 from "../../../Public/images/img1-1024.webp";
import img11440 from "../../../Public/images/img1-1440.webp";
import img11920 from "../../../Public/images/img1-1920.webp";
import img2 from "../../../Public/images/img2.webp";
import img3 from "../../../Public/images/img3.webp";
import threedots from "../../../Public/images/threedots.webp";
import { useTranslation } from "../../contexts/TranslationContext";
import Carousel from "react-bootstrap/Carousel";
import Dropdown from "react-bootstrap/Dropdown";
import { OurNumbersSection } from "./OurNumbersSection";

export const HeaderSection = () => {
  const { t } = useTranslation();

  return (
    <header>
      <Carousel interval={3000} fade wrap={true} id="heroCarousel" className="hero-section">
        <Carousel.Item>
          <img
            src={img11920} // الصورة الافتراضية/الأكبر
            srcSet={`${img1320} 320w,
                      ${img1480} 480w,
                      ${img1768} 768w,
                      ${img11024} 1024w,
                      ${img11440} 1440w,
                      ${img11920} 1920w`}
            sizes="100vw" // لأن الصورة ستأخذ عرض الشاشة بالكامل
            alt="Egypt's Finest Produce - Slide 1"
            className="d-block w-100 carousel-img"
            fetchPriority="high" // مهم لـ LCP
            loading="eager" // مهم لـ LCP
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={img2}
            alt="Egypt's Finest Produce - Slide 2"
            className="d-block w-100 carousel-img"
            loading="lazy"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            src={img3}
            alt="Egypt's Finest Produce - Slide 3"
            className="d-block w-100 carousel-img"
            loading="lazy"
          />
        </Carousel.Item>
      </Carousel>

      <div
        className="container text-center mt-5 mt-md-0"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          zIndex: "10",
        }}
      >
        <div className="header-content">
          <h1 className="home-heading text-white" style={{ maxWidth: "900px", margin: "auto" }}>
            {t(
              "header_main_heading",
              "Bringing Egypt's Finest Fresh & Frozen Produce to the World"
            )}
          </h1>
          <p className="home-description my-4 mx-auto text-white">
            {t(
              "header_description",
              "At AHLAM, we specialize in exporting premium-quality fruits, vegetables, and frozen goods. With a strong focus on freshness, safety, and sustainability, we deliver nature's best—straight from Egyptian farms to global markets."
            )}
          </p>
          <div className="header-btn d-flex justify-content-center align-items-center gap-3">
            <Dropdown className="d-flex justify-content-center">
              <Dropdown.Toggle
                className="btn mt-3 d-flex align-items-center justify-content-center home-btn"
                style={{
                  backgroundColor: "var(--green-color)",
                  color: "#fff",
                  border: "none",
                }}
                id="dropdown-get-started"
              >
                {t("get_started_button", "Get Started")}
                <img className="ms-2" width={4} height={15} src={threedots} alt="threedots-icon" />
              </Dropdown.Toggle>

              <Dropdown.Menu className="mt-2" style={{ backgroundColor: "var(--bg-color)" }}>
                {" "}
                <Dropdown.Item as={Link} to="/Supplier">
                  {" "}
                  {/* --- START: ترجمة As Supplier --- */}
                  {t("as_supplier_option", "As Supplier")}
                  {/* --- END: ترجمة As Supplier --- */}
                </Dropdown.Item>
                <Dropdown.Item as={Link} to="/Products">
                  {/* --- START: ترجمة As Buyer --- */}
                  {t("as_buyer_option", "As Buyer")}
                  {/* --- END: ترجمة As Buyer --- */}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Link
              to={"/contact-us"}
              style={{ backgroundColor: "black" }}
              className="btn mt-3 home-btn"
            >
              {t("contact_us_button", "Contact us")}
            </Link>
          </div>
          <OurNumbersSection />
        </div>
      </div>
    </header>
  );
};
