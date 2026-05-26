import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import axiosInstance from "../api/axiosInstance";
import bg from '../assets/logsi.webp';
function LoginPage() {
    const [email, setemail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const isLocal =
        window.location.hostname.includes("192.168.") ||
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1";

    const backendBaseURL = isLocal
        ? "http://127.0.0.1:9000"
        : "https://vampire-cycling-rules-sound.trycloudflare.com"
        ;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axiosInstance.post(`${backendBaseURL}/auth/token/`, { email, password });

            const data = response.data;

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            window.location.href = "./";
        } catch (err) {
            setError(err.response?.data?.detail || err.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center  translate-y-2 font-almarai" dir="rtl"
                    style={{
                backgroundImage:`url(${bg})`,
                backgroundSize: "cover",
                filter: 'brightness(1)', 


            }}
        >
        <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full"

        >
            <div className="flex justify-center mb-4">
                <FaUserCircle className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="font-extrabold text-2xl mb-6 text-center text-gray-800">تسجيل الدخول</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <label className="flex flex-col text-gray-700 font-semibold">
                البريد الالكتروني:
                <input
                type="text"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </label>

            <label className="flex flex-col text-gray-700 font-semibold">
                كلمة المرور:
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="mt-2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </label>

            {error && <p className="text-red-600 text-sm mt-1">{error}</p>}

            <button
                type="submit"
                className="mt-4 bg-blue-700 text-white py-3 rounded-lg shadow-md hover:bg-blue-800 transition-colors duration-300"
            >
                تسجيل الدخول
            </button>

            <div className="text-center mt-4">
                <a href="/hosp/signup" className="text-blue-600 underline hover:text-blue-800 transition-colors duration-300 no-underline">
                ليس لديك حساب؟
                </a>
            </div>
            </form>
            </div>
        </div>
    );
}

export default LoginPage;
