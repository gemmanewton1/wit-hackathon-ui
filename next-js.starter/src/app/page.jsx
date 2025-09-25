"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./components/Card";
import Button from "./components/Button";
import Alert from "./components/Alert";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);
  const router = useRouter();

  const handleNavigate = (path) => {
    router.push(path);
  };

  return (
    <div>
      <Card title="Introduction"></Card>

      <Card title="Get Started">
        <p>
          Using reusable components makes building apps much easier. Click below
          to see an alert!
        </p>
        <Button label="Show Alert" onClick={() => setShowAlert(true)} />
        {showAlert && (
          <Alert
            type="success"
            message="Congratulations! You clicked the button."
          />
        )}
      </Card>

      <Card title="Navigation Demo">
        <p>Try visiting the other pages using these buttons:</p>
        <Button label="Products" onClick={() => handleNavigate("/customers")} />

      </Card>
    </div>
  );
};

export default Home;
