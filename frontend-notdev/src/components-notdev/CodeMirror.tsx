// src/components/CodeMirrorEditor.tsx

import React, { useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { cpp } from '@codemirror/lang-cpp';
import { javascript } from '@codemirror/lang-javascript';
import * as themes from '@uiw/codemirror-themes-all';

const CodeMirrorEditor: React.FC = () => {
  const [language, setLanguage] = useState<'javascript' | 'cpp'>('javascript');
  const [theme, setTheme] = useState<string>('github');
  const [code, setCode] = useState<string>('// Start coding...');

  const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setLanguage(event.target.value as 'javascript' | 'cpp');
  };

  const handleThemeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(event.target.value);
  };

  const getLanguageExtension = () => {
    switch (language) {
      case 'javascript':
        return javascript();
      case 'cpp':
        return cpp();
      default:
        return javascript();
    }
  };

  const getTheme = (themeName: string) => {
    const selectedTheme = (themes as Record<string, any>)[themeName];
    return selectedTheme ? selectedTheme : themes.github;
  };


  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <label>
          Language:
          <select value={language} onChange={handleLanguageChange}>
            <option value="javascript">JavaScript</option>
            <option value="cpp">C++</option>
          </select>
        </label>
        <label style={{ marginLeft: '1rem' }}>
          Theme:
          <select value={theme} onChange={handleThemeChange}>
            {Object.keys(themes).map((themeKey) => (
              <option key={themeKey} value={themeKey}>
                {themeKey}
              </option>
            ))}
          </select>
        </label>
      </div>
      <CodeMirror
      value={code}
      height="400px"
      extensions={[getLanguageExtension()]}
      theme={getTheme(theme)}
      onChange={(value) => setCode(value)}
      options={{
        lineNumbers: true,
        lineWrapping: true,
        readOnly: true,
        indentUnit: 4,
        tabSize: 4,
        smartIndent: true,
        viewportMargin: Infinity,
        autofocus: true,
        cursorBlinkRate: 500,
        extraKeys: {
          'Ctrl-Space': 'autocomplete', // Example of a custom keyboard shortcut
        },
      }}
    />
    </div>
  );
};

export default CodeMirrorEditor;
