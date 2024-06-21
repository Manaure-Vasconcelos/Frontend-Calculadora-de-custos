// components/LoadingAnimation.js
import React from "react";
import Lottie from "react-lottie";
import animationData from "../../public/loading-dots.json";

const LoadingAnimation = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Lottie options={defaultOptions} height={250} width={250} />
    </div>
  );
};

export default LoadingAnimation;
