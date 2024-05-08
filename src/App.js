import { Route, Routes } from "react-router-dom";
import Home from "./mainComponents/home";
import Chats from "./mainComponents/chats";

import "./App.css";
import 'react-lazy-load-image-component/src/effects/blur.css';

function App() {
  return (
    <div className="App">

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chats" element={<Chats />} />
        </Routes>

    </div>
  );
}

export default App;
