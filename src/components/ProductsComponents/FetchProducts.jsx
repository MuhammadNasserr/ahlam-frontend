// src/components/ProductPage/ProductPage.jsx
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchData } from "../../utilis/fetch";
import { useTranslation } from "../../contexts/TranslationContext";

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
  const { locale } = useTranslation();

  const initialCategoryCount = 8;
  const [showAllCategories, setShowAllCategories] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

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
      // Handle "isAllProducts" specifically
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

  const selectedCategory = selectedCategoryId
    ? categories.find((cat) => cat.id === selectedCategoryId)
    : null;

  const handleCategorySelect = (categoryName) => {
    navigate(`/products?categoryName=${encodeURIComponent(categoryName)}`);
    // selectedCategoryId and showAllCategories will be updated by the useEffect based on URL change
  };

  const handleAllProductsSelect = () => {
    navigate("/products?categoryName=isAllProducts"); // Use a distinct query param for "All"
    // selectedCategoryId and showAllCategories will be updated by the useEffect based on URL change
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
        <div className="row">
          <ProductCategoriesSidebar
            categories={categories}
            categoriesLoading={categoriesLoading}
            categoriesError={categoriesError}
            refetchCategories={refetchCategories}
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
            productsError={productsError}
            refetchProducts={refetchProducts}
            baseImageUrl={baseImageUrl}
            onQuickInquire={handleQuickInquire}
          />
        </div>
      </div>
      {selectedCategoryId && <CategoryDescription selectedCategory={selectedCategory} />}
    </>
  );
};

export default FetchProducts;
