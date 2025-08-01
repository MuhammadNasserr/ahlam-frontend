import React, { useState, useEffect, useRef } from "react"; // Import useRef

export const ProductImageGallery = ({ allImages, details, changeMainImage }) => {
  // Find the initially designated main image
  const initialMainImage = allImages?.find((img) => img.is_main);

  // Use state to manage the currently displayed main image
  const [currentMainImage, setCurrentMainImage] = useState(
    initialMainImage || (allImages && allImages.length > 0 ? allImages[0] : null)
  );

  // State for zoom functionality
  const [zoomLevel, setZoomLevel] = useState(1); // 1 means no zoom
  const [imageTranslateX, setImageTranslateX] = useState(0);
  const [imageTranslateY, setImageTranslateY] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false); // Track if currently zoomed in

  const mainImageRef = useRef(null); // Ref to the main image container

  // Effect to update currentMainImage if allImages prop changes
  useEffect(() => {
    setCurrentMainImage(
      initialMainImage || (allImages && allImages.length > 0 ? allImages[0] : null)
    );
    // Reset zoom when main image changes
    setZoomLevel(1);
    setImageTranslateX(0);
    setImageTranslateY(0);
    setIsZoomed(false);
  }, [allImages, initialMainImage]); // Added initialMainImage to dependencies

  // Function to handle changing the main image when a thumbnail is clicked
  const handleThumbnailClick = (image) => {
    setCurrentMainImage(image);
    // Reset zoom when a new thumbnail is clicked
    setZoomLevel(1);
    setImageTranslateX(0);
    setImageTranslateY(0);
    setIsZoomed(false);
  };

  // Handle mouse move for panning when zoomed
  const handleMouseMove = (e) => {
    if (zoomLevel > 1 && mainImageRef.current) {
      const { left, top, width, height } = mainImageRef.current.getBoundingClientRect();
      const mouseX = e.clientX - left; // Mouse position relative to image container
      const mouseY = e.clientY - top;

      // Calculate translation based on mouse position relative to center of image
      // This makes the image follow the mouse slightly when zoomed
      const newTranslateX = (mouseX / width - 0.5) * (zoomLevel - 1) * width * -1;
      const newTranslateY = (mouseY / height - 0.5) * (zoomLevel - 1) * height * -1;

      setImageTranslateX(newTranslateX);
      setImageTranslateY(newTranslateY);
    }
  };

  // Handle mouse leave to reset translation when mouse moves off the image
  const handleMouseLeave = () => {
    setImageTranslateX(0);
    setImageTranslateY(0);
    // If you want to automatically zoom out on mouse leave, uncomment the next line:
    // setZoomLevel(1);
    // setIsZoomed(false);
  };

  // Toggle zoom level on click
  const handleImageClick = () => {
    if (isZoomed) {
      setZoomLevel(1); // Zoom out
      setImageTranslateX(0);
      setImageTranslateY(0);
    } else {
      setZoomLevel(1.5); // Zoom in (you can adjust this value, e.g., 2.5, 3)
    }
    setIsZoomed(!isZoomed);
  };

  // If there are no images, you might want to render nothing or a placeholder
  if (!allImages || allImages.length === 0) {
    return <p>No images available for this product.</p>;
  }

  return (
    <>
      <div className="d-flex flex-row justify-content-center align-items-center gap-4 mb-4 mt-0 mt-md-5">
        {/* Side thumbnails - all images are thumbnails */}
        <div className="d-flex flex-column gap-2 gap-md-3 justify-content-center">
          {allImages.map((img) => (
            <img
              onClick={() => handleThumbnailClick(img)}
              className={`rounded-3 pointer img-fluid ${
                currentMainImage && currentMainImage.id === img.id
                  ? "border border-success border-5"
                  : ""
              }`}
              key={img.id}
              width={110}
              height={110}
              src={`https://api.ahlamfoods.com/storage/${img.image}`}
              alt="Product thumbnail"
            />
          ))}
        </div>

        {/* Main image with zoom functionality */}
        <div
          ref={mainImageRef} // Attach ref to this container
          className="main-image-container overflow-hidden" // Add overflow-hidden to clip zoomed image
          style={{ width: 500, cursor: isZoomed ? "zoom-out" : "zoom-in" }} // Set fixed size for container
          onClick={handleImageClick}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {currentMainImage && (
            <img
              key={currentMainImage.id}
              className="rounded-3 img-fluid"
              width={500}
              height={500}
              src={`https://api.ahlamfoods.com/storage/${currentMainImage.image}`}
              alt={details?.name || "Product image"}
              style={{
                transform: `scale(${zoomLevel}) translate(${imageTranslateX}px, ${imageTranslateY}px)`,
                transformOrigin: "center center", // Keep origin at center
                transition: "transform 0.1s ease-out", // Smooth transition for zoom/pan
                objectFit: "contain", // Ensure image fits without distortion
              }}
            />
          )}
        </div>
      </div>
    </>
  );
};
