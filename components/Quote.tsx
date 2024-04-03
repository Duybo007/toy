import Image from "next/image";
import React from "react";

function Quote() {
  return (
    <section className="w-screen overflow-hidden">
      <div className="max-w-[1420px] h-full flex flex-col px-6 2xl:px-0 uppercase">
        <div className="w-full h-[550px] relative">
          <Image
            fill
            src="/assets/hero/batman.webp"
            alt="batman suits"
            className="object-cover object-center h-full w-full"
            loading="lazy"
          />
        </div>
        <div className="text-center text-3xl md:text-5xl leading-relaxed pt-16">
          playing with action figures is not about escaping reality. it&apos;s
          about creating a new reality where anything is possible
        </div>
        <div className="text-center text-2xl md:text-3xl pt-14">
          j.k. rowling (brishish author, creator of the happy potter series)
        </div>
      </div>
    </section>
  );
}

export default Quote;
