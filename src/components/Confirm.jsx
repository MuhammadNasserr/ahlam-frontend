// src/components/Confirm.jsx
import React, { useEffect, useRef, useState } from "react"; // ضفنا useState هنا لو عايز تعمل تحميل شرطي
import animationData from "../../Public/lottie/confirm.json";
import { useTranslation } from "../contexts/TranslationContext";

const Confirm = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [lottieLoaded, setLottieLoaded] = useState(false); // ممكن نستخدمها لمتابعة حالة التحميل

  useEffect(() => {
    let animationInstance; // متغير لحفظ الـ animation instance

    // التحميل الديناميكي لمكتبة lottie-web
    import("lottie-web")
      .then((lottieModule) => {
        // تأكد أن الـ container موجود قبل التحميل
        if (containerRef.current) {
          animationInstance = lottieModule.loadAnimation({
            container: containerRef.current,
            renderer: "svg",
            loop: false,
            autoplay: true,
            animationData: animationData,
          });
          setLottieLoaded(true); // بنحدث الـ state إن lottie اتحملت
        }
      })
      .catch((error) => console.error("Failed to load lottie-web:", error));

    return () => {
      // تنظيف الـ animation عند إلغاء تحميل المكون
      if (animationInstance) {
        animationInstance.destroy();
      }
    };
  }, []); // هنا الـ dependency array فاضي، يعني الـ effect هيشتغل مرة واحدة عند الـ mount

  return (
    <div style={{ color: "white", display: "flex", alignItems: "center" }}>
      {/* ممكن تحط loading spinner هنا لحد ما الـ lottie يتحمل */}
      {!lottieLoaded && <div>Loading animation...</div>}
      <div ref={containerRef} style={{ width: "150px", minHeight: "80px" }} />{" "}
      {/* أضف minHeight لتجنب الـ layout shift */}
      <p
        style={{
          color: "#eee",
          fontWeight: "bold",
          maxWidth: "400px",
          margin: "0 auto",
          fontSize: "14px",
        }}
      >
        {t(
          "confirm_message",
          "Thank you for contacting us. One of our representatives will get in touch with you shortly."
        )}
      </p>
    </div>
  );
};

export default Confirm;
