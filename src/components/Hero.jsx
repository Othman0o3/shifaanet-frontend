import React from "react";

function Hero(){
    return(
        <>
            <section
                dir="rtl"
                className=" relative text-center px-4 py-8 z-20 max-w-[1000px] w-full mx-auto my-8 rounded-2xl shadow-xl bg-[linear-gradient(rgba(255,255,255,0.7),rgba(255,255,255,0.7))] bg-cover bg-center bg-no-repeat mt-12"
            >
  <div className="relative z-10 font-[Almarai]">
    <h1 className="text-[#003366] text-xl md:text-3xl font-extrabold">
      شفاء نت - شبكتك الذكية لكل ما له علاقة بالخدمات الطبية
    </h1>

    <p className="text-[#333] text-sm md:text-base mb-6 mt-3">
      احصل على نتائج تحاليلك الطبية مباشرة، تعرف على الأطباء واحجز مواعيدك،
      تصفح بيانات المستشفيات، وتابع مراكز التطعيم وكميات اللقاحات المتوفرة،
      وكل ذلك من مكانك بسهولة وسرعة.
    </p>

    <div className="flex flex-row justify-center gap-4">
      <a href="/hosp/doctor/">
        <button className="bg-[#0d47a1] text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-[#125aa5] text-[var(--card-bg)] transition-300">
          احجز الآن
        </button>
      </a>
      <button className="w-[125px] bg-[#0d47a1]  text-white px-4 py-2 rounded-md shadow-md transition-all duration-300 hover:bg-[#125aa5] text-[var(--card-bg)] transition-300">
        حمل التطبيق
      </button>
    </div>
  </div>
</section>
        </>
    )
}
export default Hero;