import React from "react";

export const ProductDescription = ({ description }) => {
  if (!description) return null;

  return (
    <div className="dangerous-description" dangerouslySetInnerHTML={{ __html: description }} />
  );
};
