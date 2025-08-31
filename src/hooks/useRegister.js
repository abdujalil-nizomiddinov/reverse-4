import { useCallback, useState } from "react";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../app/feature/userSlice";

export const useRegister = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const register = useCallback(
    async (name, email, password) => {
      setError(null);
      try {
        setIsPending(true);
        const req = await createUserWithEmailAndPassword(auth, email, password);
        if (!req.user) throw new Error("Foydalanuvchi yaratib bo‘lmadi !!!");
        await updateProfile(req.user, { displayName: name });
        dispatch(login(req.user));
        console.log("Yaratildi:", req.user);
      } catch (err) {
        let message;
        switch (err.code) {
          case "auth/email-already-in-use":
            message = "❌ Bu email allaqachon ro‘yxatdan o‘tgan !!!";
            break;
          case "auth/too-many-requests":
            message = "⏳ Juda ko‘p urinish qilindi. Keyinroq urinib ko‘ring.";
            break;
          case "auth/invalid-email":
            message = "📧 Email formati noto‘g‘ri !!!";
            break;
          case "auth/weak-password":
            message = "🔑 Parol juda oddiy. Kuchliroq parol tanlang.";
            break;
          default:
            message = "❗️Xatolik yuz berdi. Qayta urinib ko‘ring.";
        }
        setError(message);
        console.log(message);
      } finally {
        setIsPending(false);
      }
    },
    [dispatch]
  );

  return { register, isPending, error };
};
