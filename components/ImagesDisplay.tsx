import Image from "next/image";
import React, { useState } from "react";

function ImagesDisplay({
  images,
  magnifierHeight = 300,
  magnifieWidth = 300,
  zoomLevel = 2,
}: any) {
  const [selectedImg, setSelectedImg] = useState(images[0]);

  const [[x, y], setXY] = useState([0, 0]);
  const [[imgWidth, imgHeight], setSize] = useState([0, 0]);
  const [showMagnifier, setShowMagnifier] = useState(false);
  return (
    <div>
      <div className="w-full xl:w-[710px] h-[28rem] relative">
        <Image
          fill
          src={selectedImg}
          alt="feagure images"
          loading="lazy"
          className="w-full h-full object-cover object-center"
          onMouseEnter={(e) => {
            // update image size and turn-on magnifier
            const elem = e.currentTarget;
            const { width, height } = elem.getBoundingClientRect();
            setSize([width, height]);
            setShowMagnifier(true);
          }}
          onMouseMove={(e) => {
            // update cursor position
            const elem = e.currentTarget;
            const { top, left } = elem.getBoundingClientRect();

            // calculate cursor position on the image
            const x = e.pageX - left - window.pageXOffset;
            const y = e.pageY - top - window.pageYOffset;
            setXY([x, y]);
          }}
          onMouseLeave={() => {
            // close magnifier
            setShowMagnifier(false);
          }}
        />
        <div
          className="bg-cover"
          style={{
            display: showMagnifier ? "" : "none",
            position: "absolute",

            // prevent magnifier blocks the mousemove event of img
            pointerEvents: "none",
            // set size of magnifier
            height: `${magnifierHeight}px`,
            width: `${magnifieWidth}px`,
            // move element center to cursor pos
            top: `${y - magnifierHeight / 2}px`,
            left: `${x - magnifieWidth / 2}px`,
            opacity: "1", // reduce opacity so you can verify position
            border: "1px solid lightgray",
            backgroundColor: "white",
            backgroundImage: `url('${selectedImg}')`,
            backgroundRepeat: "no-repeat",

            //calculate zoomed image size
            backgroundSize: `${imgWidth * zoomLevel}px ${
              imgHeight * zoomLevel
            }px`,

            //calculate position of zoomed image.
            backgroundPositionX: `${-x * zoomLevel + magnifieWidth / 2}px`,
            backgroundPositionY: `${-y * zoomLevel + magnifierHeight / 2}px`,
          }}
        ></div>
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
