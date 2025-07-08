// src/pages/NotFound.jsx
import React, { useEffect, useState, Suspense, lazy } from "react"; // ضفنا useState, Suspense, lazy
import { Link } from "react-router-dom";
import { useTranslation } from "../contexts/TranslationContext";

// تعريف LottieComponent ديناميكيًا
// هذا سيؤدي إلى تحميل lottie-react و lottie-web كـ chunk منفصل عند الحاجة
const LazyLottie = lazy(() => import("lottie-react"));

const NotFound = () => {
  const { t } = useTranslation();

  const [animationData, setAnimationData] = useState(null); // لـ تخزين بيانات الـ animation بعد التحميل الديناميكي
  const [hasError, setHasError] = useState(false); // لمتابعة إذا كان هناك خطأ في التحميل

  useEffect(() => {
    // تحميل ملف الـ JSON الخاص بالـ animation ديناميكيًا
    const loadAnimationData = async () => {
      try {
        const module = await import("../../Public/lottie/error.json"); // هنا بنستورد ملف الـ error.json ديناميكيًا
        setAnimationData(module.default);
      } catch (error) {
        console.error("Failed to load error.json for NotFound page:", error);
        setHasError(true); // تعيين حالة الخطأ
      }
    };

    loadAnimationData();
  }, []); // useEffect هيشتغل مرة واحدة عند تحميل المكون

  // هنا بنرجع نفس الستايل والتصميم اللي طلبته، مع إضافة fallback لـ Suspense
  return (
    <main>
      <div className="container">
        <div className="row vh-100 align-items-center text-center text-md-start py-5">
          <div className="col-md-6 mb-5 order-2 order-md-1">
            <div className="home-heading mb-5">
              {t("not_found_heading", "Oops! Page Not Found")}
            </div>
            <p className="mx-auto mx-md-0 home-description mb-5" style={{ maxWidth: "420px" }}>
              {t(
                "not_found_description",
                "The page you're looking for may have been moved or doesn't exist anymore. Let's get you back on track."
              )}
            </p>
            <Link to="/" className="home-btn" style={{ backgroundColor: "#3ab54a", color: "#fff" }}>
              {t("back_to_homepage_button", "Back to Homepage")}
            </Link>
          </div>
          {/* هنا مكان الـ animation، بنفس الستايل المطلوب */}
          <div
            id="lottie-container" // ممكن نسيب الـ ID زي ما هو أو نغيره
            className="col-md-6 order-1 order-md-2"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }} // نفس ستايل اللودينج بيج
          >
            <div style={{ width: "700px", minHeight: "200px" }}>
              {" "}
              {/* نفس الستايل المطلوب مع minHeight لتجنب الـ layout shift */}
              {hasError ? (
                <div style={{ color: "black", textAlign: "center" }}>Error loading animation.</div>
              ) : (
                <Suspense
                  fallback={
                    // ده اللي هيظهر فورًا لحد ما LazyLottie و animationData يتحملوا
                    <div style={{ color: "black", textAlign: "center" }}>...</div>
                  }
                >
                  {animationData && (
                    <LazyLottie animationData={animationData} loop={true} autoplay={true} />
                  )}
                </Suspense>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default NotFound;
