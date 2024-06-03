// src/QuillEditor.tsx
import React from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ font: [] }],
    [{ size: ["small", false, "large", "huge"] }],
    [
      { header: "1" },
      { header: "2" },
      { header: [3, 4, 5, 6] },
      { header: [false] },
    ],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ direction: "rtl" }],
    [{ align: [] }],
    ["link", "image", "video"],
    ["blockquote", "code-block"],
    ["clean"],
  ],
};

const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "color",
  "background",
  "script",
  "list",
  "bullet",
  "indent",
  "direction",
  "align",
  "link",
  "image",
  "video",
  "blockquote",
  "code-block",
];

const QuillEditor: React.FC<{
  value: string;
  onChange: (value: string) => void;
}> = ({ value, onChange }) => {
  return (
    <span className="h-[250px] w-[100%] flex justify-center items-center">
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        theme="snow"
        className="h-[100%]"
      />
    </span>
  );
};

export default QuillEditor;
