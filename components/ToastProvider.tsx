"use client";
import React, { createContext, useContext, useState } from "react";

type ToastContextType = {
  show: boolean;
  message: string;
  toast: (message: string) => void;
};

const ToastContext = createContext<ToastContextType>({
  show: false,
  message: "",
  toast: () => {},
});

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const toast = (msg: string) => {
    setMessage(msg);
    setShow(true);
    setTimeout(() => setShow(false), 1600);
  };

  return (
    <ToastContext.Provider value={{ show, message, toast }}>
      {children}
      <div
        className={`fixed top-6 right-6 z-50 px-6 py-3 rounded-2xl shadow-lg text-white bg-zinc-900 transition-all duration-500 ${
          show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ minWidth: 160, fontWeight: "bold", fontSize: "1rem", letterSpacing: 1 }}
      >
        {message}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
