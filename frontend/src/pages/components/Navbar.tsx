import Logo from "../../assets/logo.svg";

export default function NavBar() {

return (
      <div className="bg-medium-grey w-full h-[52px] fixed py-4 px-6 top-0 left-0">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="/">
              <img
              src={Logo}
              alt="logo" 
              />
            </a>

          <div className="sm:hidden justify-between items-center lg:w-full flex">
            <ul className="flex text-body-medium space-x-8 mt-0">
             <li>
              <a href="/" className="block px-4 text-white p-0" aria-current="page">Features</a>
             </li>
             <li>
              <a href="/" className="block px-4 text-white p-0" aria-current="page">Popular Channels</a>
             </li>
            </ul>
          </div>

          <div className="items-center mx-2">
            <a href="/" className="text-white mx-1 text-body-medium border bg-light-grey rounded-lg hover:bg-light-grey focus:ring-4 font-medium text-sm px-4 py-1 ">Logout</a>
            <a href="/profile" className="text-white mx-1 text-body-medium border bg-blue hover:bg-light-grey focus:ring-4 font-medium rounded-lg text-sm px-4 py-1 ">My Profile</a>
          </div>
        </div>
      </div> 
  );
}