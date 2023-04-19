import "./App.css";
import {Route, Routes} from "react-router-dom";
import Header from "./commponents/header.jsx";
import Home from "./Pages/Home.jsx";
import Login from "./Pages/Login.jsx";
import Movie from "./Pages/Movie.jsx";
import Profile from "./Pages/Profile.jsx";

function App() {
  return (
    <div>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/movie/:id" element={<Movie />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
