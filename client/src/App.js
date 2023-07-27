import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import Editor from '@monaco-editor/react';
import Navbar from './components/Navbar';
import axios from 'axios';

function App() {

  const [userCode, setUserCode] = useState('');
  const [userLang, setUserLang] = useState('python');
  const [userTheme, setUserTheme] = useState('vs-dark');
  const [fontSize, setFontSize] = useState(20);
  const [userInput, setUserInput] = useState('');
  const [userOutput, setUserOutput] = useState('');
  const [isLoading, setIsLoading] = useState();
  
  const options = {
    fontSize: fontSize
  }

  function compile() {
    
    setIsLoading(true);
    if(userCode === '') return;

    axios('http://localhost:3000/compile', {
      code: userCode,
      language: userLang,
      input: userInput
    }).then((res) => {
      setUserOutput(res.data.output);
    }).then(() => {
      setIsLoading(false);
    })
  }

  function clearOutput() {
    setUserOutput('');
  }

  return (
    <div className='App'>
      <Navbar
        userLang={userLang} setUserLang={setUserLang} userTheme={userTheme}
        setUserTheme={setUserTheme} fontSize={fontSize} setFontSize={setFontSize}
      />
      <div className='main'>
        <div className='left-container'>
          <Editor
            options={options}
            height="calc(100vh - 50px)"
            width="100%"
            theme={userTheme}
            language={userLang}
            defaultLanguage="python"
            defaultValue="# Enter your code here"
            onChange={(value) => { setUserCode(value) }}
          />
          <button className="run-btn" onClick={() => compile()}>
            Run
          </button>
        </div>
      <div className="right-container">
        <h4>Input:</h4>
        <div className="input-box">
            <textarea id="code-inp" onChange=
                {(e) => setUserInput(e.target.value)}>
            </textarea>
        </div>
        <h4>Output:</h4>
        {isLoading ? (
          <div className="spinner-box">
              <img src={logo} alt="Loading..." />
          </div>
        ) : (
            <div className="output-box">
              <pre>{userOutput}</pre>
              <button onClick={() => { clearOutput() }}
                  className="clear-btn">
                  Clear
              </button>
            </div>
        )}
        </div>
      </div>
    </div>
  );
}

export default App;
