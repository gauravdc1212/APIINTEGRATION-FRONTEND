import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser"
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/add" element={<AddUser />} />
        <Route path="/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;