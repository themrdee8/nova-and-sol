"use client";
import Button from "@/components/Button";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const router = useRouter();

  const handleShopping = () => {
    router.push("/");
  };

  return (
    <div className="h-screen grid place-items-center">
      <div className="animate-success animate-glow w-52 h-52 rounded-full bg-[radial-gradient(circle,rgba(128,245,39,0.35)_0%,rgba(128,245,39,0.15)_45%,transparent_70%)] flex items-center justify-center">
        <div className="w-48 h-48 rounded-full bg-[radial-gradient(circle,#4CAF00_0%,#80F527_45%,#C9FFA4_75%)] flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-[#4CAF00]/20 flex items-center justify-center">
            <svg
              className="w-16 h-16 stroke-white animate-check"
              viewBox="0 0 52 52"
              fill="none"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M14 27 L23 36 L38 18" />
            </svg>
          </div>
        </div>
      </div>

      <div>
        <p className="capitalize font-Eb text-[20px]">Order successfull!</p>
      </div>
      <div>
        <Button name="Continue shopping" onclick={handleShopping} />
      </div>
    </div>
  );
};

export default SuccessPage;
