import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components-notdev/Header";
import "./App.css";
import HomePage from "./pages/Home";
import QuestionForm from "./pages/QuesForm";
import QuestionList from "./pages/AllQuestions";
import DsaForm from "./components-notdev/DsaFolderForm";
import { Toaster } from "react-hot-toast";
import  ResizableDemo from "./components-notdev/temp";
import MyTabs from "./components-notdev/AceEditor";

function App() {
  return (
    <div className="main-app">
      <div className="gm-bg overflow-x-hidden h-[100vh]">
        <Toaster />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/question" element={<QuestionForm />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/dsa-topic-form" element={<DsaForm />} />
            <Route path="/temp" element={<ResizableDemo />} />
            <Route path="/ace" element={<MyTabs />} />
            {/* <Route path="/editor" element={<QuillEditor />} /> */}


          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
