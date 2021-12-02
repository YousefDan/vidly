import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./components/pages/Home"
import About from "./components/pages/About"
import Login from "./components/pages/Login"
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import MovieForm from "./components/pages/MovieForm";

const App = () => {
  return ( <BrowserRouter>
    <Header />
  <main style={{minHeight: "70vh"}} className="container mt-3">
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/about" element={<About />} />
    <Route path="/login" element={<Login />} />
    <Route path="/movie-form" element={<MovieForm />} />
  </Routes>
  </main>
  <Footer />
  </BrowserRouter> );
}
 
export default App;
