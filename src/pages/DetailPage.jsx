import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FaFlask, FaSyringe, FaHospitalUser, FaMapMarkerAlt , FaCircleNotch ,FaPhoneAlt , FaWhatsapp, FaFacebook, FaClock} from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import Hos from '../assets/hlogo.webp';
import Lab from '../assets/Llogo.webp';
import Vac from '../assets/Vlogo.webp';
import b from '../assets/Ba.webp';
const DetailPage = ({ type }) => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [items, setItems] = useState([]);
    const Url = (url) => {
        if (typeof url === "string" && (url.startsWith("http://") || url.startsWith("https://"))) {
            return encodeURI(url);
        }
        return "#";
    };

    useEffect(() => {
        let url = "";
        if (type === "labs") {
            url = `/lab/${id}`;
        } else if (type === "vaccs") {
            url = `/vaccs/${id}`;
        } else if (type === "hosp") {
            url = `/hospital/${id}`;
        }

        axiosInstance.get(url)
            .then((response) => {
                const json = response.data;
                if (type === "labs") {
                    setData(json.lab);
                    setItems(json.lab?.available_tests || []);
                } else if (type === "vaccs") {
                    setData(json);
                    setItems(json.availabilities || []);
                } else if (type === "hosp") {
                    setData(json.hospital);
                    setItems(json.hospital?.doctors || json.doctors || []);
                    console.log(json.hospital)
                }
            })
            .catch((err) => console.error("Error fetching detail:", err));
    }, [id, type]);

    if (!data) return <div className="flex justify-center items-center h-screen "> <FaCircleNotch className="animate-spin text-4xl text-blue-400"/></div>;

    const renderIcon = () => {
        if (type === "labs") return <FaFlask className="text-blue-600 w-6 h-6 mx-auto" />;
        if (type === "vaccs") return <FaSyringe className="text-green-600 w-6 h-6 mx-auto" />;
        if (type === "hosp") return <FaHospitalUser className="text-red-600 w-6 h-6 mx-auto" />;
        return null;
    };

    const pageLogo = () => {
        if (type === "labs") return (
            <div>
                <img src={`${Lab}`} alt="LabLogo" className="w-[140px]" />
            </div>
        )
        if (type === "vaccs") return (
        <div>
            <img src={`${Vac}`} alt="VaccCEnter logo" className="w-[120px]"/>
        </div>
        )
        if (type === "hosp") return  (
        <div>
            <img src={`${Hos}`} alt="hospital" className="w-[120px]"/>
        </div> 
    );
        return null;
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center p-6 font-almarai"
            style={{ backgroundImage: `url(${b})`, backgroundSize: "cover", backgroundPosition: "center" }}
        >
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-6">
                <div className="flex flex-col items-center mb-6">
                    {pageLogo()}
                    <h1 className="text-3xl font-bold text-gray-800 capitalize">بيانات أخرى</h1>
                    <hr className="border-t-2 border-[var(--primary-light)] mb-8 relative" />

                </div>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                    <div dir="rtl" className="col-span-3 space-y-2 font-almarai">
                        <h2 className="text-2xl font-bold text-[#333]">{data.name}</h2>
                        {data.phone && <a  href={`tel:${data.phone}`} target="noreferrer" className="text-lg font-semibold inline-block"><FaPhoneAlt/></a>}
                        {data.whatsapp && <a href={`${data.whatsapp}`} target="noreferrer" className="text-lg font-semibold inline-block mr-1"><FaWhatsapp/></a>}
                        {data.Fb && <a href={` ${data.Fb}`} target="noreferrer" className="text-lg font-semibold inline-block mr-1"><FaFacebook/></a>}

                        {data.work_from && data.work_to && <p className="text-lg font-semibold"> ساعات العمل <FaClock/>{data.work_from && data.work_from.slice(0,5)} - {data.work_to && data.work_to.slice(0,5)}</p>}
                        {data.location && (
                            <div className="flex flex-col text-[#003366] no-underline justify-start">
                                <div className="font-bold text-lg">العنوان على الخريطة:</div>
                                <div>
                                    <a href={Url(data.location)} target="_blank" rel="noopener noreferrer" className="flex items-center space-x-1">
                                        <FaMapMarkerAlt className="text-[#003366]" /> 
                                        <span>{data.city}</span>
                                    </a>
                                </div>
                            </div>
                        )}
                        {data.location_description && <p className="text-gray-700">{data.location_description}</p>}
                        {data.description && <p className="text-gray-700">{data.description}</p>}
                    </div>
                </div>

                <div className="mt-8 space-y-8" dir={type === "hosp" ? "rtl" : "ltr"}>
                    {items.length > 0 && type === "hosp" && (
                        <div className="overflow-x-auto">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2">👨‍⚕️ الأطباء</h3>
                            <table className="min-w-full border-collapse shadow-md text-right">
                                <thead className="bg-gray-100 font-bold text-gray-800">
                                    <tr>
                                        <th className="py-2 px-4 border">الاسم</th>
                                        <th className="py-2 px-4 border">التخصص</th>
                                        <th className="py-2 px-4 border">أيام العمل</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {items.map((doctor) => (
                                        <tr key={doctor.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border">{doctor.name || "-"}</td>
                                            <td className="py-2 px-4 border">{doctor.speciality || "-"}</td>
                                            <td className="py-2 px-4 border">{Array.isArray(doctor.days_Available) ? doctor.days_Available.map(d => {
                                                const arabicDaysMap = {
                                                Sunday: "الأحد",
                                                Monday: "الاثنين",
                                                Tuesday: "الثلاثاء",
                                                Wensday: "الأربعاء",
                                                Thursday: "الخميس",
                                                Friday: "الجمعة",
                                                Saturday: "السبت",
                                            };
                                            return arabicDaysMap[d.name] || d.name;
                                            }).join(" - ") : doctor.days_Available}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Hospital services list */}
                    {type === "hosp" && data.services && data.services.length > 0 && (
                        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-right">🏥 الخدمات المتوفرة</h3>
                            <ul className="list-disc pl-6 text-gray-600">
                                {data.services.map((service) => (
                                    <li key={service.id}>{service.name}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Labs table */}
                    {items.length > 0 && type === "labs" && (
                        <div className="overflow-x-auto">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-right">💉 التحاليل المتوفرة</h3>
                            <table className="min-w-full border-collapse shadow-md">
                                <thead className="bg-gray-100 font-bold text-gray-800">
                                    <tr>
                                        <th className="py-2 px-4 border">اسم التحليل</th>
                                        <th className="py-2 px-4 border">متاح</th>
                                        { /*<th className="py-2 px-4 border">آخر تحديث</th>*/}
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {items.map((test) => (
                                        <tr key={test.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border text-center">{test.name}</td>
                                            <td className="py-2 px-4 border">{test.availability || "-"}</td>
                                           {/* <td className="py-2 px-4 border">{test.last_updated?.split("T")[0] || "-"}</td> */}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {items.length > 0 && type === "vaccs" && (
                        <div className="overflow-x-auto">
                            <h3 className="text-xl font-semibold text-gray-700 mb-2 text-right">💉 اللقاحات المتوفرة</h3>
                            <table className="min-w-full border-collapse shadow-md">
                                <thead className="bg-gray-100 font-bold text-gray-800">
                                    <tr>
                                        <th className="py-2 px-4 border">اسم اللقاح</th>
                                        <th className="py-2 px-4 border">متاح</th>
                                        <th className="py-2 px-4 border">آخر تحديث</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white">
                                    {items.map((vaccine) => (
                                        <tr key={vaccine.id} className="hover:bg-gray-50">
                                            <td className="py-2 px-4 border text-center">{vaccine.vaccine?.name || "-"}</td>
                                            <td className="py-2 px-4 border">{vaccine.availability || "-"}</td>
                                            <td className="py-2 px-4 border">{vaccine.last_updated?.split("T")[0] || "-"}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DetailPage;