import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import besticon from "../../../../Public/images/best-icon.webp";
import seller from "../../../../Public/images/seller-icon.webp";

const BestSellerHeader = ({ t, isError, isLoading, refetch }) => {
  return (
    <>
      <img
        className="trend-icon position-absolute"
        src={seller}
        width="180"
        height="150"
        alt="seller-trend"
        loading="lazy"
      />
      <div className="info text-center" data-aos="fade-down">
        <h1 className="home-heading mb-3">
          {t("best_seller_products", "Best Seller Products")}
          <span>
            <img
              className="position-absolute trend-icon"
              src={besticon}
              alt="best-icon"
              width="70"
              height="40"
              loading="lazy"
            />
          </span>
        </h1>
        <p className="home-description mx-auto">
          {t(
            "best_seller_description",
            "Explore our top-selling products, carefully selected for importers and distributors seeking high-quality bulk supplies. With a strong focus on export-grade standards, our diverse range ensures reliability and consistency to support the needs of global import businesses."
          )}
        </p>
        {isError && (
          <div
            className="alert alert-danger mt-3 d-flex align-items-center justify-content-center"
            role="alert"
          >
            <p className="mb-0 me-3">
              {t("failed_to_load_products", "Failed to load products. Please try again.")}
            </p>
            <button onClick={refetch} className="btn btn-sm" disabled={isLoading}>
              <FontAwesomeIcon icon={faSyncAlt} className={isLoading ? "fa-spin" : ""} />{" "}
              {t("refresh", "Refresh")}
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default BestSellerHeader;
