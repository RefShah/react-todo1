import React, { useRef, useState } from 'react';
import { Link } from "react-router-dom";

export default function CopyExample() {

  const [copySuccess, setCopySuccess] = useState('');
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    let cs = textAreaRef.selectionStart;
    alert('A name was submitted: ' + cs);
    document.execCommand('copy');
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus(); // if i comment this out, after clicking btn, the text will be selected/highligted
    setCopySuccess('Copied!');
  };

  return (
    <div>
      {
       /* Logical shortcut for only displaying the 
          button if the copy command exists */
       document.queryCommandSupported('copy') &&
        <div>
          <button onClick={copyToClipboard}>Copy</button> 
          {copySuccess}
        </div>
      }
      <form>
        <textarea
          ref={textAreaRef}
          value='Some text to '
        />
        `<textarea
              className='html-editor'  
              >
          </textarea>` 
      </form>
    </div>
  );
}