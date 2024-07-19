import React, { useEffect, useState } from "react";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

import config from "../config.json";

const Nav = () => {
  const [t1, setT1] = useState<gsap.core.Timeline>();
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  useGSAP(() => {
    const timeline = gsap.timeline({ paused: true });
    timeline
      .to("#navWrapper", {
        bottom: "16px",
        ease: "power2.out",
        duration: 0.4,
      })
      .to(".mobileNavItem", {
        display: "block",
        opacity: 1,
        yPercent: -32,
        stagger: 0.3,
      })
      .to(
        "#mobileContactBtn",
        {
          display: "inline-flex",
          opacity: 1,
          duration: 0.2,
        },
        "<0.2"
      );
    setT1(timeline);
  }, []);

  useEffect(() => {
    if (t1) {
      toggleMobileNav ? t1.play() : t1.reverse();
    }
  }, [toggleMobileNav, t1]);

  return (
    <div
      className="fixed top-4 left-4 right-4 rounded-2xl px-8 max-md:px-4 py-4 mx-4 z-50 bg-secondary"
      id="navWrapper"
    >
      <nav className="grid grid-cols-3 place-items-center max-md:hidden">
        <div className="flex w-full justify-start gap-4">
          {config.pages.map((page) => (
            <a href={page.url} key={page.url} className="link link-hover">
              {page.name}
            </a>
          ))}
        </div>
        <a href="/" className="text-2xl text-primary font-extrabold">
          {config.businessName}
        </a>
        <div className="flex justify-end w-full">
          <a href="/#contact" className="btn btn-primary rounded-2xl">
            Contact Us Today
          </a>
        </div>
      </nav>
      <nav className="md:hidden flex w-full justify-between items-center">
        <a href="/" className="text-xl text-primary font-extrabold ml-4">
          {config.businessName}
        </a>
        <button
          className="btn btn-primary rounded-2xl btn-sm"
          onClick={() => setToggleMobileNav(!toggleMobileNav)}
        >
          {toggleMobileNav ? "X" : "Menu"}
        </button>
      </nav>
      <div className="flex flex-col ml-4 h-full gap-1 relative">
        <div className="absolute top-16 flex flex-col gap-2">
          {config.pages.map((page: any) => (
            <a
              key={page.name}
              href={page.url}
              className="mobileNavItem text-4xl hidden opacity-0"
            >
              {page.name}
            </a>
          ))}
        </div>
        <a
          id="mobileContactBtn"
          href="/#contact"
          className="btn opacity-0 hidden absolute bottom-16 btn-primary w-fit"
        >
          Contact us today
        </a>
      </div>
    </div>
  );
};

export default Nav;
