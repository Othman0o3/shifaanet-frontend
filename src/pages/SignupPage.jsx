import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import bg from '../assets/logsi.webp';

import "react-toastify/dist/ReactToastify.css";

function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password1, setPassword1] = useState("");
    const [password2, setPassword2] = useState("");
    const [message, setMessage] = useState("");

    const backendUrl = window.location.protocol === "https:" 
        ? "https://vampire-cycling-rules-sound.trycloudflare.com/hosp/api/sign-up/" 
        : "http://127.0.0.1:9000/hosp/api/sign-up/";

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ username,email,password1,password2 }),
            });

            const data = await response.json();
            if (!response.ok) {
                let errors = [];

                if (data.username) errors.push(...data.username);
                if (data.email) errors.push(...data.email);
                if (data.password1) errors.push(...data.password1);
                if (data.password2) errors.push(...data.password2);
                if (data.non_field_errors) errors.push(...data.non_field_errors);
                if (data.detail) errors.push(data.detail);
                if (data.message) errors.push(data.message);

                const errorMsg = errors.length > 0 ? errors.join(" | ") : "Signup failed";
                setMessage(errorMsg);
                return;
            }

            localStorage.setItem("access", data.access);
            localStorage.setItem("refresh", data.refresh);

            toast.success("تم إنشاء الحساب بنجاح!", {
                position: "top-center",
                autoClose: 3000,
            });

            setTimeout(() => {
                window.location.href = "/";
            }, 3000);
        } catch (err) {
            setMessage(err?.message || "An error occurred. Please try again.");
        }
    };
    return (
        <div dir="rtl" className="min-h-screen flex items-center justify-center bg-gray-50 translate-y-2 font-almarai"
                style={{
                backgroundImage:`url(${bg})`,
                backgroundSize: "cover",
                filter: 'brightness(1) blur(0.3px)',


            }}        
        >
            <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full">
            <div className="flex justify-center mb-4">
                <FaUserPlus className="w-12 h-12 text-blue-500" />
            </div>
            <h2 className="font-extrabold text-2xl mb-6 text-center text-gray-800">انشاء حساب جديد</h2>
            {message && (
                <p className="mb-4 text-center text-sm text-red-600">{message}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>                
                <div>
                <label className="block mb-1 font-medium text-gray-700">اسم المستخدم</label>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                </div>
                <div>
                <label className="block mb-1 font-medium text-gray-700">البريد الالكتروني</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                </div>  
                <label className="block mb-1 font-medium text-gray-700">كلمة المرور</label>
                <input
                    type="password"
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                </div>
                <div>
                <label className="block mb-1 font-medium text-gray-700">تأكيد كلمة المرور</label>
                <input
                    type="password"
                    value={password2}
                    onChange={(e) => setPassword2(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                </div>
                <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-2 font-bold shadow hover:bg-blue-700 transition-colors"
                >
                انشاء حساب
                </button>
            </form>
            <div className="mt-6 text-center">
                <Link
                to="/hosp/login"
                className="text-blue-600  hover:text-blue-800 transition-colors font-medium no-underline"
                >
                لديك حساب؟
                </Link>
            </div>
            </div>
            <ToastContainer />
        </div>
        );
}

export default SignupPage;
