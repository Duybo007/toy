import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useState, useEffect} from "react";
import { navLists } from "@/constants";
import Link from "next/link";
import { useRouter } from "next/router";

gsap.registerPlugin(ScrollTrigger);

function Navbar() {
  const [route, setRoute] = useState("")

  const router = useRouter();
  
  useEffect(() => {
    setRoute(router.pathname);
  }, [router])
  
  useGSAP(() => {
    gsap.to("#navbar", {
      top: "10",
      duration: 2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#navbar",
        start: "top +=600",
        scrub: true,
      },
    });

    gsap.to("#nav-content", {
      width: "100%",
      duration: 2,
      opacity: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: "#nav-content",
        start: "top +=600",
        scrub: true,
      },
    });
  });
  return (
    <div
      id="navbar"
      className={`fixed w-full max-w-[1420px] mx-auto top-[70%] flex justify-center z-30`}
    >
      <div
        id="nav-content"
        className={`hidden md:flex bg-white  text-blue p-6 gap-8 rounded-full border-[6px] text-xl border-blue font-bold items-center justify-center transition-all`}
      >
        {navLists.map((nav: any) => (
          <Link
            href={nav.path}
            key={nav.name}
            className={`nav-link cursor-pointer uppercase hover:bg-dark hover:text-white ${
              route === nav.path && "bg-dark text-white"
            }`}
          >
            {nav.name}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
