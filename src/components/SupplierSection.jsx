import React, { useState, useEffect, useRef } from "react";
import Accordion from "react-bootstrap/Accordion";
import { useTranslation } from "../contexts/TranslationContext";

const SupplierSection = () => {
  const { t } = useTranslation();

  const [activeKey, setActiveKey] = useState(null);
  const itemRefs = useRef([]);

  const handleToggle = (key) => {
    setActiveKey(String(key) === activeKey ? null : String(key));
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (activeKey !== null && itemRefs.current[activeKey]) {
        const yOffset = -150;
        const y =
          itemRefs.current[activeKey].getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 250);

    return () => clearTimeout(timeout);
  }, [activeKey]);

  const supplierFaqs = [
    {
      id: 1,
      question_key: "supplier_faq_q1",
      question_default: "Join the Ahlam Foods Global Supplier Alliance",
      answer_key: "supplier_faq_a1",
      answer_default:
        "At Ahlam Foods, we believe that strong partnerships are the foundation of sustainable success. That’s why we’ve launched our Global Supplier Alliance (GSA) — a dynamic network that brings together trusted suppliers from around the world who share our values of quality, integrity, and agricultural excellence.\n\nBy partnering with Ahlam Foods, suppliers gain access to:\n\nA growing international market for fresh and frozen Egyptian agricultural products.\n\nStreamlined communication and and collaboration tools for efficient operations.\n\nOpportunities for long-term business growth and mutual success.\n\nOur deep commitment to transparency, traceability, and global compliance standards.\n\nIf you're a supplier of high-quality produce, herbs, spices, or grains, and you're ready to expand your reach through a reliable export partner, Ahlam Foods invites you to join our Supplier Alliance. Together, we can build a resilient global supply chain that delivers value to customers worldwide.\n\nGrow with us. Thrive with us. Partner with Ahlam Foods.",
    },
    {
      id: 2,
      question_key: "supplier_faq_q2",
      question_default: "Benefits of Partnering with Ahlam Foods – Supplier Alliance Program",
      answer_key: "supplier_faq_a2",
      answer_default:
        "Joining the Ahlam Foods Global Supplier Alliance opens the door to a wide range of exclusive benefits designed to help your business grow and succeed in international markets:\n\nExpanded Market Reach: Gain direct access to new global markets and international buyers across the food and agriculture sectors.\n\nBusiness Growth Opportunities: Boost your sales potential by collaborating with a trusted export partner known for quality and reliability.\n\nMarketing & Branding Support: Leverage our established presence, marketing strategies, and promotional efforts to enhance your product visibility.\n\nLong-Term Strategic Partnership: Build a sustainable business relationship based on trust, transparency, and shared goals.\n\nStreamlined Export Processes: Benefit from our logistics expertise and compliance guidance to ensure smooth, efficient product movement from farm to market.\n\nAt Ahlam Foods, we are committed to empowering our suppliers and growing together. Whether you're a local farmer, processor, or bulk producer, our Supplier Alliance is your gateway to global success.\n\nLet’s grow your business – together with Ahlam Foods.",
    },
    {
      id: 3,
      question_key: "supplier_faq_q3",
      question_default: "Supplier Alliance Program Requirements – Ahlam Foods",
      answer_key: "supplier_faq_a3",
      answer_default:
        "At Ahlam Foods, we are committed to partnering with suppliers who uphold the highest standards in food safety, quality, and transparency. To qualify for our Global Supplier Alliance (GSA) program, your products must meet the following criteria:\n\nCompliance with International Standards: All agricultural products must comply with European Union regulations and United States FDA standards, ensuring global market readiness and food safety excellence.\n\nCertification & Documentation: Suppliers may be required to provide valid quality and safety certifications (e.g., Global GAP, ISO, HACCP) to verify compliance with international norms.\n\nConsistent Quality & Traceability: We value suppliers with strong quality control systems and traceability procedures from farm to packaging.\n\nFirst-Hand Supply & Competitive Pricing: We seek direct producers or primary processors who can offer competitive prices, helping us deliver high-quality products to our global clients at reasonable costs.\n\nProduct Categories: We welcome suppliers of a wide range of agricultural products, including:\n\nFresh & frozen fruits and vegetables\n\nSpices & herbs.\n\nPulses & legumes.\n\nPickled products.\n\nJuice concentrates & purees.\n\nSpecialty items for export markets.\n\nBy meeting these requirements, your business becomes eligible to join a trusted export network and connect with international buyers looking for reliable, high-quality Egyptian products.\n\nPartner with Ahlam Foods — and take your agricultural business to the world stage.",
    },
    {
      id: 4,
      question_key: "supplier_faq_q4",
      question_default: "Products You Can Supply – Expand With Ahlam Foods",
      answer_key: "supplier_faq_a4",
      answer_default:
        "At Ahlam Foods, we are always looking to expand and diversify our product portfolio to meet the evolving needs of global markets. We value innovation, quality, and variety — and we welcome new suppliers who can introduce unique or in-demand agricultural products.\n\nWhether you specialize in niche crops, value-added items, or products not currently listed on our website, the Ahlam Foods Supplier Alliance provides you with a valuable platform to:\n\nShowcase your products to international buyers and partners.\n\nLeverage our global reach to enter new markets and industries.\n\nGain access to long-term export opportunities through a trusted partner.\n\nCollaborate on packaging, branding, and logistics tailored to global standards.\n\nWe are especially interested in suppliers of:\n\nFresh and frozen fruits & vegetables.\n\nOrganic and specialty produce.\n\nDried herbs, spices, and teas.\n\nPickled items and preserves.\n\nPulses, grains, and juice concentrates.\n\nCustom or private label food products.\n\nIf you have a product with export potential, we invite you to connect with our sourcing team. Ahlam Foods is committed to creating win-win partnerships that deliver real value — for suppliers, buyers, and end consumers alike.\n\nYour product could be our next global success story. Join Ahlam Foods today.",
    },
    {
      id: 5,
      question_key: "supplier_faq_q5",
      question_default: "Partnering for Success – Grow with Ahlam Foods",
      answer_key: "supplier_faq_a5",
      answer_default:
        "At Ahlam Foods, we believe that strong, strategic partnerships are the key to long-term success in the global food and agriculture industry. Through our Global Supplier Alliance, we collaborate closely with farmers, exporters, importers, and distributors who share our commitment to excellence and innovation.\n\nBy partnering with Ahlam Foods, you benefit from:\n\nA global export platform that connects you with buyers in international markets.\n\nCollaborative opportunities across product development, packaging, and supply chain logistics.\n\nAccess to expanding markets for products like frozen fruits, vegetables, herbs, spices, pulses, pickled goods, juice concentrates, and more.\n\nA shared commitment to high-quality standards, food safety, and customer satisfaction.\n\nWe value transparency, trust, and mutual growth. Whether you're supplying a unique specialty product or a staple crop, Ahlam Foods is your gateway to new business opportunities and global success.\n\nTogether, let’s build a future of shared prosperity and sustainable growth.",
    },
    {
      id: 6,
      question_key: "supplier_faq_q6",
      question_default: "Clear Communication – The Foundation of Ahlam Foods’ Supplier Alliance",
      answer_key: "supplier_faq_a6",
      answer_default:
        "At Ahlam Foods, we understand that transparent and consistent communication is essential to building strong supplier relationships. That’s why our Global Supplier Alliance includes dedicated communication channels to keep our partners informed, engaged, and empowered.\n\nAs a supplier, you will benefit from:\n\nRegular newsletters featuring key updates on market trends, seasonal demand shifts, and product insights.\n\nDirect email communication for personalized support, inquiries, and updates.\n\nTimely alerts on documentation requirements, quality standards, and shipment coordination.\n\nA proactive communication culture focused on clarity, speed, and mutual success.\n\nWe are committed to ensuring that every supplier has access to the information they need to thrive in the global marketplace.\n\nAt Ahlam Foods, communication isn’t just a tool — it’s a partnership strategy.",
    },
    {
      id: 7,
      question_key: "supplier_faq_q7",
      question_default: "No Fees. No Commissions. Just Partnership – Ahlam Foods Supplier Alliance",
      answer_key: "supplier_faq_a7",
      answer_default:
        "At Ahlam Foods, our supplier relationships are built on trust, fairness, and long-term value. As part of our transparent business model, we proudly offer a zero-fee and no-commission policy for all participants in our Global Supplier Alliance.\n\nNo hidden charges — Join and collaborate with us at no cost.\n\nNo commissions — Keep 100% of your earnings from product sales.\n\nNo financial barriers — Focus on growth, not fees.\n\nOur mission is to create a supportive platform where farmers, producers, and exporters can connect with international markets without additional financial burdens. By removing fees and commissions, we ensure that every supplier benefits fully from their hard work and high-quality products.\n\nAt Ahlam Foods, your success is our success — and it starts with a fair, transparent partnership.",
    },
    {
      id: 8,
      question_key: "supplier_faq_q8",
      question_default: "Seamless Distribution & Logistics – Powered by Ahlam Foods",
      answer_key: "supplier_faq_a8",
      answer_default:
        "At Ahlam Foods, we recognize that efficient logistics and smooth product distribution are essential to the success of our suppliers and customers alike. That’s why our Global Supplier Alliance program includes comprehensive logistics support — so you can focus on producing high-quality agricultural goods while we handle the rest.\n\nHere’s how we support you:\n\nEnd-to-End Logistics Management: From farm to final destination, our expert logistics team coordinates every step of the journey.\n\nReliable Shipping Partners: We collaborate with trusted freight and transport providers to ensure timely and secure deliveries across global markets.\n\nOptimized Warehousing & Storage: We maintain proper storage conditions to preserve product freshness, quality, and safety during transit.\n\nSupply Chain Efficiency: Our streamlined processes reduce delays, minimize waste, and maintain consistency — even with high-volume orders.\n\nBy partnering with Ahlam Foods, you gain access to a logistics infrastructure designed to maximize your reach and reliability — helping your products arrive on time and in perfect condition.\n\nLet us take care of the logistics, so you can focus on what you do best: delivering excellence.",
    },
    {
      id: 9,
      question_key: "supplier_faq_q9",
      question_default: "Need Help? We're Here for You – Ahlam Foods Supplier Support",
      answer_key: "supplier_faq_a9",
      answer_default:
        "At Ahlam Foods, we know that every supplier is unique — and so are your questions. If you need more details, clarification, or guidance about the Supplier Alliance Program, we’re here to support you every step of the way.\n\nWhether you're unsure about the application process, product requirements, or partnership benefits, our dedicated support team is ready to:\n\nAnswer your questions with clear, helpful information.\n\nProvide personalized guidance based on your business needs.\n\nEnsure you have all the tools to make an informed decision about joining us.\n\nWe value your interest in partnering with Ahlam Foods and are committed to delivering fast, friendly, and reliable assistance.\n\n📩 Contact us today — and let’s explore how we can grow together.",
    },
  ];
  return (
    <section className="supplier py-5">
      <div className="container">
        <div className="row justify-content-center position-relative">
          <img
            className="position-absolute trend-icon"
            style={{
              width: "200px",
              height: "150px",
              right: "0px",
              zIndex: -5,
            }}
            src="/images/sup.webp"
            alt="Decorative trend icon for suppliers"
            loading="lazy"
          />
          <div className="col-md-8 text-center">
            <h1 id="supplier-heading" className="home-heading px-0 px-lg-4">
              {t("supplier_heading", "Become a Supplier — Grow Your Business with Us")}
            </h1>
            <p className="home-description mx-auto mt-3" style={{ maxWidth: "900px" }}>
              {t(
                "supplier_description",
                "Do you have high-quality products and seek a trusted partner to expand internationally? Join AHLAM Fresh & Frozen's supplier network and leverage our export expertise and full support to achieve success together."
              )}
            </p>
          </div>
        </div>

        <div className="row justify-content-center mt-4">
          <div className="col-md-10">
            <Accordion
              activeKey={String(activeKey)}
              onSelect={handleToggle}
              id="faqAccordion"
              role="region"
              aria-label={t("supplier_faqs_aria_label", "Supplier FAQs")}
            >
              {supplierFaqs.map((faq) => (
                <div key={faq.id} ref={(el) => (itemRefs.current[faq.id] = el)}>
                  <Accordion.Item eventKey={String(faq.id)}>
                    <Accordion.Header>{t(faq.question_key, faq.question_default)}</Accordion.Header>
                    <Accordion.Body>
                      {t(faq.answer_key, faq.answer_default)
                        .split(".")
                        .filter((s) => s.trim() !== "")
                        .map((sentence, i) => (
                          <p key={i}>{sentence.trim()}.</p>
                        ))}
                    </Accordion.Body>
                  </Accordion.Item>
                </div>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupplierSection;
