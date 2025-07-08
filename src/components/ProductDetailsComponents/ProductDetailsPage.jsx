import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utilis/fetch";
import { useTranslation } from "../../contexts/TranslationContext";

// استيراد المكونات الفرعية
import SkeletonEffect from "./SkeletonEffect";
import Modal from "../Modal";
import Confirm from "../Confirm";
import GetCustomQuote from "../GetCustomQuote";
import { RelatedProducts } from "./RelatedProducts";

// المكونات الفرعية الجديدة
import {
  ProductImageGallery,
  ProductButtons,
  ProductDescription,
  ProductInfo,
  ProductTags,
} from "./FetchComponents"; // هذا المكون سيحتوي الآن على الأزرار أيضًا
import NotFound from "../../pages/NotFound";

export const ProductDetailsPage = ({ id }) => {
  const { t, locale } = useTranslation();
  const fetchDetails = () => {
    const res = fetchData(`/products/${id}`);

    return res;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["products", `details-${id}`, locale],
    queryFn: fetchDetails,
    retry: 1,
    staleTime: 5 * 60 * 1000,
  });

  const details = data?.product || {};
  const relatedProducts = data?.related_products || [];

  const [allImages, setAllImages] = useState([]);
  useEffect(() => {
    if (details?.has_many_images) {
      setAllImages(details.has_many_images);
    }
  }, [details]);

  const changeMainImage = (imageId) => {
    const updateImagesState = allImages.map((img) =>
      img.id !== imageId ? { ...img, is_main: 0 } : { ...img, is_main: 1 }
    );
    setAllImages(updateImagesState);
  };

  const [currentDescription, setCurrentDescription] = useState("");
  const [active, setActive] = useState("Description");

  useEffect(() => {
    if (details?.has_many_tags && details.has_many_tags.length > 0) {
      setActive(details.has_many_tags[0].name);
      setCurrentDescription(details.has_many_tags[0].description);
    } else {
      setActive("Description");
      setCurrentDescription("");
    }
  }, [details]);

  const changeCurrentDescriptionAndActive = (tagName, description) => {
    setActive(tagName);
    setCurrentDescription(description);
  };
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  if (isLoading) return <SkeletonEffect />;

  if (isError) {
    return (
      // <div className="container py-5 text-center">
      //   <div
      //     className="alert alert-danger d-flex flex-column align-items-center justify-content-center"
      //     role="alert"
      //   >
      //     <p className="mb-2">
      //       {t(
      //         "failed_to_load_products",
      //         "Failed to load products. Please try again.",
      //       )}
      //       <br />
      //     </p>
      //     <button
      //       onClick={() => refetch()}
      //       className="btn btn-sm btn-outline-danger"
      //       disabled={isLoading}
      //     >
      //       <FontAwesomeIcon icon={faSyncAlt} /> {t("refresh", "Refresh")}
      //     </button>
      //   </div>
      // </div>
      <NotFound />
    );
  }

  return (
    <div className="py-5">
      <div className="container">
        {/* Images And Info */}
        <div className="row ">
          {/* Images Side (includes buttons now) */}
          <div className="col-12 col-lg-7 mb-5">
            <ProductImageGallery
              allImages={allImages}
              details={details}
              changeMainImage={changeMainImage}
            />
            {/* Buttons - الآن داخل نفس الـ div مع الصور */}
            <ProductButtons
              productId={details.id}
              productName={details.name}
              productStatus={details.is_available}
            />
          </div>
          {/* Info Side */}
          <ProductInfo details={details} />
        </div>

        {/* Tags */}
        <ProductTags
          details={details}
          active={active}
          changeCurrentDescriptionAndActive={changeCurrentDescriptionAndActive}
          currentDescription={currentDescription}
        />

        {/* Form */}
        <div>
          <GetCustomQuote
            name={details?.name}
            openModal={openModal}
            closeModal={closeModal}
            message={t("Get_Custom_Quote", "Get a Custom Quote")}
          />
          <Modal isOpen={isOpen} openModal={openModal}>
            <Confirm />
          </Modal>
        </div>

        {/* Related Products */}
        <div className="mb-5">
          <RelatedProducts relatedProducts={relatedProducts} />
        </div>

        {/* Product Description */}
        <ProductDescription description={details?.description} />
      </div>
    </div>
  );
};
