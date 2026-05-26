import React from "react";

function Ecg(){
    return(
        <>
            <div
            style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='60'><polyline points='0,30 20,30 30,10 40,50 50,30 70,30 80,15 90,45 100,30 120,30 130,10 140,50 150,30 170,30 180,15 190,45 200,30 220,30 230,10 240,50 250,30 270,30 280,15 290,45 300,30' fill='none' stroke='%231565c0' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/></svg>")`,
                backgroundRepeat: "repeat-x",
                backgroundPosition: "0 50%",
                backgroundSize: "300px 100%",
            }}
                className="relative w-full h-16 bg-repeat-x bg-center shadow-md animate-move-ecg mt-24 sm:mt-48"
            />
        </>
    )
}
export default Ecg;