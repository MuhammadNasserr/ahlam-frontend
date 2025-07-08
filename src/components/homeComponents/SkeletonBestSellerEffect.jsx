const SkeletonBestSellerEffect = () => {
  return (
    // ده هيكون الـ wrapper بتاع كارت السكلتون
    // الأبعاد هنا مهمة عشان تحجز المساحة زي كارت المنتج الحقيقي
    <div
      className="product-card" // بنستخدم نفس الكلاس بتاع الكارت الحقيقي عشان التنسيقات العامة
      style={{
        width: "300px", // عرض كارت المنتج الحقيقي (أو أقرب تقدير)
        height: "400px", // ارتفاع كارت المنتج الحقيقي (أو أقرب تقدير)
        overflow: "hidden", // عشان الـ border-radius تشتغل صح
        display: "flex",
        flexDirection: "column",
        // باقي الستايلات زي border, box-shadow ممكن تكون جاية من .product-card
      }}
    >
      <div className="card-body" style={{ display: "flex", flexDirection: "column", flexGrow: 1 }}>
        {/* مكان الصورة */}
        <div
          className="card-image position-relative placeholder-glow"
          style={{
            width: "100%",
            height: "200px", // ارتفاع الصورة داخل الكارت
            borderRadius: "8px 8px 0 0", // نفس الـ border-radius بتاع الصورة
            overflow: "hidden",
          }}
        >
          <span className="placeholder w-100 h-100 d-block rounded-top"></span>
          {/* لو فيه badge مكانه محدد، ممكن تحط placeholder ليه */}
          <span
            className="placeholder position-absolute"
            style={{
              top: "10px",
              left: "10px",
              width: "80px",
              height: "25px",
              borderRadius: "4px",
            }}
          ></span>
        </div>

        {/* مكان النصوص */}
        <div className="card-txt p-3" style={{ flexGrow: 1 }}>
          <p className="descripe-card placeholder-glow">
            <span className="placeholder col-10"></span> {/* سطر نصي أول */}
            <span className="placeholder col-7"></span> {/* سطر نصي ثاني */}
          </p>
          <p className="product-name my-2 placeholder-glow">
            <span className="placeholder col-8"></span> {/* مكان اسم المنتج */}
          </p>
          <p className="price mb-0 placeholder-glow">
            <span className="placeholder col-4"></span> {/* مكان السعر */}
          </p>
        </div>
      </div>

      {/* مكان الزرار */}
      <div className="card-button-area p-3 pt-0">
        <div className="placeholder-glow">
          <span
            className="placeholder col-12 py-2 rounded d-block"
            style={{ height: "40px" }} // ارتفاع الزرار
          ></span>
        </div>
      </div>
    </div>
  );
};

export default SkeletonBestSellerEffect;
