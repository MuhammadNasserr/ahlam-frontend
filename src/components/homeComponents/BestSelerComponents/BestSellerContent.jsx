import SkeletonBestSellerEffect from "../SkeletonBestSellerEffect";
import BestSellerCard from "./BestSellerCard";
import { useTranslation } from "../../../contexts/TranslationContext";

const BestSellerContent = ({
  isLoading,
  isError,
  data,
  numberOfSkeletonCards,
  isDraggingRef,
  openModal,
  setCurrentProductName,
  setCurrentProductId,
}) => {
  const { t } = useTranslation();

  if (isLoading) {
    return [...Array(numberOfSkeletonCards)].map((_, index) => (
      <div key={index} className="d-inline-block product-card-wrapper">
        <SkeletonBestSellerEffect />
      </div>
    ));
  }

  if (isError) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">
          {t("no_products_due_to_error", "No products could be displayed due to an error.")}
        </p>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="text-muted">
          {t(
            "no_best_seller_products_available",
            "No best seller products available at the moment."
          )}
        </p>
      </div>
    );
  }

  return data.map((product, index) => (
    <BestSellerCard
      key={index}
      product={product}
      isDraggingRef={isDraggingRef}
      openModal={openModal}
      setCurrentProductName={setCurrentProductName}
      setCurrentProductId={setCurrentProductId}
    />
  ));
};

export default BestSellerContent;
