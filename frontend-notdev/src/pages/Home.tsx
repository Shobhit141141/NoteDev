import DsaFolder from "@/components-notdev/DsaFolder";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');
    const uid = params.get('uid');

    

    if (token) {
  
      localStorage.setItem('token', token);
    }
    if (uid) {
  
      localStorage.setItem('uid', uid);
    }

   
  }, [location.search]);
  return (
    <div>
      <h1 className="text-[40px] p-4 font-bold ">
        Take DSA notes like never before
      </h1>

      
      <DsaFolder />
    </div>
  );
}

export default HomePage;
