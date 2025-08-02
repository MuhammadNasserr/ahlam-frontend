import { Link } from "react-router-dom";
import { useTranslation } from "../../contexts/TranslationContext";

const ProductGrid = ({
  products,
  productsLoading,
  baseImageUrl,
  onQuickInquire,
  currentPage,
  totalPages, // This will now come directly from the API response (e.g., productData.last_page)
  onPageChange,
  productsCount, // This will be the count of products on the *current* page for display,
  // or the overall count if the API sends it separately.
  // For "No products available", it's better to use products.length
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

  // --- Logic for pagination numbers with ellipsis (Revised) ---
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxActivePageButtons = 4; // Total active page buttons to show (e.g., 3 4 [5] 6 7)
    const sideButtons = Math.floor(maxActivePageButtons / 2); // Number of buttons on each side of currentPage

    let startRange = currentPage - sideButtons;
    let endRange = currentPage + sideButtons;

    // Adjust range if it goes too far left
    if (startRange < 1) {
      endRange += 1 - startRange;
      startRange = 1;
    }

    // Adjust range if it goes too far right
    if (endRange > totalPages) {
      startRange -= endRange - totalPages;
      endRange = totalPages;
    }

    // Ensure startRange doesn't go below 1 after right adjustment
    startRange = Math.max(1, startRange);

    // Add first page button and leading ellipsis
    if (startRange > 1) {
      pageNumbers.push(1);
      if (startRange > 2) {
        // Only show ... if there's more than one page skipped
        pageNumbers.push("...");
      }
    }

    // Add pages within the calculated active range
    for (let i = startRange; i <= endRange; i++) {
      if (i >= 1 && i <= totalPages) {
        // Ensure page number is valid
        pageNumbers.push(i);
      }
    }

    // Add trailing ellipsis and last page button
    if (endRange < totalPages) {
      if (endRange < totalPages - 1) {
        // Only show ... if there's more than one page skipped
        pageNumbers.push("...");
      }
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  };

  const displayedPageNumbers = getPageNumbers();
  // --- End of logic for pagination numbers with ellipsis ---

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
      ) : products.length === 0 ? ( // Check products.length for "no products" message
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
        <>
          <div className="row">
            {products.map((product) => (
              <div className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4" key={product.id}>
                <div className="product-card-fetch h-100 shadow-sm p-2" data-aos="fade-up">
                  <Link to={`/products/${product.id}`} className="d-block text-decoration-none">
                    <div className="position-relative mb-2">
                      <span
                        className={`badge text-white position-absolute ${
                          product.is_available === "Unavailable"
                            ? "bg-danger"
                            : product.is_available === "Available"
                              ? "bg-success"
                              : product.is_available === "Soon"
                                ? "bg-primary"
                                : ""
                        }`}
                        style={{
                          top: "10px",
                          right: "10px",
                          fontSize: "12px",
                          padding: "5px 15px",
                        }}
                      >
                        {product.is_available}
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
                    <div className="ps-2">
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

          {/* Pagination Controls */}
          {totalPages > 1 && ( // Only show pagination if there's more than 1 page
            <nav
              aria-label="Product page navigation"
              className="mt-4"
              style={{ backgroundColor: "var(--bg-color)" }}
            >
              <ul className="pagination justify-content-center">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => onPageChange(currentPage - 1)}
                    aria-label="Previous"
                  >
                    <span aria-hidden="true">&laquo;</span>
                  </button>
                </li>

                {displayedPageNumbers.map((pageNumber, index) => (
                  <li
                    key={pageNumber === "..." ? `ellipsis-${index}` : pageNumber}
                    className={`page-item ${pageNumber === "..." ? "disabled" : ""} ${
                      currentPage === pageNumber ? "active" : ""
                    }`}
                  >
                    <button
                      className="page-link"
                      onClick={() => pageNumber !== "..." && onPageChange(pageNumber)}
                      disabled={pageNumber === "..."}
                    >
                      {pageNumber}
                    </button>
                  </li>
                ))}

                <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                  <button
                    className="page-link"
                    onClick={() => onPageChange(currentPage + 1)}
                    aria-label="Next"
                  >
                    <span aria-hidden="true">&raquo;</span>
                  </button>
                </li>
              </ul>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default ProductGrid;
