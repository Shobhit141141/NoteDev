import  { useEffect, useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import 'tailwindcss/tailwind.css';

// Define custom themes

type MonacoEditorProps = {
  language: string;
  value: string; // Change 'code' to 'value'
  onChange: (newCode: string) => void;
};

const MonacoEditor: React.FC<MonacoEditorProps> = ({value, onChange }) => {
  const [code, setCode] = useState<string>(value);
  const [fontSize, setFontSize] = useState<number>(14);
  useEffect(() => {
    setCode(value); // Update code when initialCode prop changes
  }, [value]);

  const handleEditorChange: OnChange = (value) => {
    setCode(value ?? '');
    onChange(value ?? ''); // Call the onCodeChange prop with the new code value
  };


  const handleFontSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setFontSize(parseInt(event.target.value));
  };


  return (
    <div className="flex-grow rounded-xl h-[350px]">
    <div className="flex justify-end mb-2">
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
    </div>
    <Editor
      height="100%"
      defaultLanguage="cpp"
      value={code}
      theme="vs-dark"
      options={{
        fontSize: fontSize, // Use font size state
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
  );
};

export default MonacoEditor;