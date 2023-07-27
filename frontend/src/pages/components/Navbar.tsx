import Logo from "../../assets/logo.svg";

export default function NavBar() {

return (
        <nav className="flex flex-row justify-between items-center gap-4 px-4 lg:px-16 min-h-[60px] w-full text-sm bg-medium-grey text-white">
          <img
          src={Logo}
          alt="logo" 
          />
          <ul>
            <li>Home</li>
            <li>Features</li>
            <li>Popular Channels</li>
          </ul>
          <button
          >Login
          </button>
          <button
          >My Profile
          </button>
        </nav>
  );
}