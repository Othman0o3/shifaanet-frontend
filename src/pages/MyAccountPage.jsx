import { useState , useEffect } from "react";
import React  from "react";
import axiosInstance  from '../api/axiosInstance' 
import bg from '../assets/bg.webp';
import { FaIdCard , FaCircleNotch } from "react-icons/fa";

function Myaccount() {
    const [user, setUser] = useState({ bookings: [], test_results: [] });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const downloadResult = async (resultId) => {
        try {
            const response = await axiosInstance.get(`/download/result/${resultId}/`, {
                responseType: 'blob',
            });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `result-${resultId}.pdf`);
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error downloading the file:', error);
            alert('فشل تحميل الملف. الرجاء المحاولة مرة أخرى.');
        }
    };

    useEffect(() => {
        axiosInstance.get("mmyaccount")
            .then((res) => {
                setUser(res.data);
                console.log("Received myAccount data:", JSON.stringify(res.data, null, 2));
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-36">
                <span className="text-[#68c451] animate-spin"><FaCircleNotch/></span>
            </div>
        );
    }
    if (error) {
        return (
            <div className="flex justify-center items-center h-40 text-lg">
                <span className="text-red-500">{error}</span>
            </div>
        );
    }

    const username = user.user?.username || "User";
    const userEmail = user.user?.email || "-----";

    return (
        <div dir="rtl" className="relative min-h-screen font-almarai">
            <div
                className="absolute inset-0 bg-cover bg-center bg-fixed"
                style={{
                    backgroundImage: `url(${bg})`,
                    filter: 'brightness(0.85) blur(0.5px)',
                }}
            ></div>
            <div className="absolute inset-0 bg-white/60"></div> 

            <div className="relative max-w-8xl mx-auto px-4 py-8">
                <div className="flex flex-col items-center mb-6 animate-fadeIn">
                    <FaIdCard className="w-16 h-16 text-[var(--primary-dark)] mb-2 animate-bounce-slow" />
                    <h2 className="text-4xl font-bold text-[var(--primary-dark)] text-center">حسابي</h2>
                </div>
                <hr className="border-t-2 border-[var(--primary-light)] mb-8" />

                <h2 className="text-3xl font-bold mb-6 text-[var(--primary-dark)]">مواعيدي</h2>
                <div className="overflow-x-auto mb-10 text-[var(--primary-dark)] rounded-md shadow-md bg-white/80 backdrop-blur-sm">
                    {user.bookings && user.bookings.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200 overflow-y-scroll">
                            <thead>
                                <tr dir="rtl">
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">الرقم المرجعي</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">اسم المريض</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">العمر</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">الجنس</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">التوقيت</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">الطبيب</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/90 divide-y divide-gray-100">
                                {user.bookings.map((booking, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? "bg-white/90" : "bg-gray-50/70"}>
                                        <td className="px-4 py-2 whitespace-nowrap text-[var(--primary)] hover:text-[var(--primary-dark)] hover:cursor-pointer">{booking.id || "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{booking.patient_name || "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{booking.age || "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{booking.gender || "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{booking.appointment_datetime ? new Date(booking.appointment_datetime).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) : "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{booking.doctor_name || "-"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-gray-500 py-4 text-center">لاتوجد مواعيد</div>
                    )}
                </div>

                <h2 className="text-3xl font-bold mb-6 text-[var(--primary-dark)]">نتائج التحاليل</h2>
                <div className="overflow-x-auto rounded-md shadow-md mb-10 bg-white/80 backdrop-blur-sm">
                    {user.test_results && user.test_results.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">الرقم المرجعي</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">المعمل</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">التحاليل</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">التاريخ</th>
                                    <th className="px-4 py-2 bg-gray-100 text-right text-xs font-bold text-gray-700 uppercase tracking-wider">النتيجة</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white/90 divide-y divide-gray-100">
                                {user.test_results.map((result, idx) => (
                                    <tr key={idx} className={idx % 2 === 0 ? "bg-white/90" : "bg-gray-50/70"}>
                                        <td className="px-4 py-2 whitespace-nowrap text-[var(--primary)] hover:text-[var(--primary-dark)] hover:cursor-pointer">{result.id || "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">{result.lab_name || "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            {result.tests && result.tests.length > 0 ? result.tests.map(t => t.name).join(", ") : "-"}
                                        </td>
                                        <td className="px-4 py-2 whitespace-nowrap">{result.date || "-"}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            {result.result_file ? (
                                                <button
                                                    className="text-blue-500 underline bg-transparent border-none p-0 cursor-pointer"
                                                    onClick={() => downloadResult(result.id)}
                                                >
                                                    تحميل
                                                </button>
                                            ) : "-"}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="text-gray-500 py-4 text-center">لايوجد نتائج</div>
                    )}
                </div>

                <h2 className="text-3xl font-bold mb-6 text-[var(--primary-dark)]">تفاصيل الحساب</h2>
                <div dir="rtl" className="space-y-6 bg-white/80 p-4 rounded-md shadow-md backdrop-blur-sm">
                    <p className="font-extrabold text-[var(--primary-dark)]">
                        <span className="text-[var(--primary)] ml-[30px]">اسم المستخدم:</span> {username || "User"}
                    </p>
                    <hr className="border-t-2 border-[var(--primary-light)]" />
                    <p className="font-extrabold text-[var(--primary-dark)]">
                        <span className="text-[var(--primary)] ml-[30px]">البريد الالكتروني:</span> {userEmail || "-----"}
                    </p>
                    <hr className="border-t-2 border-[var(--primary-light)]" />
                </div>
            </div>
        </div>
    );
}

export default Myaccount;