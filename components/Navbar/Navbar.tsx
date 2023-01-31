import Link from "next/link";
import logo from "../../images/zine1.png";
import hamburger from "../../images/hamburger.svg";
import Image,{StaticImageData} from "next/image";
import React, { useEffect, useState } from "react";
import home from "../../images/home-icon.webp";
import about from "../../images/about.webp";
import Project from "../../images/project-icon.webp";
import Team from "../../images/team-icon.webp";
import Alumni from "../../images/graduation.ico";
import Achievements from "../../images/badge-icon.webp";
import { Blogs } from "../Blogs";

const Navbar = () => {
  const [Hide, setHide] = useState(false);
  const [scroll, setscroll] = useState(false);
  let scrollpos = 0;

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => {
      window.removeEventListener("scroll", listenToScroll);
    };
  }, []);

  const listenToScroll = () => {
    const currentScrollPos = document.documentElement.scrollTop;
    const visible = scrollpos < currentScrollPos && scrollpos > 30;
    scrollpos = currentScrollPos;
    setscroll(visible);
  };

  interface nav_detail {
    text: string;
    image: StaticImageData;
    link: string;
  }

  const data3: nav_detail[] = [
    {
      text: "Home",
      image: home,
      link: "/"
    },
    {
      text: "Team",
      image: Team,
      link: "/team/"
    },
    {
      text: "Alumni",
      image: Alumni,
      link: "/alumni/"
    },
    {
      text: "Projects",
      image: Project,
      link: "/projects/"
    },
    {
      text: "Achievements",
      image: Achievements,
      link: "/achievements/"
    },
    {
      text: "Gallery",
      image: about,
      link: "/gallery/"
    },
  ];

  function Nav_Out() {

    const LinkClick = (e: React.MouseEvent) => {
      setHide(true);
      e.preventDefault();
    }

    return (
      <>
        <div className="z-30 top-0 flex fixed w-full h-full animate-navbar">
          <div
            className="z-20 bg-cover opacity-50 w-full h-full transparent"
            onClick={() => {
              setHide(false);
            }}
          ></div>
          <div className="top-0 right-0 w-auto bg-gray-800 fixed h-full overflow-auto z-30 shadow-nav_custom">
            <div className="py-6 px-20">
              {/* <button className="text-white py-2 px-6 font-nunito text-xl font-bold">
                <h1>&times;</h1>
              </button> */}
            </div>
            <div>
              {data3.map((item, index) => (
                <div key={index}>
                  <Link href={item.link}>
                    <h1 className="text-white text-xl px-20 py-2 font-nunito">
                      <Image src={item.image} width="16" height="16"></Image>
                      <span className="pl-2">{item.link === location.pathname ? <a href={item.link} onClick={LinkClick}>{item.text}</a> : <a href={item.link}>{item.text}</a>}</span>
                    </h1>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div
        className={`sticky top-0 bg-black pt-4 h-16 z-10 overflow-hidden ${scroll ? "hiddenNav" : "activeNav"
          }`}
      >
        <div className="mx-12 lg:mx-24 grid grid-cols-12 text-white text-xl xl:text-2xl">
          <div className="col-span-1">
            <div className="w-20 h-20 cursor-pointer">
              <Link href="/"><Image src={logo} /></Link>
            </div>
          </div>
          <div className="col-span-5"></div>
          <div className="col-span-6">
            <div className="flex text-xl justify-between">
              <Link href="/"><div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                <div className="link">
                  Home
                </div>
              </div></Link>
              <div className="px-1 hidden lg:inline-block">|</div>
              <Link href="/team"><div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                <div className="link ">
                  Team
                </div></div></Link>
                <div className="px-1 hidden lg:inline-block">|</div>
              <Link href="/alumni"><div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                <div className="link ">
                  Alumni
                </div></div></Link>
                <div className="px-1 hidden lg:inline-block">|</div>
              <Link href="/projects"><div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                <div className="link ">
                  Projects
                </div></div></Link>
                <div className="px-1 hidden lg:inline-block">|</div>
              <Link href="/achievements"><div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                <div className="link ">
                  Achievements
                </div></div></Link>
                <div className="px-1 hidden lg:inline-block">|</div>
              {/* <Link href="/blogs"><div className="mb-2 cursor-pointer hidden lg:inline-block">
          <div className="link ">
            Blogs
          </div></div></Link> */}
              <Link href="/gallery"><div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                <div className="link ">
                  Gallery
                </div></div></Link>
            </div>
            <div className="w-9 h-8 inline-block lg:hidden absolute right-8 mb-8">
              <Image
                src={hamburger}
                onClick={() => {
                  setHide(true);
                }}
              />
            </div>
          </div>
        </div>
      </div>
      {Hide ? <Nav_Out /> : null}
    </>
  );
};

export default Navbar;