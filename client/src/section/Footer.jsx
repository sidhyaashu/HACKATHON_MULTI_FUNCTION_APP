import { socials } from "../constants/index.jsx";
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery for responsive design

const Footer = () => {
  // Media queries for responsive design
  const isExtraSmall = useMediaQuery('(max-width:600px)');  // Phones and below
  const isSmall = useMediaQuery('(max-width:768px)');       // Portrait tablets, large phones
  const isMobileOrTablet = isSmall || isExtraSmall;

  return (
    <footer className="bg-blue-950">
      <div className="container  py-10">
        <div className={`flex w-full ${isMobileOrTablet ? 'flex-col items-center' : 'max-md:flex-col'}`}>
          <div className={`small-compact flex flex-1 flex-wrap items-center justify-center gap-5 ${isMobileOrTablet ? 'mb-5' : ''}`}>
            <p className="opacity-70 text-center">Copyright, Team ZERO</p>
          </div>
          <div className={`flex items-center justify-center sm:ml-auto ${isMobileOrTablet ? 'mb-5' : ''}`}>
            <p className="legal-after relative mr-9 text-p5 transition-all duration-500 hover:text-p1 text-center">
              Privacy Policy
            </p>
            <p className="text-p5 transition-all duration-500 hover:text-p1 text-center">
              Terms of Use
            </p>
          </div>

          <ul className={`flex flex-1 justify-center gap-3 ${isMobileOrTablet ? 'flex-wrap' : 'max-md:mt-10 md:justify-end'}`}>
            {socials.map(({ id, url, icon, title }) => (
              <li key={id}>
                <a href={url} className="social-icon" target="_blank" rel="noopener noreferrer">
                  <img
                    src={icon}
                    alt={title}
                    className="size-1/3 object-contain"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
