import React, { useState } from 'react';
import MonacoEditor from '@monaco-editor/react';
import './Editor.css'
import { Link } from 'react-router-dom';
import { FaClock } from "react-icons/fa";

const Editor = () => {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('plaintext');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const fileContent = e.target.result;
      setCode(fileContent);
    };
    reader.readAsText(file);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const options = {
    selectOnLineNumbers: true,
    automaticLayout: true,
    minimap: {
      enabled: false,
    },
  };

  return (
    <div className='textEditor'>
      <div className='textEditor_mainBox'>
        {/* <input type="file" onChange={handleFileChange} /><br/>
        <select value={language} onChange={handleLanguageChange}>
            <option value="plaintext">Plain Text</option>
            <option value="javascript">JavaScript</option>
            <option value="python">python</option>
            <option value="c++">c++</option>
            <option value="java">java</option>
        </select> */}
        <div className='textEditor_headerBox'>
          <p>Code</p>
          <div className='flex'>
            <FaClock className='my-auto mr-[0.5vw]'/>
            <Link to='/commmits'>History</Link>
          </div>
          
        </div>
        <MonacoEditor
            width="100%"
            // height="30vw"
            // language={language}
            language='javascript'
            theme="vs-dark"
            value={code}
            // onChange={handleChange}
            options={options}
            className='textEditor_textBox'
        />
       </div>
    </div>
    // <div>
    //   <input type="file" onChange={handleFileChange} />
    //   <MonacoEditor
    //     width="100%"
    //     height="30vw"
    //     language="plaintext"
    //     theme="vs-dark"
    //     value={code}
    //     options={options}
    //   />
    // </div>
  );
};

export default Editor;
