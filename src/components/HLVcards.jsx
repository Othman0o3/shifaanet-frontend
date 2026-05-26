import React from "react";
import Hosp from "../assets/hospital_tra.png"
import PinIm from "../assets/Pinn.webp"
function Card({ id, name, city, location, phone, location_description,Ilink,image }) {
    return (
        <div dir="rtl"
        data-id={id} // hospital ID attached here
            className="w-[260px] sm:w-[245px] h-[120px] bg-[var(--card-bg)] shadow-md hover:translate-y-3 transition-transform duration-300 grid font-almarai "
            style={{
            gridTemplateRows: "40px 50px 30px",
            gridTemplateColumns: "122.5px 122.5px",
            gridTemplateAreas: `
                "name img"
                "distance img"
                "location img"
            `,
            }}
        >
        <a href={Ilink}>
        <h4
            className="text-right p-0.5 text-[var(--text)] text-lg pr-0.5 font-bold"
            style={{ gridArea: "name" }}
        >
            {name}
        </h4>
            </a>
        <img
            className="h-[100px] w-[100px]"
            alt={name}
            decoding="async"
            src={image}
            style={{ gridArea: "img" }}
        />
        
        <a
            href={location} target="noreferrer"
            className="triangle text-white border-0 no-underline bg-[#f15a24] hover:bg-[#d94e1f] transition-colors duration-300 font-almarai text-lg pr-0.5"
            style={{ gridArea: "location" }}
        >
            العنوان
        </a>

        <a
            href=" "
            className="flex items-center gap-1 text-sm text-[var(--text)] no-underline"
            style={{ gridArea: "distance" }}
        >
            <img src={PinIm} alt="Pin" className="w-5 h-5" />
            {city}
        </a>
    </div>
);
}

export default Card;