import { monthlyPromo } from "@/constants";
import React, { useState } from "react";

function ImagesDisplay({images} : any) {
  const [selectedImg, setSelectedImg] = useState(images[0]);
  return (
    <div>
      <div className="w-full h-[28rem]">
        <img
          src={selectedImg}
          alt=""
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="pt-6 flex justify-between">
        {images.map((img: any) => (
          <div
            key={img}
            onClick={() => setSelectedImg(img)}
            className={`h-56 w-56 ${
              selectedImg === img && " border-4 border-yellow"
            }`}
          >
            <img src={img} className="object-cover h-full w-full" alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ImagesDisplay;
