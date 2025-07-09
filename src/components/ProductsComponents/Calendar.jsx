import React from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchData } from "../../utilis/fetch";
import { useTranslation } from "../../contexts/TranslationContext";

const Calendar = () => {
  const { t } = useTranslation();
  const months = [
    t("month_all_year", "All Year"),
    t("month_january", "January"),
    t("month_february", "February"),
    t("month_march", "March"),
    t("month_april", "April"),
    t("month_may", "May"),
    t("month_june", "June"),
    t("month_july", "July"),
    t("month_august", "August"),
    t("month_september", "September"),
    t("month_october", "October"),
    t("month_november", "November"),
    t("month_december", "December"),
  ];

  // fetch the current month from the API
  const { data, isLoading, isError } = useQuery({
    queryKey: ["current-date"],
    queryFn: () => fetchData("/current-date"),
  });

  const activeMonth = data?.current_month ? months[data.current_month] : "All Year";

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3 px-3" style={{ color: "var(--green-color)" }}>
        {t("Availability Calendar", "Availability Calendar")}
      </h2>

      {isLoading ? (
        <div className="d-flex flex-wrap gap-3 align-items-center">
          {Array.from({ length: 13 }).map((_, idx) => (
            <div
              key={idx}
              className="px-3 py-1 rounded"
              style={{
                width: "90px",
                height: "32px",
                borderRadius: "6px",
                background: "linear-gradient(90deg, #e0e0e0 25%, #f5f5f5 50%, #e0e0e0 75%)",
                backgroundSize: "200% 100%",
                animation: "skeleton-loading 1.5s infinite",
              }}
            ></div>
          ))}
        </div>
      ) : isError ? (
        <p className="text-danger">{t("Failed_load_month", "Failed to load month.")}</p>
      ) : (
        <div className="d-flex flex-wrap gap-3 align-items-center">
          {months.map((month) => (
            <div
              key={month}
              className={`px-3 py-1 rounded`}
              style={{
                color: activeMonth === month ? "var(--green-color)" : "var(--sub-text)",
                backgroundColor: activeMonth === month ? "var(--bg-green)" : "var(--bg-color)",
                fontWeight: activeMonth === month ? "700" : "400",
              }}
            >
              {month}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Calendar;
