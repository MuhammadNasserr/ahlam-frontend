const lines = "/images/lines.webp";
const buyer = "/images/buyer.webp"; // <--- ستقوم بتحميل هذه الصورة كـ <img>
const supplier = "/images/supplier.webp"; // <--- ستقوم بتحميل هذه الصورة كـ <img>
import { Link } from "react-router-dom";

import { useTranslation } from "../../contexts/TranslationContext";

const RolesSection = () => {
  const { t } = useTranslation();
  const buyerSteps = [
    {
      key: "buyer_step_1",
      defaultText:
        "1-We invite you to contact us for a quotation regarding your order. We will engage in a discussion concerning the costs associated with the goods, shipping options, and any specific packaging requirements you may have.",
    },
    {
      key: "buyer_step_2",
      defaultText:
        "2-Upon finalizing your order, we will prepare it for shipment and ensure prompt delivery from our state-of-the-art warehouse, all at the most competitive prices available.",
    },
    {
      key: "buyer_step_3",
      defaultText:
        "3-Once your order has been dispatched, we will provide you with tracking information to monitor its progress.",
    },
    {
      key: "buyer_step_4",
      defaultText:
        "4-Please be advised that you will be responsible for any duties, taxes, and other applicable charges or fees imposed by the country from which you are importing.",
    },
  ];
  const supplierSteps = [
    {
      key: "supplier_step_1",
      defaultText:
        "1-You need to reach out to us to talk about the crops you are selling, packaging, or exporting. ",
    },
    {
      key: "supplier_step_2",
      defaultText:
        "2-Our quality assurance team will come to your farm or storage facility to examine the produce, ensuring it is in excellent condition suitable for consumption or sale and complies with our quality requirements.",
    },
    {
      key: "supplier_step_3",
      defaultText:
        "3-We’ll provide an offer that meets your expectations and adds value to you and your business.",
    },
    {
      key: "supplier_step_4",
      defaultText:
        "4-Once an agreement is reached, we will promptly begin executing it without any delay.",
    },
  ];

  return (
    <section className="roles py-5">
      <div className="container">
        <div
          className="home-heading py-5 text-center d-flex flex-column align-items-center"
          data-aos="flip-up"
        >
          {t("how_we_work_heading", "How We Operate:")}
          <img src={lines} className="mt-3" style={{ maxWidth: "280px" }} alt="lines-trend" />
        </div>
        <div className="d-flex flex-column flex-lg-row gap-5 justify-content-center role-container">
          {/* Buyer Section */}
          <div className="buyer-supp" data-aos="fade-right">
            <img
              src={buyer}
              alt="Buyer Illustration"
              className="role-image"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "0",
                left: "0",
                objectPosition: "center",
                borderRadius: "30px",
              }}
            />
            <div className="content d-flex flex-column">
              <h4 className="fw-bold">
                {t(
                  "as_a_buyer_heading",
                  "If you are a food importer, food manufacturer, wholesaler, distributor, or retailer in pursuit of high-quality agricultural products."
                )}
              </h4>
              <ul>
                {buyerSteps.map((step, index) => (
                  <li key={index}>{t(step.key, step.defaultText)}</li>
                ))}
              </ul>
              <Link className="btn" to="/products">
                {t("products_button_roles", "Products")}
              </Link>
            </div>
          </div>
          {/* End Buyer Section */}

          {/* Supplier Section */}
          <div className="buyer-supp" data-aos="fade-left">
            <img
              src={supplier}
              alt="Supplier Illustration"
              className="role-image"
              loading="lazy"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "0",
                left: "0",
                objectPosition: "center",
                borderRadius: "30px",
              }}
            />
            <div className="content d-flex flex-column">
              <h4 className="fw-bold">
                {t(
                  "as_a_supplier_heading",
                  "Farmer looking to sell, package, or export your homegrown crops for consumption or retail? We're here to support you every step of the way."
                )}
              </h4>
              <ul className="pt-2">
                {supplierSteps.map((step, index) => (
                  <li key={index}>{t(step.key, step.defaultText)}</li>
                ))}
              </ul>
              <Link className="btn mt-3" to={"/supplier"}>
                {t("become_a_supplier_button", "Become a Supplier")}
              </Link>
            </div>
          </div>
          {/* End Supplier Section */}
        </div>
      </div>
    </section>
  );
};
export default RolesSection;
