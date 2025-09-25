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
   <div
        style={{
          display: "flex",
          flexDirection: "column", // Stack items vertically
          justifyContent: "center",
          alignItems: "center",
          height: '100vh',
          width: '100%',
          backgroundColor: '#f5f5f5'
          }}
      >
 
        <div style={{display:"block", justifyContent:"center", alignItems:"center"}}>
            <Image src="/witLogo.png" alt="Logo" width={100} height={100}
              style={{
                marginLeft: '60px',
                display: "flex",
                flexDirection: "column", // Stack form elements vertically
                justifyContent: "center",
                alignItems: "center"
              }}
          />
 
          <Card
            class="regBoxTitle"
            title="Sign In"
            style = {{
                fontSize: '20px',
                width: '400px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                borderRadius: '8px'
            }}
            >
 
            <h3><b>Email</b></h3>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              id="email"
              style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
              required></input>
            
            <br></br>
 
            <h3><b>Password</b></h3>
            <input
              type="password"
              placeholder="Enter Password"
              name="psw"
              id="psw"
              style={{ width: '100%', padding: '8px', marginBottom: '15px' }}
              required></input>
 
            <br></br>
 
            <Button
              class="regBoxSubmit"
              style = {{
              width: '100%',
              padding: '10px 20px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer'
            }}
              label="Submit"
              onClick={() => handleNavigate('/profilePage')} />
 
            {showAlert && (
              <Alert
                type="success"
                message="Congratulations! You are now signed in..."
              />
            )}
          </Card>
        </div>
    </div>
  );
};

export default Home;
