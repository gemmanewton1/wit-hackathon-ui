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
      <h1>🏠 Welcome to the Home Page</h1>
      <p>This is a simple React app with routing.</p>

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
        <Button label="Customers" onClick={() => navigate("/customers")} style={{ marginLeft: "10px" }} />
      </Card>
    </div>
  );
};

export default Home;
