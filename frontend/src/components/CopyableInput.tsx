import { useRef } from 'react';
import { Tooltip } from 'react-tooltip';

type CopyableInputProps = { text: string };

function CopyableInput({ text } : CopyableInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input 
        data-testid="copyable-input"
        readOnly 
        value={text} 
        ref={inputRef} 
      />
      <button 
        data-testid="copy-button" 
        id="copy-button" 
        onClick={() => { 
          if (inputRef.current != null) {
            navigator.clipboard.writeText(inputRef.current.value) 
          }
        }}
      >
        Copy
      </button>
      <Tooltip
        anchorSelect="#copy-button"
        content="Copied"
        openOnClick={true}
        delayHide={1500}
      />
    </div>
  );
}

export default CopyableInput;