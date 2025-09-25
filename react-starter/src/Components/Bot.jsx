import React, { useState } from "react";

const symptomsData = {
  "Period related": [
    "Period cramps",
    "Ovulation pain",
    "Heavy period",
    "Spotting or bleeding between periods",
    "Old or dark blood before your period",
  ],
  "Mood related": ["Anxiety", "Low mood or depression", "Tiredness"],
  "Other symptoms": [
    "Pain during or after sex",
    "Tummy pain",
    "Back pain",
    "Pain when going to the toilet",
    "Nausea",
    "Vomiting",
    "Shortness of breath or chest pain",
    "Constipation",
  ],
};

export default function SheKnowsBot() {
  const [stage, setStage] = useState(0);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [painLevel, setPainLevel] = useState(null);
  const [padChanges, setPadChanges] = useState("");
  const [messages, setMessages] = useState([
    { type: "bot", text: "Hi! Tell me how you’re feeling today?" },
  ]);

  const addMessage = (type, text) => {
    setMessages((prev) => [...prev, { type, text }]);
  };

  const handleSymptomSelect = (symptom) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubmitSymptoms = () => {
    if (selectedSymptoms.length > 0) {
      addMessage("user", selectedSymptoms.join(", "));
      setStage(1);
      setTimeout(() => {
        addMessage(
          "bot",
          "On a scale of 1 to 10 (1 being not at all painful and 10 extremely painful), how painful are your period cramps today?"
        );
      }, 500);
    }
  };

  const handlePainLevelSelect = (level) => {
    setPainLevel(level);
    addMessage("user", `Pain level: ${level}`);
    setStage(2);
    setTimeout(() => {
      addMessage(
        "bot",
        "How often are you having to change your pads or tampons today?"
      );
    }, 500);
  };

  const handlePadChangesSubmit = () => {
    addMessage("user", `Pad changes: ${padChanges}`);
    setStage(3);
    setTimeout(() => {
      addMessage(
        "bot",
        `Thank you for sharing 💜\n\n**Summary:**\nSymptoms: ${selectedSymptoms.join(
          ", "
        )}\nPain Level: ${painLevel}\nPad Changes: ${padChanges}`
      );
    }, 500);
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div key={idx} className={`chat-message ${msg.type}`}>
            {msg.text}
          </div>
        ))}

        {stage === 0 && (
          <div className="options">
            {Object.keys(symptomsData).map((section) => (
              <div key={section} className="section">
                <strong>{section}:</strong>
                <div className="buttons">
                  {symptomsData[section].map((symptom) => (
                    <button
                      key={symptom}
                      onClick={() => handleSymptomSelect(symptom)}
                      className={
                        selectedSymptoms.includes(symptom) ? "selected" : ""
                      }
                    >
                      {symptom}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <button className="submit-btn" onClick={handleSubmitSymptoms}>
              Submit
            </button>
          </div>
        )}

        {stage === 1 && (
          <div className="options">
            {[...Array(10)].map((_, i) => (
              <button key={i + 1} onClick={() => handlePainLevelSelect(i + 1)}>
                {i + 1}
              </button>
            ))}
          </div>
        )}

        {stage === 2 && (
          <div className="options">
            <input
              type="number"
              value={padChanges}
              onChange={(e) => setPadChanges(e.target.value)}
              placeholder="Enter number"
            />
            <button onClick={handlePadChangesSubmit}>Submit</button>
          </div>
        )}
      </div>
    </div>
  );
}
