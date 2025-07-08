// src/components/ProductPage/ProductGrid.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../../contexts/TranslationContext";

const ProductGrid = ({
  products,
  productsLoading,
  productsError,
  refetchProducts,
  baseImageUrl,
  onQuickInquire,
}) => {
  const { t } = useTranslation();

  const ProductSkeletonCard = () => (
    <div className="col-6 col-md-3 mb-4">
      <div className="border rounded h-100 p-2">
        <div className="w-100 mb-2 skeleton skeleton-img" style={{ height: "100px" }}></div>
        <div className="skeleton skeleton-text w-75 mb-1"></div>
        <div className="skeleton skeleton-text w-50 mb-2"></div>
        <div className="skeleton skeleton-text w-100 mb-2"></div>
        <div className="skeleton skeleton-btn w-100"></div>
      </div>
    </div>
  );

  return (
    <div className="col-md-9 col-xl-10">
      {productsLoading ? (
        <div className="row">
          {Array(8)
            .fill(null)
            .map((_, i) => (
              <ProductSkeletonCard key={i} />
            ))}
        </div>
      ) : productsError ? (
        <div
          className="alert alert-danger mt-3 d-flex flex-column align-items-center justify-content-center text-center"
          role="alert"
        >
          <p className="mb-2">
            {t("failed_to_load_products", "Failed to load products. Please try again.")}
          </p>
          <button onClick={refetchProducts} className="btn btn-sm" disabled={productsLoading}>
            <FontAwesomeIcon icon={faSyncAlt} className={productsLoading ? "fa-spin" : ""} />{" "}
            {t("refresh", "Refresh")}
          </button>
        </div>
      ) : products.length === 0 ? (
        <p
          className="fw-bold"
          style={{
            color: "var(--green-color)",
            textAlign: "center",
            fontSize: "32px",
            marginTop: "50px",
          }}
        >
          {t("no_products_for_category", "No products available for this category.")}
        </p>
      ) : (
        <div className="row">
          {products.map((product) => (
            <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
              <div className="product-card-fetch h-100 shadow-sm p-2" data-aos="fade-up">
                <Link to={`/products/${product.id}`} className="d-block text-decoration-none">
                  <div className="position-relative mb-2">
                    <span
                      className={`badge text-white position-absolute ${
                        product.is_available === false ? "bg-danger" : "bg-success"
                      }`}
                      style={{
                        top: "10px",
                        right: "10px",
                        fontSize: "12px",
                        padding: "5px 15px",
                      }}
                    >
                      {product.is_available === false
                        ? `${t("Unavailable", "Unavailable")}`
                        : `${t("available", "available")}`}
                    </span>
                    <img
                      src={`${baseImageUrl}${product?.main_image}`}
                      alt={product.name}
                      className="img-fluid w-100"
                      style={{
                        height: "200px",
                        objectFit: "cover",
                        borderRadius: "25px",
                      }}
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <p
                      className="my-3"
                      style={{
                        color: "var(--sub-text)",
                        fontSize: "15px",
                      }}
                    >
                      {product.subdescription?.slice(0, 30)}...
                    </p>
                    <p className="fw-bold mb-2" style={{ fontSize: "18px" }}>
                      {product.name}
                    </p>
                  </div>
                </Link>
                <button
                  onClick={() => onQuickInquire(product.id, product.name)}
                  className="btn w-100 my-2"
                >
                  {t("Quick Inquire", "Quick Inquire")}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
