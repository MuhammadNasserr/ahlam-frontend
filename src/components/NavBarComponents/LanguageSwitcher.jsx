import React, { useState, useEffect, useRef } from "react"; // استيراد useState و useEffect و useRef
import languageImage from "/images/language-circle.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "../../contexts/TranslationContext";
import { useLocation } from "react-router-dom"; // استيراد useLocation

export const LanguageSwitcher = () => {
  const { locale, changeLanguage } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // حالة لفتح وإغلاق الـ dropdown
  const dropdownRef = useRef(null); // Ref للـ dropdown كله
  const location = useLocation(); // للحصول على معلومات المسار الحالي

  const getLanguageFullName = (langCode) => {
    switch (langCode) {
      case "en":
        return "English";
      case "fr":
        return "Français";
      case "ru":
        return "Russian";
      default:
        return "English";
    }
  };

  const getLanguageAbbreviation = (langCode) => {
    return langCode.toUpperCase();
  };

  const handleLanguageChange = (newLocale) => {
    changeLanguage(newLocale);
    localStorage.setItem("appLocale", newLocale);
    setIsDropdownOpen(false); // إغلاق الدروب داون بعد اختيار اللغة
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  // useEffect للتعامل مع الضغط خارج الدروب داون وتغيير المسار
  useEffect(() => {
    const handleClickOutside = (event) => {
      // لو الدروب داون مفتوح والضغط كان خارج الدروب داون نفسه
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false); // بنقفل الدروب داون
      }
    };

    // بنضيف الـ event listener للضغط بالماوس
    document.addEventListener("mousedown", handleClickOutside);

    // دالة التنظيف (Cleanup function)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]); // Dependency على isDropdownOpen

  // useEffect لمراقبة تغيير المسار (URL)
  useEffect(() => {
    // لو الدروب داون مفتوح والمسار اتغير، بنقفل الدروب داون
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
  }, [location.pathname]); // بيشتغل لما الـ pathname يتغير

  return (
    <div className={`dropdown lang-dropdown ${isDropdownOpen ? "show" : ""}`} ref={dropdownRef}>
      <button
        className="language-container btn dropdown-toggle d-flex align-items-center"
        type="button"
        id="langDropdown"
        aria-expanded={isDropdownOpen} // بنربطها بالـ state بتاعنا
        style={{
          color: "black",
          height: "43px",
        }}
        onClick={toggleDropdown} // بنستخدم دالتنا للفتح والإغلاق
      >
        <span>
          <img width="20" height="20" src={languageImage} alt="language-icon" />
        </span>
        <span className="ms-2" id="selectedLang" style={{ color: "var(--heading-color)" }}>
          {getLanguageAbbreviation(locale)}{" "}
        </span>
        <FontAwesomeIcon
          icon={faAngleDown}
          style={{
            color: "var(--heading-color)",
            marginLeft: "10px",
          }}
        />
      </button>
      <ul
        className={`dropdown-menu dropdown-menu-end ${isDropdownOpen ? "show" : ""}`} // بنضيف كلاس show يدويًا
        aria-labelledby="langDropdown"
        style={{ backgroundColor: "var(--bg-color)" }}
      >
        <li>
          <button
            className="dropdown-item text-center"
            style={{ border: "none", width: "100%" }}
            onClick={() => handleLanguageChange("en")}
          >
            {getLanguageFullName("en")}
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-center"
            style={{ border: "none", width: "100%" }}
            onClick={() => handleLanguageChange("fr")}
          >
            {getLanguageFullName("fr")}
          </button>
        </li>
        <li>
          <button
            className="dropdown-item text-center"
            style={{ border: "none", width: "100%" }}
            onClick={() => handleLanguageChange("ru")}
          >
            {getLanguageFullName("ru")}
          </button>
        </li>
      </ul>
    </div>
  );
};
