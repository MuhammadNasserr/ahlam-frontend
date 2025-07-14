import React from "react";
import { Link } from "react-router-dom";
import MainTitle from "../MainTitle";
import TurnipImage from "../../../Public/images/Turnip.webp";
import AccordionComponent from "../AccordionComponent";
import PappersImage from "../../../Public/images/peppers.webp";
import { useTranslation } from "../../contexts/TranslationContext";

export const FAQS = () => {
  const { t } = useTranslation();
  const faqs = [
    {
      id: 1,
      question_key: "faq_q1",
      question_default: "What products does Ahlam Foods offer as a supplier?",
      answer_key: "faq_a1",
      answer_default:
        "Ahlam Foods is a trusted Egyptian supplier specializing in the export of premium-quality fresh and frozen fruits and vegetables, along with a wide range of agricultural products such as citrus fruits, pickles, herbs, spices, pulses, and grains. Our carefully selected produce is cultivated under strict quality standards to ensure freshness, taste, and safety from farm to table. In addition to our extensive product line, Ahlam Foods provides tailored export solutions to suit the specific needs of importers, wholesalers, and food manufacturers worldwide. Whether you’re seeking customized packaging, private labeling, or bulk shipments, our team is ready to deliver flexible, efficient, and reliable services. While our website showcases many of our top-selling items, we can also source and export other Egyptian food products not listed online. If you’re looking for a particular item, we encourage you to contact our sales team directly for availability and export options. At Ahlam Foods, we are committed to excellence in agri-food exports and building long-term partnerships through consistent quality, transparency, and outstanding customer support.",
    },
    {
      id: 2,
      question_key: "faq_q2",
      question_default: "What is the minimum order quantity for Ahlam Foods products?",
      answer_key: "faq_a2",
      answer_default:
        "At Ahlam Foods, we offer flexible order quantities to accommodate the diverse needs of our international clients. For sea freight shipments, the minimum order quantity (MOQ) is 20 metric tons, ideal for bulk buyers and large-scale importers seeking cost-effective logistics. For smaller, urgent, or high-value shipments, we also support air freight orders starting from just 500 kilograms—perfect for importers requiring fast delivery of fresh or frozen produce. Whether you're importing Egyptian fruits, vegetables, herbs, or grains, Ahlam Foods ensures efficient and timely export solutions tailored to your shipping preferences and business size.",
    },
    {
      id: 3,
      question_key: "faq_q3",
      question_default: "What kind of payments does Ahlam Foods accept?",
      answer_key: "faq_a3",
      answer_default:
        "Ahlam Foods offers secure and internationally recognized payment methods to facilitate smooth transactions with clients around the globe. We accept payments via Letter of Credit (L/C) and Telegraphic Transfer (T/T)—both trusted options for international trade. Whether you're importing frozen fruits, fresh vegetables, or other Egyptian agricultural products, our flexible payment terms are designed to ensure transparency, reliability, and peace of mind for our partners worldwide. For specific arrangements or custom terms, our sales team is always available to assist and provide the most suitable solution for your business needs.",
    },
    {
      id: 4,
      question_key: "faq_q4",
      question_default: "What countries does Ahlam Foods export to?",
      answer_key: "faq_a4",
      answer_default:
        "Ahlam Foods proudly exports its premium Egyptian fruits, vegetables, grains, and other agricultural products to clients across the globe. With a strong and growing international presence, our export network spans over 100 countries across Europe, Asia, Africa, North and South America, and the Middle East. From markets like Germany, the United Kingdom, and France, to Saudi Arabia, the UAE, Jordan, India, and beyond, Ahlam Foods has built trusted relationships with importers, wholesalers, and distributors worldwide. Whether you're in Africa, the Gulf region, Southeast Asia, or Latin America, you can count on Ahlam Foods for reliable delivery, strict quality control, and customized export solutions that meet your market’s specific requirements. If you're interested in importing our frozen or fresh Egyptian produce, feel free to reach out to our export team for more information about shipping options to your country.",
    },
    {
      id: 5,
      question_key: "faq_q5",
      question_default: "How can I obtain free samples of the products?",
      answer_key: "faq_a5",
      answer_default:
        "At Ahlam Foods, we believe in the importance of quality assurance and customer confidence. That’s why we offer free product samples of our Egyptian fruits, vegetables, herbs, and grains—giving you the opportunity to evaluate our quality before placing a full order. While the samples themselves are provided free of charge, customers are typically responsible for covering the shipping fees or coordinating pickup through their preferred courier service. This small investment allows buyers to test our freshness, packaging, and product specifications with zero risk. To request your free sample, simply contact our sales or export team, specify the product you're interested in, and we’ll guide you through the next steps to ensure a smooth and prompt delivery.",
    },
    {
      id: 6,
      question_key: "faq_q6",
      question_default: "Is it possible to customize the packaging for orders of a certain amount?",
      answer_key: "faq_a6",
      answer_default:
        "Yes, at Ahlam Foods, we offer custom packaging solutions for bulk orders that meet a minimum quantity threshold. Whether you’re looking to enhance your brand identity, comply with specific market regulations, or include private labeling, our team is ready to help you create packaging that reflects your business needs. We provide a wide range of customization options, including:\n\n Branded packaging. Custom labels and barcodes. Multi-language ingredient or nutritional labels. Retail-ready designs or foodservice bulk formats. To explore the possibilities and determine the minimum order requirements, simply contact our sales team. We’ll work closely with you to deliver high-quality, tailored packaging that meets both functional and marketing objectives. At Ahlam Foods, we’re committed to offering not just top-quality Egyptian products—but also the flexibility and support needed to succeed in your local market.",
    },
    {
      id: 7,
      question_key: "faq_q7",
      question_default: "What is white labeling and does Ahlam Foods offer it?",
      answer_key: "faq_a7",
      answer_default:
        "Yes, Ahlam Foods proudly offers white labeling services for clients seeking to market high-quality Egyptian agricultural products under their own brand name. White labeling means that we produce and package our fresh and frozen fruits, vegetables, herbs, grains, and more using your brand logo, design, and labeling specifications. This enables you to sell our premium products as part of your own branded line—without the need to invest in production, sourcing, or quality control infrastructure. Our white label solutions are ideal for:\n\nRetailers looking to launch or expand private-label food brands. Distributors and wholesalers seeking to strengthen brand visibility. International importers aiming for a seamless, ready-to-market product line. With Ahlam Foods as your behind-the-scenes partner, you gain access to export-ready, custom-packaged products that meet global standards—while keeping full control over your brand identity. To learn more or start your white label project, contact our team to discuss options, minimum order quantities, and packaging customization.",
    },
    {
      id: 8,
      question_key: "faq_q8",
      question_default: "How to confirm the product quality before placing orders?",
      answer_key: "faq_a8",
      answer_default:
        "At Ahlam Foods, we understand that product confidence is essential—especially when it comes to importing fresh or frozen Egyptian produce. That’s why we offer free product samples, allowing you to evaluate the quality, appearance, freshness, and packaging before making a purchasing decision. You can request samples of any item from our portfolio, and only need to cover the shipping cost or arrange pickup via your preferred courier. This gives you a risk-free way to inspect our products and ensure they meet your market’s standards. Whether you're sourcing vegetables, fruits, herbs, or grains, we’re confident that our commitment to premium quality and strict control measures will win your trust. To request your samples, simply reach out to our sales team—your satisfaction is our priority, and we’re here to support your success from the very first interaction.",
    },
    {
      id: 9,
      question_key: "faq_q9",
      question_default: "What's the expected delivery lead time for orders?",
      answer_key: "faq_a9",
      answer_default:
        "At Ahlam Foods, delivery lead time varies based on several key factors, including the order quantity, product availability, and the destination country. We are committed to ensuring fast, efficient, and reliable shipping for all international clients. Typically:\n\nFor readily available products, processing and shipping may begin within a few working days. For large or custom orders (e.g. private labeling or special packaging), a slightly longer lead time may apply. Transit times depend on the shipping method—air freight is faster (usually a few days), while sea freight may take longer (2–4 weeks depending on location). Once your order details are confirmed, our sales team will provide you with an accurate estimated delivery date and help track the shipment every step of the way. Partner with Ahlam Foods for timely deliveries of premium Egyptian fruits, vegetables, and agricultural goods—delivered with precision and care.",
    },
    {
      id: 10,
      question_key: "faq_q10",
      question_default: "Does Ahlam Foods offer any discounts on its products?",
      answer_key: "faq_a10",
      answer_default:
        "Yes, Ahlam Foods offers competitive pricing and special discounts for bulk orders, repeat clients, and during selected promotional periods. We understand that cost-efficiency is a key factor for importers, distributors, and retailers, which is why we strive to deliver high-quality Egyptian agricultural products at the best possible value. Discount eligibility may vary depending on:\n\nOrder volume. Product type and seasonality. Shipping method (air or sea). Ongoing promotional campaigns. In addition to discounts, Ahlam Foods also provides flexible payment options and custom solutions to help streamline your purchasing process and reduce overall costs. For the latest offers and a personalized quote tailored to your business needs, we encourage you to contact our sales team directly. We're here to support your success with quality, reliability, and savings.",
    },
    {
      id: 11,
      question_key: "faq_q11",
      question_default:
        "Are there any exclusive discounts available for first-time customers at Ahlam Foods?",
      answer_key: "faq_a11",
      answer_default:
        "Yes, Ahlam Foods is pleased to offer exclusive discounts for first-time customers as part of our commitment to building strong, long-term partnerships. This is a great opportunity for new clients to experience the premium quality of Egyptian fruits, vegetables, herbs, and grains we export—while enjoying cost savings from the very first order.In addition to our new customer offers, we regularly run seasonal promotions, bulk order deals, and limited-time discounts across various product categories.To stay updated on our latest offers:\n\nSubscribe to our email newsletter for early access to promotions.Follow our official communication channels for updates on special campaigns.Contact our sales team directly to ask about current discounts for your region or order size.At Ahlam Foods, we’re here to help you save more while importing the best of Egypt’s agricultural exports.",
    },
    {
      id: 12,
      question_key: "faq_q12",
      question_default: "How does Ahlam Foods treat quality complaints?",
      answer_key: "faq_a12",
      answer_default:
        "At Ahlam Foods, we take product quality and customer satisfaction very seriously. Our rigorous quality control procedures at every stage—from harvesting to packaging and shipping—are designed to reduce the chance of any defect to a minimum.However, if you do encounter a genuine quality issue related to our products, we urge you to contact our customer service team immediately. Once the issue is reviewed and confirmed to be a result of our processing or handling, we are committed to offering a full or partial refund or another mutually agreed solution to compensate your loss.Beyond resolving individual cases, we also value your feedback as a vital part of our continuous improvement. Whether it's a concern about product condition, packaging, or delivery, our support team will respond promptly and professionally to ensure your full satisfaction.At Ahlam Foods, our success is built on trust, consistency, and long-term partnerships—and we’re here to support your business every step of the way.",
    },
    {
      id: 13,
      question_key: "faq_q13",
      question_default:
        "Are specific certificates available for the products supplied by Ahlam Foods?",
      answer_key: "faq_a13",
      answer_default:
        "Yes, Ahlam Foods can provide a wide range of official product certificates upon request to meet your import regulations, quality assurance, or market entry requirements.Depending on the product and destination country, available certificates may include:\n\nPhytosanitary Certificates.Health and Quality Certificates.Certificate of Origin.Organic Certification (for certified organic products).ISO, HACCP, and Global GAP certifications.Lab analysis reports for pesticide residues or microbiological safety.All of our fresh and frozen fruits, vegetables, herbs, grains, and pulses undergo strict quality control processes, ensuring they comply with international export standards. These certificates serve as documentation of our commitment to product integrity, food safety, and transparency.To request specific certificates or learn which documents are required for your market, please contact our export and compliance team—we’re happy to assist you with all necessary paperwork to ensure smooth customs clearance and customer confidence.",
    },
    {
      id: 14,
      question_key: "faq_q14",
      question_default: "What kind of packaging does Ahlam Foods provide?",
      answer_key: "faq_a14",
      answer_default:
        "At Ahlam Foods, we offer a wide range of food-grade packaging solutions designed to ensure product freshness, safety, and market appeal—whether you’re a manufacturer, retailer, or distributor.📦 Our packaging options include:\n\nBulk Packaging (10kg – 25kg):\n\nIdeal for food service providers, processing companies, and wholesalers who require large-volume supplies.Mid-Size Packs (1kg – 10kg):\n\nSuitable for distributors and retailers looking for efficient shelf-ready stock.Retail Packs (50g – 1kg):\n\nDesigned for supermarkets and consumer markets with attractive, branded designs and convenience-focused features.Customized Packaging:\n\nWe provide private labeling, branded packaging, and specialized formats (e.g., vacuum-sealed, zipper bags, cartons) based on your specifications.All packaging materials comply with international food safety standards and are tailored to protect the integrity of our fresh and frozen fruits, vegetables, herbs, grains, and pulses during storage and transport.Whether you need export-ready bulk packaging or eye-catching retail design, Ahlam Foods has the flexibility and expertise to deliver packaging that aligns perfectly with your market needs.",
    },
    {
      id: 15,
      question_key: "faq_q15",
      question_default:
        "What quality control measures are taken to ensure that all products provided by Ahlam Foods are safe and nutritious?",
      answer_key: "faq_a15",
      answer_default:
        "At Ahlam Foods, quality and food safety are at the heart of everything we do. We implement a comprehensive set of quality control procedures across all stages of our operations to ensure that every product we export is safe, fresh, and rich in nutritional value.✅ Our quality assurance practices include:\n\nStrict compliance with international standards, including:\n\nGood Agricultural Practices (GAP).Good Manufacturing Practices (GMP).HACCP (Hazard Analysis & Critical Control Points).Global Food Safety Initiative (GFSI) frameworks.On-site inspection and testing at every step of the process—from farm harvesting to final packaging.Advanced sorting, processing, and cold chain technologies to maintain product freshness and prevent contamination.Certified laboratories conduct regular testing for pesticide residues, microbial safety, and nutritional content.Traceability systems that monitor the journey of each product from field to shipment.Our expert team of agronomists, food scientists, and quality technicians ensure that all products—whether fresh produce, frozen vegetables, herbs, or pulses—meet both local and international safety requirements, including for markets in the EU, GCC, North America, and Asia.At Ahlam Foods, we’re not just exporters—we’re quality guardians. Our mission is to deliver wholesome, safe, and export-ready Egyptian agricultural products that meet the highest expectations of global customers.",
    },
    {
      id: 16,
      question_key: "faq_q16",
      question_default: "What sets Ahlam Foods apart from other food providers?",
      answer_key: "faq_a16",
      answer_default:
        "At Ahlam Foods, we go beyond simply supplying agricultural products—we deliver quality, trust, and innovation in every shipment. Here's what truly distinguishes us in the global food industry:\n\n🌱 Uncompromising Quality & Safety.We adhere to the highest international food safety and quality standards, ensuring that our fresh and frozen fruits, vegetables, herbs, pulses, and grains are consistently safe, nutritious, and delicious. Our processes follow GAP, HACCP, GMP, and GFSI protocols to guarantee that every product meets or exceeds market expectations.🌍 Sustainable & Ethical Sourcing.Ahlam Foods is deeply committed to environmental responsibility and social impact. We partner with trusted Egyptian farmers who practice sustainable agriculture, minimizing environmental impact while supporting rural development and economic growth.🤝 Customer-Centric Approach.We pride ourselves on our flexibility, responsiveness, and personalized service. Whether you're a retailer, distributor, or food processor, we offer customized solutions in packaging, private labeling, and product selection to meet your unique business needs.🔄 Global Reach with Local Expertise.With export operations spanning Europe, the Middle East, Asia, and North America, we understand the specific regulatory and logistical requirements of different markets. Our international experience ensures seamless delivery and compliance wherever you are.💬 Trust & Long-Term Partnerships.At Ahlam Foods, we value transparency and open communication. We actively listen to customer feedback, adapt quickly, and continuously improve to build long-term, successful relationships.",
    },
    {
      id: 17,
      question_key: "faq_q17",
      question_default:
        "What is the process of ensuring the quality and safety of Ahlam Foods' products for export?",
      answer_key: "faq_a17",
      answer_default:
        "At Ahlam Foods, ensuring the safety, quality, and compliance of our products for international markets is a top priority. We follow a meticulous, multi-stage process designed to meet the most demanding global food safety standards.🏷️ 1- Sourcing from Trusted Growers.We work exclusively with approved and audited Egyptian farms that implement Good Agricultural Practices (GAP). All incoming raw materials undergo thorough inspection upon arrival at our facilities to verify freshness, hygiene, and compliance with export requirements.🧪 2- Advanced Processing & Hygiene Protocols.Using state-of-the-art machinery and automated sorting systems, our products are carefully processed under the supervision of certified food safety professionals. All facilities comply with GMP, ISO, and HACCP standards.🔬 3- Multi-Level Quality Testing.Each batch is subjected to:\n\nMicrobiological tests to detect pathogens.Chemical residue analysis (including pesticide levels and heavy metals).Physical inspections for shape, color, moisture, and defects.We ensure compliance with EU, US FDA, and GCC standards, depending on the destination country.📜 4- Certification & Approval for Export.Only after passing all quality and safety checks are the products certified by relevant Egyptian authorities, including the Ministry of Agriculture and quarantine bodies, making them ready for seamless international export.🔄 5- End-to-End Traceability.Ahlam Foods uses an advanced traceability system that monitors every step of the supply chain—from field to container. This ensures rapid response and transparency in case of any quality inquiries or audits.",
    },
    {
      id: 18,
      question_key: "faq_q18",
      question_default:
        "How successful has Ahlam Foods been in introducing its food products globally?",
      answer_key: "faq_a18",
      answer_default:
        "Ahlam Foods has earned a strong global reputation as a trusted exporter of premium-quality Egyptian food products. With a diverse product portfolio that includes fresh and frozen fruits, vegetables, herbs, grains, and pulses, our products have been successfully introduced in markets across Europe, the Middle East, Asia, Africa, and the Americas.🌍 Global Reach Across 50+ Countries.Thanks to our strategic partnerships and robust logistics network, Ahlam Foods exports to over 50 countries worldwide. Our ability to adapt to different market preferences and meet international safety and certification standards has allowed us to build lasting relationships with importers, retailers, food processors, and distributors around the globe.⭐ Positive Market Reception & Customer Trust.Our commitment to quality, consistency, and customer satisfaction has resulted in strong market acceptance. Whether it's our frozen okra in the Gulf region, fresh mangoes in Europe, or pulses in Asia, Ahlam Foods has become a preferred source for high-standard agricultural exports from Egypt.",
    },
    {
      id: 19,
      question_key: "faq_q19",
      question_default:
        "Are there any seasonal or limited edition products offered by Ahlam Foods?",
      answer_key: "faq_a19",
      answer_default:
        "Yes, Ahlam Foods regularly offers seasonal and limited-edition products in line with Egypt’s rich agricultural calendar. From sun-ripened summer fruits like mangoes and grapes to winter-harvested leafy greens and citrus, we supply a wide variety of fresh and frozen produce that reflects the natural harvest cycles.🌱 Limited-Time Offers, Always in Season.Some products are available only during specific months due to their seasonal nature, while others may be part of special harvest batches or exclusive varieties. These limited-time offerings are in high demand due to their freshness, flavor, and authenticity.📬 Stay Informed.To stay updated on our seasonal product availability and exclusive offers, we encourage you to:\n\nSubscribe to our email newsletter.Follow Ahlam Foods on social media.Contact our sales team for an up-to-date product calendar.",
    },
    {
      id: 20,
      question_key: "faq_q20",
      question_default:
        "How does Ahlam Foods stay up-to-date with the latest industry trends and consumer demands?",
      answer_key: "faq_a20",
      answer_default:
        "At Ahlam Foods, we remain at the forefront of the food export industry by actively tracking evolving market trends, consumer preferences, and international standards.🔍 Continuous Market Research & Data Analysis.We invest in in-depth market research to understand shifting global demands for fresh and frozen produce, herbs, pulses, and specialty food products. This enables us to adjust our offerings and packaging formats to suit retailers, manufacturers, and food service providers in diverse regions.🗣️ Customer Feedback & Direct Engagement.We value direct input from our international customers and partners. Regular feedback helps us improve product quality, diversify packaging options, and introduce trending items tailored to market needs.🌍 Trade Fairs & Global Events.Ahlam Foods participates in leading international food expos and agricultural trade shows such as Fruit Logistica, SIAL, and Gulfood. These platforms keep us connected with innovation in food processing, export compliance, sustainability, and consumer behavior.",
    },
    {
      id: 21,
      question_key: "faq_q21",
      question_default:
        "Does Ahlam Foods have a customer loyalty program or rewards system in place?",
      answer_key: "faq_a21",
      answer_default:
        "While Ahlam Foods does not currently offer a formal customer loyalty program, we highly value our long-term clients and regularly provide exclusive promotions, special discounts, and seasonal offers as a way to show our appreciation.🎁 Stay Connected for Exclusive Deals.To ensure you never miss out on limited-time deals or loyalty-based offers:\n\nSubscribe to our email newsletter.Follow Ahlam Foods on social media platforms.Stay in touch with our sales team for ongoing promotions.We are continuously exploring ways to enhance the customer experience, and introducing a structured rewards or loyalty system is under consideration as part of our future customer engagement strategy.",
    },
    {
      id: 22,
      question_key: "faq_q22",
      question_default: "How can customers provide feedback or suggestions to Ahlam Foods?",
      answer_key: "faq_a22",
      answer_default:
        "At Ahlam Foods, we actively welcome all customer feedback, suggestions, and inquiries, as they play a vital role in helping us maintain and improve the quality of our products and services.📨 Multiple Channels for Easy Communication.You can easily share your thoughts with us through any of the following methods:\n\nFilling out the contact form on our official website.Sending us a direct email to our customer care team.Reaching out via our social media pages.Speaking directly with one of our sales or support representatives.🤝 Your Opinion Matters.Whether it's a suggestion to improve a product, feedback on your recent shipment, or a request for a new item, we treat every message with importance and respond as quickly as possible.",
    },
  ];

  return (
    <div>
      {/* TurnipImage Image */}
      <div className="container py-5">
        <div className="content py-5 position-relative d-flex gap-5 flex-column flex-md-row justify-content-between ">
          <img
            src={TurnipImage}
            alt="TurnipImage"
            className="position-absolute trend-icon"
            style={{ width: "180px", top: "-80px", right: "-20px" }}
          />
          {/* Left Side */}
          <div className="text-center text-md-start">
            <MainTitle text={t("faqs_main_title", "Frequently Asked Questions")} />
            <p className="mt-3" style={{ color: "var(--heading-color)" }}>
              {t("faqs_still_need_help", "Still Need Help ?")}{" "}
              <span style={{ color: "var(--green-color)" }}>
                <Link to="/contact-us"> {t("faqs_chat_with_us", "Chat with Us")}</Link>
              </span>
            </p>

            {/* Pappers Image */}
            <img
              className="position-absolute d-none d-md-inline-block"
              style={{
                width: "200px",
                left: 0,
                bottom: "70px",
              }}
              src={PappersImage}
              alt="PappersImage"
            />
          </div>

          {/* Right Side */}
          <div className="faqs-accord" style={{ width: "600px", maxWidth: "100%" }}>
            <AccordionComponent
              faqs={faqs.map((faq) => ({
                ...faq,
                question: t(faq.question_key, faq.question_default),
                answer: t(faq.answer_key, faq.answer_default),
              }))}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
