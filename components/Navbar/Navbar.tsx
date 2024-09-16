import Link from "next/link";
import logo from "../../images/zine1.png";
import hamburger from "../../images/hamburger.svg";
import Image, {
  StaticImageData,
} from "next/image";
import React, {
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import home from "../../images/home-icon.webp";
import about from "../../images/about.webp";
import Project from "../../images/project-icon.webp";
import Team from "../../images/team-icon.webp";
import Alumni from "../../images/graduation.ico";
import Achievements from "../../images/badge-icon.webp";
import Blogs from "../../images/blogs-icon.png";
import Workshops from "../../images/workshops-icon.png"

const Navbar = () => {
  const [Hide, setHide] = useState(false);
  const [scroll, setscroll] = useState(false);
  const router = useRouter();
  let scrollpos = 0;

  useEffect(() => {
    window.addEventListener(
      "scroll",
      listenToScroll
    );
    return () => {
      window.removeEventListener(
        "scroll",
        listenToScroll
      );
    };
  }, []);

  const listenToScroll = () => {
    const currentScrollPos =
      document.documentElement.scrollTop;
    const visible =
      scrollpos < currentScrollPos &&
      scrollpos > 30;
    scrollpos = currentScrollPos;
    setscroll(visible);
  };

  interface INavData {
    text: string;
    image: StaticImageData;
    link: string;
  }

  const navList: INavData[] = [
    {
      text: "Home",
      image: home,
      link: "/",
    },
    {
      text: "Team",
      image: Team,
      link: "/team",
    },
    {
      text: "Alumni",
      image: Alumni,
      link: "/alumni",
    },
    {
      text: "Projects",
      image: Project,
      link: "/projects",
    },
    {
      text: "Achievements",
      image: Achievements,
      link: "/achievements",
    },
    {
      text: "Workshops",
      image: Workshops,
      link: "/workshops/"
    },
    {
      text: "Blogs",
      image: Blogs,
      link: "/blogs/",
    },
    {
      text: "Gallery",
      image: about,
      link: "/gallery/",
    },
    // {
    //   text: "Login",
    //   image: about,
    //   link: "/login/"
    // }
  ];

  function Nav_Out() {
    const LinkClick = (e: React.MouseEvent) => {
      setHide(false);
      document.body.style.overflow = "auto";
      e.preventDefault();
    };

    return (
      <div className="lg:hidden font-poppins">
        <div
          className={`bg-black z-30 w-full absolute h-full overflow-hidden duration-1000 ease-in-out transition-all`}
        >
          <div className="mt-8">
            {navList.map((item, index) => (
              <div key={index}>
                <Link href={item.link}>
                  <h1 className="text-white w-auto px-24 text-xl py-3 flex items-center">
                    <Image
                      src={item.image}
                      alt="zine-logo"
                      width="24"
                      height="24"
                    />
                    {item.link ===
                    router.pathname ? (
                      <a
                        className="ml-3 font-extrabold text-xl"
                        href={item.link}
                        onClick={LinkClick}
                      >
                        {item.text}
                      </a>
                    ) : (
                      <a
                        className="ml-3"
                        href={item.link}
                      >
                        {item.text}
                      </a>
                    )}
                  </h1>
                </Link>
              </div>
            ))}

            <Link href="/login">
              <div className="group flex gap-2 mx-24 mt-16 justify-center items-center bg-black text-white text-sm px-4 py-2 cursor-pointer border border-white hover:bg-white hover:text-black hover:border-black transition-colors">
                LOGIN
                <svg
                  className="text-white stroke-white group-hover:text-black group-hover:stroke-black"
                  width="13"
                  height="13"
                  viewBox="0 0 13 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    id="Vector"
                    d="M1.65685 0.656867V2.65091L9.55524 2.65798L0.949747 11.2635L2.36396 12.6777L10.9695 4.07219L10.9765 11.9706H12.9706V0.656867H1.65685Z"
                    fill="currentColor"
                  />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (!Hide)
      document.body.style.overflow = "auto";
  }, []);

  return (
    <>
      <div
        className={`sticky top-0 bg-black h-18 md:h-24 z-10  ${
          scroll ? "hiddenNav" : "activeNav"
        }`}
      >
        <div className="mx-6 md:mx-12 lg:mx-16 flex justify-between items-center text-white">
          <div className="cursor-pointer">
            <Link href="/">
              <div className="h-14 w-18 mt-1 md:h-24 md:w-32 relative">
                <Image layout="fill" src={logo} />
              </div>
            </Link>
          </div>
          <div>
            <div className="flex text-xl justify-between gap-4">
              <Link href="/">
                <div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                  <div className="link">HOME</div>
                </div>
              </Link>
              <div className="mb-2 hidden lg:inline-block hover:text-gray-300 dropdown h-full">
                <div className="link hover:text-gray-300">
                  TEAM
                </div>
                <div className="hidden dropdown-content cursor-pointer bg-black z-50 p-3 -ml-3">
                  <Link href="/team">
                    <div className="hover:text-gray-300">
                      TEAM
                    </div>
                  </Link>
                  <Link href="/alumni">
                    <div className="hover:text-gray-300">
                      ALUMNI
                    </div>
                  </Link>
                </div>
              </div>

              <Link href="/projects">
                <div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                  <div className="link ">
                    PROJECTS
                  </div>
                </div>
              </Link>
              <Link href="/achievements">
                <div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                  <div className="link ">
                    ACHIEVEMENTS
                  </div>
                </div>
              </Link>
              <Link href="/blogs">
                <div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                  <div className="link ">
                    BLOGS
                  </div>
                </div>
              </Link>
              <Link href="/workshops">
                <div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                  <div className="link ">WORKSHOPS</div>
                </div>
              </Link>
              <Link href="/gallery">
                <div className="mb-2 cursor-pointer hidden lg:inline-block hover:text-gray-300">
                  <div className="link ">
                    GALLERY
                  </div>
                </div>
              </Link>

              <Link href="/login">
                <div className="group lg:flex gap-2 ml-8 items-center bg-black text-white text-sm px-4 py-2 -mt-2 cursor-pointer border border-white hover:bg-white hover:text-black hover:border-black transition-colors hidden">
                  LOGIN
                  <svg
                    className="text-white stroke-white group-hover:text-black group-hover:stroke-black"
                    width="13"
                    height="13"
                    viewBox="0 0 13 13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      id="Vector"
                      d="M1.65685 0.656867V2.65091L9.55524 2.65798L0.949747 11.2635L2.36396 12.6777L10.9695 4.07219L10.9765 11.9706H12.9706V0.656867H1.65685Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
              </Link>
            </div>

            <div className="w-9 h-8 z-40 inline-block mt-3 lg:hidden">
              <Image
                src={hamburger}
                onClick={() => {
                  setHide(!Hide);
                  document.body.style.overflow =
                    Hide ? "auto" : "hidden";
                }}
              />
            </div>
          </div>
        </div>
        {/* <div className="bg-white text-xl w-full text-center font-poppins">
          <Link href="/aptitudeForm">
            Registrations are open
          </Link>
        </div> */}
      </div>

      {Hide ? <Nav_Out /> : ""}
    </>
  );
};

export default Navbar;
