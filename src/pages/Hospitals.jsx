import React ,{useEffect,useState} from "react";
import Card from "../components/HLVcards";
import hos from "../assets/hospitals.webp"
import Hosp from "../assets/hospital_tra.png"
import axiosInstance from '../api/axiosInstance';
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function Hospitals(){
    const [hospitals,sethospitals] = useState([]);

        useEffect(() => {
            axiosInstance.get("/hospitals/")
            .then((response) => sethospitals(response.data))
            .catch((err) => console.error(err));
        },[]);

        useEffect(() => {
            toast.info("اضغط على اسم المشفى للمزيد من البيانات", {
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
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url(${hos})`,
                    filter: 'brightness(1) blur(0.7px)',
                }}
            ></div>
            {/**  <img decoding="async" alt="Background" src={hos} className="absolute opacity-20 z-0 h-full w-full" />*/}
            <div className="p-[16px] flex flex-row flex-wrap self-start justify-around  gap-[95px] transition-transform ease-linear duration-200 relative hover:translate-y-3 hover:shadow-md">
                    {hospitals.map((hospital) => (
                        <Card
                            key={hospital.id}
                            id={hospital.id}
                            name={hospital.name}
                            city={hospital.city}
                            location={hospital.location}
                            image={hospitals.Image || Hosp}
                            Ilink={`/hospital/${hospital.id}`}

                        />
                    ))}
            </div>
                <ToastContainer style={{ zIndex: 999999 }} />

        </div>
    )
}
export default Hospitals;