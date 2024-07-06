import { useEffect, useState } from 'react';
import Editor, { OnChange } from '@monaco-editor/react';
import 'tailwindcss/tailwind.css';

type MonacoEditorProps = {
  language: string;
  value: string;
  onChange: (newCode: string) => void;
};

const CodeEditor: React.FC<MonacoEditorProps> = ({ language , value = '', onChange }) => {
  const defaultCode = `// OPTIMIZED | BETTER | BRUTE
// TC : O(n)
// SC : O(1)
  `;
  
    const [code, setCode] = useState<string>(value || defaultCode);
  

  useEffect(() => {
    setCode(value || defaultCode);
  }, [value]);

  const handleEditorChange: OnChange = (value) => {
    setCode(value ?? '');
    onChange(value ?? '');
  };

  return (
    <div className="flex-grow rounded-xl h-[350px]">
      <div className='h-[100%]'>
        <Editor
          height="100%"
          language={language}
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
