import LogoText from "../../assets/logo-text.svg";
import ProfileDropdownNavbar from "./ProfileDropdownNavbar";

export default function Navbar2() {
  return (
    <nav className="p-4 flex justify-between lg:px-16 border-light-grey">
      <img src={LogoText} alt="logo-text" />
      {/* NAVBAR PROFILE BUTTON */}
      <ProfileDropdownNavbar />
    </nav>
  );
}
