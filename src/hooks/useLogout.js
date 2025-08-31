import { signOut } from "firebase/auth";
import { auth } from "../firebase/config";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../app/feature/userSlice";

export function useLogout() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const _logout = async () => {
    setIsPending(true);
    setError(null);

    try {
      await signOut(auth);
      dispatch(logout());
    } catch (err) {
      let message;
      switch (err.code) {
        case "auth/network-request-failed":
          message = "🌐 Internet ulanishida muammo bor !!!";
          break;
        case "auth/user-token-expired":
          message = "🔑 Sessiya eskirgan. Qayta login qiling.";
          break;
        case "auth/internal-error":
          message = "⚠️ Tizim xatosi. Keyinroq urinib ko‘ring.";
          break;
        default:
          message = "❗️Chiqishda xatolik yuz berdi.";
      }
      setError(message);
      console.log(message);
    } finally {
      setIsPending(false);
    }
  };

  return { _logout, isPending, error };
}
