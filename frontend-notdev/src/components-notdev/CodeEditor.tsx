import { useEffect, useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import 'tailwindcss/tailwind.css';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { FiCopy, FiCheckCircle } from 'react-icons/fi';

type MonacoEditorProps = {
  language: string;
  value: string;
  onChange: (newCode: string) => void;
};

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, onChange }) => {
  const [code, setCode] = useState<string>(value);
  const [fontSize, setFontSize] = useState<number>(14);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const handleEditorChange: OnChange = (value) => {
    setCode(value ?? '');
    onChange(value ?? '');
  };

  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(parseInt(event.target.value));
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000); 
  };

  return (
    <div className="flex-grow rounded-xl h-[350px] relative">
      <div className="flex justify-between mb-2 absolute top-0 -right-2 z-50 bg-[#484848] p-1 rounded-xl px-[2px] scale-[0.5] sm:scale-[0.75]">
        <select
          className="px-2 py-1 mx-1 bg-btnbg rounded-[10px]"
          value={fontSize}
          onChange={handleFontSizeChange}
        >
          {[7, 10, 12, 14, 16, 18].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <CopyToClipboard text={code} onCopy={handleCopy}>
          <button className="px-2 py-1 mx-1 rounded-[10px] bg-btnbg text-white focus:outline-none">
            {copied ? (
              <>
                <FiCheckCircle className="inline-block text-green-500" />
               
              </>
            ) : (
              <>
                <FiCopy className="inline-block" />
               
              </>
            )}
          </button>
        </CopyToClipboard>
      </div>
      <div className='h-[400px] sm:h-[600px] p-2'>
        <Editor
          height="100%"
          defaultLanguage="cpp"
          value={code}
          theme="vs-dark"
          options={{
            fontSize: fontSize,
            minimap: { enabled: false },
            readOnly: false,
            lineNumbers: 'on',
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            formatOnType: true,
            formatOnPaste: true,
            renderValidationDecorations: 'off',
            tabCompletion: 'on',
          }}
          onChange={handleEditorChange}
        />
      </div>
    </div>
  );
};

export default MonacoEditor;
