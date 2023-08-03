import Navbar2 from "./components/Navbar2";
import IconChevronDownBlue from "../assets/icon-chevron-down-blue.svg";
// import { useState } from "react";

export default function EditProfilePage() {
  // const [photoUrlInput, setPhotoUrlInput] = useState("");
  // const [firstNameInput, setFirstNameInput] = useState("");
  // const [lastNameInput, setLastNameInput] = useState("");
  // const [usernameInput, setUsernameInput] = useState("");
  // const [emailInput, setEmailInput] = useState("");
  // const [passwordInput, setPasswordInput] = useState("");

  return (
    // PAGE
    <div className="flex flex-col items-center bg-medium-grey w-full h-full fixed top-0 left-0 overflow-scroll scrollbar-hide">
      <Navbar2 />
      <section className="flex flex-col justify-center items-center w-full h-auto md:px-4 py-8">
        <div className="flex flex-col items-start w-full max-w-[768px]">
          <button
            onClick={() => history.back()}
            type="button"
            className="flex items-center gap-2 text-blue text-body-medium mr-auto ml-4 md:ml-0 mb-4"
          >
            <img
              className="rotate-90 w-[15px] h-[15px]"
              src={IconChevronDownBlue}
              alt="icon-chevron-down"
            />
            Back
          </button>

          <form className="flex flex-col items-start p-4 md:p-10 bg-medium-grey rounded-2xl md:border border-text-grey w-full max-w-[768px] gap-6">
            <div className="flex flex-col items-start">
              <h2 className="text-body-regular text-white text-[24px] mb-2">
                Change Info
              </h2>
              <h3 className="text-text-grey text-left text-input-medium leading-tight">
                Changes will be reflected to every services
              </h3>
            </div>
            {/* PHOTO */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="photo" className="text-text-grey">
                Photo
              </label>
              <input
                type="text"
                name="photo"
                id="photo"
                placeholder="Enter your profile image url from unsplash..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* FIRST NAME */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="firstName" className="text-text-grey">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                placeholder="Enter your profile image url from unsplash..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* LAST NAME */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="lastName" className="text-text-grey">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                placeholder="Enter your profile image url from unsplash..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* USERNAME */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="username" className="text-text-grey">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* EMAIL */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="email" className="text-text-grey">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>

            {/* PASSWORD */}
            <div className="w-full flex flex-col items-start">
              <label htmlFor="password" className="text-text-grey">
                Password
              </label>
              <input
                type="password"
                name="phopasswordto"
                id="password"
                placeholder="Enter your new password..."
                className="bg-medium-grey w-full outline-none border border-text-grey rounded-lg text-white p-3 px-4 text-input-medium"
              />
            </div>
            <button
              type="button"
              className="bg-blue mt-4 py-2 px-6 rounded-lg text-white text-body-medium mr-auto hover:bg-blue-hover outline-none w-full md:max-w-[100px]"
            >
              Save
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
