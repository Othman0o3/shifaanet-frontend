import React from "react";

function Filter({ onChange }) {
    return (
        <ul
            className="overflow-x-auto md:overflow-visible md:w-56 w-full flex md:flex-col flex-nowrap bg-[var(--card-bg)] p-4 md:p-4 rounded-md shadow-md transition-transform duration-300"
            style={{
                gridArea: "filter",
            }}
        >
            <li>
                <h5 className="mb-2 font-almarai font-extrabold text-[#333] w-[68px]">فلترة عبر التخصص</h5>
            </li>
            <li
                className="flex flex-row md:flex-col mr-3"
                style={{ color: 'var(--text)' }}
            >
                <span className="Doctor">
                    <input className="C" type="checkbox" value="تخدير" onChange={onChange} /> تخدير
                </span>
            </li>
            <li className="Doctor" style={{ color: 'var(--text)', marginRight:"4px"}}>
                <input className="C" type="checkbox" value="باطنة" onChange={onChange} /> باطنة
            </li>
            <li className="Doctor" style={{ color: 'var(--text)' ,marginRight:"4px"}}>
                <input className="C" type="checkbox" value="عظام" onChange={onChange} /> عظام
            </li>
            <li className="Doctor" style={{ color: 'var(--text)' , marginRight:"4px"}}>
                <input className="C" type="checkbox" value="جراحة" onChange={onChange} /> جراحة
            </li>
            <li className="Doctor" style={{ color: 'var(--text)' , marginRight:"4px"}}>
                <input className="C" type="checkbox" value="أعصاب" onChange={onChange} /> أعصاب
            </li>
            <li className="Doctor" style={{ color: 'var(--text)', marginRight:"4px"}}>
                <input className="C" type="checkbox" value="أطفال" onChange={onChange} /> أطفال
            </li>
            <li className="Doctor" style={{ color: 'var(--text)', marginRight:"4px"}}>
                <input className="C" type="checkbox" value="النساء والولادة" onChange={onChange} /> النساء والولادة
            </li>
            <li className="Doctor" style={{ color: 'var(--text)' , marginRight:"4px"}}>
                <input className="C" type="checkbox" value="العيون" onChange={onChange} /> العيون
            </li>
            <li className="Doctor" style={{ color: 'var(--text)' , marginRight:"4px"}}>
                <input className="C" type="checkbox" value="الجلدية" onChange={onChange} /> الجلدية
            </li>
            <li className="Doctor" style={{ color: 'var(--text)' , marginRight:"4px"}}>
                <input className="C" type="checkbox" value="قلب" onChange={onChange} /> قلب
            </li>
        </ul>
    );
}
export default Filter;