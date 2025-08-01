import connect from "../../../Public/images/connect.webp";
import { useTranslation } from "../../contexts/TranslationContext";
const ConnectSection = ({ openModal, closeModal }) => {
  const { t } = useTranslation();

  const handleSubmit = async (e) => {
    e.preventDefault(); // نمنع السلوك الافتراضي للمتصفح (إعادة تحميل الصفحة)

    // 1. جمع بيانات النموذج
    const formData = {
      email: e.target.elements["email"].value,
      message: e.target.elements["message"].value,
    };

    // 2. عرض المودال فوراً
    openModal();

    try {
      const apiUrl = "https://api.ahlamfoods.com/api/contact"; // <--- ضع رابط الـ API الحقيقي هنا!

      const response = await fetch(apiUrl, {
        method: "POST", // غالباً ستكون POST لإرسال بيانات نموذج
        headers: {
          "Content-Type": "application/json", // نخبر الـ API أننا نرسل بيانات JSON
          // إذا كان الـ API يتطلب توثيق (authentication)، ستحتاج لإضافة 'Authorization' header هنا
          // مثال: 'Authorization': `Bearer ${yourAuthToken}`
        },
        body: JSON.stringify(formData), // نحول كائن البيانات إلى سلسلة JSON ونرسله في جسم الطلب
      });

      if (!response.ok) {
        // إذا كان الرد من الخادم ليس 2xx (أي كان هناك خطأ، مثل 400 أو 500)
        // يمكنك محاولة قراءة رسالة الخطأ من الـ API إذا كان يرسلها في جسم الرد
        const errorData = await response.json(); // افترض أن الـ API يرسل JSON في حالة الخطأ
        throw new Error(errorData.message || `حدث خطأ في الشبكة، الكود: ${response.status}`);
      }

      // const result = await response.json(); // قراءة الرد من الـ API بعد النجاح
      // console.log("Message sent successfully:", result); // ستعرض الرد الفعلي من الـ API

      // 4. تنظيف حقول النموذج بعد الإرسال الناجح
      e.target.reset();
    } catch (error) {
      console.error("Error sending message:", error);
      // هنا يمكنك تحديث المودال أو عرض رسالة خطأ واضحة للمستخدم
      // مثلاً: alert('عذرًا، حدث خطأ أثناء إرسال رسالتك. يرجى المحاولة لاحقاً.');
    } finally {
      // 5. إغلاق المودال بعد 3 ثوانٍ
      setTimeout(() => closeModal(), 3000);
    }
  };

  return (
    <section className="connect py-5">
      <div className="container">
        <div className="row justify-content-between align-items-center flex-column flex-lg-row">
          <div className="col-lg-5 col-12 text-center text-lg-start" data-aos="zoom-out">
            <h1 style={{ fontSize: "35px" }} className="home-heading mb-3">
              {t("connect_heading", "Connect with Us Today")}
            </h1>
            <p className="home-description mb-5 mx-auto">
              {t(
                "connect_description",
                "It's time your business got the success it deserves — we're here to help you grow and thrive."
              )}
            </p>
            <form onSubmit={handleSubmit} id="contactForm">
              <div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder={t("email_placeholder", "Email")}
                />
              </div>
              <div>
                <textarea
                  name="message"
                  id="message"
                  cols="30"
                  rows="7"
                  placeholder={t("message_placeholder", "Message")}
                  required
                ></textarea>
              </div>
              <input type="submit" value={t("contact_us_now_button", "Contact Us Now")} />
            </form>
          </div>
          <div className="col-md-12 col-lg-6 mt-5 mt-md-0" data-aos="fade-up">
            <img className="img-fluid rounded-4" src={connect} alt="connect-home" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
};
export default ConnectSection;
