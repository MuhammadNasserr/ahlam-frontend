import React from "react";
const LogoImage = "/images/logo.webp";
const PomegranatesImage = "/images/Pomegranates.webp";
const PotatoImage = "/images/Potato.webp";
import { useTranslation } from "../contexts/TranslationContext";

const GetCustomQuote = ({ name, openModal, closeModal, message, status }) => {
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault(); // نمنع السلوك الافتراضي للمتصفح (إعادة تحميل الصفحة)

    // 1. جمع بيانات النموذج
    const formData = {
      fullName: e.target.elements["full-name"].value,
      companyName: e.target.elements["company-name"].value,
      email: e.target.elements["email"].value,
      phone: e.target.elements["phone"].value,
      productType: e.target.elements["product-type"].value, // This is the 'name' prop value
      productShape: e.target.elements["product-shape"].value,
      packagingType: e.target.elements["packaging-type"].value,
      packageWeight: e.target.elements["pacage-weight"].value, // Note: typo 'pacage'
      quantity: e.target.elements["quantity"].value,
      shipTo: e.target.elements["ship-to"].value,
      shippingMethod: e.target.elements["shipping-method"].value,
      additionalMessage: e.target.elements["additional-message"].value,
    };

    console.log("Collected Form Data:", formData); // اطبع البيانات في الكونسول لتتأكد منها

    // 2. عرض المودال فوراً
    openModal();

    try {
      // 3. **هنا هو المكان الذي ستضع فيه رابط الـ API الفعلي**

      // قم بإزالة السطر الخاص بالمحاكاة:
      // await new Promise(resolve => setTimeout(resolve, 1500));

      // وضع استدعاء الـ fetch API الحقيقي هنا:
      // ستحتاج إلى استبدال 'YOUR_ACTUAL_API_URL_HERE' بالرابط الفعلي الذي ستحصل عليه.
      // أمثلة على الروابط:
      // const apiUrl = 'https://api.yourwebsite.com/contact-form';
      // const apiUrl = 'http://localhost:3001/messages'; // لو كان API محليًا للتطوير

      const apiUrl = "YOUR_ACTUAL_API_URL_HERE"; // <--- ضع رابط الـ API هنا!

      const response = await fetch(apiUrl, {
        method: "POST", // غالباً ستستخدم POST لإرسال بيانات نموذج
        headers: {
          "Content-Type": "application/json", // نخبر الـ API أننا نرسل بيانات JSON
          // قد تحتاج لإضافة رؤوس (headers) أخرى هنا مثل Authorization token إذا كان الـ API يتطلب ذلك
        },
        body: JSON.stringify(formData), // نحول كائن البيانات إلى سلسلة JSON ونرسله في جسم الطلب
      });

      if (!response.ok) {
        // إذا كان الرد من الخادم ليس 2xx (أي كان هناك خطأ، مثل 400 أو 500)
        // يمكنك محاولة قراءة رسالة الخطأ من الـ API إذا كان يرسلها
        const errorData = await response.json(); // افترض أن الـ API يرسل JSON في حالة الخطأ
        throw new Error(errorData.message || `حدث خطأ في الشبكة، الكود: ${response.status}`);
      }

      const result = await response.json(); // قراءة الرد من الـ API بعد النجاح
      console.log("Message sent successfully:", result); // ستعرض الرد الفعلي من الـ API

      // يمكنك هنا إضافة منطق لتنظيف حقول النموذج بعد الإرسال الناجح
      e.target.reset(); // لإعادة تعيين النموذج بعد الإرسال
    } catch (error) {
      console.error("Simulated API call failed:", error);
      // في حالة وجود خطأ في المحاكاة (لن يحدث هنا إلا إذا كان هناك مشكلة في الكود نفسه)
    } finally {
      // 4. إغلاق المودال بعد 3 ثوانٍ (بما في ذلك وقت المحاكاة)
      setTimeout(() => closeModal(), 3000);
    }
  };

  return (
    <div className="send-message position-relative mb-5" style={{ zIndex: 10 }}>
      <div className="container">
        <div
          className="position-relative content mx-auto bg-white p-3 p-md-5 rounded-5"
          style={{ maxWidth: "950px" }}
        >
          {/* PomegranatesImage Image */}
          <div className="position-absolute top-0 start-0 p-2">
            <img style={{ width: "120px" }} src={PomegranatesImage} alt="PomegranatesImage" />
          </div>

          {/* Logo Image */}
          <div className="position-relative" style={{ zIndex: "10" }}>
            <img
              className="d-block mx-auto mb-3 "
              width={90}
              height={60}
              src={LogoImage}
              alt="logo-img"
            />
          </div>

          {/* Title - Assuming 'message' prop is already translated */}
          <h2
            className="text-center mb-5 mx-auto fw-bold"
            style={{ maxWidth: "600px", position: "relative", zIndex: "10" }}
          >
            {message}
          </h2>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            style={{ zIndex: "10" }}
            className="position-relative d-flex flex-column flex-md-row gap-3 flex-wrap"
          >
            <input
              required
              name="full-name"
              className="input w-100 rounded-2 border-0 p-3 "
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("full_name_placeholder", "Full Name")}
            />

            <input
              required
              name="company-name"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("company_name_placeholder", "Company Name")}
            />
            <input
              required
              name="email"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="email"
              placeholder={t("email_address_placeholder", "Email Address")}
            />
            <input
              required
              name="phone"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="number"
              placeholder={t("phone_placeholder", "Phone")}
            />
            <input
              disabled
              name="product-type"
              className="fw-bold input w-100 rounded-2 border-0 p-3"
              defaultValue={name}
              style={{
                backgroundColor: "#eee",
                color: "var(--green-color)",
              }}
              type="text"
            />

            <input
              required
              name="product-shape"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("product_shape_placeholder", "Product Shape")}
            />

            <input
              required
              name="packaging-type"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("packaging_type", "Packaging Type")}
            />

            <input
              required
              name="pacage-weight"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("pacage_weight", "Pacage Weight")}
            />

            <input
              required
              name="quantity"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("enter_required_quantity", "Enter required quantity (in KG or Tons)")}
            />

            <input
              required
              name="ship-to"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("ship_to", "Ship To")}
            />

            <input
              required
              name="shipping-method"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("shipping_method", "Shipping Method")}
            />

            <input
              required
              name="additional-message"
              className="input w-100 rounded-2 border-0 p-3"
              style={{
                backgroundColor: "#eee",
              }}
              type="text"
              placeholder={t("additional_message", "Additional Message")}
            />

            <div className="w-100">
              <button
                className="d-block p-3 mt-3 rounded-2 border-0 outline-0 text-white mx-auto"
                style={{
                  width: "250px",
                  maxWidth: "100%",
                  backgroundColor: `${status ? "var(--green-color)" : "#aaa"}`,
                }}
                type="submit"
                disabled={!status}
              >
                {t("get_best_price", "Get Best Price")}
              </button>
            </div>
          </form>

          {/* Potato Image */}
          <div className="position-absolute bottom-0 end-0 p-2 ">
            <img style={{ width: "100px" }} src={PotatoImage} alt="PotatoImage" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCustomQuote;
