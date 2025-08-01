const CategoryDescription = ({ selectedCategory }) => {
  return (
    selectedCategory?.description && (
      <div
        className="dangerous-description mt-4 py-3"
        style={{
          backgroundColor: "var(--bg-color)",
          color: "var(--heading-color)",
        }}
      >
        <div dangerouslySetInnerHTML={{ __html: selectedCategory.description }} />
      </div>
    )
  );
};

export default CategoryDescription;
