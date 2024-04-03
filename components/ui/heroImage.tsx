import Image from "next/image";
import React, { useEffect, useState } from "react";

function HeroImage({ src, bg }: any) {


  return (
    <div
      id="img"
      style={{
        backgroundImage: `url(${bg})`,
      }}
      className={`h-full w-[31.5%] bg-white z-20 opacity-0 translate-y-10 bg-center bg-cover`}
    >
      <Image
        src={src}
        sizes="(max-width: 447px) 100vw"
        alt={src}
        fill
        className="w-full h-full object-cover"
      />
    </div>
  );
}

export default HeroImage;
