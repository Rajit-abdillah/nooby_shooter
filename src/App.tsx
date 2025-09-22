import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Welcome, GamePage, GameOver } from "./pages/pages-routing";

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/game" element={<GamePage />} />
          <Route path="/gameover" element={<GameOver />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
