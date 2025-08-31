import React from "react";
import { useLogout } from "../hooks/useLogout";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { useSelector } from "react-redux";

function Home() {
  const { _logout, isPending, error } = useLogout();
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <h1 className="absolute !text-white top-5 left-10 text-3xl font-mono uppercase tracking-[6px] border-2 border-t-transparent border-l-transparent border-r-transparent px-4 p-1 flex items-center justify-center text-center pl-[22px]">
        Home
      </h1>
      <button
        onClick={_logout}
        className="fixed top-5 right-10 text-3xl cursor-pointer z-10 border-2 border-t-transparent border-l-transparent border-r-transparent px-4 p-1 !text-red-500 tralnsition-all duration-300 hover:animate-pulse active:scale-90"
      >
        Logout
      </button>
      <div className="text-[lime] flex-col fixed h-screen w-full flex items-center uppercase justify-center font-mono text-[100px] tracking-[20px]">
        The end
        <p className="text-[32px] mr-[26px] tracking-[5px] border-2 border-t-transparent border-l-transparent border-r-transparent px-4 p-1 pl-[22px] !text-yellow-500">
          {user.displayName}
        </p>
      </div>
      {isPending && <Loading />}
      {error && <Alert message={error} type="error" onClose={() => {}} />}
    </>
  );
}

export default Home;
