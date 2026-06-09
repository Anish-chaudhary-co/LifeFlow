import { useEffect } from "react";
import Navbar from "./Component/Layout/Navbar";
import Home from "./Pages/Home";
import Footer from "./Component/Layout/Footer";
import MainRouter from "./Routes/MainRouter";

function App() {
  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.text())
      .then((data) => console.log(data));
  }, []);

  return (
    <>
  <Navbar/>
  <MainRouter/>
  <Footer/>
  </>
  )
}

export default App;