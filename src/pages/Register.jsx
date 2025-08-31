import React, { useEffect, useState } from "react";
import { Form, Link, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import Alert from "../components/Alert";
import { IoLogIn } from "react-icons/io5";
import { useRegister } from "../hooks/useRegister";
import Loading from "../components/Loading";

// eslint-disable-next-line react-refresh/only-export-components
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  if (!data.username.trim()) {
    return { error: "Username maydonini to‘ldiring !!!" };
  }
  if (!data.email.trim()) {
    return { error: "Email maydonini to‘ldiring !!!" };
  }
  if (!data.password.trim()) {
    return { error: "Password maydonini to‘ldiring !!!" };
  }

  return data;
}

export default function Register() {
  const [alert, setAlert] = useState(null);
  const data = useActionData();
  const { register: registerUser, isPending, error } = useRegister();

  useEffect(() => {
    if (error) {
      setAlert({ message: error, type: "error" });
    } else {
      setAlert(null);
    }
  }, [error]);

  useEffect(() => {
    if (!data) return;

    if (data.error) {
      setAlert({ message: data.error, type: "error" });
    } else {
      registerUser(data.username, data.email, data.password);
    }
  }, [data, registerUser]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="w-full max-w-md bg-black border border-[lime] rounded-2xl p-8 shadow-lg drop-shadow-[0_0_15px_#00ff00]">
        <h1 className="text-2xl animate-pulse font-mono text-[lime] mb-6 text-center relative flex items-center justify-center gap-2 mr-2">
          <IoLogIn /> Register
        </h1>

        <Form method="post" className="space-y-5">
          <FormInput
            label="Enter username:"
            name="username"
            type="text"
            placeholder="username"
          />
          <FormInput
            label="Enter email:"
            name="email"
            type="email"
            placeholder="email@example.com"
          />
          <FormInput
            label="Enter password:"
            name="password"
            type="password"
            placeholder="••••••••"
          />

          <button
            type="submit"
            className="w-full py-2 bg-black border-[lime] text-[lime] cursor-pointer font-monohover:drop-shadow-[0_0_6px_#00ff00]
            border-2 border-t-transparent border-l-transparent border-r-transparent px-4 p-1  hover:border-b-transparent hover:border-l-[lime] hover:border-r-[lime] hover:animate-pulse active:scale-x-95 tracking-[10px] tralnsition-all duration-200
            "
          >
            Submit
          </button>
        </Form>

        <p className="text-center text-xs cursor-pointer text-green-400 font-mono mt-6">
          Sizda hisob bormi ?{" "}
          <Link
            to="/login"
            className="underline !text-yellow-500 animate-pulse"
          >
            Login
          </Link>
        </p>
      </div>

      {isPending && <Loading />}

      {alert && (
        <Alert
          message={alert.message}
          type={alert.type}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}
