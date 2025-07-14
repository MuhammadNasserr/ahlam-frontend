import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "../../contexts/TranslationContext";
import ournumber from "../../../Public/images/our-num.webp";

export const OurNumbersSection = () => {
  const { t } = useTranslation();

  // حالات لتخزين قيم العدادات الحالية
  const [exportCountries, setExportCountries] = useState(0);
  const [yearsExperience, setYearsExperience] = useState(0);
  const [tonsShipped, setTonsShipped] = useState(0);
  const [internationalClients, setInternationalClients] = useState(0);

  // useRef لمراقبة ظهور القسم
  const sectionRef = useRef(null);
  // نغير اسم الحالة إلى triggerCount لتكون أوضح في الغرض
  const [triggerCount, setTriggerCount] = useState(0);

  // useEffect لمراقبة ظهور القسم
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // عندما يصبح القسم مرئيًا، نزيد triggerCount
            // هذا سيؤدي إلى إعادة تشغيل useEffect الخاص بالعد
            setTriggerCount((prev) => prev + 1);
          } else {
            // اختياري: عندما يخرج العنصر من الرؤية، قم بإعادة تعيين العدادات لتبدأ من الصفر في المرة القادمة
            setExportCountries(0);
            setYearsExperience(0);
            setTonsShipped(0);
            setInternationalClients(0);
          }
        });
      },
      { threshold: 0.5 } // ابدأ العد عندما يكون 50% من العنصر مرئيًا
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []); // تشغيل مرة واحدة عند تحميل المكون لإنشاء Observer

  // useEffect لبدء العد لكل رقم عندما يتغير triggerCount (أي عندما يصبح القسم مرئيًا)
  useEffect(() => {
    // نضمن أن هذا التأثير لا يعمل عند التحميل الأولي للمكون قبل أن يصبح مرئيًا
    // ويمكننا استخدام triggerCount > 0 للتأكد من ذلك
    if (triggerCount > 0) {
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
        return () => clearInterval(interval); // تنظيف Interval
      };

      // إعادة تعيين العدادات إلى صفر قبل بدء العد الجديد
      setExportCountries(0);
      setYearsExperience(0);
      setTonsShipped(0);
      setInternationalClients(0);

      // بدء العد
      animateCount(setExportCountries, 40);
      animateCount(setYearsExperience, 10);
      animateCount(setTonsShipped, 5000);
      animateCount(setInternationalClients, 120);
    }
  }, [triggerCount]); // أعد تشغيل التأثير عندما يتغير triggerCount

  return (
    <section
      className="our-number text-center text-md-start py-5 position-relative"
      ref={sectionRef} // ربط الـ ref بالقسم
    >
      <img
        className="our-icon trend-icon position-absolute"
        width="200"
        height="200"
        src={ournumber}
        alt="our-num"
        loading="lazy"
      />
      <div className="container">
        <div className="row justify-content-between py-3">
          <div className="desc mb-5 col-md-6" data-aos="fade-right">
            <h1 className="home-heading">{t("our_numbers_heading", "Our results in numbers")}</h1>
            <p className="my-4 home-description mb-5">
              {t(
                "our_numbers_description",
                "At AHLAM, numbers speak louder than words. Here's a quick look at our export footprint, trusted clients, and product reach across the globe."
              )}
            </p>
            <Link className="home-btn fw-bold" to="/contact-us">
              {t("contact_us_button_short", "Contact Us")}
              <FontAwesomeIcon icon={faArrowRight} className="fa-shake ms-2" />
            </Link>
          </div>
          <div className="row num col-md-6 m-0" data-aos="fade-left">
            <div className="rate col-sm-6">
              <span>{exportCountries}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("export_countries", "Export Countries")}
              </p>
            </div>
            <div className="rate col-sm-6">
              <span>{yearsExperience}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("years_of_export_experience", "Years of Export Experience")}
              </p>
            </div>
            <div className="w-100"></div>
            <div className="rate col-sm-6">
              <span>{tonsShipped.toLocaleString()}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("tons_shipped_annually", "Tons Shipped Annually")}
              </p>
            </div>
            <div className="rate col-sm-6">
              <span>{internationalClients}+</span>
              <p style={{ color: "var(--heading-color)" }}>
                {t("international_clients", "International Clients")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
