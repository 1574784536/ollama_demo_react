import { useState } from "react";
import axios from "axios";

function App() {
    const [chatBox, setCheckBox] = useState([]);
    const [inputText, setInputText] = useState([]);

    const sendMessage = () => {
        if (!inputText.length) return;
        createMessage(inputText);
    }

    async function createMessage(text) {
        const msgMe = {
            name: 'Me',
            text,
            dateTime: new Date().toString()
        }

        const msgAi = {
            name: 'AI',
            text: '...',
            dateTime: '...'
        }

        setCheckBox([...chatBox, msgMe, msgAi]);

        const {data} = await axios.post('http://localhost:8081/ollamaChat/chat', {
            'message': text
        });
        setCheckBox(chatBox=>{
            const lastMsg = chatBox[chatBox.length-1];
            lastMsg.text = data.message;
            lastMsg.dateTime = new Date().toString();

            return [...chatBox];
        });
    }
  return (
    <div className="App">
      <div>
          {
              chatBox.map(msg => (
                  <div key={msg.text}>
                      <p>{msg.name}:{msg.dateTime}</p>
                      <p>{msg.text}</p>
                      <hr/>
                  </div>
              ))
          }
      </div>
        <div>
            <input type='text' onInput={(e) => setInputText(e.target.value)}/>
            <button onClick={sendMessage}>发送</button>
        </div>
    </div>
  );
}

export default App;
