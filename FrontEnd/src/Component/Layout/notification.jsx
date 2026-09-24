import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/AuthContext";

const Notification = () => {
  const { notification, setNotification } = useContext(UserContext);
  console.log(notification);

  useEffect(() => {
    if (!notification) {
      return;
    }
    const timer = setTimeout(() => {
      setNotification(null);
    }, 2000);

    return () => clearTimeout(timer);
  }, [notification, setNotification]);

  if (!notification) {
    return null;
  }

  return (
    <div className="relative">
      <div
        className={`absolute top-6 right-6 border-2 bg-slate-300 rounded-xl px-9 py-4 ${notification.success ? "border-green-500 text-green-400 font-bold" : "border-red-500 text-red-400 font-bold"}`}
      >
        {notification.message}
      </div>
    </div>
  );
};

export default Notification;
