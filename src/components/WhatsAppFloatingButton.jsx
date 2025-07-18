import React, { useState } from "react";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const WhatsAppFloatingButton = ({
  phoneNumber,
  message = "مرحباً! كيف يمكنني مساعدتك؟", // رسالة افتراضية
  position = "right", // الموضع: 'right' أو 'left'
  bottomOffset = "20px", // المسافة من الأسفل
  sideOffset = "20px", // المسافة من الجانب (يمين أو يسار)
}) => {
  // بنجهز رابط الواتساب بالرقم والرسالة المحددة
  // مهم جداً: تأكد إن رقم الهاتف بالصيغة الدولية (مثال: "201012345678" لمصر)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  // بنستخدم useState عشان نتحكم في حالة الزرار لما الماوس يجي عليه أو يروح من عليه
  const [isHovered, setIsHovered] = useState(false);

  // بنجهز الـ CSS عشان الزرار يبقى عائم في الشاشة
  const buttonStyle = {
    position: "fixed", // بيخلي الزرار ثابت في مكانه على الشاشة حتى لو عملت سكرول
    bottom: bottomOffset, // المسافة من أسفل الشاشة
    [position]: sideOffset, // المسافة من الجانب المحدد (يمين أو يسار)
    backgroundColor: isHovered ? "#1DA851" : "#25D366", // اللون الأخضر بيتغير لما الماوس يجي عليه
    color: "white", // لون الأيقونة أبيض
    borderRadius: "50%", // عشان الزرار يبقى دائري
    width: "60px", // عرض الزرار
    height: "60px", // طول الزرار
    display: "flex", // بيساعد في توسيط الأيقونة
    justifyContent: "center", // توسيط أفقي
    alignItems: "center", // توسيط رأسي
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)", // ظل خفيف للزرار
    cursor: "pointer", // شكل المؤشر لما يتحرك فوق الزرار
    zIndex: 1000, // بيخلي الزرار يظهر فوق كل العناصر التانية
    textDecoration: "none", // بيشيل أي خطوط تحت النص لو فيه
    transition: "background-color 0.3s ease", // تأثير بسيط عند تغيير اللون
  };

  return (
    <a
      href={whatsappUrl} // الرابط اللي هيتفتح لما تضغط على الزرار
      target="_blank" // هيفتح الرابط في تبويبة جديدة في المتصفح
      rel="noopener noreferrer" // مهم جداً للأمان لما تفتح روابط خارجية
      style={buttonStyle} // بنطبق الستايل اللي عملناه
      onMouseEnter={() => setIsHovered(true)} // لما الماوس يجي على الزرار
      onMouseLeave={() => setIsHovered(false)} // لما الماوس يبعد عن الزرار
      title="تواصل معنا عبر الواتساب" // نص بيظهر لما تقف بالماوس على الزرار
    >
      <FontAwesomeIcon icon={faWhatsapp} /> {/* أيقونة الواتساب بحجم 30 بكسل */}
    </a>
  );
};

export default WhatsAppFloatingButton;
