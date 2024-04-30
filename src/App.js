import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./mainComponents/home";
import Chats from "./mainComponents/chats";

import "./app.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
