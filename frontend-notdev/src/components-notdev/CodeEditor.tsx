import React, { useState, useEffect } from 'react';
import Editor, { OnChange, OnMount, loader } from '@monaco-editor/react';
import 'tailwindcss/tailwind.css';

// Define custom themes
const defineThemes = (monaco:any) => {
  monaco.editor.defineTheme('monokai', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '272822' }],
    colors: {
      'editor.background': '#272822',
      'editor.foreground': '#F8F8F2',
      'editor.lineHighlightBackground': '#3E3D32',
      'editorCursor.foreground': '#F8F8F0',
      'editorWhitespace.foreground': '#3B3A32',
    },
  });

  monaco.editor.defineTheme('dracula', {
    base: 'vs-dark',
    inherit: true,
    rules: [{ background: '282A36' }],
    colors: {
      'editor.background': '#282A36',
      'editor.foreground': '#F8F8F2',
      'editor.lineHighlightBackground': '#44475A',
      'editorCursor.foreground': '#F8F8F0',
      'editorWhitespace.foreground': '#3B3A32',
    },
  });

  // Add other custom themes here
  // Example: 'nord', 'material', 'one-dark', 'ayu-dark', 'night-owl', 'tomorrow-night'
  // Follow the same structure as above to define them
};

const MonacoEditor: React.FC = () => {
  const [code, setCode] = useState<string>('console.log("Hello, world!");');
  const [theme, setTheme] = useState<string>('vs-dark');
  const [language, setLanguage] = useState<string>('javascript');
  const [fontSize, setFontSize] = useState<number>(10);

  const themes = [
    'vs-dark', 'hc-black', 'monokai', 'dracula', 'nord', 
    'material', 'one-dark', 'ayu-dark', 'night-owl', 'tomorrow-night'
  ];
  const languages = ['javascript', 'typescript', 'python', 'java', 'csharp', 'cpp'];

  const handleEditorChange: OnChange = (value, event) => {
    setCode(value ?? '');
  };

  const handleEditorMount: OnMount = (editor, monaco) => {
    console.log('Editor mounted', editor, monaco);
    defineThemes(monaco); // Define custom themes
  };

  return (
    <div className="flex flex-col h-[80vh] w-[90%] mx-auto">
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white rounded-xl">
        <div>
          <label htmlFor="theme" className="mr-2">Theme:</label>
          <select
            id="theme"
            className="mr-4 p-2 bg-gray-700 border border-gray-600 rounded"
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
          >
            {themes.map((themeOption) => (
              <option key={themeOption} value={themeOption}>
                {themeOption}
              </option>
            ))}
          </select>

          <label htmlFor="language" className="mr-2">Language:</label>
          <select
            id="language"
            className="mr-4 p-2 bg-gray-700 border border-gray-600 rounded"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            {languages.map((languageOption) => (
              <option key={languageOption} value={languageOption}>
                {languageOption}
              </option>
            ))}
          </select>

          <label htmlFor="fontSize" className="mr-2">Font Size:</label>
          <select
            id="fontSize"
            className="p-2 bg-gray-700 border border-gray-600 rounded"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
          >
            {[12, 14, 16, 18, 20, 24].map((size) => (
              <option key={size} value={size}>
                {size}px
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="flex-grow rounded-xl overflow-hidden">
        <Editor
          height="100%"
          defaultLanguage={language}
          value={code}
          theme={theme}
          options={{
            fontSize,
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
          onMount={handleEditorMount}
        />
      </div>
    </div>
  );
};

export default MonacoEditor;
