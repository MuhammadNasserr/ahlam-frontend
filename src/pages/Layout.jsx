import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import WhatsAppFloatingButton from "../components/WhatsAppFloatingButton";

export const Layout = () => {
  const [isDark, setIsDark] = useState(() => localStorage.getItem("theme") === "dark");

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (isDark) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDark]);

  return (
    <div>
      <NavBar isDark={isDark} setIsDark={setIsDark} />
      <div className="outlet">
        <Outlet />
      </div>
      <Footer isDark={isDark} />
      <WhatsAppFloatingButton
        phoneNumber="201234567890" // **استبدل ده برقم الواتساب بتاعك بالصيغة الدولية الصحيحة**
        // مثال: "201001234567" لمصر
        message="مرحباً! أود الاستفسار عن خدماتكم." // الرسالة اللي هتظهر تلقائي في محادثة الواتساب
        position="left" // ممكن تخليها 'left' لو عايز الزرار يظهر على الشمال
        // bottomOffset="30px" // لو عايز تغير المسافة من الأسفل
        // sideOffset="15px"  // لو عايز تغير المسافة من الجانب
      />
    </div>
  );
};
