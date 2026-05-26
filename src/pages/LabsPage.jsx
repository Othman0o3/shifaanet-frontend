import React ,{useEffect,useState} from "react";
import Card from "../components/HLVcards";
import Lab from "../assets/LLabs.webp"
import lab from "../assets/lab.png";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axiosInstance from '../api/axiosInstance';

function Labd(){
    const [Labs,setLabs] = useState([]);

        useEffect(() => {
            axiosInstance.get("/labs")
                .then((res) => {
                    console.log(res.data);
                    setLabs(res.data);
                })
                .catch((err) => console.error(err));
        }, []);

                useEffect(() => {
                    toast.info("اضغط على اسم المعمل للمزيد من البيانات", {
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
                    backgroundImage: `url(${Lab})`,
                    filter: 'brightness(1) blur(0.5px)',
                }}
            ></div>
            {/*<img decoding="async" alt="Background" src={Lab} className="absolute opacity-20 z-0 h-full w-full" />*/}
                <div className="p-[16px] flex flex-row flex-wrap self-start justify-around  gap-[95px] transition-transform ease-linear duration-200 relative hover:translate-y-3 hover:shadow-md">
                    {Labs.length === 0 ? (
    <p className="text-center text-gray-600">No labs available or failed to load.</p>
    ) : (
        Labs.map((Lab) => (
            <Card
            key={Lab.id}
            id={Lab.id}
            name={Lab.name}
            city={Lab.city}
            location={Lab.location}
            image={Lab.image || lab}
            Ilink={`/labs/${Lab.id}`}
            />
        ))
        )}
            </div>

        </div>
    )
}
export default Labd;