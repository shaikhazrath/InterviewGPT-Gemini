'use client'
import React, { useState, useEffect } from 'react';

const AudioInputComponent = ({submitAnswer}) => {
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
      setIsRecording(false)
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
      <h1>{text.join(' ')}</h1>
      {isRecording ?
        <button onClick={handleOnStop}>
          Submit Answer
        </button>
        :
        
        <button onClick={handleOnRecord}>
          Start Answer
        </button>
      }
    </div>
  );
};

export default AudioInputComponent;
