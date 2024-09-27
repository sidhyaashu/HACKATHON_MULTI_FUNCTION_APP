import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../components/Button.jsx";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from '@mui/material';

const Hero = () => {
  const navigate = useNavigate();
  
  const goto = () => {
    navigate("/home");
  };

  // Media queries for responsive design
  const isExtraSmall = useMediaQuery('(max-width:600px)');  // Phones and below
  const isSmall = useMediaQuery('(max-width:768px)');       // Portrait tablets, large phones
  const isMobileOrTablet = isSmall || isExtraSmall;

  return (
    <section className={`relative bg-blue-950 pt-60 pb-40 ${isMobileOrTablet ? 'pt-52 pb-36' : 'max-lg:pt-52 max-lg:pb-36'} max-md:pt-36 max-md:pb-32`}>
      <Element name="hero">
        <div className="container bg-blue-950">
          <div className={`relative z-2 ${isMobileOrTablet ? 'max-w-full' : 'max-w-512 max-lg:max-w-388'}`}>
            <div className="caption small-2 uppercase text-p3">
              ZERO TO ONE
            </div>
            <h1 className={`mb-6 h1 text-p4 uppercase ${isMobileOrTablet ? 'max-lg:mb-7 max-md:mb-4 max-md:text-3xl max-md:leading-10' : 'max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12'}`}>
              Amazingly simple
            </h1>
            <p className={`max-w-440 mb-14 body-1 ${isMobileOrTablet ? 'max-md:mb-10 text-sm' : 'max-md:mb-10'}`}>
              Capture website snapshots, generate random user data, and create QR code PDFs—all in one app!
            </p>
            <LinkScroll onClick={goto} to="features" offset={-100} spy smooth>
              <Button icon="/images/zap.svg" className="cursor-pointer">Try it now</Button>
            </LinkScroll>
          </div>

          <div className={`absolute ${isMobileOrTablet ? '-top-20 left-0' : '-top-32 left-[calc(50%-340px)]'} w-full pointer-events-none hero-img_res`}>
            <img
              src="/images/hero.png"
              className={`size-1230 ${isMobileOrTablet ? 'h-auto' : 'max-lg:h-auto'}`}
              alt="hero"
            />
          </div>
        </div>
      </Element>
    </section>
  );
};

export default Hero;
