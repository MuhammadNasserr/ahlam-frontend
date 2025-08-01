import React from "react";
import { useTranslation } from "../../../contexts/TranslationContext";
export const ProductInfo = ({ details }) => {
  const { t } = useTranslation();
  return (
    <div className="col-12 col-lg-5 ps-lg-5">
      <h2 className="mb-3 fw-bold" style={{ color: "var(--green-color)", fontSize: "38px" }}>
        {details.name}{" "}
        <span
          className={`badge  ${
            details.is_available === "Unavailable"
              ? "text-danger"
              : details.is_available === "Available"
                ? "text-success"
                : details.is_available === "Soon"
                  ? "text-primary"
                  : ""
          }`}
          style={{
            fontSize: "12px",
            padding: "5px 15px",
          }}
        >
          ({details.is_available})
        </span>
      </h2>
      <div>
        {details?.has_many_data?.map((d) => (
          <div key={d.id} className="mb-4">
            <p
              style={{
                color: "var(--heading-color)",
                fontWeight: "700",
                fontSize: "20px",
              }}
            >
              {d.name}
            </p>
            <p className="w-100" style={{ color: "var(--gray-color)" }}>
              {d.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
