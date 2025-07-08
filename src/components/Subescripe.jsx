import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "../contexts/TranslationContext";

const Subescripe = () => {
  const { t } = useTranslation();
  const containerRef = useRef(null);
  const [setLottie] = useState(null);

  useEffect(() => {
    const loadLottie = async () => {
      const lottieModule = await import("lottie-web");
      const animationData = await import("../../Public/lottie/subscribe.json");
      setLottie(lottieModule.default);

      const animation = lottieModule.default.loadAnimation({
        container: containerRef.current,
        renderer: "svg",
        loop: false,
        autoplay: true,
        animationData: animationData.default,
      });

      return () => {
        animation.destroy();
      };
    };

    loadLottie();
  }, []);

  return (
    <div style={{ color: "white", display: "flex", alignItems: "center" }}>
      <div ref={containerRef} style={{ width: "130px", height: "80px" }} />
      <p
        style={{
          color: "#eee",
          fontWeight: "bold",
          maxWidth: "250px",
          margin: "0 auto",
          fontSize: "14px",
        }}
      >
        {t("Subescripe_message", "You have successfully subscribed to Ahlam's newsletter.")}
      </p>
    </div>
  );
};

export default Subescripe;
