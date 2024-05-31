import React, { useState, useEffect } from 'react';

const AudioInputComponent = ({ submitAnswer }) => {
  const [text, setText] = useState([]);
  const [recognition, setRecognition] = useState(null);
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognitionInstance = new SpeechRecognition();
    recognitionInstance.continuous = true;
    recognitionInstance.interimResults = false;
    recognitionInstance.lang = 'en-US';

    recognitionInstance.onresult = function (event) {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setText(prevText => [...prevText, transcript]);
    };

    recognitionInstance.onend = function () {
      setIsRecording(false);
    };

    setRecognition(recognitionInstance);
  }, []);

  const handleOnRecord = () => {
    if (recognition) {
      setText([]);
      setIsRecording(true);

      recognition.start();
    }
  };

  const handleOnStop = async () => {
    if (recognition) {
      recognition.stop();
      setIsRecording(false);
      submitAnswer(text.join(' '))
      setText([])
    }
  };

  return (
    <div>
    <button
      onClick={isRecording ? handleOnStop : handleOnRecord}
      className={`w-28 h-28 rounded-full text-xl font-bold text-white ${
        isRecording
          ? 'bg-gradient-to-r from-red-500 to-orange-600'
          : 'bg-gradient-to-r from-blue-500 to-purple-600'
      } ${isRecording ? 'blink-border' : ''}`}
    >
      {isRecording ? 'Stop' : 'Start'}
    </button>
  </div>
  
  );
};

export default AudioInputComponent;
