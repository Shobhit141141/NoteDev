import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components-notdev/Header";
import "./App.css";
import HomePage from "./pages/Home";
import QuestionForm from "./pages/QuesForm";
import QuestionList from "./pages/AllQuestions";
import DsaForm from "./components-notdev/DsaFolderForm";
import { Toaster } from "react-hot-toast";
import  ResizableDemo from "./components-notdev/temp";
import QuillEditor from "./components-notdev/TextEditor";
import SingleQuestion from "./pages/SingleQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";

function App() {
  return (
    <div className="main-app">
      <div className="gm-bg overflow-x-hidden h-[100vh]">
        <Toaster />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/question-form/:topicId" element={<QuestionForm />} />
            <Route path="/questions" element={<QuestionList />} />
            <Route path="/dsa-topic-form" element={<DsaForm />} />
            <Route path="/temp" element={<ResizableDemo />} />
            {/* <Route path="/ace" element={<TabNav />} /> */}
            <Route path="/question/:id" element={<SingleQuestion />} />
            <Route path="/update-question/:id" element={<UpdateQuestion />} />

            <Route path="/editor" element={<QuillEditor value="" onChange={()=>console.log()}/>} />


          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
