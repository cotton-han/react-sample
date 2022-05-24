import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./routes/Home";
import Search from "./routes/Search";
import Tv from "./routes/Tv";

import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:id" element={<Home />} />
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </Router>
  );
}

export default App;
