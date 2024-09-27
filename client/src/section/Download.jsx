import { Element } from "react-scroll";
import { links } from "../constants/index.jsx";
import { Marker } from "../components/Marker.jsx";
import { useMediaQuery } from '@mui/material'; // Import useMediaQuery for responsive design

const Download = () => {
  // Media queries for responsive design
  const isExtraSmall = useMediaQuery('(max-width:600px)');  // Phones and below
  const isSmall = useMediaQuery('(max-width:768px)');       // Portrait tablets, large phones
  const isMobileOrTablet = isSmall || isExtraSmall;

  return (
    <section>
      <Element
        name="download"
        className={`g7 relative pb-32 pt-24 ${isMobileOrTablet ? 'pb-24 py-16' : ''}`}
      >
        <div className="container">
          <div className={`flex ${isMobileOrTablet ? 'flex-col items-center' : 'items-center'}`}>
            <div className={`relative mr-6 flex-540 ${isMobileOrTablet ? 'max-lg:flex-100' : 'max-xl:flex-280 max-lg:flex-256'}`}>
              <div className="mb-10">
                <img
                  src="/favicon.ico"
                  width={120}
                  height={55}
                  alt="xora"
                />
              </div>

              <p className={`body-1 mb-10 max-w-md ${isMobileOrTablet ? 'text-center' : ''}`}>
                Try it now for free on iOS, Android, PC, Web - whatever your flavor, we've got you covered.
              </p>

              <ul className={`flex flex-wrap mb-4 items-center gap-6 ${isMobileOrTablet ? 'justify-center' : ''}`}>
                {links.map(({ id, url, icon }) => (
                  <li
                    key={id}
                    className="download_tech-link download_tech-link_last-before download_tech-link_last-after"
                  >
                    <a
                      href={url}
                      className="size-22 download_tech-icon_before relative flex items-center justify-center rounded-half border-2 border-s3 bg-s1 transition-borderColor duration-500"
                    >
                      <span className="absolute -top-2 rotate-90">
                        <Marker />
                      </span>
                      <img
                        src={"/images/lines.svg"}
                        alt="lines"
                        className="absolute size-13/20 object-contain"
                      />
                      <span className="download_tech-icon">{icon}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {!isMobileOrTablet && (
              <div className="mb-10 max-md:hidden">
                <div className="download_preview-before download_preview-after rounded-40 relative w-[955px] border-2 border-s5 p-6">
                  <div className="relative rounded-3xl bg-s1 px-6 pb-6 pt-14">
                    <span className="download_preview-dot left-6 bg-p2" />
                    <span className="download_preview-dot left-11 bg-s3" />
                    <span className="download_preview-dot left-16 bg-p1/15" />

                    <img
                      src="/images/ss.png"
                      width={855}
                      height={655}
                      alt="screen"
                      className="rounded-xl"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* For mobile view: Add a preview image */}
          {isMobileOrTablet && (
            <div className="mb-10 w-full">
              <div className="download_preview-before download_preview-after rounded-40 relative w-full border-2 border-s5 p-6">
                <div className="relative rounded-3xl bg-s1 px-6 pb-6 pt-14">
                  <img
                    src="/images/ss.png"
                    width={300} // Adjust width for mobile
                    height={200} // Adjust height for mobile
                    alt="screen"
                    className="rounded-xl w-full h-auto"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </Element>
    </section>
  );
};

export default Download;
