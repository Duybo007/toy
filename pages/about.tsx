import Link from "next/link";
import React from "react";
import { FaLinkedin, FaLightbulb } from "react-icons/fa";
import { DiResponsive } from "react-icons/di";
import { GiBullseye } from "react-icons/gi";
import { MdOutlineAnalytics } from "react-icons/md";

function About() {
  return (
    <div className="h-screen flex flex-col ml-14">
      <div className="relative w-full p-10 rounded-md bg-[url('/assets/hero/buzz.jpg')] bg-bottom bg-no-repeat mt-20">
        <div className="uppercase text-8xl font-bold z-20 relative ml-[-7px]">
          <span className="text-red">hello</span> I&apos;m Duy
        </div>
        <div className="flex items-center gap-2 mt-5 mb-5 z-20 relative">
          <div className="h-2 w-20 bg-red" />
          <div className="text-red text-xl font-semibold">Welcome to E-commerce Toyz</div>
        </div>
        <div className="w-3/4 text-xl leading-9 mb-10 z-20 relative font-semibold">
          At Toyz, I&apos;m passionate about creating innovative solutions that
          streamline the e-commerce experience. My platform is built on the
          latest technologies to provide you with a seamless and efficient way
          to showcase and manage your products. Using Next.js, Tailwind CSS, and
          a headless CMS Sanity, I&apos;ve crafted a dynamic and responsive
          website that adapts to your needs. Whether you&apos;re browsing on a
          desktop, tablet, or smartphone, your shopping experience remains
          smooth and enjoyable. But what sets me apart? <span className="text-yellow">I believe in empowering
          my customers with options.</span> That&apos;s why my platform allows you to
          sort products based on price, category, availability, and best seller
          status. Thanks to my integration with Sanity, every order placed is
          automatically tracked, allowing me to determine the most popular
          products in real-time.
        </div>
        <Link
          href="https://www.linkedin.com/in/duy-ngo-front-end/"
          target="_blank"
          className="w-fit flex z-20 relative"
        >
          <FaLinkedin className="w-20 h-20" />
        </Link>
        <div className="absolute w-full h-full bg-[#121212]/70 z-10 top-0 left-0" />
      </div>
      <div>
        <div className="uppercase mt-20 text-3xl font-bold">
          Here&apos;s what makes my project so cool
        </div>
        <div className="mt-10 flex gap-10">
          <div className="bg-white font-bold text-dark flex flex-col justify-center items-center text-center w-56 py-5 px-4 gap-3 rounded-tl-[60px] hover:scale-125 transition-all ease-in">
            <FaLightbulb className="w-14 h-14" />
            <div className="font-bold text-2xl">Cutting-edge technology</div>
            <div className="text-lg">
              I leverage the latest tech stacks to deliver a top-notch
              experience
            </div>
          </div>
          <div className="bg-white font-bold text-dark flex flex-col justify-center items-center text-center w-56 py-5 px-4 gap-3 hover:scale-125 transition-all ease-in">
            <DiResponsive className="w-14 h-14" />
            <div className="font-bold text-2xl">Responsive design</div>
            <div className="text-lg">
              My website is fully responsive, ensuring a seamless experience
              across all devices
            </div>
          </div>
          <div className="bg-white font-bold text-dark flex flex-col justify-center items-center text-center w-56 py-5 px-4 gap-3 hover:scale-125 transition-all ease-in">
            <GiBullseye className="w-14 h-14" />
            <div className="font-bold text-2xl">Powerful sorting options</div>
            <div className="text-lg">
              Sort products based on price, category, availability, and best
              seller status
            </div>
          </div>
          <div className="bg-white font-bold text-dark flex flex-col justify-center items-center text-center w-56 py-5 px-4 gap-3 rounded-br-[60px] hover:scale-125 transition-all ease-in">
            <MdOutlineAnalytics className="w-14 h-14" />
            <div className="font-bold text-2xl">Real-time analytics</div>
            <div className="text-lg">
              Track the popularity of products in real-time, thanks to my
              integration with Sanity
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
