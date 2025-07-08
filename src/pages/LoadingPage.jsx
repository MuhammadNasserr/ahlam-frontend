import Lottie from "lottie-react";
import loadingAnimation from "../../Public/lottie/loading.json";
export const LoadingPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "green",
      }}
    >
      <div style={{ width: "700px" }}>
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
};
