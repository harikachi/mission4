import React, { useState } from 'react';
import './App.css';

function App() {
  const [formData, setFormData] = useState({
    userInput: '',
    userChat: 'Luxe: I’m Luxe.  I help you to choose an insurance policy.  May I ask you a few personal questions to make sure I recommend the best policy for you? \n'
  });

  const prepareData = (input) => {
    const data = {
      "contents": [
        {
          "role": "model",
          "parts": [
            {
              "text": formData.userChat
            }
          ]
        },
        {
          "role": "user",
          "parts": [
            {
              "text": formData.userInput
            }
          ]
        }
      ],
      "systemInstruction": {
        "role": "user",
        "parts": [
          {
            "text": "You are an Insurance Agent named Luxe. Your first message will be \"I’m Luxe.  I help you to choose an insurance policy. \nMay I ask you a few personal questions to make sure I recommend the best policy for you?\". \nIf user disagrees then display \"Sorry to see you go! Have a great time :)\" and exit. If user agrees then collect the information like vehicle type, maker, model, year interactively. \nThen collect the place and address of praking, purpose of use, driver details like name, age, previous claim details and also any additional drivers. Additionally ask for any additional coverage. \nMake a decision among the insurance types Mechanical Breakdown Insurance, Comprehensive Car Insurance and Third Pary Car Insurance. \nTake below rules before making the decision.\n1. MBI is not applicable to trucks and racing cars.\n2. Comprehensive is applicable to vehicles less than 10 years old.\nFinally choose the Insurance type with a cost in New Zealand Dollars."
          }
        ]
      },
      "generationConfig": {
        "temperature": 1,
        "topK": 64,
        "topP": 0.95,
        "maxOutputTokens": 8192,
        "responseMimeType": "text/plain"
      }
    };
    return data;
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reqBody = prepareData(formData.userInput);
    try {
      const response = await fetch('http://localhost:3001/gemini/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody),
      });
      
      const result = await response.json();
      // console.log('Success:', result);
      setFormData({
        userInput: '',
        userChat: `${formData.userChat}\nUser: ${formData.userInput}\n\nLuxe: ${result.response}\n`
      });
    } catch (error) {
      // console.error('Error:', error);
      setFormData({
        userInput: '',
        userChat: `Some error occured while invoking the Gemini API, please check the logs.\n`
      });
    }
  };

  return (
    <div className="container">
      <div className="form-wrapper">
      <h1 className="form-title">Luxe - AI Insurance Application</h1>
        <form onSubmit={handleSubmit} className="form">
          <div>
            <label>
              <textarea
                name="userChat"
                value={formData.userChat}
                onChange={handleChange}
                id='userChat'
                style={{ width: '450px', height: '450px', fontSize: '16px' }}
                required
              />
            </label>
          </div>
          <div></div>
          <div>
            <label>
              <input
                type="text"
                name="userInput"
                value={formData.userInput}
                onChange={handleChange}
                id='userInput'
                className="text-input"
                //style={{ width: '200px', height: '30px', fontSize: '16px' }}
                required
              />
            </label>
            <button type="submit" className='submit-button'>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
