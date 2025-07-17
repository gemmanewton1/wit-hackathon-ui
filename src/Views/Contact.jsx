import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Contact</h1>
      <p>Get in touch with us!</p>
      <button onClick={() => navigate("/")}>Go Home</button>
      <button onClick={() => navigate("/about")}>About</button>
    </div>
  );
};

export default Contact;
