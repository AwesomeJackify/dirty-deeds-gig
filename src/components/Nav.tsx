import React from "react";
import config from "../config.json";

const Nav = () => {
  const pages = [
    {
      name: "Home",
      url: "/",
    },
    {
      name: "Services",
      url: "/services",
    },
  ];

  return (
    <nav className="grid grid-cols-3 place-items-center bg-secondary fixed top-4 left-4 right-4 rounded-full px-8 py-4">
      <div className="flex w-full justify-start gap-2">
        {pages.map((page) => (
          <a href={page.url} key={page.url} className="link link-hover">
            {page.name}
          </a>
        ))}
      </div>
      <a href="/" className="text-2xl text-primary font-extrabold">
        {config.businessName}
      </a>
      <div className="flex justify-end w-full">
        <a href="/#contact" className="btn btn-primary rounded-full">
          Contact Us Today
        </a>
      </div>
    </nav>
  );
};

export default Nav;
