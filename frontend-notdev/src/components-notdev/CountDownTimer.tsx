import { useAuth } from "@/context/GoogleAuthContext";
import React, { useEffect, useState } from "react";

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const { user } = useAuth();

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expiry = localStorage.getItem("expiry");
      if (expiry) {
        const expiryDate = new Date(expiry).getTime();
        const now = new Date().getTime();

        const difference = expiryDate - now;

        if (difference > 0) {
          const hours = Math.floor(
            (difference % (1000 * 3600 * 24)) / (1000 * 3600)
          );
          const minutes = Math.floor(
            (difference % (1000 * 3600)) / (1000 * 60)
          );
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft(hours * 3600 + minutes * 60 + seconds);
        } else {
          setTimeLeft(0);
          localStorage.removeItem("token");
          localStorage.removeItem("uid");
          localStorage.removeItem("expiry");
          window.location.reload();
        }
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const isCritical = timeLeft < 300;

  //   const hours = Math.floor(timeLeft / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  return user ? (
    <div className={`countdown-timer ${isCritical ? "text-red-500" : ""}`}>
      <span className="countdown font-mono text-lg sm:text-2xl">
        <span
          className="countdown-item"
          style={{ "--value": minutes } as React.CSSProperties}
        ></span>{" "}
        m :
        <span
          className="countdown-item"
          style={{ "--value": seconds } as React.CSSProperties}
        ></span>{" "}
        s
      </span>
    </div>
  ) : null;
};

export default CountdownTimer;
