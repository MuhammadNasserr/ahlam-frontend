const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return (
    <div>
      <div
        className="overlay end-0 m-0 m-md-3 shake"
        style={{
          backgroundColor: "#222831c7",
          position: "fixed",
          top: "100px",
          borderRadius: "10px",
          width: "400px",
          maxWidth: "100%",
          zIndex: "100",
        }}
      >
        <div className="content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
