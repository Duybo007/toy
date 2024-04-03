import Image from "next/image";
import React, { useState } from "react";

function ImagesDisplay({ images }: any) {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  return (
    <div>
      <div className="w-[710px] h-[28rem] relative">
        <Image
          fill
          src={selectedImg}
          alt="feagure images"
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pt-6 flex justify-between">
        {images.map((img: any) => (
          <div
            key={img}
            onClick={() => setSelectedImg(img)}
            className={`h-56 w-56 relative ${
              selectedImg === img && " border-4 border-yellow"
            }`}
          >
            <Image
              fill
              src={img}
              className="object-cover h-full w-full"
              alt="feagure images"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesDisplay;
