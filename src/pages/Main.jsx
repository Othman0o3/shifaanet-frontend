import React from "react";
import Hero from "../components/Hero";
import Ecg from "../components/ecg";
import backimg from"../assets/Minback.webp"
function Main() {
  return (
    <div className="relative mx-auto max-w-full px-4 py-12 h-[100%]">
              <div
                className="absolute inset-0 bg-cover bg-center bg-fixed h-[100%]"
                style={{
                    backgroundImage: `url(${backimg})`,
                    filter: 'brightness(1) blur(0.5px)',
                }}
            ></div>
        {/*<img decoding="async" src={backimg} className="absolute z-0 opacity-50 w-auto h-auto"/>*/}
        <Hero/>
        <Ecg/>
    </div>
  );
}

export default Main;