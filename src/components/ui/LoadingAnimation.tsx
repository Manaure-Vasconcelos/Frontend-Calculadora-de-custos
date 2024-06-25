// components/LoadingAnimation.js
import React from 'react';
import Lottie from 'react-lottie';
import animationData from '@/public/loading-dots.json';

interface Props {
  height: number;
  width: number;
}

const LoadingAnimation = ({ height, width }: Props) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return <Lottie options={defaultOptions} height={height} width={width} />;
};

export default LoadingAnimation;
