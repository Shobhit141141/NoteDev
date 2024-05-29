// src/QuillEditor.tsx
import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css';

// Register the syntax module
declare global {
    interface Window {
        hljs: typeof hljs;
    }
}

window.hljs = hljs;

const modules = {
    toolbar: [
        [{ 'font': [] }],
        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': '1' }, { 'header': '2' }, { 'header': [3, 4, 5, 6] }, { 'header': [false] }],
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'script': 'sub' }, { 'script': 'super' }],     // superscript/subscript
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'indent': '-1' }, { 'indent': '+1' }],         // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction
        [{ 'align': [] }],
        ['link', 'image', 'video'],
        ['blockquote', 'code-block'],                     // add blockquote and code-block
        ['clean']                                         // remove formatting button
    ],
    syntax: {
        highlight: (text: string) => hljs.highlight('cpp', text).value, // Highlight C++ code
    },
    clipboard: {
        matchVisual: false,
    },
};

const formats = [
    'header', 'font', 'size', 'bold', 'italic', 'underline', 'strike', 'color', 'background',
    'script', 'list', 'bullet', 'indent', 'direction', 'align', 'link', 'image', 'video',
    'blockquote', 'code-block'
];

const QuillEditor: React.FC = () => {
    const [value, setValue] = useState<string>('');

    useEffect(() => {
        hljs.configure({
            // No need to configure languages as we are only highlighting C++ code
        });
    }, []);

    return (
        <div className='w-[80vh] m-auto bg-appbg'>
            <ReactQuill
                value={value}
                onChange={setValue}
                modules={modules}
                formats={formats}
                theme="snow"
            />
        </div>
    );
};

export default QuillEditor;
