import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import shifaaLogo from '../assets/Shifaa.webp';
import { FaHome, FaUserMd, FaHospital, FaFlask, FaSyringe, FaHeadset, FaUserCircle } from "react-icons/fa";
import axiosInstance  from '../api/axiosInstance';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access");
        if (token) {
            axiosInstance.get("check-auth/")
                .then((res) => {
                    if (res.data.username) setIsAuthenticated(true);
                })
                .catch((error) => {
                    if (error.response && error.response.status === 401) {
                        localStorage.removeItem("access");
                        localStorage.removeItem("refresh");
                        setIsAuthenticated(false);
                    } else {
                        console.warn("Auth check failed, but keeping user session.");
                    }
                });
        } else {
            setIsAuthenticated(false);
        }
    }, []);

    const logoutUser = () => {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        setIsAuthenticated(false);
        alert("نم تسجيل الخروج بنجاح");
        window.location.href = "./";
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const closeMenu = () => {
        setIsOpen(false);
    };

    return (
        <>
        <header dir="rtl" className="bg-[#f0f6fa] sticky top-0 w-full z-50 h-[100px] lg:h-[120px] shadow-md flex items-center justify-between px-4 lg:px-0 relative">
            <div className="flex-1 flex justify-center mx-auto lg:hidden">
                <img decoding="async" src={shifaaLogo} alt="logo" className="w-[160px] h-[160px] md:w-[180px] md:h-[180px] lg:w-[280px] lg:h-[150px] rounded-full" />
            </div> 
            <div className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer z-50 lg:hidden">
                <button onClick={toggleMenu} className="text-3xl font-bold text-gray-600">☰</button>
            </div>
            <div className="hidden lg:flex items-center">
                <img decoding="async" src={shifaaLogo} alt="logo" className="w-[250px] h-[225px] rounded-full" />
            </div>
            <nav className="hidden lg:flex flex-wrap px-5 h-[60px] items-end bg-[#f0f6fa] space-x-5 font-[Almarai]">
                <ul className="flex space-x-5 h-[10px]">
                    <li className="relative group flex items-center">
                        <Link to="/hosp/" className="px-[0.5rem] py-4 text-[20px] font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center">
                            الرئيسية <FaHome className="ml-2" />
                        </Link>
                    </li>
                    <li className="relative group flex items-center">
                        <Link to="/hosp/doctor" className="px-6 py-4 text-[20px] font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center">
                            الأطباء <FaUserMd className="ml-2" />
                        </Link>
                    </li>
                    <li className="relative group flex items-center">
                        <Link to="/hosp/hospital" className="px-6 py-4 text-[20px] font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center">
                            المستشفيات <FaHospital className="ml-2" />
                        </Link>
                    </li>
                    <li className="relative group flex items-center">
                        <Link to="/hosp/labs" className="px-6 py-4 text-[20px] font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center">
                            المعامل <FaFlask className="ml-2" />
                        </Link>
                    </li>
                    <li className="relative group flex items-center">
                        <Link to="/hosp/vacc-centers" className="px-6 py-4 text-[20px] font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center">
                            مراكز التطعيمات <FaSyringe className="ml-2" />
                        </Link>
                    </li>
                    <li className="relative group flex items-center">
                        <div className="px-6 py-4 text-[20px] font-bold text-[var(--primary)] hover:text-[var(--primary-dark)] flex items-center cursor-pointer">
                            الدعم الفني <FaHeadset className="ml-2" />
                        </div>
                        <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md min-w-[150px] z-10 right-0">
                            <li><a href="tel:0911859876" className="block px-4 py-2 hover:bg-gray-100">Call</a></li>
                            <li><a href="mailto:alemothman003@icloud.com" className="block px-4 py-2 hover:bg-gray-100">Email</a></li>
                        </ul>
                    </li>
                    <li className="relative group flex items-center px-10 py-4 text-[24px] font-bold text-primary cursor-pointer hover:text-primary-dark">
                        <span className="flex items-center text-[24px] text-[var(--primary)]"><FaUserCircle /></span>
                        <ul className="absolute hidden group-hover:block bg-white shadow-md mt-2 rounded-md min-w-[150px] z-10 right-0">
                            {isAuthenticated ? (
                                <>
                                    <li><Link to="/hosp/myaccount" className="block px-4 py-2 hover:bg-gray-100">حسابي</Link></li>
                                    <li>
                                        <button onClick={logoutUser} className="block w-full text-left px-4 py-2 text-[#2b6fa6] bg-[#f6f0f6] hover:bg-[#e0d9e7] rounded-md">تسجيل الخروج</button>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <li><Link to="/hosp/signup" className="block px-4 py-2 hover:bg-gray-100 ">إنشاء حساب</Link></li>
                                    <li><Link to="/hosp/login" className="block px-4 py-2 hover:bg-gray-100">تسجيل الدخول</Link></li>
                                </>
                            )}
                        </ul>
                    </li>
                </ul>
            </nav>
        </header>
        <div dir="rtl" className={`fixed top-0 right-0 h-full w-56 min-w-[14rem] bg-white p-4 overflow-y-auto z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            <button onClick={closeMenu} className="mb-6 text-xl font-bold text-gray-600">× إغلاق</button>
            <ul className="space-y-4">
                <li>
                    <Link to="/hosp/" onClick={closeMenu} className="flex items-center px-4 py-2 hover:bg-gray-100 rounded">
                        الرئيسية <FaHome className="ml-2" />
                    </Link>
                </li>
                <li>
                    <Link to="/hosp/doctor" onClick={closeMenu} className="flex items-center px-4 py-2 hover:bg-gray-100 rounded">
                        الأطباء <FaUserMd className="ml-2" />
                    </Link>
                </li>
                <li>
                    <Link to="/hosp/hospital" onClick={closeMenu} className="flex items-center px-4 py-2 hover:bg-gray-100 rounded">
                        المستشفيات <FaHospital className="ml-2" />
                    </Link>
                </li>
                <li>
                    <Link to="/hosp/labs" onClick={closeMenu} className="flex items-center px-4 py-2 hover:bg-gray-100 rounded">
                        المعامل <FaFlask className="ml-2" />
                    </Link>
                </li>
                <li>
                    <Link to="/hosp/vacc-centers" onClick={closeMenu} className="flex items-center px-4 py-2 hover:bg-gray-100 rounded">
                        مراكز التطعيمات <FaSyringe className="ml-2" />
                    </Link>
                </li>
                <li className="menu-item-has-children relative">
                    <a href=" " className="flex items-center px-4 py-2 hover:bg-gray-100 rounded">
                    الدعم الفني <FaHeadset className="ml-2" />
                    </a>
                    <ul className="mt-2 pl-4 space-y-2">
                        <li><a href="tel:0911859876" className="block px-4 py-2 hover:bg-gray-100 rounded">call</a></li>
                        <li><a href="mailto:alemothman003@icloud.com" className="block px-4 py-2 hover:bg-gray-100 rounded">Email</a></li>
                    </ul>
                </li>
                <li className="menu-item-has-children relative">
                    <div className="flex items-center cursor-pointer">
                        <span className="flex items-center text-[24px] text-[var(--primary)]"><FaUserCircle /></span>
                        <span className="ml-2 font-bold">:</span>
                    </div>
                    <ul className="mt-2 pl-4 space-y-2">
                        {isAuthenticated ? (
                            <>
                                <li><Link to="/hosp/myaccount" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100 rounded">حسابي</Link></li>
                                <li>
                                    <button onClick={() => {logoutUser(); closeMenu();}} className="w-full text-left px-4 py-2 text-[#2b6fa6] bg-[#f6f0f6] hover:bg-[#e0d9e7] rounded-md">تسجيل الخروج</button>
                                </li>
                            </>
                        ) : (
                            <>
                                <li><Link to="/hosp/signup" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100 rounded">إنشاء حساب</Link></li>
                                <li><Link to="/hosp/login" onClick={closeMenu} className="block px-4 py-2 hover:bg-gray-100 rounded">تسجيل الدخول</Link></li>
                            </>
                        )}
                    </ul>
                </li>
            </ul>
        </div>
        </>
    );
}
export default Header;