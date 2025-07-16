import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../../contexts/TranslationContext";

export const OurNumbersSection = () => {
  const { t } = useTranslation();

  const [exportCountries, setExportCountries] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [tonsShipped, setTonsShipped] = useState(0);
  const [internationalClients, setInternationalClients] = useState(0);

  const sectionRef = useRef(null);
  const hasCounted = useRef(false); // لتتبع ما إذا كان العد قد حدث من قبل

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasCounted.current) {
            // ابدأ العد فقط إذا كان القسم مرئيًا ولم يتم العد من قبل
            const animateCount = (setter, target, duration = 2000) => {
              let start = 0;
              const increment = target / (duration / 10);
              const interval = setInterval(() => {
                start += increment;
                if (start < target) {
                  setter(Math.ceil(start));
                } else {
                  setter(target);
                  clearInterval(interval);
                }
              }, 10);
              return () => clearInterval(interval);
            };

            animateCount(setExportCountries, 40);
            animateCount(setYearsExperience, 10);
            animateCount(setTonsShipped, 5000);
            animateCount(setInternationalClients, 120);

            hasCounted.current = true; // تعيين True لمنع العد مرة أخرى
          }
        });
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // تشغيل مرة واحدة عند تحميل المكون

  return (
    <section
      className="our-number mt-5 text-center text-md-start  position-relative"
      ref={sectionRef}
    >
      <div className="container">
        <div className="row justify-content-between ">
          <div className="row num m-0">
            <div className="rate col-sm-3">
              <span>{exportCountries}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("export_countries", "Export Countries")}
              </p>
            </div>
            <div className="rate col-sm-3">
              <span>{tonsShipped.toLocaleString()}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("tons_shipped_annually", "Tons Shipped Annually")}
              </p>
            </div>
            <div className="rate col-sm-3">
              <span>{internationalClients}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("international_clients", "International Clients")}
              </p>
            </div>
            <div className="rate col-sm-3">
              <span>{yearsExperience}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("years_of_export_experience", "Years of Export Experience")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
