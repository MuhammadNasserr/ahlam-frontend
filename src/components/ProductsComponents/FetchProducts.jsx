import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../utilis/fetch";
import { useTranslation } from "../../contexts/TranslationContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

import ProductCategoriesSidebar from "./ProductCategoriesSidebar";
import ProductGrid from "./ProductGrid";
import CategoryDescription from "./CategoryDescription";
import ContactModal from "./../ContactModel";
import ContactSection from "../ContactSection";
import Modal from "../Modal";
import Confirm from "../Confirm";

const baseImageUrl = "https://api.ahlamfoods.com/storage/";

const FetchProducts = () => {
  const containerRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, locale } = useTranslation();

  const initialCategoryCount = 8;
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Re-introduce currentPage and setCurrentPage state
  // Initialize with 1, and it will be updated by useEffect from URL
  const [currentPage, setCurrentPage] = useState(1);

  // Modal states for product inquiry
  const [isOpen, setIsOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentProductName, setCurrentProductName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const submittedForm = () => setSubmitted(true);
  const unSubmittedForm = () => setSubmitted(false);

  // Effect for scrolling to product section and updating currentPage from URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryIdInUrl = queryParams.get("categoryId"); // Look for categoryId
    const pageInUrl = queryParams.get("page"); // Get page from URL

    // Update currentPage from URL or default to 1
    setCurrentPage(parseInt(pageInUrl) || 1);

    // Scroll to section if a category is selected or all products are viewed
    if ((categoryIdInUrl || queryParams.get("isAllProducts")) && containerRef.current) {
      const elementRect = containerRef.current.getBoundingClientRect();
      const offsetTop = elementRect.top + window.scrollY;
      const scrollPosition = offsetTop - 80;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
  }, [location.search]); // Depend on location.search to re-run when URL changes

  // Fetch categories using react-query
  const {
    data: categories = [],
    isLoading: categoriesLoading,
    isError: categoriesError,
    refetch: refetchCategories,
  } = useQuery({
    queryKey: ["categories", locale],
    queryFn: () => fetchData("/categories"),
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  // Effect to update selectedCategoryId and handle "Others" expansion
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const idFromUrl = params.get("categoryId"); // Get categoryId from URL
    const isAllProducts = params.get("isAllProducts");

    if (idFromUrl !== null && categories.length > 0) {
      const foundCategory = categories.find(
        (cat) => String(cat.id) === idFromUrl // Compare ID as string to URL param
      );

      if (foundCategory) {
        setSelectedCategoryId(foundCategory.id);
        const selectedCategoryIndex = categories.findIndex((cat) => cat.id === foundCategory.id);
        if (selectedCategoryIndex >= initialCategoryCount - 1) {
          setShowAllCategories(true);
        } else {
          setShowAllCategories(false);
        }
      } else {
        setSelectedCategoryId(null);
        setShowAllCategories(false);
      }
    } else if (isAllProducts === "true" || idFromUrl === null) {
      // If "isAllProducts" is true or no categoryId is present
      setSelectedCategoryId(null);
      setShowAllCategories(false);
    }
  }, [location.search, categories, initialCategoryCount]);

  // Fetch products using react-query
  const {
    data: productData = { data: [], last_page: 1 }, // Initialize with structure to avoid errors
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products", selectedCategoryId, locale, currentPage], // Add currentPage to queryKey
    queryFn: () => {
      let url = "";
      if (selectedCategoryId === null) {
        url = `/products?page=${currentPage}`; // Pass page for all products
      } else {
        url = `/categories/${selectedCategoryId}/products?page=${currentPage}`; // Pass page for category products
      }
      return fetchData(url);
    },
    enabled: true,
    retry: 1,
    staleTime: 0,
    keepPreviousData: true, // Keep previous data while fetching new page
  });

  const products = productData.data || [];
  const totalPages = productData.last_page || 1;

  // Handle page change - now updates URL and then currentPage state via useEffect
  const handlePageChange = (pageNumber) => {
    const params = new URLSearchParams(location.search);
    params.set("page", pageNumber);
    navigate(`${location.pathname}?${params.toString()}`);
    // The setCurrentPage will be handled by the useEffect watching location.search
    if (containerRef.current) {
      window.scrollTo({
        top: containerRef.current.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  // Determine if there's any error
  const hasOverallError = categoriesError || productsError;
  const isLoadingAnything = categoriesLoading || productsLoading;

  // Function to refresh all data
  const handleRefreshAll = () => {
    refetchCategories();
    refetchProducts();
  };

  const selectedCategory = selectedCategoryId
    ? categories.find((cat) => cat.id === selectedCategoryId)
    : null;

  const handleCategorySelect = (categoryId) => {
    // Reset page to 1 when category changes
    navigate(`/products?categoryId=${categoryId}&page=1`);
  };

  const handleAllProductsSelect = () => {
    // Reset page to 1 when selecting all products and add isAllProducts=true
    navigate("/products?isAllProducts=true&page=1");
  };

  const handleQuickInquire = (productId, productName) => {
    setCurrentProductId(productId);
    setCurrentProductName(productName);
    openModal();
  };

  return (
    <>
      <ContactModal isOpen={isOpen} closeModal={closeModal}>
        <ContactSection
          submittedForm={submittedForm}
          unSubmittedForm={unSubmittedForm}
          closeModal={closeModal}
          currentProductId={currentProductId}
          currentProductName={currentProductName}
        />
      </ContactModal>
      <Modal isOpen={submitted}>
        <Confirm />
      </Modal>
      <div className="container py-4" ref={containerRef}>
        {hasOverallError ? (
          <div
            className="alert alert-danger d-flex flex-column align-items-center justify-content-center text-center mx-auto"
            role="alert"
            style={{ maxWidth: "500px", padding: "20px" }}
          >
            <p className="mb-2 fs-5">
              {t("error_loading_data", "Failed to load data. Please try again.")}
            </p>
            <button
              onClick={handleRefreshAll}
              className="btn btn-sm btn-outline-danger"
              disabled={isLoadingAnything}
            >
              <FontAwesomeIcon icon={faSyncAlt} className={isLoadingAnything ? "fa-spin" : ""} />{" "}
              {t("refresh", "Refresh")}
            </button>
          </div>
        ) : (
          <div className="row">
            <ProductCategoriesSidebar
              categories={categories}
              categoriesLoading={categoriesLoading}
              selectedCategoryId={selectedCategoryId}
              initialCategoryCount={initialCategoryCount}
              showAllCategories={showAllCategories}
              setShowAllCategories={setShowAllCategories}
              onCategorySelect={handleCategorySelect}
              onAllProductsSelect={handleAllProductsSelect}
            />

            <ProductGrid
              products={products}
              productsLoading={productsLoading}
              baseImageUrl={baseImageUrl}
              onQuickInquire={handleQuickInquire}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              productsCount={products.length} // Still useful for "no products" message
            />
          </div>
        )}
      </div>
      {selectedCategoryId && <CategoryDescription selectedCategory={selectedCategory} />}
    </>
  );
};

export default FetchProducts;
