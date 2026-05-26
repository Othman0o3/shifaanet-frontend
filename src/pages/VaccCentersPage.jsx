import axiosInstance from '../api/axiosInstance';
import { useState,useEffect } from "react";
import React from "react";
import Card from "../components/HLVcards";
import VCard from "../assets/vaccine_tran.png";
import Backimg from "../assets/Vacv.webp";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function VaccCentersPage(){
        const [Centers,setCenter] = useState([]);
    
            useEffect(() => {
                const token = localStorage.getItem("access");
                const headers = token ? { Authorization: `Bearer ${token}` } : {};
                axiosInstance.get("/vaccs", { headers })
                .then((res) => setCenter(res.data))
                .catch((err) => console.error(err));
            }, []);

            useEffect(() => {
                toast.info("اضغط على اسم المركز للمزيد من البيانات", {
                    position: "bottom-center",
                    autoClose: 4000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    theme: "light",
                    });
                }, []);

                return(
        <div className="relative bg-[#f0f6fa] w-full min-h-screen pt-24 px-4 mt-4 ">
                <div
                className="absolute w-max-[1000px] inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url(${Backimg})`,
                    filter: 'brightness(1) blur(0.5px)',
                }}
            ></div>
            {/*<img decoding="async" alt="Background" src={Backimg} className="absolute opacity-20 z-0 h-full w-full" />
            */}
                <div className="p-[16px] flex flex-row flex-wrap self-start justify-around  gap-[95px] transition-transform ease-linear duration-200 relative hover:translate-y-3 hover:shadow-md">
                    {Centers.length === 0 ? (
    <p className="text-center text-gray-600">No labs available or failed to load.</p>
    ) : (
        Centers.map((center) => (
            <Card
            key={center.id}
            id={center.id}
            name={center.name}
            city={center.city}
            location={center.location}
            image={center.image || VCard}
            Ilink={`/vacc-centers/${center.id}`}
            />
        ))
        )}
                </div>
        </div>
    )
}

export default VaccCentersPage;