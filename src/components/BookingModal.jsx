import Flatpickr from "react-flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Arabic } from "flatpickr/dist/l10n/ar.js";
import React, { useState, useEffect, useMemo, useRef } from "react";
import { createPortal } from "react-dom";
import { ToastContainer,toast } from "react-toastify";
import axiosInstance from '../api/axiosInstance';

function BookingModal({ isOpen, onClose, doctorId, isAuthenticated }) {
  const [doctor, setDoctor] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [ssn, setSsn] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("Male");
  const [age, setAge] = useState("");
  const [localAuth, setLocalAuth] = useState(false);
  const [appointmentType, setAppointmentType] = useState("regular");
  const nameInputRef = useRef(null);
  const ssnPattern = /^(12|11|21|22)\d{2}$/;
  const ssnIsValid = ssnPattern.test(ssn);

  useEffect(() => {
    if (!isOpen) return;
    const verifyAuth = async () => {
      try {
        const res = await axiosInstance.get("/check-auth/");
        setLocalAuth(res.status === 200);
      } catch {
        setLocalAuth(false);
      }
    };
    verifyAuth();
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    console.log("BookingModal doctorId:", doctorId);
    if (!isOpen || !doctorId) return;
    const fetchDoctor = async () => {
      console.log("Fetching doctor with ID:", doctorId);
      try {
        const res = await axiosInstance.get(`/doctor/${doctorId}/`);
        if (res.status === 200) {
          const data = res.data;
          setDoctor(data);
          console.log("Fetched doctor data:", data);
        } else {
          console.error("Failed to fetch doctor data");
          setDoctor(null);
        }
      } catch (err) {
        console.error("Error fetching doctor data:", err);
        setDoctor(null);
      }
    };
    fetchDoctor();
  }, [isOpen, doctorId]);

  const allowedWeekdays = useMemo(() => {
    const daysMap = {
      Sunday: 0,
      Monday: 1,
      Tuesday: 2,
      Wensday: 3,
      Thursday: 4,
      Friday: 5,
      Saturday: 6,
    };

    const mappedDays = doctor?.available_days
      ?.map((d) => daysMap[d.name])
      .filter((v) => v !== undefined) || [];

    if (mappedDays.length === 0) {
      const defaultDays = [0, 1, 2, 3, 4, 6];
      console.log("Allowed weekdays (default):", defaultDays);
      return defaultDays;
    }

    console.log("Allowed weekdays (from doctor):", mappedDays);
    return mappedDays;
  }, [doctor]);

  const doctorAvailableDaysArabic = useMemo(() => {
    const arabicDaysMap = {
      Sunday: "الأحد",
      Monday: "الاثنين",
      Tuesday: "الثلاثاء",
      Wensday: "الأربعاء",
      Thursday: "الخميس",
      Friday: "الجمعة",
      Saturday: "السبت",
    };

    const translatedDays = doctor?.available_days
      ?.map((d) => arabicDaysMap[d.name]) || [];

    console.log("Doctor available_days Arabic:", translatedDays);
    return translatedDays;
  }, [doctor]);

  useEffect(() => {
    if (!selectedDate || !doctor) {
      setAvailableSlots([]);
      setSelectedSlot("");
      return;
    }
    const fetchAvailableSlots = async () => {
      try {
        const res = await axiosInstance.get(`/available-slots/${doctor.id}/`, { params: { date: selectedDate } });
        if (res.status === 200) {
          const data = res.data;
          console.log("Available slots for date", selectedDate, ":", data);
          setAvailableSlots(Array.isArray(data) ? data : []);
          setSelectedSlot("");
        } else {
          setAvailableSlots([]);
          setSelectedSlot("");
          console.error("Failed to fetch available slots");
        }
      } catch (err) {
        setAvailableSlots([]);
        setSelectedSlot("");
        console.error("Error fetching available slots:", err);
      }
    };
    fetchAvailableSlots();
  }, [selectedDate, doctor]);

  useEffect(() => {
    console.log("Current doctor:", doctor);
    console.log("Current allowedWeekdays:", allowedWeekdays);
    console.log("Current availableSlots:", availableSlots);
  }, [doctor, allowedWeekdays, availableSlots]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!localAuth) {
      toast.error("يرجى تسجيل الدخول لحجز موعد.");
      return;
    }

    if (!selectedDate || !selectedSlot) {
      toast.error("يرجى اختيار التاريخ والوقت.");
      return;
    }

    if (!name || !gender || !age || !ssn) {
      toast.error("يرجى ملء جميع الحقول المطلوبة.");
      return;
    }
    

    try {
      const appointmentDateTime = new Date(`${selectedDate}T${selectedSlot}:00`).toISOString();

      const response = await axiosInstance.post(`/book/`, {
        doctor: doctor?.id,
        patient_name: name,
        gender,
        age: parseInt(age, 10),
        ssn,
        appointment_datetime: appointmentDateTime,
        appointment_type: appointmentType,
      });

      if (response.status === 200 || response.status === 201) {
        const data = response.data; 

        const toastMessage = appointmentType === "online"
          ? "تم حجز الموعد عن بعد بنجاح! سيتم إرسال رابط الاجتماع بالبريد الإلكتروني عند موعده."
          : `تم الحجز بنجاح! الرقم المرجعي: ${data.id || doctor.id}`;

        toast.success(toastMessage, {
          position: "top-center",
          autoClose: 5000,
          rtl: true,
        });

        setAvailableSlots((slots) => slots.filter((slot) => slot !== selectedSlot));
        setSelectedSlot("");
        setName("");
        setGender("Male");
        setAge("");
        setSsn("");

        setTimeout(() => onClose(), 100);
      } else if (response.status === 400) {
        toast.error("هذا التوقيت محجوز مسبقًا. الرجاء اختيار توقيت آخر.");
      } else {
        const errorData = response.data;
        console.error("Booking failed:", errorData);
        toast.error(errorData.detail || "حدث خطأ أثناء الحجز.");
      }
    } catch (err) {
      if (err.response && err.response.status === 400) {
        toast.error("هذا التوقيت محجوز مسبقًا. الرجاء اختيار توقيت آخر.");
      } else {
        console.error("Error booking:", err);
        toast.error("حدث خطأ أثناء الحجز. حاول مرة أخرى.");
      }
    }
  };

  if (!isOpen) return null;

  return createPortal(
    <div
      dir="rtl"
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-[9999] overflow-auto font-almarai"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative z-[10000] mx-4 my-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-2 right-2 z-[10001] text-gray-600 hover:text-gray-900 font-bold text-lg"
          aria-label="Close modal"
        >
          ×
        </button>
        <h2 id="booking-modal-title" className="text-xl font-bold mb-6 text-center">احجز موعدك</h2>

        {!localAuth && (
          <p className="mb-6 text-center text-red-600">يجب تسجيل الدخول لحجز موعد</p>
        )}

        {doctorAvailableDaysArabic.length > 0 && (
          <p className="mb-4 text-center text-gray-700">
            الأيام المتاحة: {doctorAvailableDaysArabic.join("، ")}
          </p>
        )}

        <Flatpickr
          value={selectedDate ? new Date(selectedDate) : null}
          onChange={(_, dateStr) => {
            setSelectedDate(dateStr);
          }}
          options={{
            locale: Arabic,
            dateFormat: "Y-m-d",
            minDate: "today",
            disable: [
              (date) => !allowedWeekdays.includes(date.getDay()),
            ],
          }}
          placeholder="اختر التاريخ"
          className="border p-2 w-full mb-6"
          disabled={!localAuth}
        />

        {selectedDate && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {availableSlots.length === 0 && (
              <p className="col-span-3 text-center text-gray-500">لا توجد مواعيد متاحة لهذا التاريخ</p>
            )}
            {availableSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => setSelectedSlot(slot)}
                className={`py-2 rounded border text-center text-sm ${
                  selectedSlot === slot
                    ? "bg-blue-600 text-white border-blue-600"
                    : "bg-white text-gray-700 hover:bg-gray-100 border-gray-300"
                }`}
                disabled={!localAuth}
              >
                {slot}
              </button>
            ))}
          </div>
        )}

        {selectedSlot && (
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <p className="font-semibold mb-1">نوع الموعد</p>
            <label className="mr-4">
              <input
                type="radio"
                name="appointment_type"
                value="regular"
                checked={appointmentType === "regular"}
                onChange={() => setAppointmentType("regular")}
                required
              /> موعد عادي
            </label>
            <label>
              <input
                type="radio"
                name="appointment_type"
                value="online"
                checked={appointmentType === "online"}
                onChange={() => setAppointmentType("online")}
                required
              /> عن بعد
            </label>
          </div>            
            <label htmlFor="nameInput" className="sr-only">الاسم</label>
            <input
              id="nameInput"
              type="text"
              placeholder="الاسم"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full"
              disabled={!localAuth}
              required
              ref={nameInputRef}
            />

            <label htmlFor="genderSelect" className="sr-only">الجنس</label>
            <select
              id="genderSelect"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="border p-2 w-full"
              disabled={!localAuth}
              required
            >
              <option value="Male">ذكر</option>
              <option value="Female">أنثى</option>
            </select>

            <label htmlFor="ageInput" className="sr-only">العمر</label>
            <input
              id="ageInput"
              type="number"
              placeholder="العمر"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="border p-2 w-full"
              disabled={!localAuth}
              required
              min={0}
            />

            <label htmlFor="ssnInput" className="sr-only">أول وآخر رقمين من الرقم الوطني</label>
            <input
              id="ssnInput"
              type="text"
              placeholder="أول وآخر رقمين من الرقم الوطني"
              value={ssn}
              onChange={(e) => setSsn(e.target.value)}
              className="border p-2 w-full"
              disabled={!localAuth}
              required
              pattern="^(12|11|21|22)\d{2}$"
              title="يجب أن يتكون أول رقمين و آخر رقمين"
              aria-invalid={!ssnIsValid}
              aria-describedby="ssnError"
            />
            {!ssnIsValid && ssn.length > 0 && (
              <p id="ssnError" className="text-red-600 text-base">الرقم الوطني غير صالح.يحب أن يتكون من أول وآخر رقمين.</p>
            )}
            <p className="text-red-600 text-base">الرجاء احضار مايثبت هويتك عند حضورك الى الموعد</p>
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setSelectedSlot("")}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                إلغاء
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={!localAuth}
              >
                حجز
              </button>
            </div>
          </form>
        )}
      </div>
    </div>,
    document.body
  );
}

export default BookingModal;