import React , {useEffect,useState}from "react";
import Cards from "../components/Dcards";
import Filter from "../components/Filter";
import {FaUserMd} from "react-icons/fa";
import axiosInstance from '../api/axiosInstance';

function DoctorsPage(){
        const [doctors , setdoctors] = useState([]);
        const [error, setError] = useState(null);
    
    useEffect(() =>{
        axiosInstance.get("/doctors/")
        .then((res) => {
            setdoctors(res.data);
        })
        .catch((err) => {
            if (err.response) {
                if (err.response.status === 401) {
                    setError("Unauthorized: Invalid or expired token");
                } else {
                    setError(`Error: ${err.response.statusText}`);
                }
            } else {
                setError("Network Error");
            }
            console.error(err);
        })
    }, []);
    const [selectedSpecialties, setSelectedSpecialties] = useState([]);

    const handleFilterChange = (e) => {
    const value = e.target.value;
    setSelectedSpecialties((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
    };
    return(
      <>
      {error && (
        <div className="text-red-900 text-center font-almarai mt-20 font-extrabold shadow-md">
          {error} <FaUserMd className="text-9xl ml-[45%]" />
        </div>
      )}
      {!error && doctors.length > 0 && (
        <div
  dir="rtl"
  className="bg-[#f0f6fa] flex flex-col md:flex-row lg:flex-wrap h-full gap-8 px-4 relative max-w-[1400px] m-auto pt-7 mt-4 "
>
  <Filter
    onChange={handleFilterChange}
    className="hidden md:block [grid-area:filter]"
  />

  <div className="bg-[#f0f6fa] h-full grid [grid-area:cards] max-w-[1400px] flex-1">
    <div className="flex p-0 max-w-full flex-col flex-nowrap rounded-md shadow-lg gap-5">
      {doctors
        .filter(
          (doctor) =>
            selectedSpecialties.length === 0 ||
            selectedSpecialties.includes(doctor.speciality)
        )
        .map((doctor) => (
          <Cards
            key={doctor.id}
            id={doctor.id}
            name={doctor.name}
            available_from={doctor.available_from}
            available_To={doctor.available_To}
            days={doctor.days_Available}
            speciality={doctor.speciality}
            hospital={doctor.hospital}
          />
        ))}
    </div>
  </div>
</div>
      )}
      {!error && doctors.length === 0 && (
        <div className="text-red-900 text-center font-almarai mt-20 font-extrabold">...لايوجد أطباء الرجاء إعادة المحاولة لاحقا. <FaUserMd className="text-9xl ml-[45%]" /></div>
      )}
      </>
    )
}
export default DoctorsPage;