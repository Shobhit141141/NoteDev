import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components-notdev/Header";
import "./App.css";
import HomePage from "./pages/Home";
import QuestionForm from "./pages/QuesForm";
import QuestionList from "./pages/AllQuestions";
import DsaForm from "./components-notdev/DsaFolderForm";
import { Toaster } from "react-hot-toast";
import ResizableDemo from "./components-notdev/temp";
import SingleQuestion from "./pages/SingleQuestion";
import UpdateQuestion from "./pages/UpdateQuestion";
import SignIn from "./pages/SignIn";
import UserProfile from "./pages/UserProfile";
import ProtectedRoute from "./components-notdev/ProtectedRoute";
import PublicRoute from "./components-notdev/PublicRoute";

function App() {
  return (
    <div className="main-app">
      <div className="gm-bg overflow-x-hidden h-[100vh]">
        <Toaster />
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />

            <Route element={<PublicRoute />}>
              <Route path="/signin" element={<SignIn />} />
            </Route>
            <Route path="/temp" element={<ResizableDemo />} />

            <Route element={<ProtectedRoute />}>
              <Route path="/profile" element={<UserProfile />} />
              <Route
                path="/question-form/:topicId"
                element={<QuestionForm />}
              />
              <Route path="/questions" element={<QuestionList />} />
              <Route path="/dsa-topic-form" element={<DsaForm />} />
              <Route path="/question/:id" element={<SingleQuestion />} />
              <Route path="/update-question/:id" element={<UpdateQuestion />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
