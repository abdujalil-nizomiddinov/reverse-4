import { useCallback, useState } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/feature/userSlice";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const _login = useCallback(
    async (email, password) => {
      setError(null);
      try {
        setIsPending(true);
        const req = await signInWithEmailAndPassword(auth, email, password);
        if (!req.user) throw new Error("Foydalanuvchi topilmadi!");
        dispatch(login(req.user));
        console.log("✅ Kirish muvaffaqiyatli:", req.user);
      } catch (err) {
        let message;
        if (err && typeof err === "object" && "code" in err) {
          switch (err.code) {
            case "auth/invalid-email":
              message = "📧 Email formati noto‘g‘ri !!!";
              break;
            case "auth/user-disabled":
              message = "🚫 Bu foydalanuvchi bloklangan !!!";
              break;
            case "auth/too-many-requests":
              message =
                "⏳ Juda ko‘p urinish qilindi. Keyinroq urinib ko‘ring.";
              break;
            case "auth/invalid-credential":
              message = "❌ Email yoki parol noto‘g‘ri !!!";
              break;
            default:
              message = "❗️Kirishda xatolik yuz berdi.";
          }
        } else {
          message = "❗️Noma'lum xatolik yuz berdi.";
        }
        setError(message);
        console.log("❌ Xato:", message, err.message);
      } finally {
        setIsPending(false);
      }
    },
    [dispatch]
  );

  return { _login, isPending, error };
};
