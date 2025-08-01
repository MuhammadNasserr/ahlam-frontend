// src/components/ProductPage/ProductPage.jsx
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
  const [currentPage, setCurrentPage] = useState(1); // New state for current page
  const productsPerPage = 12; // Number of products per page

  // Modal states for product inquiry
  const [isOpen, setIsOpen] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [currentProductName, setCurrentProductName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);
  const submittedForm = () => setSubmitted(true);
  const unSubmittedForm = () => setSubmitted(false);

  // Effect for scrolling to product section when categoryName changes in URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const categoryNameInUrl = queryParams.get("categoryName");

    if (categoryNameInUrl && containerRef.current) {
      const elementRect = containerRef.current.getBoundingClientRect();
      const offsetTop = elementRect.top + window.scrollY;
      const scrollPosition = offsetTop - 80;

      window.scrollTo({
        top: scrollPosition,
        behavior: "smooth",
      });
    }
    // Reset to first page when category changes
    setCurrentPage(1);
  }, [location.search]);

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
    const nameFromUrl = params.get("categoryName");

    if (nameFromUrl !== null && categories.length > 0) {
      const foundCategory = categories.find(
        (cat) => decodeURIComponent(cat.name).toLowerCase() === nameFromUrl.toLowerCase()
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
    } else if (nameFromUrl === "isAllProducts" || nameFromUrl === null) {
      setSelectedCategoryId(null);
      setShowAllCategories(false);
    }
  }, [location.search, categories, initialCategoryCount]);

  // Fetch products using react-query
  const {
    data: products = [],
    isLoading: productsLoading,
    isError: productsError,
    refetch: refetchProducts,
  } = useQuery({
    queryKey: ["products", selectedCategoryId, locale],
    queryFn: () =>
      selectedCategoryId === null
        ? fetchData("/products")
        : fetchData(`/categories/${selectedCategoryId}/products`),
    enabled: true,
    retry: 1,
    staleTime: 0,
  });

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: containerRef.current.offsetTop - 80, behavior: "smooth" }); // Scroll to top of products on page change
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

  const handleCategorySelect = (categoryName) => {
    navigate(`/products?categoryName=${encodeURIComponent(categoryName)}`);
  };

  const handleAllProductsSelect = () => {
    navigate("/products?categoryName=isAllProducts");
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
              products={currentProducts} // Pass only products for the current page
              productsLoading={productsLoading}
              baseImageUrl={baseImageUrl}
              onQuickInquire={handleQuickInquire}
              currentPage={currentPage} // Pass current page
              totalPages={totalPages} // Pass total pages
              onPageChange={handlePageChange} // Pass page change handler
              productsCount={products.length} // Pass total count for "no products" message
            />
          </div>
        )}
      </div>
      {selectedCategoryId && <CategoryDescription selectedCategory={selectedCategory} />}
    </>
  );
};

export default FetchProducts;
