import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>About</h1>
      <p>This app is for our amazing hackathon!</p>
      <button onClick={() => navigate("/")}>Go Home</button>
      <button onClick={() => navigate("/contact")}>Contact</button>
    </div>
  );
};

export default About;
