import Image from "next/image";
import Link from "next/link";
import React from "react";

function NotFound() {
  return (
    <div className="h-[80vh] flex justify-center items-center">
      <div className="flex flex-col items-center">
        <div className="relative w-96 h-96">
          <Image src="/assets/hero/spyx.png" fill alt="spyx" />
        </div>
        <div className="flex flex-col gap-6 items-center">
          <div className="uppercase font-bold text-5xl">page not found</div>
          <div className="text-2xl">The page you are looking for does not seem to exist</div>
          <Link href="/" className="py-3 px-4 rounded-md bg-red text-2xl mt-10">Go to Home</Link>
        </div>
      </div>
    </div>
  );
}

export default NotFound;
