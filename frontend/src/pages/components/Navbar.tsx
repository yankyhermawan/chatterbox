import Logo from "../../assets/logo.svg";

export default function NavBar() {

return (
  <header>
        <nav className="bg-medium-grey w-screen h-1/6 px-6 py-6 fixed left-0 top-0">
          <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/" className="flex items-center">
              <img className="mr-3 h-6 sm:h-9"
              src={Logo}
              alt="logo" 
              />
            </a>

          <div className="sm:hidden justify-between items-center lg:w-full flex">
          <ul className="flex text-body-medium space-x-8 mt-0">
            <li>
              <a href="/" className="block px-4 text-white p-0" aria-current="page">Home</a>
            </li>
            <li>
              <a href="/" className="block px-4 text-white p-0" aria-current="page">Features</a>
            </li>
            <li>
              <a href="/" className="block px-4 text-white p-0" aria-current="page">Popular Channels</a>
            </li>
          </ul>
          </div>

           <div className="flex items-center justify-end">
            <a href="#" className="text-white text-body-medium hover:bg-light-grey focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none ">Login</a>
            <a href="#" className="text-white text-body-medium bg-medium-grey hover:bg-light-grey focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 focus:outline-none">My Profile</a>
          </div>

          </div>
        </nav>
  </header>
  );
}