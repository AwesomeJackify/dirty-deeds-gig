import React, { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import config from "../config.json";

const Nav = () => {
  const [t1, setT1] = useState<gsap.core.Timeline>();
  const [toggleMobileNav, setToggleMobileNav] = useState(false);

  const navWrapperRef = useRef(null);
  const mobileNavItemsRef = useRef<Array<HTMLAnchorElement | null>>([]);
  const mobileContactBtnRef = useRef(null);

  useEffect(() => {
    const timeline = gsap.timeline({ paused: true });
    timeline
      .to("#mobileNavWrapper", {
        display: "flex",
        duration: 0,
      })
      .to("#mobileNavItemsWrapper", {
        paddingTop: "48px",
        height: "80dvh",
      })
      .to(navWrapperRef.current, {
        ease: "power2.out",
        duration: 0.4,
      })
      .to(
        mobileNavItemsRef.current,
        {
          opacity: 1,
          yPercent: -32,
          stagger: 0.3,
        },
        0
      )
      .to(
        mobileContactBtnRef.current,
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
      ref={navWrapperRef}
    >
      <nav className="grid grid-cols-3 place-items-center max-md:hidden">
        <div className="flex w-full justify-start gap-4">
          {config.pages.map((page) => (
            <a href={page.url} key={page.url} className="link link-hover">
              {page.name}
            </a>
          ))}
        </div>
        <a
          href="/"
          className="btn btn-ghost text-4xl text-primary font-extrabold"
        >
          {config.businessName}
        </a>
        <div className="flex justify-end w-full">
          <a href="/#contact" className="btn btn-primary rounded-2xl">
            Contact Us Today
          </a>
        </div>
      </nav>
      <nav className="md:hidden flex flex-col">
        <div className="flex w-full justify-between items-center">
          <a href="/" className="text-xl text-primary font-extrabold ml-4">
            {config.businessName}
          </a>
          <button
            className="btn btn-primary rounded-2xl btn-sm"
            onClick={() => setToggleMobileNav(!toggleMobileNav)}
          >
            {toggleMobileNav ? "X" : "Menu"}
          </button>
        </div>
        <div
          className="flex-col ml-4 h-full gap-1 relative hidden"
          id="mobileNavWrapper"
        >
          <div id="mobileNavItemsWrapper" className="flex flex-col gap-2 h-0">
            {config.pages.map((page, index) => (
              <a
                key={page.name}
                href={page.url}
                className="opacity-0 mobileNavItem text-4xl"
                ref={(el) => (mobileNavItemsRef.current[index] = el)}
              >
                {page.name}
              </a>
            ))}
          </div>
          <a
            id="mobileContactBtn"
            href="/#contact"
            className="btn opacity-0 hidden absolute bottom-16 btn-primary w-fit"
            ref={mobileContactBtnRef}
          >
            Contact us today
          </a>
        </div>
      </nav>
    </div>
  );
};

export default Nav;
