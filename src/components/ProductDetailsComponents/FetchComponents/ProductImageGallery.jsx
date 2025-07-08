export const ProductImageGallery = ({ allImages, details, changeMainImage }) => {
  const mainImage = allImages.find((img) => img.is_main);
  const thumbnails = allImages.filter((img) => !img.is_main);

  return (
    <>
      {" "}
      {/* هذا هو الـ div المشترك للصور والأزرار */}
      <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-4 ">
        {/* Side thumbnails */}
        <div className="d-flex flex-column gap-2 gap-md-3 justify-content-center">
          {thumbnails.map((img) => (
            <img
              onClick={() => changeMainImage(img.id)}
              className="rounded-3 pointer img-fluid"
              key={img.id}
              width={110}
              height={110}
              src={`https://api.ahlamfoods.com/storage/${img.image}`}
              alt="Product thumbnail"
            />
          ))}
        </div>

        {/* Main image */}
        <div>
          {mainImage && (
            <img
              key={mainImage.id}
              className="rounded-5 img-fluid"
              width={500}
              height={500}
              src={`https://api.ahlamfoods.com/storage/${mainImage.image}`}
              alt={details.name}
            />
          )}
        </div>
      </div>
    </>
  );
};
