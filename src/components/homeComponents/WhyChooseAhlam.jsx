import React from "react";
import whyahlam from "../../../Public/images/why-ahlam.webp";
import besticon from "../../../Public/images/best-icon.webp";
import why1 from "../../../Public/images/why1.webp";
import why2 from "../../../Public/images/why2.webp";
import why3 from "../../../Public/images/why3.webp";
import why4 from "../../../Public/images/why4.webp";
import why5 from "../../../Public/images/why5.webp";
import why6 from "../../../Public/images/why6.webp";

// --- START: إضافة كود الترجمة ---
import { useTranslation } from "../../contexts/TranslationContext";
// --- END: إضافة كود الترجمة ---

const WhyChooseAhlam = () => {
  // --- START: استخدام useTranslation Hook ---
  const { t } = useTranslation();
  // --- END: استخدام useTranslation Hook ---

  // تعريف بيانات الأقسام هنا عشان نقدر نترجمها
  const sectionsData = [
    {
      img: why1,
      items: [
        // هنا هنحتفظ بالمفتاح والنص الإنجليزي الأصلي
        { key: "iso_9001", defaultText: "ISO 9001" },
        { key: "haccp", defaultText: "HACCP" },
        { key: "brc_storage", defaultText: "BRC Storage" },
      ],
      description_key: "certified_quality_description",
      description_default: "Certified Quality",
    },
    {
      img: why2,
      items: [
        { key: "iso_22000", defaultText: "ISO 22000" },
        { key: "non_gmo", defaultText: "Non GMO" },
        { key: "helal_certification", defaultText: "Helal Certification" },
        { key: "gmp", defaultText: "GMP" },
      ],
      description_key: "fresh_guarantee_description",
      description_default: "Fresh Guarantee",
    },
    {
      img: why3,
      items: [
        { key: "lc_payment", defaultText: "LC" },
        { key: "tt_payment", defaultText: "T.T" },
      ],
      description_key: "easy_payments_description",
      description_default: "Easy Payments",
    },
    {
      img: why4,
      items: [
        { key: "fast_delivery", defaultText: "Fast Delivery" },
        { key: "rapid_respond", defaultText: "Rapid Respond" },
        { key: "packaging_flexibility", defaultText: "Packaging Flexibility" },
      ],
      description_key: "premium_support_description",
      description_default: "Premium Support",
    },
    {
      img: why5,
      items: [
        { key: "guaranteed_freshness", defaultText: "Guaranteed Freshness" },
        {
          key: "all_sizes_as_requested",
          defaultText: "All Sizes As Requested",
        },
        { key: "packaged_as_requested", defaultText: "Packaged As Requested" },
      ],
      description_key: "export_assurance_description",
      description_default: "Export Assurance",
    },
    {
      img: why6,
      items: [
        {
          key: "lowest_price_best_quality",
          defaultText: "Lowest Price For Best Quality",
        },
      ],
      description_key: "flexible_pricing_description",
      description_default: "Flexible Pricing",
    },
  ];

  return (
    <section
      className="why py-5 text-center text-lg-start"
      style={{ backgroundColor: "var(--white-color)" }}
    >
      <div className="container">
        <div className="row justify-content-between flex-column flex-lg-row align-items-center">
          <div className="col-12 col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
            <img
              src={whyahlam}
              className="ahlam-img img-fluid mb-md-0 mb-5 rounded-4"
              alt="why-ahlam"
              loading="lazy"
              style={{ height: "450px" }}
            />
          </div>
          <div className="col-12 col-lg-6" data-aos="fade-left">
            <div className="why-word position-relative">
              <h1 className="home-heading pt-3 mb-5">
                {t("why_choose_ahlam_heading", "Why Choose")}
                <span>
                  Ahlam
                  <img
                    className="position-absolute trend-icon"
                    width="70"
                    height="40"
                    src={besticon}
                    alt="why-trend"
                    loading="lazy"
                  />
                </span>
              </h1>
            </div>
            <div className="row row-gap-4">
              {sectionsData.map((box, i) => (
                <div className="col-6 col-md-6 col-lg-4" key={i} data-aos="flip-left">
                  <div className="why-sm-img">
                    <img
                      src={box.img}
                      style={{ display: "block", margin: "auto" }}
                      width={100}
                      height={100}
                      className="img-fluid"
                      alt={`why${i + 1}`}
                      loading="lazy"
                    />
                    {/* --- START: ترجمة الـ description لكل صندوق --- */}
                    {box.description_key && (
                      <p className="image-description mb-0" style={{ fontSize: "13px" }}>
                        {t(box.description_key, box.description_default)}
                      </p>
                    )}
                    {/* --- END: ترجمة الـ description لكل صندوق --- */}
                    <ul className="after flex-column justify-content-center align-items-start">
                      {box.items.map(
                        (
                          itemObj,
                          j // تم تغيير اسم المتغير إلى itemObj لتوضيح أنه كائن
                        ) => (
                          <li key={j}>
                            {/* --- START: ترجمة الـ items لكل قائمة --- */}
                            {/* هنا بنستخدم المفتاح عشان نجيب النص المترجم، وبنمرر النص الإنجليزي الأصلي كقيمة افتراضية */}
                            {/* ثم بنقسم النص بالـ <br /> إذا كان موجودًا */}
                            {t(itemObj.key, itemObj.defaultText)
                              .split("<br />")
                              .map((line, k) => (
                                <React.Fragment key={k}>
                                  {line}
                                  {k !==
                                    t(itemObj.key, itemObj.defaultText).split("<br />").length -
                                      1 && <br />}
                                </React.Fragment>
                              ))}
                            {/* --- END: ترجمة الـ items لكل قائمة --- */}
                          </li>
                        )
                      )}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseAhlam;
