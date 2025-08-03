import { useTranslation } from "../contexts/TranslationContext";
import logo from "../../Public/images/logo.webp";
const SupplierForm = ({ openModal, closeModal }) => {
  const { t } = useTranslation();

  // دالة handleSubmit الجديدة للتعامل مع إرسال الفورم
  const handleSubmit = async (e) => {
    e.preventDefault(); // نمنع السلوك الافتراضي للمتصفح (إعادة تحميل الصفحة)

    // 1. جمع بيانات النموذج
    const formData = {
      fullName: e.target.elements["full-name"].value,
      companyName: e.target.elements["company-name"].value,
      email: e.target.elements["email"].value,
      phone: e.target.elements["phone"].value,
      productType: e.target.elements["product-type"].value, // لاحظ اسم الـ name الخاص بـ select
      country: e.target.elements["country"].value,
      message: e.target.elements["message"].value,
    };

    console.log("Collected Supplier Form Data:", formData); // يمكنك ترك هذا السطر للمراجعة

    // 2. عرض المودال فوراً
    openModal();

    try {
      // 3. **هنا ستضع رابط الـ API الفعلي الخاص بك لهذا الفورم**
      // استبدل 'YOUR_ACTUAL_SUPPLIER_API_URL_HERE' بالرابط الذي ستحصل عليه.
      // مثال: 'https://api.yourwebsite.com/become-supplier' أو 'http://localhost:5000/suppliers'
      const apiUrl = "YOUR_ACTUAL_SUPPLIER_API_URL_HERE"; // <--- ضع رابط الـ API الحقيقي هنا!

      const response = await fetch(apiUrl, {
        method: "POST", // غالباً ستكون POST لإرسال بيانات نموذج المورد
        headers: {
          "Content-Type": "application/json", // نخبر الـ API أننا نرسل بيانات JSON
          // إذا كان الـ API يتطلب توثيق (authentication)، ستحتاج لإضافة 'Authorization' header هنا
        },
        body: JSON.stringify(formData), // نحول كائن البيانات إلى سلسلة JSON ونرسله في جسم الطلب
      });

      if (!response.ok) {
        // إذا كان الرد من الخادم ليس 2xx (أي كان هناك خطأ، مثل 400 أو 500)
        const errorData = await response.json(); // افترض أن الـ API يرسل JSON في حالة الخطأ
        throw new Error(errorData.message || `حدث خطأ في الشبكة، الكود: ${response.status}`);
      }

      const result = await response.json(); // قراءة الرد من الـ API بعد النجاح
      console.log("Supplier form sent successfully:", result); // ستعرض الرد الفعلي من الـ API

      // 4. تنظيف حقول النموذج بعد الإرسال الناجح
      e.target.reset();
    } catch (error) {
      console.error("Error sending supplier form:", error);
      // هنا يمكنك تحديث المودال أو عرض رسالة خطأ واضحة للمستخدم
    } finally {
      // 5. إغلاق المودال بعد 3 ثوانٍ
      setTimeout(() => closeModal(), 3000);
    }
  };

  return (
    <section className="supplier-form">
      <div className="container py-5">
        <div className="card supplier-form-card text-center p-4 rounded-5">
          <img
            src={logo}
            alt="AHLAM Logo"
            width="90"
            height="60"
            className="mb-3 mx-auto"
            loading="lazy"
          />
          <h3 className="mb-5">
            {t("supplier_form_heading", "Take Your Agricultural Products to Global Markets")}
          </h3>
          <form
            onSubmit={handleSubmit} // نربط الدالة الجديدة بمعالج الـ submit
            className="px-0 px-md-5"
            // تم إزالة 'action=""' و 'method="get"' لأننا نستخدم handleSubmit
          >
            <div className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="full-name"
                  placeholder={t("full_name_placeholder", "Full Name")}
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  name="company-name"
                  placeholder={t("company_name_placeholder", "Company Name")}
                />
              </div>
              <div className="col-md-6">
                <input
                  type="email"
                  className="form-control"
                  placeholder={t("email_address_placeholder", "Email Address")}
                  name="email"
                  required
                />
              </div>
              <div className="col-md-6">
                <input
                  type="number"
                  className="form-control"
                  name="phone"
                  placeholder={t("phone_placeholder", "Phone")}
                  required
                />
              </div>
              <div className="col-md-6">
                <select className="form-select" required name="product-type">
                  {" "}
                  {/* تأكد أن الـ name صحيح */}
                  <option value="" hidden>
                    {t("product_type_select_placeholder", "Product Type")}
                  </option>
                  <option value="fruits">{t("fruits_option", "Fruits")}</option>
                  <option value="vegetables">{t("vegetables_option", "Vegetables")}</option>
                  <option value="citrus">{t("dates", "Dates")}</option>
                  <option value="spices&herbs">{t("spices_herbs", "Herbs")}</option>
                  <option value="pickles">{t("pickles_option", "Pickles")}</option>
                  <option value="others">{t("others_option", "Others")}</option>
                </select>
              </div>
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("country_placeholder", "Country")}
                  name="country"
                  required
                />
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  placeholder={t("additional_message_placeholder", "Additional Message")}
                  name="message"
                  rows="2"
                  required
                  style={{ resize: "none" }}
                ></textarea>
              </div>
              <div className="col-12 mt-4">
                <button type="submit" className="btn btn-success">
                  {t("become_a_supplier_button_form", "Become a Supplier")}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default SupplierForm;
