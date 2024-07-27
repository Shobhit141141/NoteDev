import React, { useEffect, useState } from 'react';

const CountdownTimer: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const expiry = localStorage.getItem('expiry');
      if (expiry) {
  
        const expiryDate = new Date(expiry).getTime();
        const now = new Date().getTime();

        const difference = expiryDate - now;

        if (difference > 0) {
          const hours = Math.floor((difference % (1000 * 3600 * 24)) / (1000 * 3600));
          const minutes = Math.floor((difference % (1000 * 3600)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);

          setTimeLeft(hours * 3600 + minutes * 60 + seconds);
        } else {
          setTimeLeft(0); 
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

  return (
    <div className={`countdown-timer ${isCritical ? 'text-red-500' : ''}`}>
      <span className="countdown font-mono text-2xl">
        {/* <span style={{"--value": hours}}></span>: */}
        {/* @ts-ignore */}
        <span style={{"--value": minutes}}></span> m :   
        {/* @ts-ignore */}
        <span style={{"--value": seconds}}></span> s
      </span>
    </div>
  );
};

export default CountdownTimer;
