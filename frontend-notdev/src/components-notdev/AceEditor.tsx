import React, { useState } from 'react';
import MonacoEditor from './CodeEditor';
import ImagePreview from './ImagePreview';

const MyTabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  return (
    <div className="flex flex-col items-start space-y-4">
      <div className="flex space-x-4">
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 1
              ? 'bg-gray-200 text-gray-900'
              : 'bg-gray-900 text-white'
          }`}
          onClick={() => setActiveTab(1)}
        >
          Code
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 2
              ? 'bg-gray-200 text-gray-900'
              : 'bg-gray-900 text-white'
          }`}
          onClick={() => setActiveTab(2)}
        >
          Images
        </button>
        <button
          className={`px-4 py-2 rounded ${
            activeTab === 3
              ? 'bg-gray-200 text-gray-900'
              : 'bg-gray-900 text-white'
          }`}
          onClick={() => setActiveTab(3)}
        >
          Notes
        </button>
      </div>
      <div>
        {activeTab === 1 && <div><MonacoEditor/></div>}
        {activeTab === 2 && <div><ImagePreview/></div>}
        {activeTab === 3 && <div>Content for Tab 3</div>}
      </div>
    </div>
  );
};

export default MyTabs;
