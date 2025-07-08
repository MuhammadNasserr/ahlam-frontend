const MainTitle = ({ text }) => {
  return (
    <h1
      className="fs-1 fw-bold w-lg-100 mx-auto mx-md-0"
      style={{
        width: "fit-content",
        maxWidth: "435px",
        color: "var(--heading-color)",
      }}
    >
      {text}
    </h1>
  );
};

export default MainTitle;
