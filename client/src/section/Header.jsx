import { Link as LinkScroll } from "react-scroll";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useMediaQuery } from '@mui/material';

const Header = () => {
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Media query for mobile and tablet responsiveness
  const isExtraSmall = useMediaQuery('(max-width:600px)');  // Phones and below
  const isSmall = useMediaQuery('(max-width:768px)');       // Portrait tablets, large phones
  const isMobileOrTablet = isSmall || isExtraSmall;

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 32);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const NavLink = ({ title }) => (
    <LinkScroll
      onClick={() => setIsOpen(false)}
      to={title}
      offset={-100}
      spy
      smooth
      activeClass="nav-active"
      className="base-bold text-p4 uppercase transition-colors duration-500 cursor-pointer flex items-center gap-2"
    >
      {title}
    </LinkScroll>
  );

  return (
    <header
      className={clsx(
        "fixed top-0 left-0 z-50 w-full py-10 transition-all duration-500",
        hasScrolled && "py-2 bg-black-100 backdrop-blur-[8px] "
      )}
    >
      <div className="container  flex h-14 items-center justify-between">
        {/* Hide header logo when in mobile or tablet view */}
        {!isMobileOrTablet && (
          <a className={`lg:hidden flex-1 cursor-pointer z-2`}>
            <img src="/favicon.ico" width={115} height={55} alt="logo" />
          </a>
        )}

        <div
          className={clsx(
            "w-full max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:bg-s2 max-lg:opacity-0",
            isOpen ? "max-lg:opacity-100" : "max-lg:pointer-events-none"
          )}
        >
          <div className="max-lg:relative max-lg:flex max-lg:flex-col max-lg:min-h-screen max-lg:p-6">
            <nav className="max-lg:relative max-lg:z-2">
              <ul className={`flex ${isMobileOrTablet ? 'flex-col items-center' : 'flex-row'} max-lg:px-12`}>
                <li className="nav-li">
                  <NavLink title="features" />
                  <div className="dot" />
                </li>
                <li className="nav-logo">
                  {/* Hide logo on mobile or tablet view */}
                  {!isMobileOrTablet && (
                    <LinkScroll
                      to="hero"
                      offset={-250}
                      spy
                      smooth
                      className="max-lg:hidden transition-transform duration-500 cursor-pointer"
                    >
                      <img
                        src="./public/favicon.ico"
                        width={50}
                        height={35}
                        alt="logo"
                      />
                    </LinkScroll>
                  )}
                </li>
                <li className="nav-li">
                  <div className="dot" />
                  <NavLink title="download" />
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <button
          className={`lg:hidden z-2 border-2 border-s4/25 rounded-full flex justify-center items-center ${isMobileOrTablet ? 'p-2' : 'p-3'}`}
          onClick={() => setIsOpen((prevState) => !prevState)}
        >
          <img
            src={`/images/${isOpen ? "close" : "magic"}.svg`}
            alt="toggle"
            className={`size-1/2 object-contain ${isMobileOrTablet ? 'w-8 h-8' : 'w-10 h-10'}`}
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
