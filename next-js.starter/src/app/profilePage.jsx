"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./components/Card";
import Button from "./components/Button";
import Alert from "./components/Alert";
import Image from 'next/image';
import './globals.css';

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div>
        <h1>Profiles</h1>
        <div class="profile">
          <Image src="/adultProfilePic.png" alt="Adult Photo" width={200} height={200}
            style={{
              borderRadius: '50%',
              margin: '15px'
            }}
            />

          <Button 
          class="profileBtn" 
          style = {{ margin: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
          label="Submit" 
          onClick={() => handleNavigate('/customers/calendar')} />
        </div>

        <div class="profile">
            <Image src="" alt="Child Photo" width={200} height={200}
              style={{
                borderRadius: '50%',
                margin: '15px'
              }}
            />
            <Button 
              style = {{ margin: '10px',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
        }}
          label="Submit" 
          onClick={() => handleNavigate('')} />
        </div>
    </div>
  );
};

export default Home;