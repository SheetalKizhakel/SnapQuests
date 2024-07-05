import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function generateAnswer() {
    try {
      setAnswer("loading...");
      
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyDL7p7hEfzwOJxGgLa2eGLpUV7X8coF_Ok",
        method: "post",
        data: {
          "contents": [
            { "parts": [{ text: question }] }
          ]
        }
      });
      setAnswer(response.data['candidates'][0]['content']['parts'][0]['text']);
    } catch (error) {
      console.error("Error generating answer:", error);
      setAnswer("Error generating answer.");
    }
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-4 space-y-4">
      <h1 className='text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-yellow-600'>
        Chat AI
      </h1>
      <textarea
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything!"
        className="w-2/4 h-32 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={generateAnswer}
        className="text-xl px-4 py-2 bg-gradient-to-r from-yellow-300 to-yellow-600 text-white font-mono font-extrabold rounded hover:bg-blue-700"
      >
        Generate Answer
      </button>
      <p className='text-white text-xl'>
      {answer}
      </p>
    </div>
  );
}

export default Chat;
