import IconUserSquare from "../assets/icon-user-square.svg";
import IconTriangleDown from "../assets/icon-triangle-down.svg";
import LogoText from "../assets/logo-text.svg";
import ProfileDropdownNavbar from "./components/ProfileDropdownNavbar";

export default function ProfilePage() {
  return (
    // PAGE CONTIANER
    <div className="bg-medium-grey w-full h-full fixed top-0 left-0 overflow-scroll scrollbar-hide">
      {/* NAVBAR */}
      <nav className="p-4 flex justify-between">
        <img src={LogoText} alt="logo-text" />
        {/* NAVBAR PROFILE BUTTON */}
        {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                height="1.5em"
                viewBox="0 0 448 512"
              >
                <path
                  d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"
                  fill="white"
                />
              </svg> */}
        {/* PROFILE BUTTON */}
        <ProfileDropdownNavbar />

        {/* <ul className="absolute top-10 right-0 hidden rounded py-2">
                <li>
                  <a href="#" className="text-white block px-4 py-2">
                    Sign Out
                  </a>
                </li>
              </ul> */}
      </nav>

      {/* PROFILE SECTION */}
      <section className="flex flex-col justify-center items-center h-full w-full md:px-4">
        <h1 className="text-white text-[36px] mb-1">Personal Info</h1>
        <p className="mb-12 text-input-medium text-text-grey">
          Basic info, like your name and photo
        </p>

        {/* CONTAINER */}
        <div className="bg-medium-grey rounded-2xl md:border border-text-grey w-full max-w-[768px]">
          {/* PROFILE AND EDIT BUTTON */}
          <div className="flex justify-between items-center px-4 md:px-10 py-10">
            <div className="flex flex-col items-start">
              <h2 className="text-body-regular text-white text-[24px] mb-2">
                Profile
              </h2>
              <h3 className="text-text-grey text-left text-input-medium leading-tight">
                Some info may be visible to other people
              </h3>
            </div>

            <button className="px-8 py-1 border border-text-grey text-text-grey rounded-lg active:border-white active:text-white">
              Edit
            </button>
          </div>

          <hr className="border-text-grey" />

          {/* PHOTO */}
          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              PHOTO
            </span>
            <div className="w-[60px] h-[60px] overflow-hidden rounded-lg">
              <img
                className="object-cover w-full h-full"
                src={IconUserSquare}
                alt="icon-user-square"
              />
            </div>
          </div>
          <hr className="border-text-grey" />

          {/* NAME */}
          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              NAME
            </span>
            <span className="text-white text-body-regular">Arya Imanuel</span>
          </div>
          <hr className="border-text-grey" />

          {/* USERNAME */}
          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              USERNAME
            </span>
            <span className="text-white text-body-regular">aryaimanuel</span>
          </div>
          <hr className="border-text-grey" />

          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              EMAIL
            </span>
            <span className="text-white text-body-regular">
              aryafe@mail.com
            </span>
          </div>
          <hr className="border-text-grey" />

          <div className="flex items-center justify-between md:justify-start px-4 md:px-10 py-6">
            <span className="w-[200px] text-input-medium text-text-grey text-left">
              PASSWORD
            </span>
            <span className="text-white text-body-regular">********</span>
          </div>
          {/* <div className="mb-4">
            <label className="text-sm font-medium text-gray-600 block">
              Password
            </label>
            <p id="password" className="text-gray-900">
              ********
            </p>
          </div> */}
        </div>
      </section>
    </div>
  );
}
