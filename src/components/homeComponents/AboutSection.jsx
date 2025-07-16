import abouthome from "../../../Public/images/About-home.webp";

// --- START: إضافة كود الترجمة ---
import { useTranslation } from "../../contexts/TranslationContext";
// --- END: إضافة كود الترجمة ---

const AboutSection = () => {
  const { t } = useTranslation();

  return (
    <section
      className="about d-flex align-items-center justify-content-center position-relative" // أضف position-relative للسماح للصورة الداخلية بالتموضع المطلق
      style={{
        // --- START: إزالة backgroundImage من هنا ---
        // backgroundImage: `url('${abouthome}')`,
        // backgroundPosition: "center", // هذه الخصائص لن تكون ضرورية في الـ section بعد الآن
        // backgroundSize: "cover",     // هذه الخصائص لن تكون ضرورية في الـ section بعد الآن
        // --- END: إزالة backgroundImage من هنا ---
        height: "500px",
        backgroundColor: "var(--white-color)",
        color: "#fff",
        overflow: "hidden", // لمنع أي overflow للصورة لو كانت أكبر من القسم
      }}
    >
      {/* --- START: إضافة وسم <img> الجديد هنا --- */}
      <img
        src={abouthome}
        alt="About Us Background"
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          objectFit: "cover", // لجعل الصورة تغطي المساحة بالكامل
          zIndex: 1, // تأكد أنها تكون تحت المحتوى النصي
        }}
        loading="lazy"
      />
      {/* --- END: إضافة وسم <img> الجديد هنا --- */}

      <div className="container" data-aos="fade-up" style={{ maxWidth: "700px", zIndex: 2 }}>
        {" "}
        {/* زد الـ zIndex للمحتوى ليكون فوق الصورة */}
        <h1 className="home-heading text-white">{t("about_ahlam_heading", "About Ahlam")}</h1>
        <h4 className="mb-4">
          {t("about_h4_heading", "Your Key to the Egyptian Agricultural World")}
        </h4>
        <p>
          {t(
            "about_p1_description",
            "Ahlam Foods is a leading exporter and supplier of premium Egyptian agricultural products, offering a wide variety of top-quality produce. With a strong commitment to excellence and customer satisfaction, we have earned a trusted position in the industry. Our wide network of reliable partner farms enables us to deliver a rich selection of agricultural goods."
          )}
        </p>
        <p>
          {t(
            "about_p2_description",
            "At Ahlam Foods, quality is our top priority. We ensure that every product meets the highest standards, backed by efficient logistics and dedicated customer support for timely and dependable deliveries."
          )}
        </p>
        <p>
          {t(
            "about_p3_description",
            "Our business is built on trust, transparency, and ethical practices. Whether you're an importer, distributor, or retailer, we offer flexible and customizable packaging solutions to meet your specific needs."
          )}
        </p>
      </div>
    </section>
  );
};
export default AboutSection;
