"use client";

import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Button from "./Button";
import { SiGoogle } from "react-icons/si";

const AuthModal = () => {
  const { authModalOpen, closeAuthModal, login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");

  if (!authModalOpen) return null;

  const handleSubmit = async () => {
    // Reset previous error
    setErrorMessage("");

    // Basic validation
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage("Enter a valid email address.");
      return;
    }

    // Password length check
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    // Proceed with login/signup
    if (isLogin) {
      await login(email, password);
    } else {
      await signup(email, password);
    }

    // Reset values after successful auth
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-white/30 backdrop-blur-sm p-4 font-Eb uppercase fixed inset-0 z-9999">
      <div className="bg-white p-4 rounded-md z-10000">
        <div className="flex items-center justify-center pb-4 text-[14px]">
          <p>
            {isLogin ? "welcome back to nova & sol" : "welcome to nova & sol"}
          </p>
        </div>
        <div className="grid place-items-center space-y-3">
          <input
            placeholder="Email"
            value={email}
            className="border pl-2 pt-0.5 w-full h-8 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            value={password}
            type="password"
            className="border pl-2 pt-0.5 w-full h-8 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errorMessage && (
            <p className="text-red-600 text-xs text-center">{errorMessage}</p>
          )}
          <Button onclick={handleSubmit} name={isLogin ? "login" : "signup"} />
        </div>
        <div className="flex items-center mx-12 p-1 justify-center space-x-8 bg-[#E8d3a4] mt-4 text-[13px]">
          <SiGoogle />
          <p>Google sign in</p>
        </div>
        <div className="flex space-x-2 text-[13px] justify-center pt-4">
          <p>{isLogin ? "Create an account" : "Already have an account?"} </p>
          <p
            className="underline underline-offset-4 text-[#b48441]"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Sign up" : "login"}
          </p>
        </div>
        <p
          className="text-center text-xs mt-5 cursor-pointer"
          onClick={closeAuthModal}
        >
          Close
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
