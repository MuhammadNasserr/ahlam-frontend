import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../../Public/images/search-01.webp";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utilis/fetch";
import { useTranslation } from "../../contexts/TranslationContext";

const baseImageUrl = "https://api.ahlamfoods.com/storage/";

export const SearchOverlay = ({ t }) => {
  const { locale } = useTranslation();

  const fetProductData = () => {
    const res = fetchData("/products");
    return res;
  };

  const { data: productsData } = useQuery({
    queryKey: ["allProducts", locale],
    queryFn: fetProductData,
  });

  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const searchInputRef = useRef(null);
  const searchOverlayRef = useRef(null);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const performSearch = (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const searchTerm = query.trim().toLowerCase();
    const filteredResults = productsData?.filter(
      (product) =>
        product.name.toLowerCase().includes(searchTerm) ||
        product.subdescription.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
    );
    setSearchResults(filteredResults);
  };

  const openSearchOverlay = () => {
    setShowSearchOverlay(true);
    // Push a new state to history when overlay opens
    // This allows the back button to close the overlay without changing the URL
    window.history.pushState({ searchOverlayOpen: true }, "");
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const closeSearchOverlay = () => {
    setShowSearchOverlay(false);
    setSearchInput("");
    setSearchResults([]);
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    performSearch(e.target.value);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    performSearch(searchInput);
  };

  // Effect to handle body scroll, keyboard/click events, and browser history
  useEffect(() => {
    // Disable/enable body scroll
    if (showSearchOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = ""; // Reset to default
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showSearchOverlay) {
        // If the overlay is open and the escape key is pressed,
        // we need to also pop the history state to avoid a lingering state
        if (window.history.state && window.history.state.searchOverlayOpen) {
          window.history.back(); // Go back in history to remove the overlay state
        } else {
          closeSearchOverlay();
        }
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const handleClickOutside = (e) => {
      if (searchOverlayRef.current && e.target === searchOverlayRef.current) {
        // If clicking outside and the overlay is open,
        // also pop the history state
        if (window.history.state && window.history.state.searchOverlayOpen) {
          window.history.back(); // Go back in history to remove the overlay state
        } else {
          closeSearchOverlay();
        }
      }
    };
    document.addEventListener("click", handleClickOutside);

    // Handle browser back button (popstate event)
    const handlePopState = (event) => {
      // Check if the state that was popped indicates the overlay should be open
      if (showSearchOverlay && (!event.state || !event.state.searchOverlayOpen)) {
        closeSearchOverlay();
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("click", handleClickOutside);
      window.removeEventListener("popstate", handlePopState);
      // Ensure scroll is re-enabled if component unmounts or overlay is closed
      document.body.style.overflow = "";
    };
  }, [showSearchOverlay]); // Dependency on showSearchOverlay

  return (
    <>
      <div className="search-container">
        <button className="btn" onClick={openSearchOverlay}>
          <img width="24" height="24" src={searchIcon} alt="search-icon" />
        </button>
      </div>

      <div className={`search-overlay ${showSearchOverlay ? "active" : ""}`} ref={searchOverlayRef}>
        <div className="search-box">
          <button className="close-search" onClick={closeSearchOverlay}>
            &times;
          </button>
          <form
            className="search-form d-flex position-relative mt-3"
            onSubmit={handleSearchFormSubmit}
          >
            <input
              type="text"
              className="search-input"
              placeholder={t("what_are_you_looking_for", "What are you Looking For..?")}
              value={searchInput}
              onChange={handleSearchInputChange}
              ref={searchInputRef}
              autoFocus
            />
            <button type="submit" className="search-btn">
              <img width={25} height={24} src={searchIcon} alt="search-icon" />
            </button>
          </form>
          <div id="searchResults" className="search-results">
            {searchResults.length === 0 && searchInput.trim() !== "" ? (
              <div className="no-results">
                <p>
                  {t("no_results_for", "No results found for")}
                  {` "${searchInput}"`}
                </p>
              </div>
            ) : (
              searchResults.map((product) => (
                <div className="result-item " key={product.id}>
                  <Link
                    className="d-flex align-items-center gap-3"
                    to={`/products/${product.id}`}
                    onClick={closeSearchOverlay}
                  >
                    <img
                      src={`${baseImageUrl}${product.main_image}`}
                      alt=""
                      width={50}
                      height={50}
                    />
                    <div>
                      <span className="result-category">{product.category}</span>
                      <div
                        className="name"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(product.name, searchInput),
                        }}
                      ></div>
                      <div
                        className="subdescription"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(product.subdescription?.slice(0, 50), searchInput),
                        }}
                      ></div>
                    </div>
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};
