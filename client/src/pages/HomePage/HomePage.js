import "flowbite";
import HeroSection from "./HeroSection";
import Feature from "./Feature";
import Divider from "./Divider";
import Testimonials from "./Testimonials";
import { FaArrowCircleDown } from "react-icons/fa";
import HeroImage from "./HeroImage";

const HomePage = () => {
  return (
    <div className="HomePage w-screen">
      <div className="flex lg:flex-row h-screen flex-col">
        <div className="hero-scrollable flex flex-col basis-1/2 overflow-y-scroll overflow-x-auto max-lg:basis-[100%]">
          <HeroSection />
          <Divider />
          <Feature />
          <Divider />
          <Testimonials />
          <div className="fixed hero-arrow w-screen bottom-2 left-1/4 -translate-x-1/2 max-lg:left-1/2">
            <FaArrowCircleDown className="w-full h-[30px] animate-bounce text-primary-900" />
          </div>
        </div>
        <div className=" border-2 00 hero-map w-full basis-1/2 max-lg:hidden m-3 rounded-lg overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src="https://api.mapbox.com/styles/v1/sheharyaar/clt2p0jsj007p01p84m74dxox.html?title=false&access_token=pk.eyJ1Ijoic2hlaGFyeWFhciIsImEiOiJjbG9weTEzNmgwZTZvMmpwZWQzNm1wa2tvIn0.dVcL2IDNZ5C3z00n8uJwmA&zoomwheel=false#15/35.38013/139.26861/224.9/72"
            title="Japan"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
