import { useEffect, useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import 'tailwindcss/tailwind.css';

type MonacoEditorProps = {
  language: string;
  value: string;
  onChange: (newCode: string) => void;
};

const CodeEditor: React.FC<MonacoEditorProps> = ({ value, onChange }) => {
  const [code, setCode] = useState<string>(value);

  useEffect(() => {
    setCode(value);
  }, [value]);

  const handleEditorChange: OnChange = (value) => {
    setCode(value ?? '');
    onChange(value ?? '');
  };

//   const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
//     setFontSize(parseInt(event.target.value));
//   };

//   const handleEditorClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
//     event.stopPropagation(); // Prevent click event from bubbling up
//   };

  return (
    <div className="flex-grow rounded-xl h-[350px]">
      {/* <div className="flex justify-end mb-2">
        <select
          className="px-2 py-1 mx-1 bg-btnbg rounded"
          value={fontSize}
          onChange={handleFontSizeChange}
        >
          {[10, 12, 14, 16, 18].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
      </div> */}
      <div className='h-[100%]'>
        <Editor
          height="100%"
          defaultLanguage="cpp"
          value={code}
          theme="vs-dark"
          options={{
            fontSize: 12,
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

export default CodeEditor;
