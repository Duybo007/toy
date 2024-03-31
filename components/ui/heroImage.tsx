import React, { useEffect, useState } from "react";

function HeroImage({ src, bg }: any) {
  const [imgLoaded, setImgLoaded] = useState(false);

  const waitForHalfSecond = () => {
    setTimeout(() => {
      setImgLoaded(true);
    }, 1800);
  };

  useEffect(() => {
    waitForHalfSecond();
  }, []);

  //   useEffect(() => {
  //     const img = new Image();
  //     img.onload = () => setImgLoaded(true);
  //     img.src = src;
  //   }, [src]);

  return (
    <div
      id="img"
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className={`h-full w-[31.5%] bg-white z-20 opacity-0 translate-y-10 bg-center bg-cover`}
    >
      {imgLoaded && (
        <img
          style={{
            display: imgLoaded ? "inline" : "none",
          }}
          src={src}
          alt=""
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
}

export default HeroImage;
