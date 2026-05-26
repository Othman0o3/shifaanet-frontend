import React ,{useState} from "react";
import pinImg from "../assets/Pinn.webp"
import BookingModal from "./BookingModal";
function Cards({id ,name,available_from,available_To,speciality,hospital, days ,isAuthenticated}){
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDoctorId, setSelectedDoctorId] = useState(null); 
  return(
        <div
          dir="rtl"
          className="relative grid bg-[var(--card-bg)] w-full p-2 sm:p-3 md:p-4 rounded-xl shadow-md font-[Almarai] hover:-translate-y-1 hover:scale-105 hover:shadow-xl transition-all ease-linear text-center sm:text-right h-auto text-xs sm:text-sm md:text-base gap-1 sm:gap-2"
          style={{
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
            gridTemplateRows: "1fr 1fr 1fr 1fr",
            gridTemplateAreas: `
              "name . . . ."
              "Sp location . . cta"
              "Time . . . cta"
              "days . . . ."
            `,
          }}
        >
          <h4 className="font-extrabold text-sm sm:text-lg md:text-xl text-[var(--text)] mt-1 sm:mt-0"
            style={{
                gridArea:"name",
            }}
          >{name}</h4>
          <button
          onClick={() => {
            console.log("Opening modal for doctor ID:", id);
            setSelectedDoctorId(id);
            setIsModalOpen(true);
          }}
          className="bg-[#1976d2] text-white rounded-lg px-2 sm:px-3 py-1 text-xs sm:text-sm font-medium hover:bg-[#146dc5]"
          style={{
            gridArea:"cta"
          }}
          
          >إحجز موعدك</button> 
          <p className="font-bold font-almarai ml-10 sm:ml-16 mt-0 w-[85px] sm:w-[100px] text-[10px] sm:text-sm"
            style={{
              gridArea:"Time"
            }}
          >
            {available_from && available_from.slice(0,5)} : {available_To && available_To.slice(0,5)}
          </p>
          <p className="font-almarai font-semibold text-sm text-right text-xs sm:text-sm" style={{ gridArea: "days" }}>
            <span className="text-500 font-bold">أيام العمل : </span>
            {Array.isArray(days) ? days.map(d => {
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
            }).join(" - ") : days}
          </p>        
          <h5 className="text-[10px] sm:text-sm md:text-base right-[25px] top-[46px] text-[var(--text)] ml-10 sm:ml-20 mt-1 sm:mt-3"
          style={{
            gridArea:"Sp",
          }}
          
          >{speciality}</h5>  
          
            {hospital && (
                <a href={hospital.location} className="flex items-center gap-1 sm:gap-2 w-[100px] sm:w-[140px] text-[10px] sm:text-sm font-bold"
                    style={{
                        gridArea:"location"
                    }}
                >
                    <img src={pinImg} decoding="async" width="30px" alt="hospital pin" /> {hospital.name}
              
                </a>
                )}
                <BookingModal 
                  isOpen={isModalOpen} 
                  onClose={() => setIsModalOpen(false)} 
                  doctorId={selectedDoctorId} 
                  isAuthenticated={isAuthenticated} 
/>
        </div>
    )
}
export default Cards;