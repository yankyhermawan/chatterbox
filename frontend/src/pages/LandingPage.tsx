import Features from "./components/Features";
import Footer from "./components/Footer";
import Home from "./components/Home";
import NavBar from "./components/Navbar";
import PopularChannels from "./components/PopularChannels";

export default function LandingPage() {

  return (
    <>
    <NavBar/>
    <Home/>
    <Features/>
    <PopularChannels/>
    <Footer/>
    </>
  );
}