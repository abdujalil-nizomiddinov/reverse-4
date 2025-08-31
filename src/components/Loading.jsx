import React from "react";

function Loading() {
  return (
    <div className="h-screen w-full fixed top-0 left-0 bg-black/70 flex items-center justify-center">
      <span className="bg-black w-70 h-20 rounded-2xl flex items-center justify-center shadow-[0_0_20px_6px_#fff,inset_0_0_15px_2px_#fff]">
        <h1 className="tracking-[10px] loading [text-shadow:_1px_1px_6px_#fff]">
          Loading...
        </h1>
      </span>
    </div>
  );
}

export default Loading;
