import React from "react";

export const ProductTags = ({
  details,
  active,
  changeCurrentDescriptionAndActive,
  currentDescription,
}) => {
  return (
    <div className="py-5">
      <div>
        <ul
          className="d-flex gap-3 pb-2 mb-2"
          style={{
            overflowX: "auto",
            overflowY: "hidden",
            borderBottom: "1px solid var(--border)",
          }}
        >
          {details?.has_many_tags?.map((tag) => (
            <li
              key={tag.id}
              onClick={() => changeCurrentDescriptionAndActive(tag.name, tag.description)}
              className="position-relative pointer"
              style={{
                color: active === tag.name ? "var(--green-color)" : "var(--heading-color)",
                fontWeight: active === tag.name ? "700" : "400",
                whiteSpace: "nowrap",
              }}
            >
              {tag.name}
              <span
                className={`d-none d-md-${active === tag.name ? "block" : "none"} position-absolute`}
                style={{
                  height: "4px",
                  bottom: "-9px",
                  backgroundColor: "var(--green-color)",
                  width: "50%",
                  left: "50%",
                  transform: " translateX(-50%)",
                }}
              ></span>
            </li>
          ))}
        </ul>
        <pre style={{ color: "var(--heading-color)" }}>{currentDescription}</pre>
      </div>
    </div>
  );
};
