import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function FormInput({ label, name, type, placeholder }) {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  return (
    <div className="mb-4 font-mono">
      <label
        htmlFor={name}
        className="inline-block mb-2 !text-yellow-500 text-sm cursor-[url('cursor.png'),_auto]
        border-2 border-t-transparent border-b-transparent border-r-transparent px-4 p-1 tralnsition-all duration-300
        "
      >
        {label}
      </label>

      <div className="flex items-center justify-center w-full relative">
        <input
          id={name}
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          name={name}
          placeholder={placeholder}
          className="flex items-center py-2 bg-black w-full outline-none
      border-2 border-t-transparent border-l-transparent border-r-transparent px-4 p-1 focus:border-b-transparent focus:border-l-[lime] focus:border-r-[lime] focus:animate-pulse tralnsition-all duration-400
      "
        />
        {type === "password" && (
          <span
            onClick={togglePassword}
            className="cursor-pointer text-[lime] text-lg ml-2 absolute right-3"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        )}
      </div>
    </div>
  );
}

export default FormInput;
