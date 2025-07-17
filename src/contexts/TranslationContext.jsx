import React, { createContext, useState, useEffect, useContext } from "react";

// استيراد ملفات الترجمة الخاصة بك
import frbasic from "../../src/translation/fr/basic.json";
import frHome from "../../src/translation/fr/home.json";
import frFaqs from "../../src/translation/fr/faqs.json";
import frContact from "../../src/translation/fr/contactus.json";
import frSupplier from "../../src/translation/fr/supplier.json";
import frPrivacy from "../../src/translation/fr/privacy.json";
import frProduct from "../../src/translation/fr/product.json";

import rubasic from "../../src/translation/ru/basic.json";
import ruHome from "../../src/translation/ru/home.json";
import ruFaqs from "../../src/translation/ru/faqs.json";
import ruContact from "../../src/translation/ru/contactus.json";
import ruSupplier from "../../src/translation/ru/supplier.json";
import ruPrivacy from "../../src/translation/ru/privacy.json";
import ruProduct from "../../src/translation/ru/product.json";

const allTranslations = {
  fr: {
    ...frbasic,
    ...frHome,
    ...frFaqs,
    ...frContact,
    ...frSupplier,
    ...frFaqs, // ملاحظة: frFaqs مكررة هنا، تأكد من صحة هذا
    ...frPrivacy,
    ...frProduct,
  },
  ru: {
    ...rubasic,
    ...ruHome,
    ...ruFaqs,
    ...ruContact,
    ...ruSupplier,
    ...ruPrivacy,
    ...ruProduct,
  },
};

const TranslationContext = createContext();

export const TranslationProvider = ({ children }) => {
  const [locale, setLocale] = useState(() => {
    const savedLocale = localStorage.getItem("appLocale");
    return savedLocale || "en";
  });

  const [currentTranslations, setCurrentTranslations] = useState({});

  useEffect(() => {
    // تحديث الترجمات الحالية بناءً على اللغة المختارة
    if (locale === "en" || !allTranslations[locale]) {
      setCurrentTranslations({});
    } else {
      setCurrentTranslations(allTranslations[locale]);
    }

    // ضبط اتجاه الصفحة ولغة HTML
    document.documentElement.dir = "ltr";
    document.documentElement.lang = locale;

    // **ملاحظة هامة:**
    // لا يوجد كود خاص بتحميل Tawk.to هنا.
    // Tawk.to سيتم تحميله بواسطة السكريبت الموجود في index.html
    // وذلك عند كل تحميل كامل للصفحة (بما في ذلك بعد window.location.reload()).
  }, [locale]); // useEffect سيتم تشغيله فقط عندما تتغير الـ 'locale'

  const t = (key, arg2, arg3) => {
    let defaultValue = undefined;
    let replacements = {};

    if (typeof arg2 === "object" && arg2 !== null) {
      replacements = arg2;
    } else if (arg2 !== undefined) {
      defaultValue = arg2;
      if (typeof arg3 === "object" && arg3 !== null) {
        replacements = arg3;
      }
    }

    let text = currentTranslations[key];

    if (text === undefined) {
      text = defaultValue !== undefined ? defaultValue : key;
    }

    if (
      typeof replacements === "object" &&
      replacements !== null &&
      Object.keys(replacements).length > 0
    ) {
      for (const placeholder in replacements) {
        text = text.replace(new RegExp(`\\{${placeholder}\\}`, "g"), replacements[placeholder]);
      }
    }

    return text;
  };

  const changeLanguage = (newLocale) => {
    // نحدد اللغة الجديدة في الـ state
    setLocale(newLocale);

    // نحفظ اللغة الجديدة في Local Storage
    // هذا مهم جداً ليتم قراءتها بواسطة سكريبت Tawk.to في index.html
    localStorage.setItem("appLocale", newLocale);

    // **الخطوة الحاسمة:** إعادة تحميل الصفحة لضمان تحديث Tawk.to
    // هذا سيجعل المتصفح يعيد تحميل الصفحة بالكامل، مما يضمن أن
    // سكريبت Tawk.to في index.html سيتم تشغيله مرة أخرى
    // وسيقوم بقراءة 'appLocale' المحدثة من Local Storage.
    window.location.reload();
  };

  return (
    <TranslationContext.Provider value={{ t, locale, changeLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error("useTranslation must be used within a TranslationProvider");
  }
  return context;
};
