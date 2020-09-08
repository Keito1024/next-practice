import React, { useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';

function App() {
  // アップロードファイル
  const [file, setFile] = useState();
  // OCRで書き出された文字
  const [textOcr, setTextOcr] = useState('');

  const worker = createWorker({
    logger: m => console.log(m)
  })

  const tryOcr = async() => {
    await worker.load();
    await worker.loadLanguage('jpn');
    await worker.initialize('jpn');
    const { data: { text } } = await worker.recognize(file);
    setTextOcr(text);
    await worker.terminate();
  }

  // fileData 取得
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }

  const handleClick = async() => {
    if (!file) return
    setTextOcr('Recognizing...')
    await tryOcr();
  }

  return (
    <div className="App">
      <input type="file" onChange={handleChange} /><br />
      <button className="button" onClick={handleClick}>Try OCR</button>
      <div>
        {textOcr}
      </div>
    </div>
  );
}

export default App;
