import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import searchIcon from "../../../Public/images/search-01.webp";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utilis/fetch";
import { useTranslation } from "../../contexts/TranslationContext";

const baseImageUrl = "https://api.ahlamfoods.com/storage/";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export const SearchOverlay = ({ t }) => {
  const { locale } = useTranslation();

  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);

  const [searchResults, setSearchResults] = useState([]);

  const searchInputRef = useRef(null);
  const searchOverlayRef = useRef(null);

  const {
    data: searchResultsData,
    isLoading: searchLoading,
    isError: searchError,
  } = useQuery({
    queryKey: ["searchResults", debouncedSearchInput, locale],
    queryFn: () => fetchData(`/products/search?query=${debouncedSearchInput}`),
    enabled: !!debouncedSearchInput && debouncedSearchInput.trim() !== "" && showSearchOverlay,
    staleTime: 5 * 60 * 1000,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (searchResultsData && Array.isArray(searchResultsData.data)) {
      setSearchResults(searchResultsData.data);
    } else {
      setSearchResults([]);
    }
  }, [searchResultsData]);

  const highlightText = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    return text.replace(regex, '<span class="highlight">$1</span>');
  };

  const openSearchOverlay = () => {
    setShowSearchOverlay(true);
    window.history.pushState({ searchOverlayOpen: true }, "");
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const closeSearchOverlay = () => {
    setShowSearchOverlay(false);
    setSearchInput("");
    setSearchResults([]);

    if (window.history.state && window.history.state.searchOverlayOpen) {
      window.history.back();
    }
  };

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (showSearchOverlay) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape" && showSearchOverlay) {
        closeSearchOverlay();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    const handleClickOutside = (e) => {
      // تعديل هنا: إذا كان الهدف الذي تم النقر عليه هو الـ overlay نفسه
      if (searchOverlayRef.current && e.target === searchOverlayRef.current) {
        closeSearchOverlay();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    const handlePopState = (event) => {
      if (showSearchOverlay && (!event.state || !event.state.searchOverlayOpen)) {
        setShowSearchOverlay(false);
      } else if (!showSearchOverlay && event.state && event.state.searchOverlayOpen) {
        setShowSearchOverlay(true);
      }
    };
    window.addEventListener("popstate", handlePopState);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("popstate", handlePopState);
      document.body.style.overflow = "";
    };
  }, [showSearchOverlay]);

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
            {searchLoading && searchInput.trim() !== "" ? (
              <p>{t("loading_search_results", "Loading search results...")}</p>
            ) : searchError ? (
              <p>{t("error_loading_products_for_search", "Error loading products for search.")}</p>
            ) : searchResults.length === 0 && searchInput.trim() !== "" ? (
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
                      {/* temporary */}
                      {/* <div
                        className="subdescription"
                        dangerouslySetInnerHTML={{
                          __html: highlightText(product.subdescription?.slice(0, 50), searchInput),
                        }}
                      ></div> */}
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
