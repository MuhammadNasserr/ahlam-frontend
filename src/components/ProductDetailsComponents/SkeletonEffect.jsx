const SkeletonEffect = () => {
  return (
    <div className="py-5">
      <div className="container">
        {/* Images And Info Section - Existing Skeleton */}
        <div className="d-flex flex-column flex-md-row gap-5 mb-5">
          {" "}
          {/* Added mb-5 for spacing */}
          {/* Left Side (Images) */}
          <div className="d-flex gap-4">
            <div className="d-flex flex-column gap-3">
              {[1, 2, 3, 4].map((_, i) => (
                <div key={i} className="placeholder-glow rounded" style={{ width: 70, height: 70 }}>
                  <span className="placeholder w-100 h-100 d-block rounded"></span>
                </div>
              ))}
            </div>
            <div className="placeholder-glow rounded" style={{ width: 400, height: 300 }}>
              <span className="placeholder w-100 h-100 d-block rounded-5"></span>
            </div>
          </div>
          {/* Right Side (Info) */}
          <div className="flex-fill">
            <h2 className="placeholder-glow mb-3">
              <span className="placeholder col-6"></span>
            </h2>

            {[...Array(3)].map(
              (
                _,
                i // Reduced to 3 sections for brevity, adjust as needed
              ) => (
                <div className="mb-3" key={`info-skel-${i}`}>
                  <p className="placeholder-glow mb-1">
                    <span className="placeholder col-4"></span>
                  </p>
                  <p className="placeholder-glow">
                    <span className="placeholder col-8"></span>
                  </p>
                </div>
              )
            )}

            <div className="mt-4">
              <div className="placeholder-glow mb-3">
                <span
                  className="placeholder col-12 py-2 rounded d-block"
                  style={{ height: "40px" }}
                ></span>
              </div>
              <div className="placeholder-glow">
                <span
                  className="placeholder col-12 py-2 rounded d-block"
                  style={{ height: "40px" }}
                ></span>
              </div>
            </div>
          </div>
        </div>

        {/* Tags Section Skeleton */}
        <div className="py-5">
          <ul
            className="d-flex gap-3 pb-2 mb-2"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            {[1, 2, 3, 4].map(
              (
                _,
                i // Placeholder for 4 tags
              ) => (
                <li key={`tag-skel-${i}`} className="placeholder-glow">
                  <span
                    className="placeholder rounded-pill"
                    style={{ width: "100px", height: "30px" }}
                  ></span>
                </li>
              )
            )}
          </ul>
          <p className="placeholder-glow mt-3">
            <span className="placeholder col-10"></span>
            <span className="placeholder col-7"></span>
            <span className="placeholder col-9"></span>
          </p>
        </div>

        {/* Form Section Skeleton (for GetCustomQuote) */}
        <div className="py-5">
          {" "}
          {/* Added py-5 for consistent spacing */}
          <h3 className="placeholder-glow mb-4">
            <span className="placeholder col-4"></span>{" "}
            {/* Placeholder for "Get a Custom Quote" title */}
          </h3>
          <div className="d-flex flex-column gap-3">
            {[...Array(7)].map(
              (
                _,
                i // Placeholders for 7 input fields
              ) => (
                <div key={`form-input-skel-${i}`} className="placeholder-glow">
                  <span
                    className="placeholder w-100 rounded-2 d-block"
                    style={{ height: "50px" }}
                  ></span>
                </div>
              )
            )}
            <div className="placeholder-glow mt-3">
              <span
                className="placeholder col-12 py-2 rounded d-block"
                style={{ height: "50px" }}
              ></span>{" "}
              {/* Placeholder for submit button */}
            </div>
          </div>
        </div>

        {/* Related Products Section Skeleton */}
        <div className="mb-5">
          <h3 className="fw-bold placeholder-glow">
            <span className="placeholder col-3"></span>{" "}
            {/* Placeholder for "Related Products" title */}
          </h3>
          <div className="row mt-4">
            {[...Array(4)].map(
              (
                _,
                i // Placeholder for 4 related product cards
              ) => (
                <div
                  className="col-12 col-sm-6 col-md-6 col-lg-4 col-xl-3 mb-4"
                  key={`related-skel-${i}`}
                >
                  <div className="border rounded h-100 p-2">
                    <div className="w-100 mb-2 placeholder-glow" style={{ height: "200px" }}>
                      <span className="placeholder w-100 h-100 d-block rounded-5"></span>
                    </div>
                    <div className="placeholder-glow mb-1">
                      <span className="placeholder col-8"></span>
                    </div>
                    <div className="placeholder-glow mb-2">
                      <span className="placeholder col-6"></span>
                    </div>
                    <div className="placeholder-glow mb-2">
                      <span className="placeholder col-10"></span>
                    </div>
                    <div className="placeholder-glow">
                      <span className="placeholder w-100 py-2 rounded d-block"></span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>

        {/* Dangerous Description Section Skeleton */}
        {/* Assumed this section is usually below "Related Products" based on your FetchDetails structure */}
        <div className="py-3">
          <h4 className="placeholder-glow mb-3">
            <span className="placeholder col-5"></span>{" "}
            {/* Placeholder for a heading/title if any */}
          </h4>
          <p className="placeholder-glow">
            <span className="placeholder col-12"></span>
            <span className="placeholder col-11"></span>
            <span className="placeholder col-10"></span>
            <span className="placeholder col-12"></span>
            <span className="placeholder col-9"></span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SkeletonEffect;
