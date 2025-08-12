import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../Components/Card";
import Button from "../Components/Button";
import Alert from "../Components/Alert";

const Home = () => {
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <h1>🚀 Welcome to the WiT Hackathon Starter App</h1>

      <Card title="Introduction">
        <p>
          This is a demo React app designed to give you a helpful starting point for your Hackathon project. It comes with:
        </p>

        <ul>
          <li>
            A working connection to a <strong>Spring Boot</strong> backend
          </li>
          <li>
            The backend is set up with <strong>MongoDB</strong> and exposes a
            simple API
          </li>
          <li>
            The frontend demonstrates basic <strong>CRUD operations</strong>
            (excluding update)
          </li>
          <li>A few simple, reusable React components</li>
          <li>A clean project setup to guide your development</li>
        </ul>

        <p>
          You're free to use this app as a guide, starting point, or inspiration
          - <strong>but you're not required to use it</strong>. Feel free to
          explore, borrow bits, or build from scratch.
        </p>
      </Card>

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
        <Button label="Products" onClick={() => navigate("/products")} />
        <Button
          label="Customers"
          onClick={() => navigate("/customers")}
          style={{ marginLeft: "10px" }}
        />
      </Card>
    </div>
  );
};

export default Home;
