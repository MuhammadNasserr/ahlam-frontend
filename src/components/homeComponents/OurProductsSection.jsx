import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faSyncAlt } from "@fortawesome/free-solid-svg-icons"; // Import faSyncAlt
import { useTranslation } from "../../contexts/TranslationContext";
import { fetchData } from "../../utilis/fetch"; // Make sure this path is correct
import { useQuery } from "@tanstack/react-query"; // Import useQuery

const OurProductsSection = () => {
  const { t, locale } = useTranslation();

  // Remove `loading` and `error` state variables, react-query will manage them
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const BASE_Image_URL = "https://api.ahlamfoods.com"; // Still needed for image paths

  // ✨ Use useQuery for fetching categories
  const {
    data: categories = [], // Destructure data and rename it to categories, provide default empty array
    isLoading, // Loading state from react-query
    isError, // Error state from react-query
    refetch, // Function to refetch data from react-query
  } = useQuery({
    queryKey: ["home-categories", locale], // Unique key for this query
    queryFn: async () => {
      // Your existing fetch logic adapted for react-query
      const responseData = await fetchData("/home_categories");
      // Add a check similar to your original component to ensure it's an array
      if (Array.isArray(responseData)) {
        return responseData;
      } else {
        console.warn("API response for categories was not an array:", responseData);
        // If it's not an array, return an empty array to prevent rendering issues
        // or throw an error if this is considered a critical failure
        throw new Error("Invalid data format received from API for categories.");
      }
    },
    // Optional: add options for react-query
    staleTime: 5 * 60 * 1000, // Data considered fresh for 5 minutes
    retry: 1, // Retry once on failure
  });

  const SkeletonCard = () => (
    <div className="card-container col-6 col-lg-3 col-md-4 col-sm-6" data-aos="flip-left">
      <div className="card d-block" style={{ backgroundColor: "var(--white-color)" }}>
        <div className="card-image position-relative">
          <div
            className="skeleton skeleton-image"
            style={{ width: "100%", height: "150px", borderRadius: "30px" }}
          ></div>
        </div>
        <div className="card-txt p-3">
          <div
            className="skeleton skeleton-button"
            style={{ height: "40px", width: "100%", borderRadius: "20px" }}
          ></div>
        </div>
      </div>
    </div>
  );

  // No longer need renderCategoryCardsContent, we'll inline it in JSX
  // as the logic is now handled by isLoading, isError, and data.length

  return (
    <section className="our-product position-relative text-center text-md-start py-5">
      <div className="container">
        <div
          className="product-heading d-flex justify-content-center justify-content-md-between"
          data-aos="zoom-out"
        >
          <Link to="/products">
            <h1 className="home-heading mb-3">{t("our_products_heading", "Our Products")}</h1>
          </Link>
          {/* ✨ Error message and Refresh button, similar to BestSellerSection */}
          {isError && (
            <div
              className="alert alert-danger mt-3 d-flex align-items-center justify-content-center"
              role="alert"
            >
              <p className="mb-0 me-3">
                {t("error_loading_categories", "Failed to load categories. Please try again.")}
              </p>
              <button
                onClick={() => refetch()} // Call refetch to retry fetching data
                className="btn btn-sm"
                disabled={isLoading} // Disable button while loading
              >
                <FontAwesomeIcon icon={faSyncAlt} className={isLoading ? "fa-spin" : ""} />{" "}
                {t("refresh", "Refresh")}
              </button>
            </div>
          )}
        </div>

        <div className="row category mt-3 g-4">
          {isLoading ? (
            // Display skeleton cards when loading
            Array(8)
              .fill()
              .map((_, index) => <SkeletonCard key={`skeleton-${index}`} />)
          ) : isError ? (
            // Display a specific message when there's an error and no data could be loaded
            <div className="text-center py-5 w-100">
              <p className="text-muted">
                {t(
                  "no_categories_due_to_error",
                  "No categories could be displayed due to an error."
                )}
              </p>
            </div>
          ) : categories.length === 0 ? (
            // Display message if no categories are available
            <div className="text-center py-5 w-100">
              <p className="text-muted">
                {t("no_categories_found", "No categories were found at this time.")}
              </p>
            </div>
          ) : (
            // Display actual category cards when data is loaded successfully
            categories.map((cat) => (
              <div
                className="card-container col-6 col-lg-3 col-md-4 col-sm-6"
                key={cat.id}
                data-aos="flip-left"
              >
                <Link
                  to={`/products?categoryName=${cat.name}`}
                  className="card d-block"
                  style={{ backgroundColor: "var(--white-color)" }}
                >
                  <img
                    src={cat.image ? `${BASE_Image_URL}${cat.image}` : ""}
                    width={280}
                    height={270}
                    className="card-img-top mb-3 img-fluid"
                    style={{ borderRadius: "30px", objectFit: "cover" }}
                    alt={cat.name}
                    loading="lazy"
                  />
                  <button>
                    {cat.name}
                    <FontAwesomeIcon icon={faArrowRight} className="ms-2 fade-d" />
                  </button>
                </Link>
              </div>
            ))
          )}
        </div>
        <Link
          className="home-btn other-btn d-flex my-4 justify-content-center align-items-center"
          style={{ backgroundColor: "transparent" }}
          to="/products"
        >
          {t("others_button", "Others")}
          <FontAwesomeIcon icon={faArrowRight} className="ms-2 shake" />
        </Link>
      </div>
    </section>
  );
};
export default OurProductsSection;
