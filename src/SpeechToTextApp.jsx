import { useState, useRef } from "react";

export default function SpeechToTextApp() {
  const [text, setText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [selectedLang, setSelectedLang] = useState("en-US");
  const recognitionRef = useRef(null);

  const startListening = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition. Try Chrome.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLang;

    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setText(transcript);
    };

    recognition.start();
    recognitionRef.current = recognition;
    setIsListening(true);
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  return (
    <div className="container">
      <h2 className="title">🎙️ Speech-to-Text Web App - Audezee</h2>

      <select
        className="language-select"
        onChange={(e) => setSelectedLang(e.target.value)}
        value={selectedLang}
      >
        <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="es-ES">Spanish (Spain)</option>
        <option value="fr-FR">French</option>
        <option value="de-DE">German</option>
        <option value="hi-IN">Hindi</option>
        <option value="zh-CN">Chinese (Simplified)</option>
        <option value="ja-JP">Japanese</option>
        <option value="ar-SA">Arabic</option>
        <option value="ru-RU">Russian</option>
      </select>

      <textarea
        className="text-box"
        value={text}
        readOnly
        placeholder="Start speaking and your text will appear here..."
      />

      <div className="button-group">
        <button
          className="start-btn"
          onClick={startListening}
          disabled={isListening}
        >
          🎤 Start Listening
        </button>
        <button
          className="stop-btn"
          onClick={stopListening}
          disabled={!isListening}
        >
          ⏹ Stop
        </button>
      </div>
    </div>
  );
}
