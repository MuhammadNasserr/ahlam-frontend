import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../../contexts/TranslationContext";

const ProductCategoriesSidebar = ({
  categories,
  categoriesLoading,
  selectedCategoryId,
  initialCategoryCount,
  showAllCategories,
  setShowAllCategories,
  onCategorySelect,
  onAllProductsSelect,
}) => {
  const { t } = useTranslation();

  const handleToggleCategories = () => {
    setShowAllCategories((prev) => !prev);
  };

  const categoriesToDisplay = showAllCategories
    ? categories
    : categories.slice(0, initialCategoryCount - 1); // -1 for 'Others'
  const needsOthersButton = categories.length > initialCategoryCount - 1;

  const CategorySkeleton = () => (
    <li
      className="list-group-item border-0"
      style={{
        padding: "15px",
        backgroundColor: "var(--bg-color)",
      }}
    >
      <div className="skeleton skeleton-text" style={{ width: "80%", height: "20px" }}></div>
    </li>
  );

  return (
    <div className="col-md-3 col-xl-2 mb-3">
      <h5
        className="fw-bold text-white text-center mb-0 p-3"
        style={{
          backgroundColor: "var(--green-color)",
          fontSize: "16px",
          borderTopLeftRadius: "12px",
          borderTopRightRadius: "12px",
        }}
      >
        {t("Product categories", "Product categories")}
      </h5>
      {categoriesLoading ? (
        <ul className="list-group rounded flex-row flex-md-column flex-wrap flex-md-nowrap border-0 mt-3 mt-md-0">
          {Array(5)
            .fill(null)
            .map((_, i) => (
              <CategorySkeleton key={`cat-skeleton-${i}`} />
            ))}
        </ul>
      ) : (
        <ul
          className="list-group cat-names-fetch flex-row flex-md-column flex-wrap flex-md-nowrap mt-3 mt-md-0"
          style={{
            borderLeft: "1px solid var(--border)",
            borderRight: "1px solid var(--border)",
            borderBottom: "1px solid var(--border)",
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            WebkitUserSelect: "none",
            MozUserSelect: "none",
            msUserSelect: "none",
            userSelect: "none",
          }}
        >
          {/* "All" Category */}
          <li
            className="list-group-item border-0 category-item-border-lg"
            style={{
              cursor: "pointer",
              padding: "15px",
              backgroundColor: selectedCategoryId === null ? "var(--bg-green)" : "var(--bg-color)",
              color: selectedCategoryId === null ? "var(--green-color)" : "var(--heading-color)",
              fontWeight: selectedCategoryId === null ? "700" : "",
            }}
            onClick={onAllProductsSelect}
          >
            {t("All", "All")}
          </li>
          {/* Render limited categories or all categories */}
          {categoriesToDisplay.map((cat) => (
            <li
              key={cat.id}
              className="rounded list-group-item border-0 category-item-border-lg"
              style={{
                cursor: "pointer",
                padding: "15px",
                backgroundColor:
                  selectedCategoryId === cat.id ? "var(--bg-green)" : "var(--bg-color)",
                color:
                  selectedCategoryId === cat.id ? "var(--green-color)" : "var(--heading-color)",
                fontWeight: selectedCategoryId === cat.id ? "700" : "",
              }}
              onClick={() => onCategorySelect(cat.id)}
            >
              {cat.name}
            </li>
          ))}
          {/* "Others" / "Show Less" Button */}
          {needsOthersButton && (
            <li
              className="list-group-item border-0 category-item-border-lg"
              style={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                padding: "15px",
                backgroundColor: "var(--bg-color)",
                color: "var(--heading-color)",
              }}
              onClick={handleToggleCategories}
            >
              {showAllCategories ? (
                <>
                  {t("Show_Less", "Show Less")}{" "}
                  <FontAwesomeIcon
                    icon={faChevronUp}
                    className="ms-2 ms-md-auto"
                    style={{
                      fontSize: "12px",
                    }}
                  />
                </>
              ) : (
                <>
                  {t("Others", "Others")}{" "}
                  <FontAwesomeIcon
                    icon={faChevronRight}
                    className="ms-2 ms-md-auto"
                    style={{ fontSize: "12px" }}
                  />
                </>
              )}
            </li>
          )}
        </ul>
      )}
    </div>
  );
};

export default ProductCategoriesSidebar;
