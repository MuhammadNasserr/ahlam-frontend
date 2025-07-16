import { Link } from "react-router-dom";
import { useTranslation } from "../../../contexts/TranslationContext";

const BestSellerCard = ({
  product,
  isDraggingRef,
  openModal,
  setCurrentProductName,
  setCurrentProductId,
}) => {
  const { t } = useTranslation();

  return (
    <div className="d-inline-block product-card-wrapper">
      <div className="product-card">
        <Link
          to={`/products/${product.id}`}
          className="product-card-link-area"
          onClick={(e) => {
            if (isDraggingRef.current) {
              e.preventDefault();
              isDraggingRef.current = false;
            }
          }}
        >
          <div className="card-body">
            <div className="card-image position-relative">
              <span className="badge-custom">{product.category}</span>
              <img
                src={`https://api.ahlamfoods.com/storage/${product?.main_image}`}
                alt={product.category}
                style={{ width: "300px", height: "100%" }}
                className="img-fluid"
                loading="lazy"
              />
            </div>
            <div className="card-txt p-3">
              <p className="descripe-card">{product.subdescription?.slice(0, 50)}....</p>
              <p className="product-name my-2">{product.name}</p>
              <p className="price mb-0">
                $ {product.price}
                <sub style={{ color: "var(--heading-color)" }}>/{t("per ton", "per ton")}</sub>
              </p>
            </div>
          </div>
        </Link>
        <div className="card-button-area p-3 pt-0">
          <button
            onClick={() => {
              setCurrentProductName(product.name);
              setCurrentProductId(product.id);
              openModal();
            }}
            className="btn-green quick-inquire-btn"
          >
            {t("Quick Inquire", "Quick Inquire")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BestSellerCard;
