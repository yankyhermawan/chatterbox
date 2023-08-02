import LogoText from "../../assets/logo-text.svg";
import ProfileDropdownNavbar from "./ProfileDropdownNavbar";
import { useNavigate } from "react-router-dom";

export default function Navbar2() {
  const navigate = useNavigate();
  const access_token = localStorage.getItem("access_token");

  return (
    <nav className="p-4 flex justify-between lg:px-16 border-light-grey w-full max-w-[1440px]">
      <img src={LogoText} alt="logo-text" />
      {/* NAVBAR PROFILE BUTTON */}
      {access_token ? (
        <ProfileDropdownNavbar />
      ) : (
        <button
          onClick={() => navigate("/login")}
          className="bg-blue hover:bg-blue-hover p-2 px-4 rounded-lg text-white font-bold w-[150px]"
        >
          Login
        </button>
      )}
    </nav>
  );
}
